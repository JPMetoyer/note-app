<section id="hero">
  <div id="container">
    <h1>
      Built for <span class="brand">Students</span>.
      <span class="line">Powered by <span class="brand">Notes</span>.</span>
    </h1>

    <p>
      Simplify how you study with a platform built for college collaboration; upload notes, browse by class, and stay caught up without ever asking for screenshots again.
    </p>

    <div id="row">
      <button id="cta1">Upload your first note</button>
      <a href="/library" id="cta2">Browse our library</a>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../lib/styles/variables.scss' as *;

  section#hero {
    margin: 10rem auto 0rem auto;
    width: 60%;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 450px) {
      width: 90%;
    }

    div#container {
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 45px;
        line-height: 115%;
        font-weight: 400;
        margin: 0px;

        @media screen and (max-width: 450px) {
          font-size: 35px;

        }

        .line {
          display: block;
          margin-top: 0.3rem;
        }
      }

      p {
        margin-top: 0.5rem;
        font-size: 24px;
        font-weight: 300;
        color: $color-text-secondary;
        max-width: 600px;
        line-height: 2rem;

        @media screen and (max-width: 450px) {
          font-size: 20px;
          line-height: 1.7rem;
          margin-top: 1rem;
        }
      }

      .brand {
        color: $color-primary-dark;
      }

      div#row {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        button#cta1 {
          color: white;
          background-color: black;
          border-radius: 1px;
          font-size: 14px;
          box-shadow: $shadow-soft;
          padding: 0.8rem 1.2rem;
          transition: all 240ms ease-in-out;
          border: 1px solid transparent;

          @media screen and (max-width: 450px)
            {
                padding: 0.7rem 1rem;
            }
            
          &:hover {
            border: 1px solid rgb(212, 207, 207);
            background-color: $color-bg;
            color: black;
            box-shadow: 0px 0px 0px 0px;
          }
        }

        #cta2 {
          font-size: 14px;
          border: 1px solid rgb(212, 207, 207);
          background-color: $color-bg;
          color: black;
          padding: 0.8rem 1.2rem;
          text-decoration: none;
          transition: all 240ms ease-in-out;

          &:hover {
            background-color: lightgrey;
          }
        }
      }
    }
  }
</style>