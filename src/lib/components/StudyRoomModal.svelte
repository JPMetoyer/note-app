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

  // purely cosmetic submit
  function send(e: Event) {
    e.preventDefault();
    // prototype only — no-op
  }
</script>

{#if open}
  <!-- Overlay -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="sr-overlay" on:mousedown={onOverlayClick}></div>

  <!-- Modal -->
  <div id="sr-modal" role="dialog" aria-modal="true" aria-label="Study room" bind:this={modalEl}>
    <!-- Header -->
    <header id="sr-header">
      <div class="title">
        <h2>CS 303E – Week 3 Study Room</h2>
        <p class="meta">Fall 2025 • Recursion & Data Structures</p>
      </div>

      <div class="members" aria-label="Members">
        <!-- Use the same avatar for demo -->
        <img src="/icons/profile.png" alt="" />
        <img src="/icons/profile.png" alt="" />
        <img src="/icons/profile.png" alt="" />
        <span class="count">+5</span>
      </div>

      <button id="close" aria-label="Close" on:click={close}>✕</button>
    </header>

    <!-- Body -->
    <div id="sr-body">
      <!-- Main: Chat -->
      <section id="chat">
        <ul id="thread" aria-label="Conversation">
          <!-- Example messages -->
          <li class="msg other">
            <img class="avatar" src="/icons/profile.png" alt="" />
            <div class="bubble">
              <div class="head"><span class="name">Chloe</span><span class="time">2:04 PM</span></div>
              <p>Does anyone have a clean example of tail recursion vs non-tail?</p>
            </div>
          </li>

          <li class="msg me">
            <img class="avatar" src="/icons/profile.png" alt="" />
            <div class="bubble">
              <div class="head"><span class="name">You</span><span class="time">2:05 PM</span></div>
              <p>I added a page in the shared notes with stack/queue practice. Check “Recursion patterns”.</p>
            </div>
          </li>

          <li class="msg other">
            <img class="avatar" src="/icons/profile.png" alt="" />
            <div class="bubble">
              <div class="head"><span class="name">David</span><span class="time">2:06 PM</span></div>
              <p>Also look at the AI summary bullets — they call out the base case rules.</p>
            </div>
          </li>
        </ul>

        <!-- Composer -->
        <form id="composer" on:submit={send}>
          <input type="text" placeholder="Message the group…" required />
          <button type="submit">Send</button>
        </form>
      </section>

      <!-- Side: Shared Notes -->
      <aside id="panel">
        <h3>Shared Notes</h3>

        <ul class="notes">
          <li class="note">
            <div class="meta">
              <span class="title">Week 3 – Data Structures</span>
              <span class="by">Shared by Akshay</span>
            </div>
            <a href="/filler/tribune.pdf" target="_blank" rel="noopener" class="cta">Open</a>
          </li>

          <li class="note">
            <div class="meta">
              <span class="title">Recursion Patterns</span>
              <span class="by">Shared by Chloe</span>
            </div>
            <a href="/filler/tribune.pdf" target="_blank" rel="noopener" class="cta">Open</a>
          </li>

          <li class="note">
            <div class="meta">
              <span class="title">Big-O Quick Sheet</span>
              <span class="by">Shared by David</span>
            </div>
            <a href="/filler/tribune.pdf" target="_blank" rel="noopener" class="cta">Open</a>
          </li>
        </ul>

        <div class="pro">
          <h4>AI Summary (Pro)</h4>
          <p class="muted">Auto key takeaways from shared notes:</p>
          <ul class="bullets">
            <li>Stack vs queue use-cases</li>
            <li>Base case design rules</li>
            <li>Runtime notes for push/pop</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  /* Overlay */
  #sr-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.35);
    z-index: 9998;
  }

  /* Modal container */
  #sr-modal {
    position: fixed;
    inset: 6vh 50% auto auto;
    transform: translateX(50%);
    z-index: 9999;
    width: min(1100px, 96vw);
    max-height: min(88vh, 92dvh);
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid $color-border;
    border-radius: 14px;
    box-shadow: 0 12px 28px rgba(0,0,0,.12);
    overflow: hidden;

    @media (max-width: 720px) {
      inset: 4vh 50% auto auto;
    }
  }

  /* Header */
  #sr-header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: .6rem;
    padding: .9rem 1rem;
    border-bottom: 1px solid $color-border;
    background: #fff;

    .title {
      h2 { margin: 0; font-size: 1.15rem; color: $color-text; }
      .meta { margin: 0; color: $color-text-secondary; font-size: .92rem; }
    }

    .members {
      display: inline-flex; align-items: center; gap: .35rem;
      img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid $color-border; }
      .count { font-size: .9rem; color: $color-text-secondary; }
    }

    #close {
      background: none; border: 1px solid $color-border; border-radius: 8px;
      padding: .25rem .55rem; cursor: pointer; color: $color-text;
      &:hover { background: #E9F4FF; color: $color-primary-dark; }
    }

    @media (max-width: 540px) {
      grid-template-columns: 1fr auto;
      .members { display: none; }
    }
  }

  /* Body layout */
  #sr-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    padding: 1rem;
    overflow: auto;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  /* Chat */
  #chat {
    display: grid;
    grid-template-rows: 1fr auto; /* thread scrolls, composer sticks */
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: #fff;
    box-shadow: 0 6px 16px rgba(0,0,0,.05);
    min-height: 380px;
    overflow: hidden;

    #thread {
      margin: 0; padding: .8rem; list-style: none;
      display: grid; gap: .6rem; overflow: auto;

      .msg {
        display: grid; grid-template-columns: auto 1fr; gap: .5rem; align-items: flex-start;

        &.me   .bubble { background: #F7FAFF; border-color: #DDE9F7; }
        &.other .bubble { background: #fff; border-color: $color-border; }

        .avatar {
          width: 32px; height: 32px; border-radius: 50%; object-fit: cover; background: #F0F4FA;
        }

        .bubble {
          border: 1px solid $color-border; border-radius: $radius-md; padding: .55rem .65rem;

          .head {
            display: flex; gap: .5rem; align-items: baseline; margin-bottom: .15rem;
            .name { font-weight: 700; color: $color-text; }
            .time { font-size: .85rem; color: $color-text-secondary; }
          }

          p { margin: 0; color: $color-text; }
        }
      }
    }

    #composer {
      display: grid; grid-template-columns: 1fr auto; gap: .5rem;
      padding: .6rem; border-top: 1px solid $color-border; background: #fff;

      input {
        border: 1px solid $color-border; border-radius: $radius-md; padding: .6rem .7rem; font: inherit;
        &:focus { outline: none; border-color: $color-primary-dark; box-shadow: 0 0 0 2px rgba(92,176,246,.18); }
      }

      button {
        padding: .55rem .9rem; border-radius: $radius-md; border: 1px solid $color-border;
        background: $color-primary; color: #fff; font-weight: 700; cursor: pointer;
        &:hover { background: $color-primary-dark; border-color: $color-primary-dark; }
      }
    }
  }

  /* Right Panel */
  #panel {
    display: grid; gap: .8rem; align-content: start;

    h3 { margin: 0; color: $color-text; }

    .notes {
      margin: 0; padding: 0; list-style: none; display: grid; gap: .6rem;

      .note {
        display: grid; grid-template-columns: 1fr auto; gap: .5rem; align-items: center;
        border: 1px solid $color-border; border-radius: $radius-md; background: #fff;
        box-shadow: 0 6px 16px rgba(0,0,0,.05); padding: .6rem .7rem;

        .meta {
          display: grid; gap: .15rem;
          .title { font-weight: 700; color: $color-text; }
          .by    { font-size: .9rem; color: $color-text-secondary; }
        }

        .cta {
          text-decoration: none; padding: .4rem .6rem; border-radius: $radius-md; border: 1px solid $color-border;
          background: #fff; color: $color-primary-dark; font-weight: 700;
          &:hover { background: #E9F4FF; }
        }
      }
    }

    .pro {
      border: 1px solid $color-border; border-radius: $radius-md; background: #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,.05); padding: .8rem;

      h4 { margin: 0 0 .25rem 0; color: $color-primary-dark; }
      .muted { color: $color-text-secondary; margin-bottom: .35rem; }
      .bullets { margin: 0; padding-left: 1rem; color: $color-text; }
    }
  }
</style>