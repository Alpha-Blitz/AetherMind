# AetherMind — Design System v1.2
# Sources:
#   Design Dashboard v1.1 (colour, typography, gradients, shadows, spacing)
#   Component Library (buttons, cards, inputs, chips, navigation, all 18 component sections)
# Claude Code: read this ENTIRE file before writing any UI component or screen.
# Every value is extracted directly from the official design files.
# Do not approximate. Do not invent. Do not deviate.

---

## PHILOSOPHY

The app must feel like entering a different mental state.
Usage principles from component library:
- Consistent · Familiar · Friendly
- Clear hierarchy
- Accessible and inclusive
- Delight in the details

---

## SECTION 1 — COLOUR SYSTEM

### Backgrounds
```
BG Primary:  #070A14   (deepest — all screen backgrounds)
Surface:     #131A30   (cards, modals, surfaces)
Elevated:    #1A2140   (inputs, elevated cards, overlays)
```

### Accents
```
Primary Purple: #7C6CFF   (CTAs, active nav, focus, belief arc)
Primary Orange: #FF9F43   (streaks, achievements, celebrations, energy)
```

### Supporting shades
```
Purple Soft:  #B6A8FF
Purple Deep:  #5A4BFF
Orange Light: #FFD6A0
Orange Deep:  #FF7A00
Success:      #4ADE80
Info:         #4DABFF
Warning:      #FFC43D
Error:        #FF4D6D
```

### Text
```
Primary:   #E8ECFF   (headings, body — never pure white)
Secondary: #AAB0D6   (supporting, descriptions)
Muted:     #6B7199   (placeholders, captions, disabled)
```

### TypeScript tokens
```typescript
// constants/theme.ts
export const Colors = {
  bg: {
    primary:  '#070A14',
    surface:  '#131A30',
    elevated: '#1A2140',
  },
  purple: {
    primary: '#7C6CFF',
    soft:    '#B6A8FF',
    deep:    '#5A4BFF',
  },
  orange: {
    primary: '#FF9F43',
    light:   '#FFD6A0',
    deep:    '#FF7A00',
  },
  success: '#4ADE80',
  info:    '#4DABFF',
  warning: '#FFC43D',
  error:   '#FF4D6D',
  text: {
    primary:   '#E8ECFF',
    secondary: '#AAB0D6',
    muted:     '#6B7199',
  },
}
```

### Colour role rules
```
Purple (#7C6CFF) = primary actions, navigation, focus, belief progress
Orange (#FF9F43) = streaks, achievements, celebrations, energy
NEVER orange on navigation or standard CTAs
NEVER purple on streak counts, fire, or celebration elements
NEVER pure #FFFFFF — always #E8ECFF for lightest text
NEVER hardcode hex in components — always Colors.*
```

---

## SECTION 2 — GRADIENTS AND GLOWS

### Background gradient
```
Type:   Radial
Center: #141938
Outer:  #070A14
```

### Glow effects
```
Purple Glow: rgba(124, 108, 255, 0.25) — Aether halo, active CTAs, focus
Orange Glow: rgba(255, 159, 67, 0.35)  — streaks, celebrations, achievements
Keep opacity LOW (20–30%) for soft, premium feel
```

### Shadow tokens
```typescript
export const Shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#20104C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius: 30,
    elevation: 8,
  },
  purpleGlow: {
    shadowColor: '#7C6CFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  orangeGlow: {
    shadowColor: '#FF9F43',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 10,
  },
}
```

---

## SECTION 3 — TYPOGRAPHY (Inter — only font)

```
Install: expo install @expo-google-fonts/inter expo-font
Fonts:   Inter_400Regular · Inter_500Medium · Inter_600SemiBold
```

### Type scale
```
H1:         SemiBold 600  /  32px  /  38px line-height  (120%)
H2:         SemiBold 600  /  24px  /  29px line-height  (120%)
H3:         Medium   500  /  20px  /  24px line-height  (120%)
H4:         Medium   500  /  18px  /  23px line-height  (130%)
Body Large: Regular  400  /  16px  /  24px line-height  (150%)
Body:       Regular  400  /  14px  /  21px line-height  (150%)
Caption:    Medium   500  /  12px  /  18px line-height  (150%)
```

