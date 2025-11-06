<script lang="ts">
  // ---- Mock data (swap or expand anytime) ----
  type Tier = 'Starter' | 'Student Plus' | 'Campus Pro';

  type Leader = {
    id: number;
    name: string;
    university: string;
    points: number;   // overall score (uploads + upvotes + activity)
    uploads: number;
    upvotes: number;
    tier: Tier;
    avatar: string;
  };

  const leaders: Leader[] = [
    { id: 1, name: 'Akshay Patel', university: 'UT Austin', points: 1280, uploads: 24, upvotes: 860, tier: 'Campus Pro',  avatar: '/filler/akshay.jpeg' },
    { id: 2, name: 'Jordan Kim',   university: 'UT Austin', points: 1040, uploads: 18, upvotes: 690, tier: 'Student Plus', avatar: '/filler/akshay.jpeg' },
    { id: 3, name: 'Riley Chen',   university: 'UT Austin', points: 990,  uploads: 12, upvotes: 730, tier: 'Student Plus', avatar: '/filler/akshay.jpeg' },
    { id: 4, name: 'Taylor Ross',  university: 'UT Austin', points: 955,  uploads: 20, upvotes: 540, tier: 'Starter',      avatar: '/filler/akshay.jpeg' },
    { id: 5, name: 'Sam Rivera',   university: 'UT Austin', points: 910,  uploads: 15, upvotes: 560, tier: 'Campus Pro',   avatar: '/filler/akshay.jpeg' },
    { id: 6, name: 'Casey Shah',   university: 'UT Austin', points: 890,  uploads: 10, upvotes: 610, tier: 'Starter',      avatar: '/filler/akshay.jpeg' },
    { id: 7, name: 'Alex Nguyen',  university: 'UT Austin', points: 860,  uploads: 11, upvotes: 580, tier: 'Student Plus', avatar: '/filler/akshay.jpeg' },
    { id: 8, name: 'Sydney Lee',   university: 'UT Austin', points: 820,  uploads:  9, upvotes: 575, tier: 'Starter',      avatar: '/filler/akshay.jpeg' },
    { id: 9, name: 'Noah White',   university: 'UT Austin', points: 795,  uploads: 14, upvotes: 430, tier: 'Campus Pro',   avatar: '/filler/akshay.jpeg' },
    { id:10, name: 'Priya Rao',    university: 'UT Austin', points: 770,  uploads:  8, upvotes: 520, tier: 'Starter',      avatar: '/filler/akshay.jpeg' }
  ];

  // ---- View state ----
  type View = 'Overall' | 'Top Uploaders' | 'Most Upvoted' | 'Pro Members';
  let view: View = 'Overall';

  // derived lists (no backend, just sorting/filtering)
  function byPoints(a: Leader, b: Leader)  { return b.points  - a.points; }
  function byUploads(a: Leader, b: Leader) { return b.uploads - a.uploads; }
  function byUpvotes(a: Leader, b: Leader) { return b.upvotes - a.upvotes; }

  $: displayed =
    view === 'Overall'
      ? [...leaders].sort(byPoints)
      : view === 'Top Uploaders'
      ? [...leaders].sort(byUploads)
      : view === 'Most Upvoted'
      ? [...leaders].sort(byUpvotes)
      : leaders.filter(l => l.tier === 'Campus Pro').sort(byPoints); // Pro Members
</script>

