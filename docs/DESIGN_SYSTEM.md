# NEXUS AI — UI/UX Design System Specification

## 1. Visual Identity & Brand Concept

- **Brand Essence**: *Intelligent, Calm, High-Performance, Futuristic yet Human.*
- **Atmosphere**: Deep slate & carbon canvas with radiant cyan and violet accents, soft glassmorphism, micro-borders, and high-contrast typography.
- **Form Language**: Sharp 10-12px rounded radiuses, subtle glowing active states, minimalist iconography via Lucide icons.

---

## 2. Color Palette & Design Tokens

### Semantic Color Matrix

```css
/* Core Canvas & Surfaces */
--nexus-bg-dark: #090D16;          /* Deep space background */
--nexus-surface-1: #0F172A;        /* Cards, sidebars, modals */
--nexus-surface-2: #1E293B;        /* Elevated panels, active items */
--nexus-surface-3: #334155;        /* Borders, dividers, subtle hover */

/* Brand & Accent Gradients */
--nexus-primary: #06B6D4;          /* Electric Cyan */
--nexus-primary-glow: rgba(6, 182, 212, 0.25);
--nexus-secondary: #8B5CF6;        /* Nebula Purple */
--nexus-secondary-glow: rgba(139, 92, 246, 0.25);
--nexus-accent-gradient: linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%);

/* Functional & Status */
--nexus-success: #10B981;          /* Emerald Green - Ready / Active */
--nexus-warning: #F59E0B;          /* Amber - Approaching Deadlines */
--nexus-danger: #EF4444;           /* Crimson - Missing skills / Errors */
--nexus-info: #38BDF8;             /* Sky Blue - Information alerts */

/* Typography */
--nexus-text-primary: #F8FAFC;    /* High contrast text */
--nexus-text-secondary: #94A3B8;  /* Labels, subtitles */
--nexus-text-muted: #64748B;      /* Footers, timestamps */
```

---

## 3. Typography Scale

- **Primary Font**: `Inter`, system font fallbacks (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`).
- **Monospace Font**: `JetBrains Mono` or `Fira Code` for code blocks, token counters, and API metrics.
- **Scale**:
  - `Display 1`: 36px / 44px line-height, Bold (Hero titles)
  - `Heading 1`: 28px / 36px, SemiBold (Module titles)
  - `Heading 2`: 20px / 28px, Medium (Card headers, section titles)
  - `Body Regular`: 14px / 20px, Regular (Standard content)
  - `Caption`: 12px / 16px, Regular (Meta info, timestamps, badges)

---

## 4. Layout Architecture

The Nexus AI master workspace is structured around a **3-Zone Layout**:

```
+-----------------------------------------------------------------------------------------+
| [NEXUS LOGO]   | Search (Ctrl+K)              | [AI Credits: 45] [Notifications] [User] | TopBar
+----------------+------------------------------+-----------------------------------------+
| [Side Nav]     |                                                                        |
| - Dashboard    |                                                                        |
| - AI Assistant |                                                                        |
| - Memory       |                     MAIN WORKSPACE STAGE                               |
| - LifeOS       |                                                                        |
| - CareerOS     |          (Dynamic Module View: Dashboard, Career, etc.)                |
| - Resumes      |                                                                        |
| - Smart Apply  |                                                                        |
| - Second Brain |                                                                        |
| - Cyber Hub    |                                                                        |
| - Billing      |                                                                        |
| - Admin        |                                                                        |
+----------------+------------------------------------------------------------------------+
```

1. **Left Nav Rail / Sidebar**:
   - Collapsible, 240px wide on desktop, sheet drawer on mobile.
   - Categorized by workflow: *Core Intelligence, Career & Opportunities, LifeOS, Knowledge, System*.
2. **Top Control Bar**:
   - Global Quick Search (Ctrl+K), real-time AI Credit balance indicator, quick notification bell, user profile avatar.
3. **Central Workspace Stage**:
   - Highly responsive fluid grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
   - Cards feature glassmorphism backdrop blurs, clean 1px borders (`border-slate-800`), and reactive micro-interactions on hover.
4. **Universal Quick Action Drawer / AI Flyout**:
   - Instant access to the AI conversational assistant from any screen without losing task context.
