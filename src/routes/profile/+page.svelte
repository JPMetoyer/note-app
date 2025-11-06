<script lang="ts">
  import NoteCard from '$lib/components/notecard.svelte';
  import NoteDetailPopup from '$lib/components/NoteDetailPopup.svelte';
  import StudyGroupModal from '$lib/components/StudyGroupModal.svelte';
  import StudyRoomModal from '$lib/components/StudyRoomModal.svelte';
  import type { Note } from '$lib/types/notes';

  // --- Fake "logged-in" user (demo) ---
  const user = {
    name: 'Akshay Patel',
    university: 'UT Austin 🤠',
    tier: 'Campus Pro' as 'Starter' | 'Student Plus' | 'Campus Pro',
    avatar: '/filler/akshay.jpeg'
  };

  // --- Mock notes ---
  const myNotes: Note[] = [
    {
      id: 101,
      title: 'Week 3 – Data Structures',
      description: 'Stack vs Queue quick reference + practice prompts.',
      course: 'CS 303E',
      semester: 'Fall',
      year: '2025',
      professor: 'Dr. Johnson',
      pages: 8,
      pdfUrl: '/filler/tribune.pdf',
      uploader: { name: user.name, avatar: user.avatar }
    },
    {
      id: 102,
      title: 'Midterm Review – Recursion',
      description: 'Tail recursion patterns + tracing walkthroughs.',
      course: 'CS 303E',
      semester: 'Fall',
      year: '2025',
      professor: 'Dr. Johnson',
      pages: 6,
      pdfUrl: '/filler/tribune.pdf',
      uploader: { name: user.name, avatar: user.avatar }
    }
  ];

  const savedNotes: Note[] = [
    {
      id: 201,
      title: 'Probability Cheatsheet',
      description: 'Distributions, expectation, variance—1-pager.',
      course: 'M 362K',
      semester: 'Spring',
      year: '2025',
      professor: 'Prof. Nguyen',
      pages: 3,
      pdfUrl: '/filler/tribune.pdf',
      uploader: { name: 'Jordan Kim', avatar: '/filler/akshay.jpeg' }
    },
    {
      id: 202,
      title: 'Linear Algebra – Eigenvalues',
      description: 'Step-by-step eigenvalue/eigenvector problems.',
      course: 'M 341',
      semester: 'Fall',
      year: '2025',
      professor: 'Dr. Chen',
      pages: 5,
      pdfUrl: '/filler/tribune.pdf',
      uploader: { name: 'Riley Chen', avatar: '/filler/akshay.jpeg' }
    }
  ];

  // --- Tab + popup state ---
  type Tab = 'notes' | 'saved' | 'stats';
  let tab: Tab = 'notes';

  let selectedNote: Note | null = null;
  function openPopup(n: Note) { selectedNote = n; }
  function closePopup() { selectedNote = null; }

  // Study group modal
  let sgOpen = false;
  let roomOpen = false;
</script>