<section id="leaderboard">
  <header id="lb-header">
    <div class="title">
      <h1>Leaderboard</h1>
      <p class="sub">Celebrate top contributors across Nota. Points reflect uploads, quality, and community upvotes.</p>
    </div>

    <div id="tabs" role="tablist" aria-label="Leaderboard views">
      <button class="tab" class:active={view === 'Overall'}        on:click={() => (view = 'Overall')}>Overall</button>
      <button class="tab" class:active={view === 'Top Uploaders'}  on:click={() => (view = 'Top Uploaders')}>Top Uploaders</button>
      <button class="tab" class:active={view === 'Most Upvoted'}   on:click={() => (view = 'Most Upvoted')}>Most Upvoted</button>
      <button class="tab" class:active={view === 'Pro Members'}    on:click={() => (view = 'Pro Members')}>Pro Members</button>
    </div>
  </header>

  <!-- Desktop: table -->
  <div id="table" role="table" aria-label="Leaderboard table">
    <div class="thead" role="rowgroup">
      <div class="row head" role="row">
        <div class="cell rank"   role="columnheader">#</div>
        <div class="cell user"   role="columnheader">Student</div>
        <div class="cell tier"   role="columnheader">Tier</div>
        <div class="cell uploads" role="columnheader">Uploads</div>
        <div class="cell upvotes" role="columnheader">Upvotes</div>
        <div class="cell points"  role="columnheader">Points</div>
      </div>
    </div>

    <div class="tbody" role="rowgroup">
      {#each displayed as item, i (item.id)}
        <div class="row" role="row">
          <div class="cell rank" role="cell">{i + 1}</div>

          <div class="cell user" role="cell">
            <img src={item.avatar} alt="" />
            <div class="meta">
              <span class="name">{item.name}</span>
              <span class="uni">{item.university}</span>
            </div>
          </div>

          <div class="cell tier" role="cell">
            <span class="chip {item.tier === 'Campus Pro' ? 'pro' : item.tier === 'Student Plus' ? 'plus' : 'starter'}">
              {item.tier}
            </span>
          </div>

          <div class="cell uploads" role="cell">{item.uploads}</div>
          <div class="cell upvotes" role="cell">{item.upvotes}</div>
          <div class="cell points"  role="cell">
            <span class="score">{item.points}</span>
            {#if i === 0}<span class="badge gold"   aria-label="Gold">🥇</span>
            {:else if i === 1}<span class="badge silver" aria-label="Silver">🥈</span>
            {:else if i === 2}<span class="badge bronze" aria-label="Bronze">🥉</span>{/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Mobile: cards -->
  <div id="cards">
    {#each displayed as item, i (item.id)}
      <article class="card">
        <div class="top">
          <span class="r">#{i + 1}</span>
          <span class="chip {item.tier === 'Campus Pro' ? 'pro' : item.tier === 'Student Plus' ? 'plus' : 'starter'}">{item.tier}</span>
        </div>

        <div class="user">
          <img src={item.avatar} alt="" />
          <div class="meta">
            <span class="name">{item.name}</span>
            <span class="uni">{item.university}</span>
          </div>
        </div>

        <div class="stats">
          <div><span class="lbl">Uploads</span><span class="val">{item.uploads}</span></div>
          <div><span class="lbl">Upvotes</span><span class="val">{item.upvotes}</span></div>
          <div><span class="lbl">Points</span><span class="val">{item.points}</span></div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  section#leaderboard {
    width: 100%;
    max-width: 1100px;
    margin: 7rem auto 6rem auto;
    padding: 0 1rem;
    display: grid;
    gap: 1rem;
  }

  /* Header */
  #lb-header {
    display: grid;
    gap: .6rem;

    .title {
      display: grid;
      gap: .25rem;

      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 900;
        color: $color-text;
      }
      .sub {
        margin: 0;
        color: $color-text-secondary;
      }
    }

    #tabs {
      display: inline-flex;
      align-items: center;
      gap: .35rem;
      padding: .35rem;
      background: #F9FBFF;
      border: 1px solid $color-border;
      border-radius: 999px;

      .tab {
        padding: .5rem .8rem;
        border-radius: 999px;
        border: 1px solid transparent;
        background: transparent;
        cursor: pointer;
        font-weight: 700;
        color: $color-text;

        &:hover { border-color: $color-border; }
        &.active {
          background: #fff;
          border-color: $color-border;
          color: $color-primary-dark;
          box-shadow: 0 3px 8px rgba(0,0,0,.06);
        }
      }
    }
  }

  /* Desktop table */
  #table {
    display: block;
    background: #fff;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    box-shadow: 0 6px 16px rgba(0,0,0,.05);
    overflow: hidden;

    .row {
      display: grid;
      grid-template-columns: 64px 1.6fr 1fr 1fr 1fr 1fr;
      align-items: center;
      gap: .25rem;
      padding: .8rem .9rem;
      border-top: 1px solid $color-border;

      &.head {
        background: #F7FAFF;
        border-top: 0;
        font-weight: 700;
        color: $color-text-secondary;
      }
    }

    .cell {
      &.rank   { font-weight: 800; color: $color-text; }
      &.user   {
        display: grid; grid-template-columns: auto 1fr; gap: .6rem; align-items: center;
        img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
        .name { font-weight: 700; color: $color-text; }
        .uni  { font-size: .9rem; color: $color-text-secondary; }
      }
      &.tier   { }
      &.uploads, &.upvotes, &.points { text-align: right; font-variant-numeric: tabular-nums; }
    }

    .chip {
      display: inline-flex; align-items: center;
      padding: .2rem .55rem; border-radius: 999px; border: 1px solid $color-border;
      font-size: .85rem; background: #fff; color: $color-text;
      &.plus    { background: #EEF6FF; border-color: #D6E9FF; color: $color-primary-dark; }
      &.pro     { background: #FFF4E5; border-color: #FFD9A6; color: #B86500; }
      &.starter { background: #F4F7FA; border-color: #E3EAF2; color: $color-text; }
    }

    .score { font-weight: 900; color: $color-text; }
    .badge { margin-left: .4rem; }
  }

  /* Mobile cards */
  #cards {
    display: none;
  }

  /* Responsive */
  @media (max-width: 820px) {
    #table { display: none; }
    #cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: .8rem;
    }

    .card {
      border: 1px solid $color-border;
      border-radius: $radius-md;
      background: #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,.05);
      padding: .9rem;
      display: grid;
      gap: .65rem;

      .top {
        display: flex; justify-content: space-between; align-items: center;
        .r { font-weight: 900; color: $color-text; }
      }

      .user {
        display: grid; grid-template-columns: auto 1fr; gap: .6rem; align-items: center;
        img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
        .name { font-weight: 800; color: $color-text; display: block; }
        .uni  { color: $color-text-secondary; font-size: .9rem; display: block; }
      }

      .chip {
        display: inline-flex; align-items: center;
        padding: .2rem .55rem; border-radius: 999px; border: 1px solid $color-border;
        font-size: .85rem; background: #fff; color: $color-text;
        &.plus    { background: #EEF6FF; border-color: #D6E9FF; color: $color-primary-dark; }
        &.pro     { background: #FFF4E5; border-color: #FFD9A6; color: #B86500; }
        &.starter { background: #F4F7FA; border-color: #E3EAF2; color: $color-text; }
      }

      .stats {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: .4rem;
        .lbl { color: $color-text-secondary; font-size: .85rem; display: block; }
        .val { font-weight: 800; color: $color-text; }
      }
    }
  }
</style>