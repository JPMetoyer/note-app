<script lang="ts">
  // Local JSON-like data
  const testimonials = [
    {
      name: "Akshay S.",
      quote: "I love how easy it is to find notes for the exact course I’m in. The interface feels modern and the feedback system helps me trust what I’m reading. It’s become a daily tool for me.",
      image: "akshay.jpeg",
      detail: "Sophomore - ECE"
    },
    {
      name: "Angshu T.",
      quote: "Nota completely changed how I study. I can browse verified class notes from other students and upload my own in seconds. It saves me hours every week and keeps everything organized.",
      image: "angshu.jpeg",
      detail: "Junior -  MIS"
    },
    {
      name: "Pranveer S.",
      quote: "Sharing notes used to be a mess of texts and lost files. With Nota, I just upload once and everyone in my class can learn from it. It’s collaborative in the way college should be.",
      image:"pranveer.jpeg",
      detail:"Freshman - Aero"
    },
    {
      name: "Jason L.",
      quote: "Nota feels like a tool made by students, for students. It’s simple, fast, and makes academic collaboration actually enjoyable. I’ve even started uploading my own notes to give back.",
      image:"jason.jpeg",
      detail: "Junior - CSB"
    },
    {
      name: "Carlos M.",
      quote: "Before Nota, my ‘study system’ was panicking and scrolling through GroupMe at 2 AM. Now I actually know what’s on the test before the test. My GPA finally stopped gasping for air.",
      image:"carlos.jpeg",
      detail: "Sophomore - CS"
    },
    {
      name: "Taimur B.",
      quote: "I used to think ‘studying together’ meant copying homework five minutes before class. Nota made it way easier to actually understand the material — I’m not sweating every quiz anymore.",
      image:"taimur.jpeg",
      detail: "Sophomore - CS"
    }
  ];
</script>

<section id="testi">

    <h1 id="tagline">User Testimonials</h1>
  <div id="container">
    {#each testimonials as t}
      <div class="card">
        <p>"{t.quote}"</p>

        <div id="liner">
            <img src="/filler/{t.image}" alt="">
            <div>
                <p id="name">{t.name}</p>
                <p id="detail">{t.detail}</p>
            </div>


        </div>
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/variables.scss' as *;

  section#testi {

    #tagline {
        color: $color-primary;
				font-size: 2rem;
				text-align: center;
				font-weight: 550;
    }
    div#container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 1rem;

      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      

      div.card {
        width: 16rem;
        height: 13rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
        border-radius: .7rem;
        padding: 1.2rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 240ms ease-in-out;

        &:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        div#liner {

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .5rem;

             img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
        }

        div {
            display: flex;
            flex-direction: column;
            align-items: start;

            #name {
                margin: 0px 0px 0px 0px;
                font-weight: 600;

            }

            #detail {
                margin: 0px 0px 0px 0px;
                font-weight: 400;
            }


        }
        }

      





       
      }
    }
  }
</style>