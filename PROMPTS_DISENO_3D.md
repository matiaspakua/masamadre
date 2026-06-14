# Prompt maestro — Rediseño de navegación para `masamadre`

Usa la **skill de motion design para web** y aplica también todas las reglas de `motion-design-rules.md` para rediseñar por completo la navegación y arquitectura perceptiva de la web `masamadre`.

No hagas una landing convencional ni una web con scroll vertical genérico. Rediseña la experiencia como un **tour virtual narrativo dentro de una panadería ilustrada**, con estética de caricatura o dibujo cuidado, rica en detalle, movimiento, profundidad, texturas y puesta en escena. Debe sentirse como entrar a un lugar vivo, no como recorrer bloques apilados.

## Objetivo principal

Transformar toda la web actual en una experiencia de navegación espacial y narrativa. Cada sección existente debe conservarse, pero debe reubicarse dentro de una coreografía de recorrido virtual. El resultado tiene que seguir siendo legible, usable, bilingüe, original, visualmente avanzado y técnicamente coherente.

## Idea rectora

La panadería es la interfaz.

El usuario entra desde la calle, cruza la fachada, atraviesa distintas estancias y descubre la historia, la ciencia, la práctica y las herramientas de la masa madre como si hiciera una visita guiada. La navegación debe estar integrada en la arquitectura del espacio: puertas, pasillos, vitrinas, mesas, horno, laboratorio, despensa, biblioteca, obrador, mostrador, sótano o altillo.

No conviertas esto en un parque temático caótico. Debe tener dirección de arte, ritmo, foco y control.

## Replanteo de navegación

Diseña la navegación como un sistema espacial, no como una barra con anchors.

Debe incluir:

- Entrada inicial con una escena exterior o fachada que establezca tono, época, materialidad y promesa narrativa.
- Transición clara del exterior al interior.
- Recorrido principal tipo tour virtual con progresión comprensible.
- Mapa mental claro de dónde está el usuario dentro de la panadería.
- Sistema de orientación persistente pero discreto: minibújula, plano, breadcrumbs espaciales, índice visual o señalética integrada en el entorno.
- Posibilidad de explorar sin perder jerarquía ni sentido de avance.
- Transiciones entre escenas con continuidad espacial real.
- Navegación alternativa accesible para saltar a secciones concretas si el usuario no quiere hacer el tour completo.

La regla es simple: inmersión alta, fricción baja.

## Conversión de las secciones actuales

No elimines contenido actual. Reasigna todas las secciones existentes al tour virtual.

Ejemplo de traducción espacial:

- Historia del pan y de la masa madre -> sala histórica, corredor temporal o museo vivo dentro de la panadería.
- Timeline histórico -> pared animada, cinta mecánica, mural ilustrado o galería longitudinal con escenas encadenadas.
- Propiedades físicas, biológicas y fermentación -> laboratorio de química/panificación central, como pieza protagonista de la experiencia.
- Proceso completo desde mezcla hasta horneado -> obrador activo conectado con mesa de trabajo, fermentadora y horno.
- Simulador u horno -> sótano, cuarto térmico o zona de hornos de leña con dramaturgia material fuerte.
- Referencias y fuentes -> biblioteca, recetario animado o archivo técnico al final del recorrido.
- Calculadora, mezclas de harina, semillas y herramientas interactivas -> estación de trabajo o banco técnico dentro del obrador.

Si existe una sección en la web actual, debe aparecer integrada en el recorrido. No admito secciones huérfanas ni bloques que parezcan pegados encima del concepto.

## Laboratorio central

En la página principal del recorrido debe existir una escena central tipo **laboratorio de panadería** donde se expliquen de forma visual y didáctica:

- propiedades físicas de la masa,
- actividad biológica,
- fermentación,
- hidratación,
- estructura del gluten,
- gases, temperatura y tiempos,
- transformación desde masa inicial hasta pan horneado.

Este laboratorio no debe parecer un dashboard. Debe parecer una instalación visual narrativa: instrumentos ilustrados, frascos, pizarras, tubos, burbujas, vapor, diagramas, capas translúcidas, overlays técnicos y microanimaciones con sentido.

## Estilo visual

La dirección de arte debe combinar:

- panadería ilustrada o caricaturesca, pero con acabado premium,
- sensación artesanal, cálida y material,
- profundidad espacial,
- texturas cuidadas de madera, harina, metal, vidrio, papel, piedra, masa y fuego,
- iluminación y capas que aporten volumen,
- un lenguaje visual que permita contar historia y ciencia sin romper coherencia.

