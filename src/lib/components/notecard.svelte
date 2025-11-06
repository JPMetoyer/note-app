<script lang="ts">
  import type { Note } from '$lib/types/notes';
  export let note: Note;
</script>

<div id="container">
  <div id="class">
    <span>{note.course}</span>•
    <span>{note.semester}</span>•
    <span>{note.year}</span>
  </div>

  <h3>{note.title}</h3>

  <p id="description">{note.description}</p>

  <div id="user">
    <div id="profile">
      <img src={note.uploader.avatar} alt={note.uploader.name} />
      <p>{note.uploader.name}</p>
    </div>

    <p id="label">{note.pages} pages</p>
  </div>
</div>

<style lang="scss">
  @use '../../lib/styles/variables.scss' as *;

  div#container {
    width: 16rem;
    height: 13rem;
    border: 1px solid $color-border;
    border-radius: 0.7rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    div#class {
      padding: 1rem 1rem 0 1rem;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      span {
        font-size: 1.1rem;
        color: $color-text-secondary;
      }
      margin-bottom: 1rem;
    }

    h3 {
      padding: 0 1rem;
      margin: 0;
      font-weight: 450;
      font-size: 1.4rem;
      color: $color-text;
    }

    #description {
      margin: 12px 0 0 0;
      padding: 0 1rem;
      color: $color-text-secondary;
      flex-grow: 1;
    }

    div#user {
      display: flex;
      flex-direction: row;
      padding: 0 1rem 1rem 1rem;
      justify-content: space-between;
      align-items: center;

      #label {
        font-size: 0.9rem;
        color: $color-text-secondary;
      }
    }

    div#profile {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
      }

      p {
        font-size: 0.95rem;
        font-weight: 500;
        color: $color-text;
      }
    }
  }
</style>