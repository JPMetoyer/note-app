<script lang="ts">
  import type { Note } from '$lib/types/notes';
  import { onMount } from 'svelte';

  export let open = false;
  export let note: Note;
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
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="overlay" on:mousedown={onOverlayClick}></div>

  <div id="popup" bind:this={modalEl} role="dialog" aria-modal="true" aria-label="Note details">
    <header id="popup-header">
      <div id="popup-title">
        <h2>{note.title}</h2>
        <div id="meta">
          <span>{note.course}</span>•
          <span>{note.semester} {note.year}</span>•
          {#if note.professor}<span>{note.professor}</span>•{/if}
          <span>
            <img src={note.uploader.avatar} alt={note.uploader.name} />
            {note.uploader.name}
          </span>
        </div>
      </div>
      <div id="actions">
        <a href={note.pdfUrl} target="_blank" rel="noopener">Download PDF</a>
        <button on:click={close}>✕</button>
      </div>
    </header>

    <main id="popup-body">
      <iframe id="pdf" src={note.pdfUrl} title={note.title}></iframe>

      <div id="viewer-actions">
        <div id="left-buttons">
          <button id="like">👍 Like</button>
          <button id="dislike">👎 Dislike</button>
        </div>
        <button id="save">💾 Save</button>
      </div>

      <section id="comments">
        <h3>Comments</h3>
        <div id="comment-box">
          <img src="/icons/profile.png" alt="User" />
          <textarea placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div id="comment-actions">
          <button>Post</button>
        </div>

        <ul id="comment-list">
          <li>
            <img src="/filler/taimur.jpeg" alt="Avatar" />
            <div>
              <p><strong>Taimur B</strong> • 2h ago</p>
              <p>Can someone please help me with this topic?</p>
            </div>
          </li>
          <li>
            <img src="/filler/carlos.jpeg" alt="Avatar" />
            <div>
              <p><strong>Carlos Mata</strong> • 1h ago</p>
              <p>Don't really understand this, when does Sanger Learning open?</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  #overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 9998;
  }

  #popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: min(1000px, 95vw);
    max-height: 90vh;
    background: #fff;
    border-radius: 0.75rem;
    border: 1px solid $color-border;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    #popup-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1rem;
      border-bottom: 1px solid $color-border;

      #popup-title {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        h2 {
          margin: 0;
          font-size: 1.3rem;
        }

        #meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          color: $color-text-secondary;
          font-size: 0.9rem;

          img {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
          }
        }
      }

      #actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        a {
          text-decoration: none;
          background: $color-primary;
          color: white;
          padding: 0.4rem 0.7rem;
          border-radius: 6px;

          &:hover {
            background: $color-primary-dark;
          }
        }

        button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }
      }
    }

    #popup-body {
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      #pdf {
        width: 100%;
        height: 500px;
        border: 1px solid $color-border;
        border-radius: 8px;
      }

      #viewer-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        #left-buttons {
          display: flex;
          gap: 0.5rem;

          button {
            border: 1px solid $color-border;
            background: #fff;
            border-radius: 6px;
            padding: 0.45rem 0.7rem;
            cursor: pointer;

            &:hover {
              background: #f3f7ff;
            }
          }
        }

        #save {
          border: 1px solid $color-border;
          background: #fff;
          border-radius: 6px;
          padding: 0.45rem 0.7rem;

          &:hover {
            background: #f3f7ff;
          }
        }
      }

      #comments {
        h3 {
          margin-bottom: 0.5rem;
        }

        #comment-box {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;

          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }

          textarea {
            width: 100%;
            resize: vertical;
            border: 1px solid $color-border;
            border-radius: 6px;
            padding: 0.5rem;
            font: inherit;

            &:focus {
              outline: none;
              border-color: $color-primary-dark;
              box-shadow: 0 0 0 2px rgba(92,176,246,.18);
            }
          }
        }

        #comment-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;

          button {
            background: $color-primary;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.45rem 0.8rem;
            cursor: pointer;

            &:hover {
              background: $color-primary-dark;
            }
          }
        }

        #comment-list {
          list-style: none;
          padding: 0;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;

          li {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;

            img {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
            }

            div {
              background: #f9fafc;
              border: 1px solid $color-border;
              border-radius: 6px;
              padding: 0.5rem 0.75rem;

              p {
                margin: 0;
                font-size: 0.9rem;
                color: $color-text;
              }

              strong {
                color: $color-text;
              }
            }
          }
        }
      }
    }
  }
</style>
