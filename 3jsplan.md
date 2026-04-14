# Three.js Hero Visualization Plan — The Orchestration Stack

## Overview

A full-viewport 3D visualization that sits behind the hero text, replacing or layering with the current video background. It visualizes the investor IDE's core architecture: five translucent glass planes stacked vertically with luminous data particles flowing between them.

The concept directly maps to the product's 5-layer system (Connectors → Canonical Data Model → Agent Runtime → Approval Layer → Firm Memory) and communicates the "orchestration engine" positioning without being literal or dashboard-like.

**One-liner**: A slowly rotating stack of translucent layers with data particles flowing upward — like watching an engine think.

---

## Visual Design

### The Stack Structure

Five horizontal planes arranged vertically with even spacing. Each plane is a rounded rectangle (roughly 16:9 aspect ratio) made of translucent glass material. The stack is viewed at a slight isometric angle (~25° tilt, ~15° rotation) so all five layers are visible simultaneously.

```
        ┌─────────────────────────┐  ← Layer 5: Firm Memory
        │  ·  ·  neural mesh  ·  │
        └─────────────────────────┘
                    ↑ particles
        ┌─────────────────────────┐  ← Layer 4: Approval Layer
        │    ◇ gate/checkpoint ◇  │
        └─────────────────────────┘
                    ↑ particles
        ┌─────────────────────────┐  ← Layer 3: Agent Runtime
        │  ○  ○  orbiting  ○  ○  │
        └─────────────────────────┘
                    ↑ particles
        ┌─────────────────────────┐  ← Layer 2: Data Model
        │  ◆──◆──◆  graph  ◆──◆  │
        └─────────────────────────┘
                    ↑ particles
        ┌─────────────────────────┐  ← Layer 1: Connectors
        │  □  □  □  tiles  □  □  │
        └─────────────────────────┘
```

### Layer Details

**Layer 1 — Connectors (bottom)**

- A ring of 8-10 small cubes (tiles) floating just above the plane surface
- Each tile represents a tool: Gmail, Calendar, Affinity, PitchBook, Slack, etc.
- Tiles have a faint icon etched on one face (via texture or simple geometry)
- Subtle bob animation (each tile floats up/down 2px at different phases)
- Color: Cool blue-white glow (`rgba(147, 197, 253, 0.4)`)

**Layer 2 — Canonical Data Model**

- A small 3D force-directed graph sitting on the plane
- 11 small spheres (Person, Company, Deal, Meeting, Memo, Thesis, Fund, LP, Portfolio, KPI, Task)
- Connected by thin luminous edges
- Graph slowly rotates in place
- Color: White with slight warm tint (`rgba(250, 250, 250, 0.6)`)

**Layer 3 — Agent Runtime**

- 7 glowing orbs of varying size orbiting a central point
- Each orb represents an agent: Scout, Mapper, Analyst, Memo, Operator, Portfolio, IR
- Orbits at different radii and speeds — feels like electrons around a nucleus
- Orbs leave faint motion trails
- Color: Purple-violet accent (`rgba(139, 92, 246, 0.5)`)

**Layer 4 — Approval Layer**

- A translucent barrier/gate spanning the plane
- Two thin vertical lines with a gap in the center (like a checkpoint)
- Small diamond/rhombus shapes drift through the gap (representing approved actions)
- Blocked items bounce off the barrier gently
- Color: Amber/gold for approved items, dim red for blocked (`rgba(251, 191, 36, 0.5)`)

**Layer 5 — Firm Memory (top)**

- A neural network mesh — interconnected nodes pulsing with subtle light
- Nodes brighten when "receiving" a particle from below
- The mesh slowly evolves (connections form and dissolve)
- Most ethereal/transparent of all layers
- Color: Soft white with purple highlights (`rgba(255, 255, 255, 0.3)`)

### Data Flow Particles

Luminous particles travel upward from Layer 1 through each layer:

- **Shape**: Tiny spheres (radius 0.02-0.05) with emissive glow
- **Path**: Vertical with slight bezier curves (not straight lines — organic movement)
- **Behavior**: Particles slow down briefly at each layer (processing), then accelerate upward
- **Color**: Start as cool blue at bottom, shift to warm white/purple at top
- **Count**: 30-50 active particles at any time
- **Speed**: ~3-4 seconds for a particle to travel the full stack
- **Spawn rate**: 8-12 particles per second from random connector tiles

### Glass Planes

Each layer's base plane should look like frosted glass:

