  <script lang="ts">
  export let open = false;
</script>

{#if open}
  <div id="container">
    <div id="header">

        <div id="left">
            <img src="/filler/jonathan.jpeg" alt="">

        </div>

        <div id="right">
            <p>Jonathan Li</p>
            <span>McCombs - MIS</span>

        </div>

    </div>

     <span class="border"></span>

     <div id="classes">
        <p>            Relevant Courses:
</p>
        <ul>
            <li>MIS 301</li>
            <li>ACC 311 </li>
            <li>FIN 357 </li>
        </ul>


     </div>

    <span class="border"></span>

     <div id="account">
        <p id="star"> 
            <img src="/icons/star.png" alt="">
            Rep: Top 5% Contributor
        </p>


        <p id="notes">
            <img src="/icons/notes.png" alt="">
            Notes Uploaded: 24
        </p>
        <p id="comments">
            <img src="/icons/comment.png" alt="">
            Comments Made: 57
        </p>


                <a href="/profile" id="view">View More</a>

     </div>

      
  </div>
{/if}


<style lang="scss">
@use '../../lib/styles/variables.scss' as *;


    div#container{
          position: absolute;
      top: 3.5rem;
      right: 0;
      z-index: 9999;
      background: white;
      border-radius: 12px;
      box-shadow: $shadow-medium;
      padding: 1rem;
      width: 280px;

      display: flex;
      flex-direction: column;    

      #view {
        margin-right: 2rem;
        align-self: center;
        color: $color-primary-dark;
      }

      #header {
        display: flex;
        flex-direction: row;
        align-items: start;
        gap: 1rem;

        #left {
       
          img {
            width: 3rem;
            height: auto;
            border-radius: 50%;
          }
        
      }

      #right {
        display: flex;
        flex-direction: column;
        gap: .5rem;

        p {
            margin: 0px 0px 0px 0px;
        }

        span {
            font-size: 0.9rem;
            color: gray;
        }

      }


      }


      div#classes {
        display: flex;
        flex-direction: column;

        p {
            margin: .7rem 0px 0px 0px;
        }

        ul {
                    margin: .7rem 3rem 0px 0px;

        }

      }
     
    }

    div#account {
        display: flex;
        flex-direction: column;
        gap: .7rem;

        #star {
            display: flex;
            flex-direction: row;
            align-items: center;
                            margin: 0px 0px 0px 0px;


            img {
                width: 1.2rem;
                height: auto;
                margin-right: .5rem;
            }
        }

        #notes {
            display: flex;
            flex-direction: row;
            align-items: center;
                            margin: 0px 0px 0px 0px;



            img {
                width: 1.2rem;
                height: auto;
                margin-right: .5rem;
            }
        }

        #comments {
            display: flex;
            flex-direction: row;
            align-items: center;
                            margin: 0px 0px 0px 0px;


            img {
                width: 1.2rem;
                height: auto;
                margin-right: .5rem;
            }
        }

    }



    .border {
        margin: .3rem 0px .3rem 0px ;
        width: 80%;
        height: 1px;
        display: block;
        border-bottom: 1px solid $color-border;
    }


</style>