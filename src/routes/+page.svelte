<main>

    <Hero />
    <section id="library">

        <!-- <Searchbar /> -->
        <Step />
        <Testimonials />
        <Pricing />



        <a href="/" class="button">Ready to Study Smarter? </a>

    </section>
</main>



<style lang="scss">

 @use '../lib/styles/variables.scss' as *;
    
    main {
        display: flex;
        flex-direction: column;

        section#library {
            width: 100%;
            margin: 5rem auto 10rem auto;
            display: flex;
            flex-direction: column;
            align-items: center;

a {

    margin-top: 10rem;
  background-color: $color-primary;
  color: $color-text;
  border: none;
  border-radius: $radius-md;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: $color-primary-dark;
  }
}
           

          
        }
        
    
       
    }
</style>

<script lang="ts">
import Hero from "../lib/sections/hero.svelte";
import Searchbar from "$lib/components/searchbar.svelte";
import Step from "$lib/sections/step.svelte";
import Testimonials from "$lib/sections/testimonials.svelte";
import Pricing from "$lib/sections/pricing.svelte"


</script>