### TypeScript tokens
```typescript
export const Typography = {
  h1:        { fontSize: 32, fontWeight: '600' as const, lineHeight: 38, fontFamily: 'Inter_600SemiBold', color: '#E8ECFF' },
  h2:        { fontSize: 24, fontWeight: '600' as const, lineHeight: 29, fontFamily: 'Inter_600SemiBold', color: '#E8ECFF' },
  h3:        { fontSize: 20, fontWeight: '500' as const, lineHeight: 24, fontFamily: 'Inter_500Medium',   color: '#E8ECFF' },
  h4:        { fontSize: 18, fontWeight: '500' as const, lineHeight: 23, fontFamily: 'Inter_500Medium',   color: '#E8ECFF' },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24, fontFamily: 'Inter_400Regular',  color: '#AAB0D6' },
  body:      { fontSize: 14, fontWeight: '400' as const, lineHeight: 21, fontFamily: 'Inter_400Regular',  color: '#AAB0D6' },
  caption:   { fontSize: 12, fontWeight: '500' as const, lineHeight: 18, fontFamily: 'Inter_500Medium',   color: '#6B7199' },
  aetherSpeech: {
    fontSize: 16, fontWeight: '400' as const, lineHeight: 24,
    fontFamily: 'Inter_400Regular', fontStyle: 'italic' as const, color: '#E8ECFF',
  },
  cta: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20, fontFamily: 'Inter_600SemiBold', color: '#FFFFFF' },
}
```

### Typography rules
```
Inter is the ONLY font — no system fonts, no other families
Aether ALWAYS speaks in italic — every speech bubble, insight card, mirror letter
No font sizes below 12px
Maximum weight is 600 (SemiBold) — NEVER 700 (bold)
```

---

## SECTION 4 — ICON SYSTEM

```
Library:      react-native-vector-icons Feather set
Style:        Outline only — never filled (except active nav tab)
Stroke:       2px consistent
Corners:      Rounded
```

```typescript
export const IconSize = { sm: 16, md: 22, lg: 28 }
// Active/primary:  #7C6CFF
// Default:         #AAB0D6
// Muted/inactive:  #6B7199
// Streak/energy:   #FF9F43
// Success:         #4ADE80
// Error:           #FF4D6D
```

---

## SECTION 5 — SPACING AND RADIUS

```typescript
export const Space = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 24,
  6: 40, 7: 48, 8: 64, 9: 80, 10: 96, 11: 128,
}

export const Layout = {
  screenPaddingH: 20,
  screenPaddingT: 16,
  screenPaddingB: 20,
  sectionGap:     24,
  cardPadding:    16,
  componentGap:    8,
}

export const Radius = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32, full: 9999,
}
// Minimum radius on any visible element: 4px — no sharp corners ever
```

---

## SECTION 6 — COMPONENT LIBRARY

### 1. BUTTONS

#### Primary button
```
States: Default · Hover · Pressed · Disabled

Default:
  background:    #7C6CFF
  border-radius: 10px
  height:        44px
  padding:       0 20px
  text:          Typography.cta (14px SemiBold white)
  shadow:        Shadows.purpleGlow

Hover (finger held):
  background:    #8B7EFF  (slightly lighter)
  shadow:        Shadows.purpleGlow increased opacity

Pressed (active):
  background:    #5A4BFF  (Colors.purple.deep)
  transform:     scale(0.97)
  haptic:        ImpactFeedbackStyle.Light

Disabled:
  background:    #7C6CFF at opacity 0.4
  shadow:        none
  not pressable
```

#### Secondary button
```
States: Default · Hover · Pressed · Disabled

Default:
  background:    transparent
  border:        1px solid #7C6CFF
  border-radius: 10px
  height:        44px
  padding:       0 20px
  text:          Typography.cta colour #7C6CFF

Hover:    border-color → #8B7EFF, text → #8B7EFF
Pressed:  background → rgba(124,108,255,0.1), scale(0.97)
Disabled: opacity 0.4
```

#### Tertiary / Text button
```
States: Default · Hover · Disabled

Default:
  background:    transparent
  height:        36px
  text:          Typography.body colour #AAB0D6
  no border, no shadow

Hover:    text → #E8ECFF
Disabled: opacity 0.4
Label:    "View all" style — inline text links
```

