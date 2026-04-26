# AetherMind — Design System
_Claude Code must read this file before writing any UI component, screen, or style._

---

## Philosophy

The app must feel like entering a different mental state.
Every design decision serves one goal: **presence over interface**.

- Silence is a design element
- Depth over brightness
- Calm over busy
- Felt over functional

If a screen feels like a regular app, it's wrong.

---

## Colour tokens

```typescript
// constants/theme.ts — single source of truth
// NEVER use hardcoded hex values in component files

export const Colors = {
  // Backgrounds — layered depth system
  bg: {
    base:     '#0d0a1a', // deepest — screen background
    surface:  '#1a1228', // cards, modals
    elevated: '#231640', // hover states, selected cards
    overlay:  '#2d1e4a', // tooltips, popovers, speech bubbles
  },

  // Aether purple — primary accent
  purple: {
    soft:     '#c8bff8', // Aether body, light text on dark
    mid:      '#9b8be0', // secondary elements, inactive nav
    primary:  '#7F77DD', // primary interactive, score arcs
    strong:   '#6b55cc', // CTAs, active states, filled buttons
    deep:     '#534AB7', // pressed states, deep accents
    darkest:  '#3C3489', // badges on light surfaces
  },

  // Text
  text: {
    primary:   '#e8e0ff', // headings, primary body
    secondary: '#9988bb', // supporting text, descriptions
    tertiary:  '#5a4a78', // placeholders, captions, hints
    disabled:  '#3d2e5c', // disabled states
  },

  // Semantic
  success:   '#1D9E75',  // done states, positive signals
  warning:   '#BA7517',  // watch patterns, caution
  error:     '#E24B4A',  // errors, destructive actions
  gold:      '#F5C518',  // streak fire, breakthrough stars
  warmGlow:  '#FFB347',  // Aether celebration sparkles

  // Borders
  border: {
    subtle:  '#1e1830', // barely visible — card edges
    default: '#2e2040', // standard borders
    active:  '#4a3680', // focused inputs, selected items
  },

  // Aether glow — used for shadow/glow effects only
  glow: {
    soft:   'rgba(127, 119, 221, 0.15)', // ambient screen glow
    medium: 'rgba(127, 119, 221, 0.30)', // card glow on hover
    strong: 'rgba(200, 191, 248, 0.20)', // Aether body halo
    orb:    'rgba(255, 179, 71, 0.35)',  // chest orb glow
  },
}
```

---

## Typography

```typescript
export const Typography = {
  // Display — hero moments only (Meet Aether, ceremony screens)
  display: {
    size: 28,
    weight: '600',
    lineHeight: 36,
    letterSpacing: -0.5,
    color: Colors.text.primary,
  },

  // Heading — screen titles, section headers
  heading: {
    size: 22,
    weight: '500',
    lineHeight: 28,
    letterSpacing: -0.3,
    color: Colors.text.primary,
  },

  // Subheading — card titles, module names
  subheading: {
    size: 16,
    weight: '500',
    lineHeight: 22,
    color: Colors.text.primary,
  },

  // Body — main content text
  body: {
    size: 15,
    weight: '400',
    lineHeight: 22,
    color: Colors.text.secondary,
  },

  // Aether speech — Aether's words, always distinct
  aetherSpeech: {
    size: 15,
    weight: '400',
    lineHeight: 24,
    fontStyle: 'italic',     // Aether always speaks in italic
    color: Colors.text.primary,
  },

  // Caption — labels, timestamps, hints
  caption: {
    size: 12,
    weight: '400',
    lineHeight: 16,
    color: Colors.text.tertiary,
  },

  // Label — pills, badges, nav items
  label: {
    size: 11,
    weight: '500',
    lineHeight: 14,
    letterSpacing: 0.3,
    color: Colors.text.tertiary,
  },

  // CTA — button text only
  cta: {
    size: 15,
    weight: '600',
    lineHeight: 20,
    letterSpacing: 0.2,
    color: '#ffffff',
  },
}
```

**Font rules:**
- Aether ALWAYS speaks in italic — speech bubbles, insight cards, mirror letters
- No font sizes below 11px — ever
- Heading weight is 500, not 700 — this app is calm, not loud
- Never use ALL CAPS except for label/badge text

---

## Spacing system

```typescript
export const Space = {
  xs:   4,
  sm:   8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
  xxxl: 48,
}

// Screen edge padding: always 20px horizontal
// Section gap: always 24px between major sections
// Card internal padding: 12px top/bottom, 14px left/right
// Component gap: 8px between related elements
```

---

## Border radius

```typescript
export const Radius = {
  sm:   6,   // tags, small pills
  md:  10,   // inputs, small cards
  lg:  14,   // standard cards
  xl:  20,   // large modals, bottom sheets
  full: 999, // circular pills, avatar
}

// Rule: nothing in this app has sharp corners
// Minimum radius on any visible element: 6px
```

---

## Elevation / shadow system

