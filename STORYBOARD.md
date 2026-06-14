# Storyboard — Tour Virtual «La Casa de la Masa Madre»

Rediseño de `masamadre` como un **recorrido espacial por una panadería ilustrada**.
La panadería es la interfaz: el visitante entra desde la calle, cruza la fachada y
desciende por las estancias del edificio descubriendo historia, ciencia y oficio.

> Regla rectora: **inmersión alta, fricción baja**. La inmersión nunca destruye la lectura.

---

## Sistema de movimiento (centralizado en `src/lib/motion.ts`)

| Familia | Duración | Uso |
|---|---|---|
| `micro` | 120–220 ms | hover, focus, press, toggles |
| `component` | 240–420 ms | entradas/salidas de componentes, chips, tarjetas |
| `block` | 500–900 ms | reveals de bloque y titulares |
| `scene` | ligada al scroll | umbrales entre estancias, progreso del tour |

**Easings centralizados** (cubic-bezier):
- `enter` `0.16, 1, 0.3, 1` (expo-out) — entradas
- `exit` `0.7, 0, 0.84, 0` (expo-in) — salidas
- `move` `0.65, 0, 0.35, 1` (in-out) — desplazamientos espaciales / cámara
- `soft` `0.33, 1, 0.68, 1` — micro

Reglas: solo se anima `transform` y `opacity` (y `clip-path` para reveals).
`prefers-reduced-motion` desactiva umbrales y deja todo el contenido visible y estático.

---

## Sistema de orientación

- **Plano-sección vertical** fijo (desktop, lado derecho): el edificio dibujado como corte;
  cada estancia es una «planta». Un marcador «estás aquí» desciende con el scroll.
- **Salto rápido**: cada planta del plano es un enlace; navegación por teclado y `focus` visible.
- **Barra de progreso** del recorrido (hairline superior).
- **Móvil**: botón índice → hoja inferior con las estancias; el plano se colapsa en una brújula.

---

## Recorrido (escenas)

Cada escena conserva el contenido actual. `dir` = dirección de entrada de la cámara
(continuidad espacial): `forward` (desliza desde la derecha) o `down` (descenso).

### 0 · La Calle — Fachada `BakeryFacade`  (reemplaza `Hero`)
- **Objetivo narrativo**: establecer tono, época, materialidad y la promesa del recorrido.
- **Contenido**: título Masa Madre, tesis, CTA «Entrar».
- **Interacción**: clic en la puerta → la puerta se abre (clip-path + luz cálida) → cámara
  empuja al interior → scroll a la primera estancia.
- **Profundidad**: alta — capas calle/acera/fachada/puerta/interior con parallax de puntero.
- **Recursos**: SVG fachada (piedra, toldo, vitrinas con luz, letrero colgante, faroles).
- **Legibilidad**: el texto vive en su propia zona (cielo), nunca sobre el dibujo.
- **Móvil**: misma fachada reescalada; el título sobre banda de cielo; CTA grande.

### I · La Vitrina  →  `Origins`  (dir: forward)
- Ingredientes como piezas en vitrinas iluminadas. Corredor de entrada con marco-puerta.
- Profundidad media. Texturas: vidrio, madera, harina.

### II · El Pasillo del Tiempo  →  `Timeline`  (dir: forward)
- Mural longitudinal: la línea de tiempo como cinta dibujada en la pared del pasillo.
- SVG path drawing para la cinta temporal. Profundidad media.

### III · El Laboratorio  →  `Laboratory`  (dir: forward) — **pieza protagonista**
- Instalación visual narrativa: frascos, pizarra, tubos, burbujas, vapor; overlays técnicos.
- Explica propiedades físicas, actividad biológica, fermentación, hidratación, gluten,
  gases/temperatura/tiempos y la transformación masa→pan. **No es un dashboard.**
- Profundidad alta. Acento `phosphor` (datos de laboratorio).

### IV · La Vitrina de Panes  →  `BreadTypes`  (dir: forward)
- Mostrador con panes en exhibición. Tarjetas como piezas tras el vidrio.

### V · El Obrador  →  `Process` + `Composition`  (dir: forward)
- Mesa de trabajo activa: la secuencia del proceso + el banco técnico (calculadora,
  mezclas de harina y semillas) como herramientas sobre la mesa.

### VI · El Sótano · Horno de Leña  →  `Baking`  (dir: down) — **descenso**
- Se desciende al sótano: dramaturgia material fuerte (fuego, brasa, calor, vapor).
- Acento `ember`. Transición de entrada vertical (cámara baja).

### VII · La Despensa  →  `Benefits`  (dir: forward)
- Estanterías con tarros y sacos; los beneficios como etiquetas de despensa.

### VIII · La Biblioteca  →  `References`  (dir: forward)
- Archivo técnico / recetario animado (flip-book ya existente) en estantería.

### IX · La Salida  →  `Closing`  (dir: forward)
- Cierre cálido: la puerta de salida, agradecimiento, firma. CTA de retorno al inicio.

---

## Arquitectura técnica

```
src/lib/motion.ts            tokens de duración + easing + helpers GSAP
src/components/tour/
  BakeryFacade.tsx           escena de entrada (calle + fachada + puerta)
  RoomScene.tsx              envoltorio de estancia (umbral + backdrop + etiqueta)
  TourCompass.tsx            orientación: plano-sección + salto rápido + idioma
  RoomBackdrop.tsx           backdrop ambiental parametrizado por estancia (textura/props)
src/app/page.tsx             ensamblaje del recorrido
src/app/layout.tsx           SmoothScroll (Lenis) + atmósfera
```

Capas: **design tokens → layout → motion primitives → componentes → escenas → a11y/perf**.
No se concentra la lógica de animación en un archivo gigante; cada sistema se encapsula.

## Stack
Next.js 15 + React 19 + TS estricto · Tailwind + tokens · GSAP/ScrollTrigger (motor) ·
Lenis (scroll cinemático) · SVG inline para fachada, plano, murales y backdrops.
Sin 3D/WebGL: la profundidad se construye con capas, parallax medido, sombras y textura
(suficiente y con mejor rendimiento móvil; se reserva WebGL solo si una escena lo justifica).