#### Icon button
```
States: Default · Hover · Pressed · Disabled

Default:
  background:    #1A2140 (Colors.bg.elevated)
  border:        1px solid rgba(124,108,255,0.25)
  border-radius: 50% (full circle)
  size:          44px × 44px
  icon:          22px, colour #7C6CFF
  shadow:        Shadows.sm

Hover:    border-color → #7C6CFF
Pressed:  background → rgba(124,108,255,0.15), scale(0.95)
Disabled: opacity 0.4, icon → #6B7199
```

---

### 2. CARDS

#### Default card
```
background:    #131A30 (Colors.bg.surface)
border:        0.5px solid rgba(124,108,255,0.15)
border-radius: 14px
padding:       16px
shadow:        Shadows.sm
Layout:        icon (purple, 18px) + title (H4) + supporting text (body) + chevron right
```

#### Elevated card
```
background:    #1A2140 (Colors.bg.elevated)
border:        0.5px solid rgba(124,108,255,0.25)
border-radius: 14px
padding:       16px
shadow:        Shadows.md
Layout:        same as default card, slightly lifted
```

#### Interactive / Hover card
```
background:    #1A2140
border:        1px solid #FF9F43 (orange — this is what makes it interactive)
border-radius: 14px
padding:       16px
shadow:        Shadows.orangeGlow
Layout:        orange icon left + title + supporting text + chevron
Used for:      achievement cards, streak cards, tappable feature cards
```

#### Large Feature card (with Aether)
```
background:    #131A30
border:        0.5px solid rgba(124,108,255,0.15)
border-radius: 16px
padding:       20px
Layout:
  Left side:   headline text (H3 white) + subtext (body) + primary button
  Right side:  Aether image small/medium floating
Example text:  "You're doing great!" / "Small steps create big change."
Button:        "View progress" — primary style
```

#### Gradient card
```
background:    linear gradient from #1A2140 to #131A30
border:        0.5px solid rgba(124,108,255,0.20)
border-radius: 14px
padding:       16px
icon:          orange flame or purple star top-right area
Used for:      premium upsell, featured content
```

#### Status card
```
background:    #131A30
border:        0.5px solid rgba(124,108,255,0.15)
border-radius: 14px
padding:       14px 16px
Layout:        left icon circle (purple bg) + label text + status chip right
Example:       "Morning check-in" + Pending chip
```

---

### 3. INPUTS

#### Text input — Default
```
background:    #1A2140 (Colors.bg.elevated)
border:        1px solid rgba(124,108,255,0.20)
border-radius: 10px
height:        48px
padding:       0 16px
text:          Typography.bodyLarge colour #E8ECFF
placeholder:   Typography.bodyLarge colour #6B7199
right icon:    search/magnifier 16px colour #6B7199
```

#### Text input — Focused
```
border:        1px solid #7C6CFF (full purple)
shadow:        Shadows.lg
right icon:    person/profile 16px colour #7C6CFF
background:    #1A2140 (unchanged)
```

#### Text input — Filled (has content)
```
border:        1px solid rgba(124,108,255,0.40)
right icon:    × (clear) 16px colour #AAB0D6
content text:  Typography.bodyLarge colour #E8ECFF
Example:       "Reflections help me grow."
```

#### Text input — Disabled
```
background:    #131A30 (darker, surface colour)
border:        1px solid rgba(124,108,255,0.10)
text:          #6B7199
placeholder:   "Cannot edit"
opacity:       0.6
```

#### Text area
```
background:    #1A2140
border:        1px solid rgba(124,108,255,0.20)
border-radius: 10px
min-height:    100px
padding:       12px 16px
text:          Typography.body colour #E8ECFF
placeholder:   "Share your thoughts..."
resize handle: bottom-right corner, subtle
```

---

### 4. CHIPS / TAGS

#### Filter chips (single row, horizontally scrollable)
```
Active filter chip:
  background:    #7C6CFF
  border-radius: 999px
  padding:       6px 14px
  text:          Typography.caption weight 600 white
  Example:       "All"

Inactive filter chip:
  background:    transparent
  border:        1px solid rgba(124,108,255,0.30)
  border-radius: 999px
  padding:       6px 14px
  text:          Typography.caption colour #AAB0D6
  Examples:      "Check-ins" · "Reflections" · "Plans"
```