- **Material**: `MeshPhysicalMaterial` with `transmission: 0.6`, `roughness: 0.3`, `thickness: 0.1`
- **Edge highlight**: Thin bright edge (emissive line along perimeter)
- **Size**: Each plane is ~6 units wide × 3.5 units tall × 0.05 units thick
- **Spacing**: 2.5 units between each layer
- **Corner radius**: Rounded corners (use `RoundedBox` from drei)

---

## Color & Lighting

### Palette

| Element          | Color                               | Opacity   |
| ---------------- | ----------------------------------- | --------- |
| Background       | `#09090b` (match site)              | 1.0       |
| Glass planes     | `#ffffff`                           | 0.03-0.06 |
| Plane edge glow  | `#ffffff`                           | 0.2       |
| Connectors       | `#93c5fd` (blue-200)                | 0.4       |
| Data Model nodes | `#fafafa`                           | 0.6       |
| Agent orbs       | `#8b5cf6` (violet-500)              | 0.5       |
| Approval gate    | `#fbbf24` (amber-400)               | 0.5       |
| Memory mesh      | `#ffffff` with `#8b5cf6` pulse      | 0.3       |
| Particles        | gradient from `#93c5fd` → `#c4b5fd` | 0.7       |

### Lighting Setup

- **Ambient**: Low intensity (0.15) — the scene should feel dark and atmospheric
- **Point light 1**: Above and slightly right, cool white, intensity 0.8
- **Point light 2**: Below and left, subtle purple tint, intensity 0.3
- **No directional light** — point lights create depth and avoid flat rendering
- **Bloom post-processing**: Subtle bloom on emissive elements (particles, orb trails, plane edges). Intensity 0.8, threshold 0.6.

---

## Animation & Interaction

### Ambient (always running)

| Element          | Animation                               | Duration                | Easing        |
| ---------------- | --------------------------------------- | ----------------------- | ------------- |
| Entire stack     | Slow Y-axis rotation                    | 60s per revolution      | linear        |
| Entire stack     | Gentle float (Y oscillation ±0.3 units) | 6s                      | easeInOut     |
| Connector tiles  | Individual bob (±0.1 units, staggered)  | 2-3s each               | easeInOut     |
| Agent orbs       | Orbit around center point               | 4-8s per orbit (varies) | linear        |
| Data model graph | Slow rotation                           | 20s                     | linear        |
| Memory mesh      | Node pulse (brightness oscillation)     | 3-5s per node           | easeInOut     |
| Particles        | Upward flow with layer pauses           | 3-4s full traverse      | custom bezier |

### Mouse Interaction

- **Parallax**: Mouse position shifts the camera slightly (±2 units X, ±1 unit Y). Creates depth perception without orbit controls.
- **No click interaction**: This is a background element — it should never steal focus from the CTA.
- **No orbit controls**: Users shouldn't be able to spin the model. Parallax only.

### Scroll Behavior

- As user scrolls down through the hero, the stack fades out (`opacity: 0` over 30% scroll)
- The stack also translates slightly upward (parallax with page content)
- Below the fold: rendering pauses (`frameloop="demand"` or visibility check)

### Entrance Animation

On page load, after the hero text stagger completes (~0.5s):

1. Stack fades in from `opacity: 0` to `opacity: 1` over 800ms
2. Layers enter one by one from bottom to top (100ms stagger between each)
3. Each layer scales from 0.9 → 1.0 as it enters
4. Particles begin flowing 200ms after the last layer appears
5. Total entrance: ~1.5s

---

## Technical Architecture

### Stack

```
@react-three/fiber (R3F)     — React renderer for Three.js
@react-three/drei            — Helpers: RoundedBox, MeshTransmissionMaterial, Float, Trail
@react-three/postprocessing  — Bloom effect
three                        — Core library
```

### Component Structure

```
<Canvas>
  ├── <ambientLight />
  ├── <pointLight /> × 2
  ├── <OrchestrationStack>
  │   ├── <GlassPlane layer={1} />
  │   │   └── <ConnectorTiles />
  │   ├── <GlassPlane layer={2} />
  │   │   └── <DataModelGraph />
  │   ├── <GlassPlane layer={3} />
  │   │   └── <AgentOrbs />
  │   ├── <GlassPlane layer={4} />
  │   │   └── <ApprovalGate />
  │   └── <GlassPlane layer={5} />
  │       └── <MemoryMesh />
  ├── <DataParticles />         ← InstancedMesh for all particles
  └── <EffectComposer>
      └── <Bloom />
  </EffectComposer>
</Canvas>
```

### Performance Requirements

