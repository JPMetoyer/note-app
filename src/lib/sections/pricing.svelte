<script lang="ts">
  import { Check } from 'lucide-svelte';
</script>

<section id="prices">
  <h1 id="tagline">Our Pricing</h1>

  <div id="pricing">
    <!-- Starter (Free) -->
    <div class="banner">
      <span id="color"></span>

      <div class="price">
        <h3 class="level">Starter</h3>
        <p>Get started, stay organized — learn from your peers for free.</p>

        <div class="number">
          <span class="amount">0.00</span>
          <span class="dollar">/mon</span>
        </div>

        <a href="/">Get Started</a>
      </div>

      <ul>
        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Access to 10 free note downloads per month</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Upload your own notes to share with classmates</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Earn points each time your notes are upvoted</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Browse notes by class or professor</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Community comment section access</span>
        </li>
      </ul>
    </div>

    <!-- Nota Plus (Paid) -->
    <div class="banner">
      <span id="color"></span>

      <div class="price">
        <h3 class="level">Nota Plus</h3>
        <p>Unlock unlimited learning — plus study rooms and smart summaries.</p>

        <div class="number">
          <span class="amount">$2.99</span>
          <span class="dollar">/mon</span>
        </div>

        <a href="/">Upgrade</a>
      </div>

      <ul>
        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Unlimited note downloads and uploads</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Priority placement on the library feed</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Advanced search filters (course, professor, semester)</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Save favorite notes and track updates</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Study rooms & collaboration tools for groups</span>
        </li>

        <li class="feature">
          <Check size={18} strokeWidth={2} />
          <span>Lightweight AI-powered summaries & quick insights</span>
        </li>
      </ul>
    </div>
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  section#prices {
    margin-top: 10rem;

    @media screen and (max-width: 800px) {
      margin: 0 auto;
    }

    #tagline {
      color: $color-primary;
      font-size: 2rem;
      text-align: center;
      font-weight: 550;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div#pricing {
    display: flex;
    flex-direction: row;
    gap: 3rem;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      margin: 0 auto;
    }

    div.banner {
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
      width: 22rem;
      height: 40rem;
      border-top-left-radius: 0.7rem;
      border-top-right-radius: 0.7rem;
      transition: all 240ms ease-in-out;

      &:hover {
        transform: translateY(-12px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      #color {
        width: 100%;
        height: 1rem;
        background-color: $color-primary-dark;
        overflow: hidden;
        border-top-left-radius: 0.7rem;
        border-top-right-radius: 0.7rem;
      }

      div.price {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0rem 1rem;
        text-align: center;

        .level {
          margin: 0.5rem 0 0 0;
          color: black;
          font-size: 1.77rem;
          text-align: center;
          font-weight: 550;
        }

        div.number {
          display: flex;
          flex-direction: row;

          .amount {
            font-size: 3rem;
            font-family: 600;
          }

          .dollar {
            font-size: 1rem;
            margin-top: 1rem;
            color: $color-primary-dark;
          }
        }

        a {
          margin: 2rem 0 0 0;
          text-decoration: none;
          color: black;
          border: 1px solid black;
          padding: 1rem 5rem;
          border-radius: 1.7rem;
          font-size: 1.5rem;
          transition: all 240ms ease-in-out;
          background-color: transparent;

          &:hover {
            background-color: $color-primary-dark;
            color: white;
          }
        }
      }
    }

    ul {
      list-style: none;
      padding: 0 1rem;
      margin: 1rem 0 0 0;
      display: grid;
      gap: 1.2rem;

      .feature {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        color: $color-text-secondary;
      }
    }
  }
</style>