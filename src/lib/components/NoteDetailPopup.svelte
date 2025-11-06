<script lang="ts">
  import type { Note } from '$lib/types/notes';
  import { onMount } from 'svelte';

  export let open = false;
  export let note: Note;
  export let onclose: ((e: CustomEvent<void>) => void) | undefined;

  let modalEl: HTMLDivElement | null = null;
  let pdfLoaded = false;

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

  function onPdfLoad() {
    pdfLoaded = true;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="ndp-overlay" on:mousedown={onOverlayClick}></div>

  <div id="ndp" bind:this={modalEl} role="dialog" aria-modal="true" aria-label="Note details">
    <!-- Sticky header -->
    <header id="ndp-header">
      <div id="title-block">
        <h2>{note.title}</h2>
        <div id="meta">
          <span class="chip">{note.course}</span>
          <span class="chip">{note.semester} {note.year}</span>
          {#if note.professor}<span class="chip">{note.professor}</span>{/if}
          <span class="chip user">
            <img src={note.uploader.avatar} alt={note.uploader.name} />
            {note.uploader.name}
          </span>
        </div>
      </div>

      <div id="actions">
        <a href={note.pdfUrl} target="_blank" rel="noopener">Download PDF</a>
        <button on:click={close} aria-label="Close">✕</button>
      </div>
    </header>

    <!-- Body (scrolls) -->
    <div id="ndp-body">
      <!-- Layout splits on wide screens -->
      <section id="main">
        <!-- PDF viewer with skeleton -->
        <div id="viewer-wrap" class:loaded={pdfLoaded}>
          {#if !pdfLoaded}
            <div id="pdf-skeleton" aria-hidden="true">
              <div class="bar bar1"></div>
              <div class="bar bar2"></div>
              <div class="bar bar3"></div>
            </div>
          {/if}

          <iframe
            id="pdf"
            src={note.pdfUrl}
            title={note.title}
            on:load={onPdfLoad}
          ></iframe>
        </div>

        <!-- Primary actions -->
        <div id="viewer-actions">
          <div id="left">
            <button class="btn ghost">👍 Like</button>
            <button class="btn ghost">👎 Dislike</button>
          </div>
          <div id="right">
            <button class="btn">💾 Save</button>
          </div>
        </div>

        <!-- Comments (stay under the viewer, as you wanted) -->
        <section id="comments">
          <h3>Comments</h3>

          <div id="composer">
            <img src="/icons/profile.png" alt="User" />
            <textarea placeholder="Write a comment…" rows="3"></textarea>
          </div>
          <div id="composer-actions">
            <button class="btn primary">Post</button>
          </div>

          <ul id="thread">
            <li class="comment">
              <img class="avatar" src="/filler/taimur.jpeg" alt="" />
              <div class="bubble">
                <div class="head"><strong>Taimur B</strong><span class="time"> • 2h ago</span></div>
                <p>Can someone please help me with this topic?</p>
              </div>
            </li>
            <li class="comment">
              <img class="avatar" src="/filler/carlos.jpeg" alt="" />
              <div class="bubble">
                <div class="head"><strong>Carlos Mata</strong><span class="time"> • 1h ago</span></div>
                <p>Don't really understand this, when does Sanger Learning open?</p>
              </div>
            </li>
          </ul>
        </section>
      </section>

      <!-- Right rail with “fake AI” + insights (stacks under on mobile) -->
      <aside id="side">
        <article class="card ai">
          <h4>AI Summary <span class="badge">Pro</span></h4>
          <ul class="bullets">
            <li>Distinguishes stack (LIFO) vs queue (FIFO) use-cases with quick examples.</li>
            <li>Flags common recursion pitfalls (missing base case, duplicate work).</li>
            <li>Highlights Big-O for push/pop/enqueue/dequeue operations.</li>
          </ul>
          <button class="btn ghost small">See full summary</button>
        </article>

        <article class="card insights">
          <h4>Quick Insights</h4>
          <ul class="kpis">
            <li><span class="k">Est. read</span><span class="v">6–8 min</span></li>
            <li><span class="k">Pages</span><span class="v">{note.pages}</span></li>
            <li><span class="k">Saves</span><span class="v">89</span></li>
            <li><span class="k">Upvotes</span><span class="v">46</span></li>
          </ul>
          <div class="tags">
            <span class="tag">data structures</span>
            <span class="tag">recursion</span>
            <span class="tag">big-o</span>
          </div>
        </article>

        <article class="card tips">
          <h4>Study Tips</h4>
          <p class="muted">Try the “Teach-Back” method: explain stack vs queue with your own example.</p>
          <button class="btn small">Start a study room</button>
        </article>
      </aside>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  /* Overlay */
  #ndp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.35);
    z-index: 9998;
  }

  /* Container */
  #ndp {
    position: fixed;
    inset: 6vh 50% auto auto;
    transform: translateX(50%);
    z-index: 9999;
    width: min(1120px, 96vw);
    max-height: min(88vh, 92dvh);
    background: #fff;
    border: 1px solid $color-border;
    border-radius: 14px;
    box-shadow: 0 12px 28px rgba(0,0,0,.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 640px) {
      inset: 4vh 50% auto auto;
      width: 96vw;
    }
  }

  /* Header */
  #ndp-header {
    position: sticky; top: 0; z-index: 1;
    display: flex; align-items: flex-start; justify-content: space-between; gap: .75rem;
    padding: 1rem 1rem .85rem;
    background: #fff;
    border-bottom: 1px solid $color-border;

    #title-block {
      display: grid; gap: .4rem;

      h2 { margin: 0; font-size: 1.15rem; color: $color-text; }

      #meta {
        display: flex; flex-wrap: wrap; gap: .4rem;

        .chip {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .22rem .55rem; border-radius: 999px;
          border: 1px solid $color-border; background: #F9FBFF;
          font-size: .82rem; color: $color-text;

          &.user {
            background: #fff;
            img { width: 1.1rem; height: 1.1rem; border-radius: 50%; }
          }
        }
      }
    }

    #actions {
      display: inline-flex; gap: .5rem; align-items: center;

      a {
        text-decoration: none; padding: .45rem .75rem; border: 1px solid $color-border;
        border-radius: $radius-md; background: #fff; color: $color-primary-dark;
        &:hover { background: #E9F4FF; }
      }
      button {
        background: none; border: none; cursor: pointer; font-size: 1.2rem; color: $color-text;
      }
    }
  }

  /* Body layout */
  #ndp-body {
    overflow: auto; -webkit-overflow-scrolling: touch;
    display: grid; gap: 1rem; padding: 1rem;
    grid-template-columns: 2fr 1fr;

    @media (max-width: 980px) {
      grid-template-columns: 1fr;
    }
  }

  /* Main column */
  #main {
    display: grid; gap: .8rem;

    #viewer-wrap {
      position: relative;
      border: 1px solid $color-border; border-radius: $radius-md;
      background: #F7FAFF; overflow: hidden;

      #pdf {
        width: 100%;
        height: min(62vh, 640px);
        border: 0;
        display: block;
      }

      /* Lightweight skeleton while iframe “loads” */
      #pdf-skeleton {
        position: absolute; inset: 0; padding: .9rem; background: linear-gradient(180deg, #f5f9ff, #eef4fb);
        display: grid; gap: .6rem;

        .bar {
          height: 12px; border-radius: 6px; background: #e6eef8; overflow: hidden;
        }
        .bar1 { width: 85%; }
        .bar2 { width: 92%; }
        .bar3 { width: 70%; }

        /* pulse */
        .bar::after {
          content: ""; display: block; height: 100%;
          transform: translateX(-100%); animation: shimmer 1.2s infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent);
        }
      }

      &.loaded #pdf-skeleton { display: none; }
    }

    #viewer-actions {
      display: flex; justify-content: space-between; align-items: center; gap: .5rem; flex-wrap: wrap;

      .btn {
        padding: .45rem .75rem; border-radius: $radius-md; border: 1px solid $color-border; background: #fff; cursor: pointer;
        font-weight: 700; color: $color-text;

        &.ghost:hover { background: #E9F4FF; color: $color-primary-dark; }
      }
    }

    /* Comments */
    #comments {
      display: grid; gap: .6rem;

      h3 { margin: .25rem 0; color: $color-text; }

      #composer {
        display: grid; grid-template-columns: auto 1fr; gap: .6rem; align-items: flex-start;

        img { width: 2rem; height: 2rem; border-radius: 50%; }

        textarea {
          width: 100%; min-height: 86px; resize: vertical;
          border: 1px solid $color-border; border-radius: $radius-md; padding: .6rem .7rem; font: inherit;
          &:focus { outline: none; border-color: $color-primary-dark; box-shadow: 0 0 0 2px rgba(92,176,246,.18); }
        }
      }

      #composer-actions {
        display: flex; justify-content: flex-end;

        .btn.primary {
          padding: .5rem .8rem; border-radius: $radius-md; border: 1px solid $color-primary;
          background: $color-primary; color: #fff; font-weight: 800; cursor: pointer;
          &:hover { background: $color-primary-dark; border-color: $color-primary-dark; }
        }
      }

      #thread {
        list-style: none; padding: 0; margin: 0; display: grid; gap: .6rem;

        .comment {
          display: grid; grid-template-columns: auto 1fr; gap: .6rem;

          .avatar { width: 2rem; height: 2rem; border-radius: 50%; object-fit: cover; background: #F0F4FA; }

          .bubble {
            border: 1px solid $color-border; border-radius: $radius-md; padding: .55rem .65rem; background: #fff;

            .head { display: flex; gap: .4rem; align-items: baseline; color: $color-text; }
            .time { font-size: .85rem; color: $color-text-secondary; }
            p { margin: .15rem 0 0; color: $color-text; }
          }
        }
      }
    }
  }

  /* Right rail */
  #side {
    display: grid; gap: .75rem; align-content: start;

    .card {
      border: 1px solid $color-border; border-radius: $radius-md; background: #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,.05); padding: .85rem;

      h4 { margin: 0 0 .35rem 0; color: $color-text; display: flex; align-items: center; gap: .4rem; }

      .badge {
        font-size: .75rem; font-weight: 800; color: #B86500; background: #FFF4E5;
        border: 1px solid #FFD9A6; padding: .08rem .4rem; border-radius: 999px;
      }

      .muted { color: $color-text-secondary; }
      .bullets { margin: 0; padding-left: 1rem; color: $color-text; display: grid; gap: .25rem; }

      .kpis {
        list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: .5rem;
        li {
          display: flex; justify-content: space-between; padding: .4rem .55rem; border: 1px dashed $color-border;
          border-radius: 8px; background: #F9FBFF;
          .k { color: $color-text-secondary; }
          .v { font-weight: 800; color: $color-text; }
        }
      }

      .tags {
        display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .5rem;
        .tag {
          padding: .15rem .5rem; border-radius: 999px; border: 1px solid $color-border; background: #fff;
          color: $color-text-secondary; font-size: .82rem;
        }
      }

      .btn.small { padding: .4rem .65rem; font-weight: 700; border: 1px solid $color-border; border-radius: $radius-md; background: #fff; cursor: pointer;
        &:hover { background: #E9F4FF; color: $color-primary-dark; }
      }
    }
  }

  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
</style>