#### Status chips
```
Pending:
  background:    rgba(255,196,61,0.15)
  border:        1px solid #FFC43D
  border-radius: 999px
  padding:       4px 10px
  text:          Typography.caption colour #FFC43D
  right icon:    → arrow 12px

Done:
  background:    rgba(74,222,128,0.15)
  border:        1px solid #4ADE80
  border-radius: 999px
  padding:       4px 10px
  text:          Typography.caption colour #4ADE80

In progress:
  background:    rgba(77,171,255,0.15)
  border:        1px solid #4DABFF
  border-radius: 999px
  padding:       4px 10px
  text:          Typography.caption colour #4DABFF

Locked:
  background:    rgba(107,113,153,0.15)
  border:        1px solid #6B7199
  border-radius: 999px
  padding:       4px 10px
  text:          Typography.caption colour #6B7199
  left icon:     lock 12px
```

---

### 5. TOGGLES, CHECKBOXES AND RADIOS

#### Toggle switch
```
On state:
  track:         #7C6CFF, width 44px, height 24px, radius 999px
  thumb:         white circle 20px, right side, shadow Shadows.sm

Off state:
  track:         #1A2140, border 1px rgba(124,108,255,0.30)
  thumb:         #6B7199 circle 20px, left side

Disabled:
  track:         #131A30
  thumb:         #3A3A4A
  opacity:       0.5
```

#### Checkbox
```
Selected:
  background:    #7C6CFF
  border:        none
  border-radius: 4px
  size:          20px × 20px
  icon:          white checkmark

Unselected:
  background:    transparent
  border:        1.5px solid #AAB0D6
  border-radius: 4px
  size:          20px × 20px

Disabled:
  background:    #1A2140
  border:        1.5px solid #6B7199
  opacity:       0.5
```

#### Radio button
```
Selected:
  outer ring:    2px solid #7C6CFF, size 20px, radius full
  inner dot:     8px circle #7C6CFF, centred

Unselected:
  outer ring:    1.5px solid #AAB0D6, size 20px, radius full
  no inner dot

Disabled:
  outer ring:    1.5px solid #6B7199
  opacity:       0.5
```

---

### 6. SLIDERS

#### Default slider
```
track:           #1A2140, height 4px, radius 999px
progress fill:   #7C6CFF, height 4px
thumb:           #7C6CFF circle 18px, shadow Shadows.purpleGlow
range labels:    Typography.caption colour #6B7199 at both ends
Example:         1 ————●————————————— 10
```

#### Range slider (two thumbs)
```
Same track style
Two thumbs both #7C6CFF 18px
Fill between thumbs: #7C6CFF
Labels at both ends + current values above each thumb
```

#### Progress slider (read-only visual)
```
track:           #1A2140 height 6px
fill:            linear gradient #7C6CFF → #B6A8FF
no thumb (read only)
percentage label: Typography.caption right-aligned
Example:         ████████░░░░ 60%
```

---

### 7. PROGRESS INDICATORS

#### Linear progress bar
```
track:           #1A2140, height 6px, radius 999px
fill:            #7C6CFF, animated width
percentage:      Typography.caption right of bar
Example:         ████████████░░░░ 60%
```

#### Circular progress (Growth Score style)
```
outer ring:      4px stroke, colour #7C6CFF on #1A2140 track
inner content:   large number H2 white + "/100" caption
background:      transparent
size:            80px × 80px
Used for:        Growth Score (87/100 from dashboard)
Note:            The circular arc is orange (#FF9F43) in streak/achievement context
```

#### Step progress
```
Steps connected by line
Completed step:  filled circle #7C6CFF + white number
Current step:    filled circle #7C6CFF, slightly larger, white number
Future step:     empty circle border #6B7199 + grey number
Connector line:  completed = #7C6CFF, future = #1A2140
Labels:          Typography.caption below each step ("Step 1" etc)
```

---

### 8. NAVIGATION

#### Bottom navigation bar
```
background:      #131A30 (Colors.bg.surface)
top border:      0.5px solid rgba(124,108,255,0.15)
height:          60px + bottom safe area inset
safe area:       always account for iPhone home indicator

Active tab:
  icon:          22px filled variant, colour #7C6CFF
  label:         Typography.caption colour #7C6CFF
  indicator:     2px top border #7C6CFF above icon

Inactive tab:
  icon:          22px outline, colour #6B7199
  label:         Typography.caption colour #6B7199

Tabs (left to right): Home · Reflect · Progress · Journal · Settings
Icons:
  Home:     home icon
  Reflect:  feather/leaf icon
  Progress: bar-chart icon
  Journal:  book-open icon
  Settings: settings/gear icon
```

