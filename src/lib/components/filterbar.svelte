<script lang="ts">
  export let courses: string[] = [];
  export let semesters: string[] = [];
  export let selectedCourse: string = 'All Courses';
  export let selectedSemester: string = 'All Semesters';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function updateFilters() {
    dispatch('filterChange', {
      course: selectedCourse,
      semester: selectedSemester
    });
  }
</script>

<div id="filter-bar">
  <select bind:value={selectedCourse} on:change={updateFilters}>
    <option>All Courses</option>
    {#each courses as course}
      <option>{course}</option>
    {/each}
  </select>

  <select bind:value={selectedSemester} on:change={updateFilters}>
    <option>All Semesters</option>
    {#each semesters as sem}
      <option>{sem}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  #filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;

    select {
      padding: 0.5rem 0.75rem;
      border-radius: $radius-md;
      border: 1px solid $color-border;
      background: #fff;
      font: inherit;
      color: $color-text;
      cursor: pointer;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: $color-primary-dark;
      }

      &:focus {
        outline: none;
        border-color: $color-primary-dark;
        box-shadow: 0 0 0 2px rgba(92,176,246,.18);
      }
    }
  }
</style>