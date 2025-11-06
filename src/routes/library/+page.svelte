<script lang="ts">
  import Fuse from 'fuse.js';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  import type { Note } from '$lib/types/notes';
  import data from '$lib/data/notes.json';

  import NoteCard from '$lib/components/notecard.svelte';
  import NoteDetailPopup from '$lib/components/NoteDetailPopup.svelte'; // <-- uses prop "note"
  import FilterBar from '$lib/components/FilterBar.svelte';

  // All notes (typed from JSON)
  const notes: Note[] = data as Note[];

  // Build unique filter options from data
  const unique = <T,>(arr: T[]) => Array.from(new Set(arr));
  const courseOptions = unique(notes.map(n => n.course)).sort();
  const semesterOptions = unique(notes.map(n => `${n.semester} ${n.year}`)).sort();

  // Local filter state
  let selectedCourse = 'All Courses';
  let selectedSemester = 'All Semesters';

  // Popup state
  let selectedNote: Note | null = null;
  function openPopup(note: Note) { selectedNote = note; }
  function closePopup() { selectedNote = null; }

  // Navbar search (?search=...) – reactive
  const searchQuery = derived(page, ($page) => {
    const param = $page.url.searchParams.get('search')?.trim() || '';
    return param.toLowerCase();
  });

  // 1) Apply Course + Semester filters
  $: baseFiltered =
    notes.filter(n => {
      const courseMatch = selectedCourse === 'All Courses' || n.course === selectedCourse;
      const semString = `${n.semester} ${n.year}`;
      const semMatch = selectedSemester === 'All Semesters' || semString === selectedSemester;
      return courseMatch && semMatch;
    });

  // 2) Fuzzy search on already-filtered notes (title, course, professor, description)
  let fuse: Fuse<Note> | null = null;
  $: filteredNotes = (() => {
    const q = $searchQuery;
    if (!q) return baseFiltered;

    fuse = new Fuse(baseFiltered, {
      includeScore: true,
      threshold: 0.4,
      keys: ['title', 'course', 'professor', 'description']
    });

    return fuse.search(q).map(r => r.item);
  })();

  // Handle FilterBar events
  function handleFilterChange(e: CustomEvent<{ course: string; semester: string }>) {
    selectedCourse = e.detail.course;
    selectedSemester = e.detail.semester;
  }
</script>

<section id="library">
  <!-- Filters -->
  <FilterBar
    courses={courseOptions}
    semesters={semesterOptions}
    {selectedCourse}
    {selectedSemester}
    on:filterChange={handleFilterChange}
  />

  <!-- Grid of cards -->
  {#if filteredNotes.length > 0}
    <div id="grid">
      {#each filteredNotes as note (note.id)}
        <!-- wrap in a clickable div so the parent handles the click -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="card-wrap" on:click={() => openPopup(note)}>
          <NoteCard {note} />
        </div>
      {/each}
    </div>
  {:else}
    <p id="no-results">
      {#if $searchQuery}
        No matching notes found for "<strong>{$searchQuery}</strong>".
      {:else}
        No notes match the selected filters.
      {/if}
    </p>
  {/if}

  <!-- Popup: IMPORTANT — pass prop as `note`, not `selectedNote` -->
  {#if selectedNote}
    <NoteDetailPopup open onclose={closePopup} note={selectedNote} />
  {/if}
</section>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  section#library {
    height: 100vh;
    width: 100%;
    margin: 7rem auto 6rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 0 1rem;

    #grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.2rem;
      width: 100%;
      max-width: 1200px;

      .card-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
    }

    #no-results {
      color: $color-text-secondary;
      font-size: 1.05rem;
      margin-top: 2rem;
      text-align: center;

      strong { color: $color-text; }
    }
  }
</style>