#### Top bar (page header)
```
background:      transparent (screen bg shows through)
height:          52px
layout:          back arrow left + page title centre + action icons right

Back arrow:
  icon:          chevron-left 22px colour #AAB0D6
  touch area:    44px × 44px

Page title:
  style:         Typography.h4 colour #E8ECFF centred

Right action icons:
  search:        20px #AAB0D6
  bell:          20px #AAB0D6
  avatar:        32px circle, user photo or initials
```

---

### 9. ALERTS / BANNERS

#### Success banner
```
background:      rgba(74,222,128,0.12)
border:          1px solid rgba(74,222,128,0.40)
border-radius:   10px
padding:         12px 16px
left icon:       check-circle 20px #4ADE80
title:           Typography.caption weight 600 #4ADE80 ("Success")
body:            Typography.caption #AAB0D6 ("Your progress has been saved.")
close icon:      × 16px #6B7199 right side
```

#### Info banner
```
background:      rgba(77,171,255,0.12)
border:          1px solid rgba(77,171,255,0.40)
border-radius:   10px
padding:         12px 16px
left icon:       info 20px #4DABFF
title:           Typography.caption weight 600 #4DABFF ("Info")
body:            Typography.caption #AAB0D6
```

#### Reminder / Warning banner
```
background:      rgba(255,196,61,0.12)
border:          1px solid rgba(255,196,61,0.40)
border-radius:   10px
padding:         12px 16px
left icon:       alert-triangle 20px #FFC43D
title:           Typography.caption weight 600 #FFC43D ("Reminder")
body:            Typography.caption #AAB0D6
```

#### Error banner
```
background:      rgba(255,77,109,0.12)
border:          1px solid rgba(255,77,109,0.40)
border-radius:   10px
padding:         12px 16px
left icon:       x-circle 20px #FF4D6D
title:           Typography.caption weight 600 #FF4D6D ("Error")
body:            Typography.caption #AAB0D6
close icon:      × 16px #FF4D6D right side
```

---

### 10. BADGES AND LABELS

#### Badges (pill with text)
```
New badge:
  background:    #7C6CFF
  border-radius: 999px
  padding:       4px 10px
  text:          Typography.caption weight 600 white

Beta badge:
  background:    rgba(124,108,255,0.20)
  border:        1px solid #7C6CFF
  border-radius: 999px
  text:          Typography.caption colour #7C6CFF

Popular badge:
  background:    rgba(255,159,67,0.20)
  border:        1px solid #FF9F43
  border-radius: 999px
  padding:       4px 10px
  left icon:     flame 12px #FF9F43
  text:          Typography.caption colour #FF9F43 ("Popular")
```

#### Labels (topic tags)
```
background:      rgba(124,108,255,0.12)
border:          1px solid rgba(124,108,255,0.25)
border-radius:   999px
padding:         4px 12px
text:            Typography.caption colour #B6A8FF
Examples:        "Personal Growth" · "Mindset" · "Wellness"
```

#### Dot indicators
```
Sizes: 8px circles
Colours available:
  Purple:  #7C6CFF
  Violet:  #9B8BFF
  Orange:  #FF9F43
  Green:   #4ADE80
  Blue:    #4DABFF
  Grey:    #6B7199
Used for: status dots, notification badges, step indicators
```

---

### 11. AVATAR

#### User avatar (photo)
```
Sizes:   32px · 48px · 64px
Shape:   circle (radius 999px)
Border:  1.5px solid rgba(124,108,255,0.30)
Source:  user photo or initials fallback
```

#### Aether avatar
```
Sizes:         32px · 48px · 64px (matches AetherSize.sm/md)
Shape:         circle
Background:    #1A2140
Border:        1.5px solid rgba(124,108,255,0.40)
Content:       Aether PNG image, resizeMode contain
Used for:      chat messages, notification sender, recent activity
```

---

### 12. DIVIDERS

#### Default divider
```
height:   0.5px
colour:   rgba(124,108,255,0.15)
full width
```

