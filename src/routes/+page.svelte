<main>

    <Hero />
    <section id="library">

        <!-- <Searchbar /> -->
        <Step />
        <Testimonials />
        <Pricing />

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