No quiero una caricatura infantil ni plana. Quiero una ilustración compleja, expresiva y navegable, con nivel editorial/showcase.

## Motion design obligatorio

Usa motion design como sistema, no como decoración.

Debes aplicar explícitamente estos principios:

- El concepto manda.
- El motion debe comunicar.
- La composición precede al efecto.
- Una o dos ideas fuertes por pantalla.
- El rendimiento es una restricción creativa.

Define un lenguaje de movimiento consistente para toda la web:

- microinteracciones: 120–220ms,
- transiciones de componentes: 240–420ms,
- reveals de bloque: 500–900ms,
- secuencias narrativas ligadas al progreso del scroll o del recorrido,
- easing centralizado,
- reglas claras para entradas, salidas, hover, focus, press y cambios de estado.

## Técnicas de motion recomendadas

Usa solo lo que tenga función narrativa o espacial real.

Prioridad alta:

- GSAP como motor principal para motion complejo.
- ScrollTrigger para escenas narrativas y pinning medido.
- Lenis si el scroll forma parte del tour cinemático.
- Split text para titulares solo cuando mejore jerarquía.
- Reveal por clip-path y mask reveal.
- Parallax por capas solo en planos relevantes.
- SVG path drawing para señalética, rutas o diagramas con sentido.
- Progress indicator del recorrido.
- Cambios de escena con sensación de desplazamiento real.

Three.js o WebGL solo si hay una escena concreta que se beneficie claramente de profundidad real. No usar 3D por postureo.

## Restricciones y anti patrones

Evita de forma explícita:

- scroll reveal repetido idéntico en todas las secciones,
- hero genérico con blobs o gradientes morados,
- tres cards iguales con icono dentro de círculo,
- smooth scroll exagerado,
- scroll hijacking roto,
- preloaders largos e inútiles,
- exceso de parallax en todas las capas,
- texto ilegible por exceso de motion o textura,
- WebGL metido a la fuerza,
- Lottie como parche para todo,
- estética demo de librería,
- diseño espectacular en desktop pero roto en móvil.

Si parece una plantilla con efectos, está mal.

## Legibilidad y UX

Aunque sea una experiencia avanzada, debe seguir siendo una web usable.

Obligatorio:

- jerarquía visual clara,
- un foco principal por viewport,
- contraste suficiente,
- tipografía muy legible,
- máximo dos familias tipográficas,
- texto largo fuera de zonas con demasiado movimiento,
- escalas fluidas con `clamp()`,
- navegación por teclado,
- focus states visibles,
- reduced motion respetado,
- HTML semántico,
- alternativa clara para acceder rápido a cualquier sección.

La inmersión nunca puede destruir la lectura.

## Stack y arquitectura

Propón una solución de implementación seria y mantenible.

Base recomendada:

- Next.js o Vite según complejidad real.
- React si la experiencia se beneficia de composición por escenas y componentes.
- TypeScript si la complejidad es media o alta.
- Tailwind + CSS moderno con variables, `clamp`, `color-mix`, container queries y nesting.
- GSAP como núcleo de motion.
- Lenis para scroll cinemático si aporta valor.
- Three.js o React Three Fiber solo en escenas justificadas.
- SVG inline para señalética, mapas, overlays y elementos animables.

Arquitectura mínima esperada:

1. Design tokens.
2. Layout system.
3. Motion primitives reutilizables.
4. Componentes interactivos.
5. Story sections.
6. Performance and accessibility layer.

No concentres toda la lógica de animación en un solo archivo gigante.

## Storyboard obligatorio

Antes de implementar, define un storyboard claro del tour completo.

Para cada escena o sección, especifica:

- nombre del espacio,
- objetivo narrativo,
- contenido actual que vive ahí,
- tipo de interacción,
- tipo de transición de entrada y salida,
- nivel de profundidad espacial,
- recursos visuales usados,
- criterio de legibilidad,
- versión móvil equivalente.

## Entregable esperado

Quiero que propongas y luego implementes un rediseño donde:

- la navegación completa de `masamadre` se convierta en un tour virtual de panadería ilustrada,
- todas las secciones actuales se integren sin perder contenido,
- el laboratorio central explique ciencia y proceso de la masa madre con alto valor visual,
- el motion design esté sistematizado y no sea ornamental,
- el resultado sea premium, atrevido, original y cuidado,
- la experiencia se mantenga clara, rápida y usable.

## Criterio final

La web final debe parecer diseñada por alguien con criterio visual, control narrativo y dominio técnico. Debe poder competir con una experiencia editorial premium o una showcase moderna. Si el resultado parece una landing común con decoraciones de panadería encima, no sirve.