#### Dashed divider
```
Same colour, dashed stroke
Used for: separating sections in settings, modals
```

#### Section divider with icon
```
line + centred icon (purple star ✦ or sparkle) in the middle
colour: rgba(124,108,255,0.25)
Used for: separating major content areas
```

---

### 13. TOOLTIP

```
background:    #1A2140
border:        0.5px solid rgba(124,108,255,0.30)
border-radius: 8px
padding:       8px 12px
text:          Typography.caption colour #AAB0D6
arrow:         4px pointing to trigger element
shadow:        Shadows.md
Max width:     200px
```

---

### 14. MODAL

#### Structure
```
Overlay:       rgba(7,10,20,0.80) full screen
Container:
  background:  #131A30 (Colors.bg.surface)
  border:      0.5px solid rgba(124,108,255,0.20)
  border-radius: 20px (top corners)
  padding:     24px
  width:       screen width − 40px (20px margins)

Header layout:
  Title:       Typography.h3 #E8ECFF left-aligned
  Close button: × 20px #6B7199 top-right, 44px touch area

Body:
  Aether image: optional, left of body text
  Content text: Typography.body #AAB0D6
  padding-top: 12px

Footer:
  Two buttons side by side:
    Cancel: secondary button (transparent, purple border)
    Confirm: primary button (#7C6CFF)
  gap: 12px
  padding-top: 20px
```

---

### 15. DROPDOWN / SELECT

#### Default (closed)
```
background:    #1A2140
border:        1px solid rgba(124,108,255,0.20)
border-radius: 10px
height:        48px
padding:       0 16px
text:          "Select an option" Typography.body #6B7199
right icon:    chevron-down 16px #6B7199
```

#### Open state
```
border:        1px solid #7C6CFF
shadow:        Shadows.lg

Options list:
  background:  #1A2140
  border:      1px solid rgba(124,108,255,0.30)
  border-radius: 10px
  margin-top:  4px

Option item:
  padding:     12px 16px
  text:        Typography.body #E8ECFF
  hover bg:    rgba(124,108,255,0.12)

Selected option:
  text:        #7C6CFF
  right icon:  checkmark 16px #7C6CFF
```

---

### 16. ACCORDION

```
Container:
  background:  #131A30
  border:      0.5px solid rgba(124,108,255,0.15)
  border-radius: 12px

Header (closed):
  padding:     16px
  text:        Typography.body weight 500 #E8ECFF
  right icon:  chevron-down 18px #6B7199

Header (open):
  right icon:  chevron-up 18px #7C6CFF
  border-bottom: 0.5px solid rgba(124,108,255,0.15)

Content:
  padding:     16px
  text:        Typography.body #AAB0D6
  background:  #131A30
  border-radius: 0 0 12px 12px
```

---

### 17. EMPTY STATE

```
Layout:       centred, vertical stack
Aether:       AetherSize.md (80px), expression 'waiting'
Aether position: centred above text

Title:
  style:       Typography.h3 #E8ECFF
  Example:     "Nothing here yet"
  margin-top:  16px

Subtitle:
  style:       Typography.body #AAB0D6
  max-width:   260px, centred
  Example:     "Your journey items will appear here once you start your reflections."
  margin-top:  8px

CTA button:
  style:       primary button
  margin-top:  24px
  Example:     "Start your first reflection"

Used on: Journal tab, Progress tab, any empty list screen
```

---

### 18. LOADING STATES

#### Skeleton loader
```
element bg:    linear gradient animating from #1A2140 to #252A4A to #1A2140
border-radius: matches the element being loaded (card = 14px, text = 4px)
animation:     shimmer left to right, 1.5s loop
Used for:      home screen data loading, list loading
```

#### Spinner (use ONLY for full-screen blocking loads)
```
colour:        #7C6CFF
size:          40px
stroke:        3px
Prefer Aether thinking over this in most cases
```

#### Dots loader (Aether thinking alternative)
```
Three dots:    8px circles, colour #7C6CFF
Animation:     staggered opacity pulse, 0.3s delay between each dot
Loop:          infinite
Used for:      inline loading (AI generating, brief waits)
```

