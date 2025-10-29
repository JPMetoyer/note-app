<!-- No <script> block needed -->
<form class="search-form" role="search" aria-label="Global search" on:submit|preventDefault>
  <span class="icon" aria-hidden="true">🔍</span>
  <input
    class="input"
    type="search"
    placeholder="Search by class, professor, or topic…"
  />
</form>

<style lang="scss">
  /* if you have variables set up */
  @use '$lib/styles/variables' as *;

  .search-form {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    align-items: center;
    gap: .5rem;
    width: 100%;
    max-width: 640px;

    background: $color-bg;               /* e.g., #F9FBFF */
    border: 1px solid $color-border;     /* e.g., #E1E8F0 */
    border-radius: $radius-md;           /* e.g., 8px */
    padding: .55rem .7rem;
    box-shadow: $shadow-soft;

    &:focus-within {
      border-color: $color-primary-dark; /* e.g., #5CB0F6 */
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
    color: $color-text;                  /* e.g., #2E3440 */
    font: inherit;

    &::placeholder {
      color: $color-text-secondary;      /* e.g., #5C677D */
      opacity: .9;
    }
  }
</style>