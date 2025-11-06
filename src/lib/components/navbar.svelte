<script lang="ts">
  import Searchbar from "./searchbar.svelte";
  import Profilepopup from "./profilepopup.svelte";
let profileOpen = false;


  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

    import UploadNotesModal from "../components/uploadnotes.svelte";
  let uploadOpen = false;



</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<nav>
  <a href="/" id="logo">Nota.</a>

  <!-- Center Search -->
  <div class="center">
    <Searchbar />
  </div>

  <!-- Right Section -->
  <div id="right">
    <div id="links">
      <a href="/" on:click|preventDefault={() => (uploadOpen = true)}>Upload Notes</a>
      <a href="/library">Library</a>
      <a href="/">Leaderboard</a>
    </div>

    <button class="avatar-btn" aria-label="Profile" on:click={() => (profileOpen = !profileOpen)}>
      <img src="/icons/profile.png" alt="profile icon" />
    </button>

      <Profilepopup open={profileOpen} />

    <!-- Burger Menu Button -->
    <button
      class="burger"
      aria-label="Open menu"
      aria-controls="mobile-menu"
      aria-expanded={menuOpen}
      on:click={toggleMenu}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
        <path
          fill-rule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</nav>

<UploadNotesModal open={uploadOpen} onclose={() => (uploadOpen = false)} />



<!-- Overlay -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class:overlay-open={menuOpen} class="overlay" on:click={closeMenu}></div>

<!-- Mobile Drawer -->
<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<aside
  id="mobile-menu"
  class="drawer"
  class:open={menuOpen}
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation"
>
  <header class="drawer-header">
    <span class="brand">Nota.</span>
    <button class="close" aria-label="Close menu" on:click={closeMenu}>✕</button>
  </header>

  <div class="drawer-content">
    <a href="/" on:click={closeMenu} on:click|preventDefault={() => (uploadOpen = true)}>Upload Notes</a>
    <a href="/library" on:click={closeMenu}>Library</a>
    <a href="/" on:click={closeMenu}>Leaderboard</a>
    <hr />
    <a href="/" on:click={closeMenu}>Profile</a>
    <a href="/" on:click={closeMenu}>Settings</a>
  </div>
</aside>

<style lang="scss">
  @use '../../lib/styles/variables.scss' as *;

  /* ===== NAVBAR BASE ===== */
  nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 0.6rem 1rem 0.6rem 1.7rem;
    background: $color-surface;
    border-bottom: 1px solid $color-border;
    gap: 1rem;

    #logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: $color-primary-dark;
      text-decoration: none;
      white-space: nowrap;
    }

    .center {
      flex: 1 1 520px;
      min-width: 0;
      display: flex;
      justify-content: center;

      :global(.search-form) {
        width: 100%;
        max-width: 640px;
      }
    }

    #right {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 0 0 auto;
      margin-right: 3rem !important;

      #links {
        display: flex;
        gap: 0.5rem;
        white-space: nowrap;

        a {
          text-decoration: none;
          color: $color-text;
          font-weight: 500;
          transition: all 240ms ease-in-out;
          border-bottom: 1px solid transparent;

          &:hover {
            border-bottom: 1px solid $color-primary-dark;
          }
        }
      }

      .avatar-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        box-shadow: 0px 0px 0px 0px;
        background-color: transparent;


        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }

      .burger {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
         box-shadow: 0px 0px 0px 0px;
        background-color: transparent;

        .icon {
          width: 28px;
          height: 28px;
          color: $color-text;
           box-shadow: 0px 0px 0px 0px;
        background-color: transparent;
        }

        &:hover .icon {
          color: $color-primary-dark;
        }
      }
    }
  }

  /* ===== OVERLAY ===== */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0);
    transition: background 0.25s ease;
    pointer-events: none;
    z-index: 999;
  }

  .overlay.overlay-open {
    background: rgba(15, 23, 42, 0.35);
    pointer-events: auto;
  }

  /* ===== DRAWER ===== */
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100dvh;
    width: 50vw;
    max-width: 420px;
    min-width: 300px;
    background: $color-surface;
    border-left: 1px solid $color-border;
    box-shadow: -8px 0 16px rgba(0, 0, 0, 0.08);
    transform: translateX(100%);
    transition: transform 0.25s ease-in-out;
    z-index: 1001;
    display: flex;
    flex-direction: column;

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem;
      border-bottom: 1px solid $color-border;

      .brand {
        font-weight: 800;
        color: $color-primary-dark;
      }

      .close {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        color: $color-text;

        &:hover {
          color: $color-primary-dark;
        }
      }
    }

    .drawer-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem 0.75rem;

      a {
        display: block;
        padding: 0.75rem 0.6rem;
        border-radius: $radius-md;
        color: $color-text;
        text-decoration: none;
        font-weight: 600;

        &:hover {
          background: #E9F4FF;
          color: $color-primary-dark;
        }
      }

      hr {
        border: 0;
        height: 1px;
        background: $color-border;
        margin: 0.5rem 0;
      }
    }
  }

  .drawer.open {
    transform: translateX(0%);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    nav .center {
      display: none;
    }

    nav #right #links {
      display: none;
    }

    nav #right .burger {
      display: inline-flex;
    }
  }

  @media (max-width: 420px) {
    .drawer {
      width: 75vw;
      min-width: 0;
    }
  }
</style>