#### Aether thinking (preferred loading state)
```
expression:    AetherImages.thinking
size:          AetherSize.md (80px)
animation:     all three Aether animations running (glow + float + entrance)
text below:    "Aether is thinking..." Typography.body italic #AAB0D6
Used for:      ALL AI generation waits — rewrite, alignment, Aether Core
Rule:          Prefer this over spinner or dots for any AI-triggered loading
```

---

## SECTION 7 — AETHER IMAGES

### TypeScript image constants
```typescript
// constants/images.ts
import { ImageSourcePropType } from 'react-native'

export type AetherExpression =
  | 'happy' | 'thinking' | 'encouraging' | 'celebrating'
  | 'calm'  | 'curious'  | 'idle'        | 'empathetic'
  | 'speaking' | 'waiting'

export const AetherImages: Record<AetherExpression, ImageSourcePropType> = {
  happy:       require('../assets/images/aether/aether-happy.png'),
  thinking:    require('../assets/images/aether/aether-thinking.png'),
  encouraging: require('../assets/images/aether/aether-encouraging.png'),
  celebrating: require('../assets/images/aether/aether-celebrating.png'),
  calm:        require('../assets/images/aether/aether-calm.png'),
  curious:     require('../assets/images/aether/aether-curious.png'),
  idle:        require('../assets/images/aether/aether-idle.png'),
  empathetic:  require('../assets/images/aether/aether-empathetic.png'),
  speaking:    require('../assets/images/aether/aether-speaking.png'),
  waiting:     require('../assets/images/aether/aether-waiting.png'),
}

export const AetherSize = { sm: 32, md: 80, lg: 160 }
```

### Expression usage guide
```
happy        → greeting, after rewrite result, positive moments
thinking     → AI loading state (preferred over all other loaders)
encouraging  → mid-reflection, alignment protocol, nudge moments
celebrating  → belief resolved, streak milestones, 30-day ceremony
calm         → meet-Aether screen, Aether Core full-screen moment
curious      → onboarding questions, belief naming
idle         → home screen corner, passive presence, chat list
empathetic   → evening reflection, difficult emotions
speaking     → Aether Core full-screen takeover
waiting      → empty states, "nothing here yet"
```

---

## SECTION 8 — AETHER ANIMATIONS

```typescript
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withSequence, withTiming, withSpring, Easing
} from 'react-native-reanimated'

// ANIMATION 1 — Glow pulse (always running on every AetherCharacter)
const glowOpacity = useSharedValue(0.15)
useEffect(() => {
  glowOpacity.value = withRepeat(withSequence(
    withTiming(0.30, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    withTiming(0.15, { duration: 2000, easing: Easing.inOut(Easing.ease) })
  ), -1, false)
}, [])
const glowStyle = useAnimatedStyle(() => ({
  shadowColor: '#7C6CFF', shadowOpacity: glowOpacity.value,
  shadowRadius: 28, shadowOffset: { width: 0, height: 0 },
}))

// ANIMATION 2 — Float (medium and large only)
const floatY = useSharedValue(0)
useEffect(() => {
  floatY.value = withRepeat(withSequence(
    withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    withTiming(0,  { duration: 2000, easing: Easing.inOut(Easing.ease) })
  ), -1, false)
}, [])
const floatStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: floatY.value }]
}))

// ANIMATION 3 — Entrance spring (every appearance)
const enterScale = useSharedValue(0), enterOpacity = useSharedValue(0), enterY = useSharedValue(30)
useEffect(() => {
  enterScale.value   = withSpring(1, { damping: 14, stiffness: 120 })
  enterOpacity.value = withTiming(1, { duration: 400 })
  enterY.value       = withSpring(0, { damping: 14, stiffness: 120 })
}, [])
const entranceStyle = useAnimatedStyle(() => ({
  transform: [{ scale: enterScale.value }, { translateY: enterY.value }],
  opacity: enterOpacity.value,
}))

// COMPONENT STRUCTURE
// <Animated.View style={[entranceStyle]}>
//   <Animated.View style={[floatStyle]}>        // md/lg only
//     <Animated.View style={[glowStyle]}>
//       <Image source={AetherImages[expression]} style={{width:size,height:size}} resizeMode="contain" />
//     </Animated.View>
//   </Animated.View>
// </Animated.View>
```