```typescript
// React Native shadow props — always purple-tinted, never grey
export const Shadows = {
  // Subtle card lift
  card: {
    shadowColor: '#7F77DD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  // Aether character glow — applied to Image wrapper
  aetherGlow: {
    shadowColor: '#c8bff8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },

  // CTA button depth
  button: {
    shadowColor: '#6b55cc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },

  // Modal / bottom sheet
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
}
// Rule: shadows are ALWAYS purple-tinted — never black or grey
// Black shadows are forbidden. They break the palette.
```

---

## Component specifications

### Primary CTA button
```
Background:    Colors.purple.strong (#6b55cc)
Height:        54px
Border radius: 14px
Text:          Typography.cta
Shadow:        Shadows.button
Active state:  background → Colors.purple.deep (#534AB7), scale 0.97
Disabled:      opacity 0.4, shadow removed
Icon (if any): left of text, 18px, white
Full width:    always — CTAs span the screen
```

### Secondary / ghost button
```
Background:    transparent
Border:        1px solid Colors.border.active (#4a3680)
Height:        48px
Text:          Typography.body, color Colors.purple.soft
No shadow
Active state:  background → Colors.bg.elevated
```

### Card
```
Background:    Colors.bg.surface (#1a1228)
Border:        0.5px solid Colors.border.default (#2e2040)
Border radius: Radius.lg (14px)
Padding:       12px 14px
Shadow:        Shadows.card
```

### Input / text area
```
Background:    Colors.bg.elevated (#231640)
Border:        1px solid Colors.border.active (#4a3680)
Border radius: Radius.md (10px)
Padding:       12px 14px
Text:          Typography.body, color Colors.text.primary
Placeholder:   Typography.body, color Colors.text.tertiary
Focus border:  Colors.purple.primary (#7F77DD)
Error border:  Colors.error (#E24B4A)
Error message: Typography.caption, color Colors.error, below field
```

### Speech bubble (Aether speaks)
```
Background:    Colors.bg.overlay (#2d1e4a)
Border:        0.5px solid Colors.purple.deep (#534AB7)
Border radius: 14px 14px 14px 4px  ← tail bottom-left always
Padding:       10px 14px
Text:          Typography.aetherSpeech (italic, #e8e0ff)
Max width:     80% of screen width
Tail:          points toward Aether's position on screen
```

### Tag / pill
```
Background:    Colors.bg.elevated
Border radius: Radius.full
Padding:       3px 10px
Text:          Typography.label
Variants:
  - default:   bg #231640, text Colors.text.tertiary
  - purple:    bg #EEEDFE (light) or #2d1e4a (dark), text #3C3489 / #c8bff8
  - success:   bg #E1F5EE, text #085041
  - warning:   bg #FAEEDA, text #633806
  - error:     bg #FCEBEB, text #791F1F
```

### Bottom navigation bar
```
Background:    Colors.bg.surface with top border Colors.border.subtle
Height:        60px + safe area inset
Tab item:      icon 22px + label Typography.label
Active:        icon + label Colors.purple.primary
Inactive:      icon + label Colors.text.tertiary
Active indicator: 2px top border on active tab, Colors.purple.primary
No background pill on active tab — just colour change
```

### Module card (home screen)
```
Background:    Colors.bg.elevated (#231640)
Border radius: Radius.lg
Padding:       12px
Status done:   left border 2px Colors.success, icon ✓ green
Status pending: left border 2px Colors.border.active
Status locked: opacity 0.5, lock icon visible
```

### Progress dots (onboarding)
```
Completed dot:  8px, filled Colors.purple.primary
Current dot:    10px, filled Colors.purple.soft, subtle pulse animation
Future dot:     8px, filled Colors.border.default
Gap between:    8px
Position:       top of screen, below status bar
```

---

## Aether component

### Size system
```
Small  (32×32px):   home corner, notification, profile pic
Medium (80×80px):   check-in, reflection, speech screens
Large  (160×160px): onboarding meet-Aether, ceremony, full-screen moment
```

### Glow overlay (Reanimated — applied over PNG)
```javascript
// Always add this animated glow layer on top of any Aether PNG
const glowAnim = useSharedValue(0.6)

// On mount: start breathing loop
useEffect(() => {
  glowAnim.value = withRepeat(
    withSequence(
      withTiming(1.0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) })
    ), -1, false
  )
}, [])

const glowStyle = useAnimatedStyle(() => ({
  shadowOpacity: glowAnim.value * 0.3,
  shadowRadius:  glowAnim.value * 28,
}))
```

### Float animation (medium + large only)
```javascript
const floatAnim = useSharedValue(0)

useEffect(() => {
  floatAnim.value = withRepeat(
    withSequence(
      withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      withTiming(0,  { duration: 2000, easing: Easing.inOut(Easing.ease) })
    ), -1, false
  )
}, [])

const floatStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: floatAnim.value }]
}))
```

