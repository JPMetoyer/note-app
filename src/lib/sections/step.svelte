<script lang="ts">
	import { Check } from "lucide-svelte";

	const process = [
		{
			image: "step1.png",
			title: "Upload",
			description:
				"Share your study materials in seconds — just drag, drop, and add a few details."
		},
		{
			image: "step2.png",
			title: "Browse",
			description:
				"Explore notes from real students, filtered by course, semester, or professor."
		},
		{
			image: "step3.png",
			title: "Interact",
			description:
				"Like, save, and discuss notes with classmates — learning becomes collaborative."
		},
		{
			image: "step4.png",
			title: "Save",
			description:
				"Build your own study library with the best notes all in one place."
		}
	];
</script>

<article id="process">
	<section id="intro">
		<div class="sticky-content">
			<p id="tagline">The 4 step process</p>
			<h2>Upload ✧ Browse ✧ Interact ✧ Save</h2>
			<span>
				Simplify collaboration by uploading, exploring, and engaging with college notes through an intuitive workflow.
			</span>

			<p>What you get:</p>
			<ul>
				<li><Check strokeWidth={1.25} /> Visual learning made easy</li>
				<li><Check strokeWidth={1.25} /> Instant file organization</li>
				<li><Check strokeWidth={1.25} /> Smart filtering & class tagging</li>
			</ul>

			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#">
				<button id="docs">Our Pricing</button>
			</a>
		</div>
	</section>

	<section id="steps">
		{#each process as { image, title, description }, index}
			<figure class="step" style="--top-offset: {6 + 1.5 * index}rem; --padding: {4 - 0.5 * index}rem">
				<div class="card">
					<img src="/filler/placeholder.avif" alt={title} />
					<h1>{title}</h1>
					<p>{description}</p>
				</div>
			</figure>
		{/each}
	</section>
</article>

<style lang="scss">
@use '$lib/styles/variables.scss' as *;

#process {
	display: grid;
	grid-template-columns: 1fr;
	gap: 2rem;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 4rem 5vw;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
	}

	#intro {
		display: flex;
		flex-direction: column;

		.sticky-content {
			position: sticky;
			top: 6rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 1rem 0;

			#tagline {
				color: $color-primary;
				font-size: 2rem;
				text-align: center;
				font-weight: 550;
			}

			h2 {
				font-size: 2rem;
				font-weight: 700;
				line-height: 1.3;
			}

			span {
				font-size: 1.1rem;
				color: $color-text-secondary;
			}

			ul {
				list-style: none;
				padding: 0;
				display: flex;
				flex-direction: column;
				gap: 0.6rem;

				li {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					color: $color-text;

					
				}
			}

			#docs {
				margin-top: 1rem;
				padding: 0.6rem 1.2rem;
				border: 1px dashed $color-border;
				border-radius: $radius-md;
				background: #fff;
				cursor: pointer;
				transition: all 0.2s ease;

				&:hover {
					background: $color-primary;
					color: $color-primary-dark;
				}
			}
		}
	}

	#steps {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: relative;

		.step {
			position: sticky;
			top: var(--top-offset);
			padding: var(--padding) 0;

			.card {
				border: 2px solid $color-border;
				border-radius: $radius-md;
				background: #fff;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
				padding: 1.5rem;

				img {
					width: 100%;
					aspect-ratio: 16/8;
					border-radius: $radius-sm;
					margin-bottom: 1rem;
				}

				h1 {
					font-size: 1.4rem;
					font-weight: 600;
					margin-bottom: 0.5rem;
				}

				p {
					color: $color-text-secondary;
				}
			}
		}
	}
}
</style>