### Timing tokens
```typescript
export const Timing = {
  tap:        150,   // press feedback
  quick:      280,   // card reveals, fades
  standard:   350,   // modal entry
  deliberate: 500,   // Aether entrance, ceremony
  breathing: 2000,   // glow, float loop
}
// Easing for UI:     Easing.out(Easing.ease)
// Easing for Aether: Easing.inOut(Easing.ease)
// Spring for Aether: { damping: 14, stiffness: 120 }
```

---

## SECTION 9 — SCREEN LAYOUT RULES

```
Status bar:           dark-content, transparent
Screen background:    Colors.bg.primary (#070A14) — always
Horizontal padding:   20px both sides
Top padding:          16px below status bar
Bottom padding:       20px + bottom safe area
Section gap:          24px
Scroll:               ScrollView showsVerticalScrollIndicator={false}
Keyboard:             KeyboardAvoidingView on all screens with inputs
Safe area:            SafeAreaView wrapping every screen
Haptic on CTA:        ImpactFeedbackStyle.Light
Haptic on ceremony:   ImpactFeedbackStyle.Heavy
Max simultaneous anim: 2
```

---

## SECTION 10 — SPEECH BUBBLE

```
background:    rgba(28, 20, 56, 0.95)
border:        0.5px solid rgba(124,108,255,0.40)
border-radius: 16px 16px 16px 4px   (tail = bottom-left)
padding:       12px 16px
text:          Typography.aetherSpeech (italic, #E8ECFF)
max-width:     80% of screen width
shadow:        Shadows.purpleGlow at low opacity
```

---

## FORBIDDEN — NO EXCEPTIONS

```
✗ White backgrounds (#FFFFFF) anywhere
✗ Light mode — dark only for MVP
✗ Pure white text — always #E8ECFF
✗ Grey or black shadows — purple or orange tinted only
✗ Hardcoded hex values in component files — always Colors.*
✗ Inline require() for Aether images — always constants/images.ts
✗ ActivityIndicator or generic spinner — prefer Aether thinking
✗ Slide navigation transitions — cross-fade opacity only
✗ Sharp corners — minimum Radius.xs (4px) on every visible element
✗ Font weight 700 — maximum is 600 (SemiBold)
✗ Font sizes below 12px
✗ Any font other than Inter
✗ Orange on navigation or standard CTA buttons
✗ Purple on streak counts, fire, or celebration elements
✗ Aether without glow pulse animation
✗ Aether without float animation (medium and large sizes)
✗ More than 2 simultaneous animations
✗ "Advice" for Aether output — always "Insight"
✗ Any screen without loading + empty + error states
✗ Black shadows rgba(0,0,0)
```

---

## CLAUDE CODE REFERENCE BLOCK

Paste at the top of every UI prompt:

```
Read @DESIGN_SYSTEM.md fully before writing any code.

COLOURS — Colors.* only:
  bg #070A14 · surface #131A30 · elevated #1A2140
  purple #7C6CFF (CTAs, nav, focus) · orange #FF9F43 (streaks, celebrations)
  text #E8ECFF · secondary #AAB0D6 · muted #6B7199

FONT — Inter only:
  Inter_400Regular / Inter_500Medium / Inter_600SemiBold
  All styles from Typography.* — Aether always italic
  Max weight 600. Min size 12px.

SHADOWS — Shadows.* only:
  purpleGlow → Aether + active CTAs
  orangeGlow → streaks + celebrations
  sm → standard cards · lg → input focus
  Never black, never grey

COMPONENTS (all specs in DESIGN_SYSTEM.md Section 6):
  Primary btn: bg #7C6CFF, height 44, radius 10, full width
  Card:        bg #131A30, border rgba(124,108,255,0.15), radius 14
  Input:       bg #1A2140, border rgba(124,108,255,0.20), radius 10
  Speech:      bg rgba(28,20,56,0.95), radius 16 16 16 4, italic text
  Nav:         bg #131A30, active #7C6CFF, inactive #6B7199, height 60

AETHER — from constants/images.ts always:
  glow pulse + float (md/lg) + entrance spring — all 3 required
  thinking expression for ALL loading states
  waiting expression for ALL empty states

LOADING STATES:
  AI loading:    Aether thinking
  Data loading:  skeleton shimmer (#1A2140 → #252A4A)
  Inline brief:  dots loader (3 purple dots staggered)
  Never:         ActivityIndicator
```
