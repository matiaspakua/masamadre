# REQUIREMENTS

## Objective

Create a premium GitHub Pages website about **masa madre / sourdough** with a dual purpose:

1. Present the history of bread and sourdough as an immersive journey through time.
2. Present sourdough as a living fermentation laboratory that explains its physical, biological, and chemical processes.

This document is the initial master prompt and product requirements brief for designing and building the site.

## Master Prompt

Design and build an extraordinary GitHub Pages website about the history and laboratory of sourdough bread (masa madre). The website must feel editorial, scientific, tactile, and cinematic. It must not look like a generic startup page. It must feel like a museum experience, an archaeological archive, and a chemistry lab combined into one interactive narrative.

The site has two core missions that must coexist clearly:

- First mission: act as a window through time, showing how bread originated, how sourdough emerged, how fermentation was discovered, how bread evolved across civilizations, and how it spread and changed through human history.
- Second mission: act as a living laboratory, showing the composition of sourdough, the role of yeast and lactic acid bacteria, the fermentation cycle, the transformation of starches and proteins, pH behavior, gluten development, enzymatic activity, health and digestion aspects, and the complete process from starter preparation to baking and cooling.

The visual direction must be world-class. Use hyper-realistic textures, careful materiality, rich depth, premium typography, fluid motion, immersive transitions, atmospheric lighting, and highly polished interaction design. The page must be easy to navigate, but it should still feel like an experience to explore.

The homepage should work as a narrative landing page with multiple immersive sections. One major section must be an animated historical timeline. Another major centerpiece must be an interactive laboratory module in the center of the landing page, styled like a chemistry table or fermentation lab, where the user can inspect ingredients, microbes, fermentation stages, physical changes, and biological processes.

The site should balance storytelling and explanation. It should be emotionally rich and visually memorable, but also scientifically structured and useful. Every major visual effect must support comprehension, not distract from it.

## Product Vision

The website must communicate that sourdough is both:

- An ancient cultural artifact.
- A living biochemical system.

The experience should move between macro and micro scales:

- Macro: civilization, agriculture, migration, baking traditions, historical periods.
- Micro: starch, gluten, enzymes, acids, pH, lactobacilli, yeast, gas production, crust formation.

The user should feel they are traveling across time and then zooming into the living matter of bread.

## Primary Experience

The site should be structured as a long-form immersive landing page with strong section identity.

Suggested high-level flow:

1. Hero section: cinematic introduction to sourdough as time + life.
2. Origins section: ancient grain, early fermentation, first breads.
3. Historical timeline: major eras, regions, and inflection points in bread history.
4. Central laboratory section: interactive scientific exploration of masa madre.
5. Fermentation process section: step-by-step transformation from flour and water to baked loaf.
6. Composition and properties section: ingredients, microorganisms, acids, gluten, starches, enzymes, minerals, digestibility.
7. Baking transformation section: heat, caramelization, coagulation, starch gelatinization/solidification, cooling.
8. Benefits and nuance section: flavor, structure, preservation, digestion, mineral bioavailability, and caveats.
9. Closing section: bread as culture, biology, craft, and time capsule.

## Content Requirements

### Historical narrative

The history content must cover, at minimum:

- Bread origins and early grain cultures.
- Natural fermentation as the original leavening method.
- Ancient and early civilization context.
- The rise, spread, and variation of bread traditions over time.
- Bread as a human technology shaped by geography, agriculture, and craft.
- Sourdough as a recurring historical thread, not just a recipe.

The timeline should be dense, visually rich, and animated. It should feel like a historical instrument, not a simple vertical list.

### Laboratory narrative

The laboratory content must cover, at minimum:

- What masa madre is: a symbiotic culture of wild yeast and lactic acid bacteria.
- Fermentation as microbial transformation.
- Anaerobic context and energy generation without oxygen.
- Breakdown of proteins into amino acids.
- Starch behavior and sugar release.
- Enzyme action and why enzymatic activity matters.
- Gluten formation through hydration and mixing.
- Acid generation, especially lactic acid and some acetic acid.
- pH behavior during fermentation, including sourdough typically moving in the acidic range.
- Why acidic conditions help inhibit pathogenic organisms.
- Lactic acid fermentation and the difference between outputs such as lactic acid, carbon dioxide, and ethanol.
- Roles of Lactobacillus and Saccharomyces cerevisiae.
- Phytic acid and mineral absorption context.
- Nutrition and health claims presented with nuance rather than oversimplification.

### Process narrative

The process section must explain the journey from starter to bread. It should include, at minimum:

- Mise en place.
- Initial flour and water hydration / autolyse context.
- Mixing.
- Gluten development.
- Bulk fermentation.
- Dividing.
- Pre-shaping.
- Resting.
- Final shaping.
- Proofing.
- Baking.
- Caramelization and crust formation.
- Protein coagulation.
- Starch setting / gelatinization-solidification framing.
- Cooling and crumb stabilization.

## Scientific Concepts to Visualize

The site must translate complex concepts into visual modules. Include interactive or animated representations for:

- Yeast consuming sugars and producing carbon dioxide and alcohol.
- Lactic acid bacteria producing acids and lowering pH.
- Gluten network formation.
- Enzyme activity acting on starches and proteins.
- pH shift across fermentation time.
- Bubble and gas development inside dough.
- Oven transformations.
- Comparison between dough stages.

The lab should feel instrument-based, as if the user is observing a controlled experiment.

## Visual Direction

The art direction must be premium and distinctive.

Required traits:

- Hyper-realistic textures inspired by flour dust, grain, linen, wood, ceramic, glass, metal lab tools, crust, crumb, fermentation residue, paper archives, and old manuscripts.
- Editorial and museum-grade composition.
- Strong depth and atmosphere.
- Dark and light mode compatibility, with one mode chosen as the main art-directed default.
- Elegant, non-generic typography with high personality.
- Cinematic section transitions.
- Controlled use of 3D only where it creates real value.
- Motion that feels crafted, not decorative.

Avoid:

- Generic SaaS layouts.
- Symmetrical three-card feature sections.
- Empty decorative blobs.
- Shallow gradient-only aesthetics.
- Cartoon science visuals.
- Template-looking landing pages.

## UX Requirements

- The site must be simple to explore despite the richness.
- Navigation must support both linear storytelling and quick jumps to sections.
- The timeline must allow intuitive exploration of historical periods.
- The lab section must allow focused inspection of concepts without overwhelming the user.
- Animations must reinforce structure and understanding.
- The site must be responsive and excellent on desktop first, then carefully adapted for mobile.

## Technical Stack Constraints

Use the tech stack from `front_tech_stack.md` as the reference direction for implementation.

Core stack direction:

- Next.js as the main framework baseline for a premium interactive frontend architecture.
- Tailwind CSS for design system velocity and consistency.
- GSAP with ScrollTrigger for cinematic storytelling, timeline choreography, and scroll-linked motion.
- Lenis for smooth scrolling.
- Three.js with React Three Fiber only when 3D meaningfully improves the experience.
- D3 or Observable Plot only where scientific charts or process visuals require it.
- High-quality variable fonts, preferably distinctive choices rather than generic defaults.
- SVG filters, masks, noise, blend modes, and careful texture systems for depth.

Because deployment target is GitHub Pages, the implementation should remain compatible with static export constraints.

## GitHub Pages Requirement

The website must be designed with GitHub Pages deployment in mind.

Implementation must therefore:

- Support static generation/export.
- Avoid server-only dependencies in the critical experience.
- Keep asset handling predictable for static hosting.
- Be organized for repository-based deployment.

## Information Architecture

Minimum required sections:

- Hero
- Origins
- Historical timeline
- Fermentation laboratory
- Process from starter to oven
- Composition and microbiology
- Physical and chemical properties
- Benefits and nuance
- Closing reflection

## Interaction Requirements

### Hero

- Immediate visual statement.
- Strong title and thesis.
- Motion that establishes atmosphere.

### Timeline

- Animated, scroll-aware, historically structured.
- Could be horizontal, radial, layered, or hybrid.
- Must include dates/eras, regions, and narrative moments.
- Must feel premium and exploratory.

### Laboratory

- Must be a centerpiece.
- Should resemble a scientific workstation or fermentation observatory.
- Should expose ingredients, microbes, pH, gas, temperature, and dough-state transformations.
- Must support toggles, overlays, or layered exploration.

### Process section

- Step-based and visually sequential.
- Must clearly show transformation rather than static explanation.

## Tone

The tone must combine:

- Historical depth.
- Scientific rigor.
- Sensory craft.
- Visual sophistication.

It should not read like a school summary. It should feel authored, precise, and immersive.

## Reference Content Basis

Use `masa-madre.pdf` as the main thematic reference for subject matter and source extraction.

The reference includes material related to:

- Fermentation and anaerobic transformation.
- Proteins and amino acids.
- Wheat, gluten, enzymes, starches.
- Symbiosis of yeast and lactic acid bacteria.
- pH and sourdough acidity.
- Lactobacillus and lactic acid fermentation.
- Saccharomyces cerevisiae.
- Phytic acid, digestibility, and mineral absorption.
- Autolysis / autolyse.
- Breadmaking stages and thermal transformations in the oven.

Use that material to shape the content architecture, interactive explanations, and storytelling modules.

## Deliverable Expectation

The output of this prompt should guide the creation of a premium web experience, not a simple informational site.

The result should feel like:

- part digital museum,
- part scientific atlas,
- part fermentation laboratory,
- part cinematic editorial story.

## Non-Negotiables

- GitHub Pages compatible.
- Distinctive art direction.
- Animated historical timeline.
- Central interactive laboratory section.
- Strong scientific explanations.
- Strong historical storytelling.
- Hyper-realistic textures and premium motion.
- No generic template aesthetics.
- Built from the sourdough PDF reference and the provided frontend stack direction.

## Source Notes

This requirements brief is derived from the attached/reference materials on sourdough history, fermentation science, breadmaking stages, and the frontend stack direction in `front_tech_stack.md`, including emphasis on Next.js, Tailwind CSS, GSAP, Lenis, selective Three.js/R3F, and data visualization support.[file:1][file:2]
