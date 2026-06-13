Notas:
•	Mantener GSAP como motor de referencia para motion complejo.
•	Integrar Lenis con el loop de render y con ScrollTrigger si se usa scroll cinemático.
•	Activar Three.js solo donde aporte valor real.
•	No cargar bibliotecas de 3D o gráficos si la pantalla no las necesita.
---
Arquitectura recomendada
Capas de responsabilidad
Separar el proyecto en estas capas:
1.	Design tokens: color, tipografía, espacio, radios, sombras, profundidad.
2.	Layout system: grid, containers, breakpoints, reglas de composición.
3.	Motion primitives: fade, reveal, stagger, parallax, pinning, magnetic hover, text split, scene transitions.
4.	Interactive components: hero, cards, galleries, menus, nav, CTA, sliders, charts, canvas sections.
5.	Story sections: bloques con una narrativa visual y de interacción concreta.
6.	Performance and accessibility layer.
Reglas de composición técnica
•	No mezclar lógica de animación de todas las secciones en un solo archivo gigante.
•	Encapsular cada sistema visual complejo.
•	Definir utilidades reutilizables para reveal, stagger, pinned scenes y text splitting.
•	Centralizar tokens y easing.
•	Limitar el número de librerías con solapamiento funcional.
---
Sistema de motion
Principios
Toda web de alto nivel debe definir un lenguaje de movimiento consistente.
Definir:
•	Curvas de easing primarias.
•	Duraciones cortas, medias y largas.
•	Reglas de entrada y salida.
•	Comportamiento al hacer scroll.
•	Respuesta en hover, focus, press.
•	Sistema de delay y stagger.
•	Reglas para cambios de estado.
Recomendación de familias de motion
•	Microinteracciones: 120–220ms.
•	Transiciones de componentes: 240–420ms.
•	Reveals de bloque: 500–900ms.
•	Secuencias narrativas con scroll: duración ligada a progreso, no a tiempo fijo.
Efectos recomendados
•	Reveal por clip-path.
•	Stagger tipográfico.
•	Layer parallax.
•	Mask reveals.
•	Horizontal scroll sections con pinning medido.
•	Magnetic buttons discretos.
•	Text splitting para titulares.
•	Scroll progress visual.
•	Scene interpolation en WebGL.
•	SVG path drawing cuando tenga sentido semántico.
Efectos a controlar o evitar
•	Smooth scroll exagerado.
•	Parallax en todas las capas.
•	Preloaders largos e inútiles.
•	Scroll hijacking roto.
•	Animaciones que bloquean interacción.
•	Glows, blobs y gradientes “AI style” por defecto.
•	Texto ilegible por exceso de efecto.
---
Técnicas UI/UX prioritarias
Jerarquía visual
•	Un foco principal por viewport.
•	Tipografía y escala antes que color chillón.
•	Contraste entre bloques densos y bloques respirados.
•	Alternancia de ritmo visual: compresión, expansión, pausa.
Narrativa visual
Usar el scroll como estructura narrativa cuando el proyecto lo permita:
•	Hook inicial claro.
•	Desarrollo con progresión visual real.
•	Puntos de énfasis.
•	Descarga o cierre visual.
•	CTA final sin romper el tono.
Interacciones
•	Hover con intención material, no solo cambio de color.
•	Focus states visibles.
•	Active states perceptibles.
•	Feedback inmediato en controles.
•	Gestos o interacciones avanzadas solo si no perjudican claridad.
Legibilidad
•	Mantener texto largo fuera de zonas con demasiado movimiento.
•	Asegurar contraste en overlays.
•	Limitar líneas de texto extensas.
•	Usar escalas fluidas con clamp.
•	Priorizar lectura incluso en layouts experimentales.
Depth design
Construir profundidad con:
•	Capas de superficie.
•	Sombras tonales.
•	Blur contextual.
•	Texturas suaves.
•	Transparencias medidas.
•	3D solo cuando mejora narrativa o percepción material.
---
Tipografía recomendada
Usar combinaciones sobrias, distintivas y compatibles con experiencias premium.
Sans recomendadas
•	Satoshi
•	General Sans
•	Cabinet Grotesk
•	Inter
•	Work Sans
•	Manrope
Serif o display recomendadas
•	Boska
•	Zodiak
•	Instrument Serif
•	Playfair Display
•	Source Serif 4
Reglas
•	Máximo dos familias tipográficas por proyecto.
•	Una familia de cuerpo muy legible.
•	Una familia display solo para momentos de jerarquía.
•	Evitar combinaciones demasiado vistas si el objetivo es diferenciación.
•	Evitar usar display fonts en tamaños pequeños.
•	Usar variable fonts para controlar peso y tensión visual.
---
Gráficos y visualización
Si la web contiene datos, estos deben integrarse en la dirección de arte, no parecer un widget externo.
Reglas
•	Los charts deben compartir paleta, tipografía y motion con el resto del sitio.
•	Animar entrada, transición y hover con moderación.
•	Priorizar lectura por encima del efecto.
•	Usar D3 cuando se necesite control expresivo real.
•	Usar Observable Plot cuando se quiera elegancia rápida.
•	Evitar charts genéricos si el proyecto es de alto nivel visual.
Técnicas valiosas
•	Líneas con reveal progresivo.
•	Áreas con gradiente sutil.
•	Tooltips de alta calidad visual.
•	Sincronía entre scroll y datos.
•	Small multiples en grids editoriales.
---
Texturas, materiales y atmósfera
La sensación premium suele venir más de materialidad y control que de efectos estridentes.
Usar:
•	Noise muy sutil.
•	Gradientes complejos pero sobrios.
•	Glass o translucidez solo si encaja con el concepto.
•	Máscaras SVG.
•	Distorsiones ligeras.
•	Patrones geométricos suaves.
•	Luces o highlights direccionales.
Evitar:
•	Saturación alta por defecto.
•	Fondos recargados detrás de texto.
•	Texturas obvias o repetitivas.
•	Efectos “demo scene” sin propósito.
---
3D y creative coding
Cuándo usar 3D
Usar Three.js o R3F cuando exista una razón clara:
•	Producto que necesita volumen o materialidad.
•	Narrativa espacial.
•	Hero inmersivo.
•	Escena interactiva significativa.
•	Visualización abstracta que se beneficie de profundidad real.
Cuándo no usarlo
No usar 3D si:
•	Un layout 2D bien resuelto cumple mejor la función.
•	Penaliza demasiado el rendimiento móvil.
•	Obliga a rebajar legibilidad.
•	Se usa solo para impresionar sin integrar con el contenido.
Creative coding útil
•	Particle systems sutiles.
•	Distorsión de imágenes al hover o scroll.
•	Cursor systems discretos.
•	Noise-driven motion.
•	Mesh gradients dinámicos.
•	Shader transitions entre secciones o media.
La regla es simple: lo experimental debe seguir siendo usable.
---
Performance
Reglas base
•	Medir antes de optimizar a ciegas.
•	No animar propiedades que fuerzan layout si puede evitarse.
•	Priorizar transform y opacity.
•	Cargar diferido escenas pesadas.
•	Hacer code split del 3D y de visuales no críticos.
•	Reducir tamaño de texturas, modelos y video.
•	Considerar fallbacks móviles.
Estrategias
•	Lazy load para media y componentes pesados.
•	Suspense o loaders ligeros para escenas complejas.
•	Desactivar o simplificar efectos en dispositivos modestos.
•	Respetar prefers-reduced-motion.
•	Evitar más de una gran escena WebGL simultánea si no es imprescindible.
Render
•	Controlar el render loop.
•	No recalcular shaders, geometrías o listeners innecesariamente.
•	Limpiar triggers y timelines al desmontar componentes.
•	Auditar memoria y CPU en páginas largas con scroll interactivo.
---
Accesibilidad
La sofisticación visual no exime de accesibilidad.
Obligatorio:
•	HTML semántico.
•	Navegación por teclado.
•	Contraste suficiente.
•	Estados focus visibles.
•	Respeto a prefers-reduced-motion.
•	Alt text útil.
•	Texto real cuando el contenido sea textual; evitar convertir todo en canvas o imágenes.
En motion avanzado:
•	Ofrecer versiones reducidas de escenas intrusivas.
•	No depender solo del hover.
•	No esconder contenido importante tras interacciones ambiguas.
•	Evitar flashes o cambios bruscos de luminancia.
---
Anti patrones
No producir webs con estos defectos:
•	Hero centrado genérico con blobs y gradientes morados.
•	Tres cards iguales con icono dentro de círculo de color.
•	Scroll reveal repetido idéntico en todas las secciones.
•	Tipografía sin personalidad con layout de plantilla.
•	WebGL metido a la fuerza sin integración.
•	Demasiadas animaciones simultáneas.
•	Lottie como parche para todo.
•	Ruido visual sin jerarquía.
•	Sitio espectacular en desktop e inusable en móvil.
•	Smooth scroll que rompe accesibilidad o input lag.
•	Microinteracciones exageradas en elementos secundarios.
Si parece una demo de librería, está mal.
---
Flujo de trabajo recomendado para el agente
Fase 1. Definición
•	Identificar tipo de experiencia.
•	Inferir tono, nivel de inmersión y densidad visual.
•	Definir stack técnico mínimo suficiente.
•	Establecer sistema tipográfico y paleta.
Fase 2. Sistema visual
•	Crear design tokens.
•	Crear layout base.
•	Definir librería de motion primitives.
•	Definir reglas de textura, profundidad y superficies.
Fase 3. Storyboard
•	Dividir la página en escenas o secciones.
•	Asignar una intención visual y una intención de interacción a cada sección.
•	Decidir dónde usar 3D, gráficos, vídeo o SVG.
Fase 4. Implementación
•	Construir primero estructura y composición.
•	Integrar motion después.
•	Añadir gráficos, texturas y shaders al final.
•	Optimizar responsive desde el inicio, no al final.
Fase 5. QA
Revisar:
•	Desktop y móvil.
•	Scroll real.
•	Contraste.
•	Reduced motion.
•	Performance.
•	Coherencia entre secciones.
•	Calidad de focus, hover y loading states.
---
Reglas de decisión para el agente
Si el usuario pide una web “alucinante”, “increíble” o “tipo Awwwards”, seguir estas reglas:
•	Elegir GSAP como motor principal.
•	Añadir Lenis si el scroll es parte de la narrativa.
•	Añadir Three.js o R3F solo si existe una escena que lo justifica.
•	Usar Tailwind más CSS custom y variables, no solo clases utilitarias sin sistema.
•	Elegir tipografías con personalidad real.
•	Diseñar con ritmo, capas y contraste antes de aplicar efectos.
•	Tratar el movimiento como sistema, no como colección de trucos.
•	Priorizar una experiencia coherente frente a una lista de features vistosas.
Si el usuario pide algo más ligero:
•	Reducir stack a Vite o Next.js + Tailwind + GSAP o Motion One.
•	Eliminar 3D si no es decisivo.
•	Mantener sofisticación en tipografía, composición y transiciones.
---
Boilerplate conceptual mínimo
Secuencia recomendada para cualquier página premium:
1.	Hero con idea visual dominante.
2.	Sección de transición que cambie ritmo o profundidad.
3.	Sección narrativa o de features con composición menos predecible.
4.	Punto culminante visual: gráfico, escena, media o interacción principal.
5.	Cierre limpio con CTA y salida elegante.
No repetir cinco secciones con la misma estructura.
---
Definición breve para el agente
Motion design para la web es la disciplina que combina diseño visual, animación, tipografía, interacción, narrativa y tecnología frontend para construir experiencias digitales con continuidad espacial, profundidad y respuesta sensible.
Creative coding es el uso expresivo del código para producir comportamientos visuales, generativos, interactivos o inmersivos.
Interactive web design es el diseño de interfaces y experiencias web donde la interacción no es un añadido, sino parte de la arquitectura perceptiva del producto.
---
Criterio final de calidad
La web resultante debe parecer diseñada por alguien con criterio visual y control técnico, no ensamblada desde una plantilla con efectos.
Si el resultado no podría competir visualmente con un portfolio premium, una landing editorial de alto nivel o una experiencia de showcase moderna, la ejecución no está terminada.