### Entrance animation (any Aether appearance)
```javascript
// Spring entrance from below — use on every screen where Aether appears
const scale   = useSharedValue(0)
const opacity = useSharedValue(0)
const translateY = useSharedValue(30)

useEffect(() => {
  scale.value    = withSpring(1, { damping: 14, stiffness: 120 })
  opacity.value  = withTiming(1, { duration: 400 })
  translateY.value = withSpring(0, { damping: 14, stiffness: 120 })
}, [])
```

### Expression to PNG mapping
```typescript
// constants/images.ts
export const AetherImages = {
  idle:        require('../assets/images/aether/aether-idle.png'),
  happy:       require('../assets/images/aether/aether-happy.png'),
  curious:     require('../assets/images/aether/aether-curious.png'),
  empathetic:  require('../assets/images/aether/aether-empathetic.png'),
  thinking:    require('../assets/images/aether/aether-thinking.png'),
  celebrating: require('../assets/images/aether/aether-celebrating.png'),
  speaking:    require('../assets/images/aether/aether-speaking.png'),
  waiting:     require('../assets/images/aether/aether-waiting.png'),
}
// All PNGs: transparent background, @1x @2x @3x variants
// React Native auto-resolves density from base filename
```

---

## Animation principles

### Timing
```
Instant feedback:  150ms  — tap states, toggles
Quick transition:  280ms  — screen fades, card reveals
Standard:          350ms  — modal entry, content appear
Deliberate:        500ms  — Aether entrance, ceremony moments
Breathing:        2000ms  — orb pulse, float loop
```

### Easing
```
UI elements:   Easing.out(Easing.ease)   — snappy, responsive
Aether:        Easing.inOut(Easing.ease) — organic, alive
Spring:        damping 14, stiffness 120 — Aether entrances
```

### Rules
- Screen transitions: cross-fade opacity only — no slide on dark backgrounds (creates flash)
- Aether always enters with spring from below — never pop in instantly
- Speech bubble: scale from origin point near Aether, then text types in
- Loading state: Aether thinking expression + 3-dot pulse (never a spinner)
- Success moments: Aether celebrating + score arc animates to new value
- Never animate more than 2 elements simultaneously

---

## Iconography

```
Library:        react-native-vector-icons (Feather set)
Size:           22px in nav, 18px in cards, 16px inline
Color:          match text context — primary/secondary/tertiary
Style:          line icons only — no filled icons except for active nav tab
Stroke width:   1.5px
```

**Custom icons needed (not in Feather):**
- Aether orb (chest) — custom SVG circle with glow
- Belief arc progress — custom SVG arc component
- Streak flame — Lottie animation
- Sparkle burst — Lottie animation

---

## Screen layout rules

```
Status bar:        dark content, transparent background
Screen bg:         always Colors.bg.base (#0d0a1a)
Horizontal padding: 20px both sides — every screen
Top padding:       16px below status bar
Bottom padding:    20px + safe area inset
Section spacing:   24px between major sections
Scroll:            ScrollView with showsVerticalScrollIndicator={false}
Keyboard:          KeyboardAvoidingView on all screens with inputs
```

---

## States — every interactive element needs all four

```
Default  → standard appearance
Active   → scale(0.97) + darker background, haptic feedback
Disabled → opacity 0.4, no shadow, not pressable
Loading  → Aether thinking expression, not a spinner
```

**Haptics rule:** Every CTA tap triggers `Haptics.impactAsync(ImpactFeedbackStyle.Light)`. Milestone moments (belief resolved, 30-day ceremony) trigger `ImpactFeedbackStyle.Heavy`.

---

## What is forbidden

These are hard rules. No exceptions.

```
✗ White backgrounds — anywhere
✗ Light mode — not in MVP
✗ Grey shadows — always purple-tinted
✗ Sharp corners — minimum 6px radius always
✗ Hardcoded hex values in component files
✗ Font size below 11px
✗ Bold (700 weight) headings — use 500 or 600 max
✗ Generic loading spinners — Aether thinking always
✗ Slide transitions between screens — cross-fade only
✗ "Advice" as a label for Aether's output — always "Insight"
✗ Bright white text on purple backgrounds — use #e8e0ff
✗ More than 2 simultaneous animations
✗ Any element without a loading and empty state designed
```

---

## Claude Code usage

When building any UI component or screen:

1. Import colours from `constants/theme.ts` — never hardcode
2. Import images from `constants/images.ts` — never inline require
3. Use `Space.*` for all padding/margin values
4. Use `Radius.*` for all borderRadius values
5. Use `Typography.*` for all text styles
6. Apply `Shadows.card` to every card-like surface
7. Wrap every Aether PNG in the glow + float animation
8. Use Aether `thinking` expression as the loading state — never ActivityIndicator
9. Apply `Haptics.impactAsync` on every primary CTA press
10. Every screen must handle: loading state, empty state, error state

**Reference prompt pattern for Claude Code:**
```
Read @DESIGN_SYSTEM.md before writing any UI.
Use only colours from Colors.*, spacing from Space.*,
radius from Radius.*, typography from Typography.*.
No hardcoded values. No white backgrounds. No grey shadows.
Aether always floats, always glows, always enters with spring.
```