| Metric          | Target                                 |
| --------------- | -------------------------------------- |
| Draw calls      | < 50                                   |
| FPS desktop     | 60                                     |
| FPS mobile      | 30+ (or static fallback)               |
| Total JS bundle | < 200KB gzipped (three.js tree-shaken) |
| Initial load    | Canvas renders within 1s of page load  |

### Performance Strategy

1. **InstancedMesh for particles**: All 30-50 particles rendered in 1 draw call
2. **InstancedMesh for connector tiles**: 10 cubes = 1 draw call
3. **Shared materials**: All glass planes share one `MeshPhysicalMaterial` instance
4. **`frameloop="demand"`**: Only render when animating or visible
5. **`PerformanceMonitor`** from drei: Dynamic DPR scaling (2 → 1.5 → 1 based on FPS)
6. **Visibility check**: Stop rendering when hero is scrolled out of viewport
7. **No object creation in `useFrame`**: Pre-allocate all `Vector3`, `Matrix4`, `Object3D` instances

### Mobile Fallback

On viewports < 768px or devices without WebGL2:

- **Do not render the Canvas at all**
- Fall back to the existing video background + ambient gradient orb (already in place)
- Detection: check `window.innerWidth` + `renderer.capabilities.isWebGL2` on mount

```tsx
const [canRender3D, setCanRender3D] = useState(false);

useEffect(() => {
  const isDesktop = window.innerWidth >= 768;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");
  setCanRender3D(isDesktop && !!gl);
}, []);

// In JSX:
{
  canRender3D ? <OrchestrationCanvas /> : <VideoBackground />;
}
```

### Accessibility

- Canvas element gets `aria-hidden="true"` — it's decorative
- All text remains in normal DOM above the canvas (not rendered in WebGL)
- `prefers-reduced-motion`: Disable all animation, show static snapshot of the stack
- Fallback for screen readers: The 3D adds zero semantic content

---

## Integration with Current Hero

The 3D canvas replaces the current video background. The layering becomes:

```
z-0:  <Canvas> (Three.js scene — full viewport, position absolute)
z-1:  Dark overlay div (bg-black/40 — reduced from 60% since 3D is already dark)
z-2:  Ambient gradient orb (existing breathing animation)
z-3:  Navbar + hero text + CTA (existing content, unchanged)
z-4:  Bottom gradient fade (existing)
```

The hero text, badge, subtitle, and CTA button remain exactly as they are. Only the background layer changes.

---

## File Structure

```
apps/fe/
├── app/
│   ├── components/
│   │   └── three/
│   │       ├── OrchestrationCanvas.tsx    ← Main canvas wrapper + mobile check
│   │       ├── OrchestrationStack.tsx     ← Stack group + ambient rotation
│   │       ├── GlassPlane.tsx             ← Single translucent plane
│   │       ├── ConnectorTiles.tsx         ← Layer 1 content
│   │       ├── DataModelGraph.tsx         ← Layer 2 content
│   │       ├── AgentOrbs.tsx              ← Layer 3 content
│   │       ├── ApprovalGate.tsx           ← Layer 4 content
│   │       ├── MemoryMesh.tsx             ← Layer 5 content
│   │       └── DataParticles.tsx          ← Instanced particle system
│   └── sections/
│       └── Hero.tsx                       ← Updated to conditionally render canvas
```

---

## Implementation Order

1. **Phase 1 — Scaffolding**: Install R3F deps, create `OrchestrationCanvas` with a single spinning cube to verify rendering works inside the hero
2. **Phase 2 — Glass planes**: Build `GlassPlane` component with transmission material, stack 5 of them with proper spacing
3. **Phase 3 — Particles**: Build `DataParticles` with InstancedMesh, flowing upward between layers
4. **Phase 4 — Layer content**: Add ConnectorTiles, DataModelGraph, AgentOrbs, ApprovalGate, MemoryMesh one at a time
5. **Phase 5 — Polish**: Add bloom, mouse parallax, entrance animation, scroll fade, performance monitor
6. **Phase 6 — Mobile**: Add WebGL2 detection, mobile fallback to video background

Each phase should be independently shippable. Phase 1-3 alone creates a compelling visual.

---

## What This Communicates

A visitor seeing this for the first time should intuitively understand:

- **This is a system with layers** — not a chatbot, not a dashboard
- **Data flows through structured processing** — not random AI magic
- **It's an engine, not a tool** — orchestration, not point-solution
- **It's premium and technical** — built for professionals who understand systems

The 3D visualization is the visual embodiment of the doc's core thesis: "A workspace + command layer + memory + action engine."
