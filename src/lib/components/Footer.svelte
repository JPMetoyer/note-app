<script lang="ts">
  // nothing needed here
</script>

<footer>
  <div id="left">
    <a href="/">
      <p>© Nota — Made at UT Austin 🤠</p>
    </a>
  </div>

  <div id="right">
    <a href="/">Home</a>
    <a href="/library">Library</a>
    <a href="/#pricing">Pricing</a>
    <a href="/#cta">Get Started</a>
  </div>
</footer>

<style lang="scss">
footer {
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  flex-wrap: wrap;
  border-top: 1px solid lightgray;
  margin-top: 5rem;
  background-color: #fff;

  div#left {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5rem;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      text-decoration: none;

     

      p {
        font-family: 'satoshi', sans-serif;
        font-size: 1rem;
        color: #333;
        margin: 0;
        font-weight: 500;
      }
    }
  }

  div#right {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.7rem;

    a {
      color: #0077cc; /* soft blue matching Nota’s tone */
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
      font-family: 'satoshi', sans-serif;
      border-bottom: 1px solid transparent;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #005fa3;
        border-bottom: 1px solid #005fa3;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;

    div#left,
    div#right {
      margin: 0;
    }

    div#right {
      gap: 0.5rem;

      a {
        font-size: 15px;
      }
    }
  }
}
</style>