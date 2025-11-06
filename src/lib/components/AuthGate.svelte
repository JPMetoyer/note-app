<script lang="ts">
  let open = true;                          // always show until user clicks a button
  let mode: 'register' | 'login' = 'register';

  // form fields
  let name = '';
  let email = '';
  let password = '';
  let showPw = false;
  let touchedEmail = false;

  function isUniversityEmail(e: string) {
    return /\.edu$/i.test(e.trim());
  }

  function switchMode(next: 'register' | 'login') {
    mode = next;
    // keep email/password when switching to feel realistic
  }

  function submit(e: Event) {
    e.preventDefault();
    touchedEmail = true;

    const okEmail = isUniversityEmail(email);

    if (okEmail) {
      open = false; // close gate in prototype once a valid university email is provided
    }
  }
</script>

{#if open}
  <div id="auth-overlay" role="dialog" aria-modal="true" aria-label="Authenticate with Nota">
    <div id="card" data-mode={mode}>
      <header id="hdr">
        <h1>Welcome to <span class="brand">Nota.</span></h1>
        <p class="sub">Use your university email to continue.</p>

        <div id="tabs" role="tablist" aria-label="Auth mode">
          <button
            class="tab"
            class:active={mode === 'register'}
            role="tab"
            aria-selected={mode === 'register'}
            on:click={() => switchMode('register')}
          >
            Register
          </button>
          <button
            class="tab"
            class:active={mode === 'login'}
            role="tab"
            aria-selected={mode === 'login'}
            on:click={() => switchMode('login')}
          >
            Sign in
          </button>
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <span id="slider" aria-hidden="true" />
        </div>
      </header>

      <form id="form" on:submit={submit}>
        {#if mode === 'register'}
          <div class="panel show">
            <label>
              Full Name
              <input type="text" placeholder="Jonathan Li" bind:value={name} />
            </label>
          </div>
        {/if}

        <div class="panel show">
          <label>
            Email Address
            <input
              type="email"
              placeholder="name@university.edu"
              bind:value={email}
              on:blur={() => (touchedEmail = true)}
            />
            {#if touchedEmail && !isUniversityEmail(email)}
              <span class="hint error">Must use a university email (.edu)</span>
            {/if}
          </label>

          <label class="pw">
            {mode === 'register' ? 'Create Password' : 'Password'}
            <div class="pw-field">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Create a password' : 'Enter password'}
                bind:value={password}
              />
    
            </div>
          </label>
        </div>

        <button type="submit" id="primary" class="btn">
          {mode === 'register' ? 'Create Account' : 'Sign in'}
        </button>

        <div class="divider" role="separator" aria-label="Or continue with">
          <span>Or continue with</span>
        </div>

        <button type="button" id="google" class="btn ghost" on:click={() => (open = false)}>
          <img src="/icons/google.webp" alt="" />
          Continue with Google
        </button>

        <p id="switch">
          {#if mode === 'register'}
            Already have an account?
            <a href="/" on:click|preventDefault={() => switchMode('login')}>Sign in</a>
          {:else}
            New to Nota?
            <a href="/" on:click|preventDefault={() => switchMode('register')}>Create one</a>
          {/if}
        </p>
      </form>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  #auth-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    background-color: white;
    padding: 1.25rem;
  }

  #card {
    width: 30rem;
    height: 60vh;
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid rgba(0,0,0,.08);
    box-shadow: 0 22px 50px rgba(0,0,0,.18);
  }

  #hdr {
    h1 { margin: 0 0 .25rem 0; font-size: 2rem; font-weight: 800; }
    .brand { color: $color-primary-dark; }
    .sub { margin: 0 0 1rem 0; color: $color-text-secondary; }

    #tabs {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .35rem;
      padding: .35rem;
      border: 1px solid $color-border;
      border-radius: 10px;
      background: #fafbff;

      .tab {
        position: relative;
        z-index: 1;
        padding: .7rem .5rem;
        border-radius: 8px;
        border: 0;
        background: transparent;
        cursor: pointer;
        font-weight: 700;
        color: $color-text;

        &.active { color: $color-primary-dark; }
      }

      #slider {
        position: absolute;
        top: .35rem;
        bottom: .35rem;
        width: calc(50% - .35rem);
        left: .35rem;
        background: #fff;
        border: 1px solid $color-border;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,.06);
        transition: transform .25s ease;
      }
    }
  }

  /* move slider based on mode */
  #card[data-mode='login'] #slider { transform: translateX(100%); }

  #form {
    display: grid;
    margin-top: 1rem;


    label {
      display: grid;
      gap: .35rem;
      color: $color-text;

      input {
        padding: .7rem .8rem;
        border-radius: 10px;
        border: 1px solid $color-border;
        font: inherit;
        margin-bottom: 1rem;

        &:focus {
          outline: none;
          border-color: $color-primary-dark;
          box-shadow: 0 0 0 4px rgba(92,176,246,.14);
        }
      }
    }

    .hint { margin-top: .25rem; font-size: .9rem; }
    .hint.error { color: #d64545; }

    .pw .pw-field {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;

      input { border-top-right-radius: 0; border-bottom-right-radius: 0; }
      .eye {
        background: #fff;
        border: 1px solid $color-border;
        border-left: none;
        padding: .55rem .7rem;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
      }
    }

    .btn {
      width: 100%;
      padding: .9rem 1rem;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid $color-border;
      background-color:$color-primary;
      color: black;
      transition: transform .2s ease, box-shadow .2s ease;
    }

    #primary {
      background: $color-primary;
      color: black;
      border-color: $color-primary;
      box-shadow: 0 6px 16px rgba(92,176,246,.32);
      &:hover { transform: translateY(-1px); }
    }

    .divider {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: .6rem;
      align-items: center;
      color: $color-text-secondary;
      margin: .5rem 0;
      span { padding: .2rem .6rem; }
      &::before, &::after { content: ''; height: 1px; background: $color-border; }
    }

    #google {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: .6rem;
      background: #fff;
      color: $color-text;
      img { width: 18px; height: 18px; }
      &:hover { box-shadow: 0 6px 16px rgba(0,0,0,.08); transform: translateY(-1px); }
    }

    #switch {
      text-align: center;
      margin-top: .5rem;
      color: $color-text-secondary;

      a {
        color: $color-primary-dark;
        font-weight: 700;
        text-decoration: none;
        margin-left: .25rem;
      }
    }
  }

  @media (max-width: 560px) {
    #card { padding: 1rem; }
  }
</style>