<script lang="ts">
  import { onMount } from 'svelte';

  export let open = false;
  export let onclose: ((e: CustomEvent<void>) => void) | undefined;

  let modalEl: HTMLDivElement | null = null;

  function close() {
    onclose?.(new CustomEvent('close'));
  }

  function onOverlayClick(e: MouseEvent) {
    if (!modalEl) return;
    const t = e.target as Node;
    if (!modalEl.contains(t)) close();
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function createGroup(e: Event) {
    e.preventDefault();
    // prototype-only — pretend we created & copied a link
    close();
  }
</script>

{#if open}
  <!-- Overlay -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="sg-overlay" on:mousedown={onOverlayClick}></div>

  <!-- Modal -->
  <div id="sg-modal" role="dialog" aria-modal="true" aria-label="Create study group" bind:this={modalEl}>
    <header id="sg-header">
      <h2>Create a Study Group</h2>
      <button id="sg-close" aria-label="Close modal" on:click={close}>✕</button>
    </header>

    <form id="sg-form" on:submit={createGroup}>
      <div class="row">
        <label>
          Group name
          <input type="text" placeholder="CS 303E – Week 3 Review" required />
        </label>

        <label>
          Course
          <input type="text" placeholder="CS 303E" required />
        </label>
      </div>

      <div class="row">
        <label>
          Semester
          <select required>
            <option value="" disabled selected>Select a semester</option>
            <option>Spring 2025</option>
            <option>Fall 2025</option>
            <option>Spring 2026</option>
          </select>
        </label>

        <label>
          Visibility
          <select>
            <option>Invite-only</option>
            <option>My class only</option>
            <option>Public</option>
          </select>
        </label>
      </div>

      <label>
        Invite by email
        <input type="text" placeholder="netid@university.edu, friend@university.edu" />
        <span class="hint">Comma-separated .edu addresses</span>
      </label>

      <label>
        Message (optional)
        <textarea rows="3" placeholder="Hey! Join my study group for the Week 3 review."></textarea>
      </label>

      <div id="sg-actions">
        <button type="button" class="btn ghost" on:click={close}>Cancel</button>
        <button type="submit" class="btn primary">Create & Copy Link</button>
      </div>
    </form>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  #sg-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.35);
    z-index: 9998;
  }

  #sg-modal {
    position: fixed;
    inset: 8vh 50% auto auto;
    transform: translateX(50%);
    z-index: 9999;
    width: min(760px, 96vw);
    max-height: min(84vh, 92dvh);
    background: #fff;
    border: 1px solid $color-border;
    border-radius: 14px;
    box-shadow: 0 12px 28px rgba(0,0,0,.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 540px) {
      inset: 6vh 50% auto auto;
    }
  }

  #sg-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1rem .8rem 1rem;
    border-bottom: 1px solid $color-border;
    h2 { margin: 0; font-size: 1.25rem; color: $color-text; }
    #sg-close {
      background: none; border: none; cursor: pointer; font-size: 1.2rem; color: $color-text;
    }
  }

  #sg-form {
    padding: 1rem;
    overflow: auto;
    display: grid;
    gap: .8rem;

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .6rem;

      @media (max-width: 580px) { grid-template-columns: 1fr; }
    }

    label {
      display: grid; gap: .35rem; color: $color-text;

      input, select, textarea {
        padding: .65rem .75rem;
        border: 1px solid $color-border;
        border-radius: $radius-md;
        font: inherit;
        background: #fff;

        &:focus {
          outline: none;
          border-color: $color-primary-dark;
          box-shadow: 0 0 0 3px rgba(92,176,246,.16);
        }
      }

      .hint { font-size: .85rem; color: $color-text-secondary; }
    }

    #sg-actions {
      display: flex; justify-content: flex-end; gap: .5rem; margin-top: .4rem;

      .btn {
        padding: .55rem .85rem;
        border-radius: $radius-md;
        border: 1px solid $color-border;
        background: #fff;
        cursor: pointer;
        font-weight: 700;

        &.ghost:hover {
          background: #E9F4FF;
          color: $color-primary-dark;
        }

        &.primary {
          background: $color-primary;
          border-color: $color-primary;
          color: #fff;

          &:hover {
            background: $color-primary-dark;
            border-color: $color-primary-dark;
          }
        }
      }
    }
  }
</style>