<section id="profile">
  <!-- Header -->
  <header id="p-head">
    <div id="user">
      <img class="avatar" src={user.avatar} alt="" />
      <div class="meta">
        <h1 class="name">{user.name}</h1>
        <p class="uni">{user.university}</p>
        <div class="chips">
          <span class="chip tier {user.tier === 'Campus Pro' ? 'pro' : user.tier === 'Student Plus' ? 'plus' : 'starter'}">
            {user.tier}
          </span>
          <span class="chip">Uploads: {myNotes.length}</span>
          <span class="chip">Saved: {savedNotes.length}</span>
        </div>
      </div>
    </div>

    <div id="actions">
      <button class="btn ghost">Edit Profile</button>
    </div>
  </header>

  <!-- Tabs -->
  <nav id="tabs" role="tablist" aria-label="Profile sections">
    <button class="tab" class:active={tab === 'notes'} on:click={() => (tab = 'notes')}>My Notes</button>
    <button class="tab" class:active={tab === 'saved'} on:click={() => (tab = 'saved')}>Saved</button>
    <button class="tab" class:active={tab === 'stats'} on:click={() => (tab = 'stats')}>Stats</button>
  </nav>

  <!-- Body -->
  <div id="body">
    {#if tab === 'notes'}
      {#if myNotes.length}
        <div class="grid">
          {#each myNotes as note (note.id)}
            <div class="wrap" on:click={() => openPopup(note)}><NoteCard {note} /></div>
          {/each}
        </div>
      {:else}
        <p class="empty">No uploads yet. <a href="/" on:click|preventDefault>Upload your first note</a>.</p>
      {/if}
    {:else if tab === 'saved'}
      {#if savedNotes.length}
        <div class="grid">
          {#each savedNotes as note (note.id)}
            <div class="wrap" on:click={() => openPopup(note)}><NoteCard {note} /></div>
          {/each}
        </div>
      {:else}
        <p class="empty">Nothing saved yet. Browse the <a href="/library">library</a>.</p>
      {/if}
    {:else}
      <!-- Stats (Pro perks preview) -->
      <section id="stats">
        <div class="kpis">
          <div class="kpi">
            <h3>Views (7d)</h3>
            <p class="num">124</p>
            <span class="muted">+18% vs last week</span>
          </div>
          <div class="kpi">
            <h3>Upvotes (7d)</h3>
            <p class="num">46</p>
            <span class="muted">Top 10% in CS 303E</span>
          </div>
          <div class="kpi">
            <h3>Saves (all-time)</h3>
            <p class="num">89</p>
            <span class="muted">From 37 classmates</span>
          </div>
        </div>

        <div class="pro-cards">
          <article class="card pro">
            <h4>AI Summary (Pro)</h4>
            <p class="muted">Auto-generated study points from your latest upload.</p>
            <ul>
              <li>• Compare stack vs queue use-cases</li>
              <li>• Trace recursion base case patterns</li>
              <li>• Big-O reminders for core ops</li>
            </ul>
          </article>

          <article class="card pro">
            <h4>Collaboration Mode (Pro)</h4>
            <p class="muted">Create a study group link and share comments privately.</p>
            <button class="btn" on:click={() => (sgOpen = true)}>Invite Study Group</button>
            <button class="btn" on:click={() => (roomOpen = true)}>Open Study Room</button>
          </article>
        </div>
      </section>
    {/if}
  </div>

  {#if selectedNote}
    <NoteDetailPopup open onclose={closePopup} note={selectedNote} />
  {/if}

  <StudyGroupModal open={sgOpen} onclose={() => (sgOpen = false)} />
  <StudyRoomModal open={roomOpen} onclose={() => (roomOpen = false)} />
</section>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  section#profile {
    width: 100%;
    max-width: 1100px;
    margin: 7rem auto 6rem auto;
    padding: 0 1rem;
    display: grid;
    gap: 1rem;
  }

  #p-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #fff;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    box-shadow: 0 6px 16px rgba(0,0,0,.05);

    #user {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: .9rem;
      align-items: center;

      .avatar {
        width: 64px; height: 64px; border-radius: 50%; object-fit: cover;
      }

      .meta {
        display: grid; gap: .25rem;

        .name { margin: 0; font-weight: 900; font-size: 1.4rem; color: $color-text; }
        .uni  { margin: 0; color: $color-text-secondary; }

        .chips {
          display: flex; flex-wrap: wrap; gap: .35rem;

          .chip {
            display: inline-flex; align-items: center;
            padding: .2rem .55rem; border-radius: 999px; border: 1px solid $color-border;
            background: #fff; color: $color-text; font-size: .85rem;

            &.plus    { background: #EEF6FF; border-color: #D6E9FF; color: $color-primary-dark; }
            &.pro     { background: #FFF4E5; border-color: #FFD9A6; color: #B86500; }
            &.starter { background: #F4F7FA; border-color: #E3EAF2; color: $color-text; }
          }
        }
      }
    }

    #actions .btn {
      padding: .55rem .85rem;
      border: 1px solid $color-border;
      border-radius: $radius-md;
      background: #fff;
      cursor: pointer;

      &.ghost:hover { background: #E9F4FF; color: $color-primary-dark; }
    }
  }

  #tabs {
    display: inline-flex;
    gap: .35rem;
    padding: .35rem;
    background: #F9FBFF;
    border: 1px solid $color-border;
    border-radius: 999px;

    .tab {
      padding: .5rem .8rem;
      border-radius: 999px;
      border: 1px solid transparent;
      background: transparent;
      font-weight: 700;
      cursor: pointer;
      color: $color-text;

      &:hover { border-color: $color-border; }
      &.active {
        background: #fff;
        border-color: $color-border;
        color: $color-primary-dark;
        box-shadow: 0 3px 8px rgba(0,0,0,.06);
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    .wrap { display: flex; justify-content: center; cursor: pointer; }
  }

  .empty {
    color: $color-text-secondary;
    a { color: $color-primary-dark; text-decoration: none; font-weight: 700; }
  }

  #stats {
    display: grid; gap: 1rem;

    .kpis {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem;

      .kpi {
        border: 1px solid $color-border; border-radius: $radius-md; background: #fff;
        box-shadow: 0 6px 16px rgba(0,0,0,.05);
        padding: .9rem;
        h3 { margin: 0 0 .25rem 0; color: $color-text; }
        .num { margin: .2rem 0; font-weight: 900; font-size: 1.6rem; color: $color-text; }
        .muted { color: $color-text-secondary; font-size: .9rem; }
      }
    }

    .pro-cards {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: .75rem;

      .card {
        border: 1px solid $color-border; border-radius: $radius-md; background: #fff;
        box-shadow: 0 6px 16px rgba(0,0,0,.05);
        padding: .9rem;

        &.pro h4 { color: $color-primary-dark; }
        .muted { color: $color-text-secondary; margin: .25rem 0 .5rem; }
        .btn {
          margin-top: .35rem; padding: .5rem .75rem; border-radius: $radius-md;
          border: 1px solid $color-border; background: #fff; cursor: pointer;
          &:hover { background: #E9F4FF; color: $color-primary-dark; }
        }
      }
    }
  }

  @media (max-width: 820px) {
    #p-head { flex-direction: column; align-items: stretch; }
    #stats .kpis { grid-template-columns: 1fr; }
    #stats .pro-cards { grid-template-columns: 1fr; }
  }
</style>