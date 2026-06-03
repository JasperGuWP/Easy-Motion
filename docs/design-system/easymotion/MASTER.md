# EasyMotion Design System (Master)

> **Authority**: `docs/requirements/UI布局与交互设计-优化版.md` v1.0 overrides skill-generated defaults where they conflict.
> **Page overrides**: `docs/design-system/easymotion/pages/[page].md` if present.

---

## Color System — Cinema Dark + Action Red

| Role                 | Hex       | Tailwind / CSS var              |
| -------------------- | --------- | ------------------------------- |
| Background primary   | `#0F0F23` | `bg-[#0F0F23]` / `--background` |
| Background secondary | `#1A1A2E` | `bg-[#1A1A2E]`                  |
| Background tertiary  | `#252542` | hover, list alternate           |
| Border / divider     | `#2D2D4A` | `border-[#2D2D4A]`              |
| Text primary         | `#F8FAFC` | `text-[#F8FAFC]`                |
| Text secondary       | `#94A3B8` | `text-[#94A3B8]`                |
| Accent primary       | `#E11D48` | playhead, selection, CTA        |
| Accent secondary     | `#0D9488` | success, focus ring             |
| Warning              | `#F97316` |                                 |
| Error                | `#DC2626` | destructive                     |

**Theme**: shadcn `.dark` on `<html>`. v1.0 ships dark only; light in v1.1.

```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 210 40% 98%;
  --primary: 347 77% 50%;
  --border: 240 15% 25%;
  --ring: 173 80% 40%;
}
```

---

## Typography

| Role | Font              | Weights       |
| ---- | ----------------- | ------------- |
| UI   | Plus Jakarta Sans | 400, 500, 600 |
| Mono | JetBrains Mono    | 400           |

```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap");
```

Scale: `text-xs` 12px → `text-2xl` 24px.

---

## Spacing & Radius

- Spacing: 4 / 8 / 12 / 16 / 24px (`space-1` … `space-6`)
- Radius: `rounded-sm` 4px (buttons), `rounded-md` 6px (inputs), `rounded-lg` 8px (panels)

---

## Components (tokens)

- **Primary button**: `bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-sm px-4 py-2`
- **Secondary button**: `bg-[#252542] border border-[#2D2D4A] rounded-sm`
- **Input**: `bg-[#1A1A2E] border-[#2D2D4A] focus:border-[#0D9488] ring-[#0D9488]`
- **Panel**: `bg-[#0F0F23] border border-[#2D2D4A] rounded-lg`

---

## Motion

| Scene                     | Duration | Easing                       |
| ------------------------- | -------- | ---------------------------- |
| Button hover (color only) | 150ms    | ease-out                     |
| Panel expand/collapse     | 200ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| Dialog                    | 150ms    | ease-out, scale 0.95→1       |
| Playhead                  | none     | frame-accurate               |

Use `transform` + `opacity` only. Respect `prefers-reduced-motion`.

---

## Z-index scale (10-step)

| Layer                         | z-index |
| ----------------------------- | ------- |
| Modal                         | 100     |
| Dropdown / context menu       | 90      |
| Tooltip / onboarding          | 80      |
| Loading overlay               | 70      |
| Floating toolbar / drag ghost | 60      |
| AI panel bubbles              | 50      |
| Top toolbar                   | 40      |
| Playhead / smart guides       | 30      |
| Selected clip                 | 20      |
| Timeline ruler                | 10      |
| Base                          | 0       |

---

## Icons & UX rules (ui-ux-pro-max)

- **Lucide** 24×24, toolbar `w-4 h-4`
- No emoji as icons
- `cursor-pointer` on all clickables
- Hover: color/opacity only — no layout-shifting scale
- Text contrast ≥ 4.5:1 on dark backgrounds

---

## Layout defaults (editor shell)

| Panel    | Default | Min | Max |
| -------- | ------- | --- | --- |
| Left     | 220px   | 160 | 350 |
| Right    | 280px   | 200 | 400 |
| Timeline | 220px   | 150 | 350 |

Preview-first: center column maximized; AI in right Tab or bottom 48px bar.

---

## Pre-delivery checklist

See UI doc §0.6 and ui-ux-pro-max skill Pre-Delivery Checklist.
