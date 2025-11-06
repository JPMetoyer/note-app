<script lang="ts">
  import { goto } from '$app/navigation';
  let query = '';

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (query.trim() !== '') {
      goto(`/library?search=${encodeURIComponent(query.trim())}`);
      query = '';
    }
  }
</script>

<form class="search-form" role="search" aria-label="Global search" on:submit={handleSubmit}>
  <span class="icon" aria-hidden="true">🔍</span>
  <input
    class="input"
    type="search"
    placeholder="Search by class, professor, or topic…"
    bind:value={query}
  />
</form>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .search-form {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    align-items: center;
    gap: .5rem;
    width: 100%;
    max-width: 640px;

    background: $color-bg;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    padding: .55rem .7rem;
    box-shadow: $shadow-soft;
    transition: all 0.2s ease;

    &:focus-within {
      border-color: $color-primary-dark;
      box-shadow: 0 0 0 2px rgba(92,176,246,.22);
      background: #fff;
    }
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: .7;
    font-size: .95rem;
    user-select: none;
  }

  .input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: $color-text;
    font: inherit;

    &::placeholder {
      color: $color-text-secondary;
      opacity: .9;
    }
  }
</style>