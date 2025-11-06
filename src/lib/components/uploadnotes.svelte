<script lang="ts">
  import { onMount } from 'svelte';

  let { open = false, onclose }: { open?: boolean; onclose?: (e: CustomEvent<void>) => void } = $props();
  // svelte-ignore non_reactive_update
    let container: HTMLDivElement | null = null;

  function close() {
    onclose?.(new CustomEvent('close'));
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }

  function onOverlayClick(e: MouseEvent) {
    if (!container) return;
    const t = e.target as Node;
    if (!container.contains(t)) close();
  }

  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function submit(e: Event) {
    e.preventDefault();
    close();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="upload-overlay" onmousedown={onOverlayClick}></div>

  <div bind:this={container} class="upload-modal" role="dialog" aria-modal="true" aria-label="Upload notes">
    <div class="header">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path
            fill-rule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
        Upload Notes
      </h2>
      <button type="button" aria-label="Close" onclick={close}>✕</button>
    </div>

    <p id="heading">Share notes with your fellow longhorns.</p>
    <form onsubmit={submit}>
      <div id="form-body">


        <label for="class">Title</label>
        <input type="text" name="" id="" placeholder="(e.g., MIS 301 - Lecture 5 Notes)" required />

        <!-- New responsive row: Semester, Professor, Course -->
        <div class="grid-row">
          <div class="field">
            <label for="semester">Semester</label>
            <select id="semester" name="semester" required>
              <option value="" selected disabled>Select</option>
              <option value="spring-2025">Spring '25</option>
              <option value="summer-2025">Summer '25</option>
              <option value="fall-2025">Fall '25</option>
            </select>
          </div>

          <div class="field">
            <label for="professor">Professor</label>
            <input type="text" id="professor" name="professor" placeholder="e.g., Dr. Johnson" />
          </div>

          <div class="field">
            <label for="course">Course</label>
            <input type="text" id="course" name="course" placeholder="e.g., MIS 301" />
          </div>
        </div>
        
         <label for="class">Description</label>
<textarea
  name="context"
  placeholder="Add any helpful context about these notes..."
  rows="5"
  required
></textarea>        

       

        <label for="file">File</label>
  <input
    type="file"
    id="file"
    name="file"
    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
    required
  />
  <span id="files">Supported: PDF, DOC, DOCX, TXT, PNG, JPG</span>
        

        <div class="actions">
          <button type="button" onclick={close}>Cancel</button>
          <button type="submit">Upload</button>
        </div>
      </div>
    </form>
  </div>
{/if}

<style lang="scss">

    @use '$lib/styles/variables' as *;

.upload-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 9998;
}

.upload-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: min(640px, 92vw);
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-height: min(85vh, 90dvh);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  * {
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }

  @media screen and (max-width: 450px) {
    width: 80vw;
    top: 55%;
    
  }


  #form-body {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 1rem;
      margin-bottom: .3rem;
      font-size: 15px;
    }
    
    input {
       
       border: 1px solid $color-primary;
       padding: .6rem .5rem .6rem .5rem;
       border-radius: 5px;

       &:focus {
        outline: none;
        border-color: $color-primary-dark;
        box-shadow: 0 0 0 2px rgba(92,176,246,.22);
       }
    }

    textarea {
        border: 1px solid $color-primary;
        border-radius: 7px;

        &:focus {
        outline: none;
        border-color: $color-primary-dark;
        box-shadow: 0 0 0 2px rgba(92,176,246,.22);
       }
    }

    #files {
        font-size: 13px;
        color:$color-text-secondary ;
        margin-top: 2px;
        margin-bottom: 3rem;
    }

    /* Responsive 3-up grid for semester/professor/course */
    .grid-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.75rem;

      .field {
        display: flex;
        flex-direction: column;
      }

      @media (max-width: 780px) {
        grid-template-columns: 1fr;
      }
    }

    /* Match select styling to inputs */
    select {
      border: 1px solid $color-primary;
      padding: .6rem .5rem .6rem .5rem;
      border-radius: 5px;
      background: #fff;

      &:focus {
        outline: none;
        border-color: $color-primary-dark;
        box-shadow: 0 0 0 2px rgba(92,176,246,.22);
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    h2 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $color-primary-dark;

      svg {
        width: 2rem;
        height: auto;
        color: $color-primary-dark;

      }
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }

    #heading {
        margin-top: 0;
        margin-bottom: 1rem;
        color: $color-text-secondary;
    }


}
</style>