# RABINJA — Projex + NEX AI
### Project Discovery, Showcase, and Specialised AI Evaluation Platform

---

## 1. Product Overview

- **Parent Brand**: **RABINJA**
- **Core Product**: **Projex** — A project discovery, showcase, and evaluation platform.
- **AI System**: **NEX AI** — RABINJA's specialised project intelligence and judge assistant.

> **Critical Launch Constraint (Stage 1 / Version 1)**: Public project publishing is disabled. The platform showcases curated projects from **Rabinjathon 2025**. Users can upload materials into **private NEX AI workspaces** for personal analysis and live viva preparation without public exposure.

---

## 2. Design System

- **Background**: Warm off-white (`#F5F3EE`)
- **Card Surfaces**: Clean white (`#FFFFFF`) & warm subtle neutral (`#FAF9F6`)
- **Primary Text**: Charcoal (`#292925`)
- **Primary Accent**: Terracotta (`#B9674C`)
- **Secondary Accent**: Sage (`#7D8975`)
- **Borders**: Stone neutral (`#DFDCD5`)
- **NEX AI Palette**: Distinct Professional Blue-Slate (`#3D5A80`) with Ice-Blue interactive accents (`#5B9BD5`)

---

## 3. Implemented Routes & Architecture

| Route | Component/Page | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Editorial discovery homepage with featured projects, Judges' Choice, categories & NEX teaser |
| `/explore` | `src/app/explore/page.tsx` | Search, multi-category filters, sorting & responsive project grid |
| `/explore/[slug]` | `src/app/explore/[slug]/page.tsx` | Full project detail page (Overview, Architecture, Video, Materials, Consensus Scores, Judge Feedback, Peer Inquiries) |
| `/events` | `src/app/events/page.tsx` | Competitions and hackathons directory |
| `/events/rabinjathon` | `src/app/events/rabinjathon/page.tsx` | Flagship Rabinjathon 2025 showcase (Rules, Rubrics, Judges, Winners, All Projects) |
| `/judges` | `src/app/judges/page.tsx` | Official jury directory with credentials and organizations |
| `/judges/[id]` | `src/app/judges/[id]/page.tsx` | Detailed judge profile & all signed evaluations |
| `/nex` | `src/app/nex/page.tsx` | NEX AI landing & workspace manager |
| `/nex/workspace/[id]` | `src/app/nex/workspace/[id]/page.tsx` | Evidence-grounded analysis findings, judge inquiries, document dropzone & report synthesis |
| `/nex/workspace/[id]/viva` | `src/app/nex/workspace/[id]/viva/page.tsx` | Stage 5 Live Viva Interview cockpit with turn-taking and speech transcription |
| `/collections` | `src/app/collections/page.tsx` | Private user collections and saved benchmarks |
| `/profile` | `src/app/profile/page.tsx` | User profile with workspace records and audit status |
| `/admin` | `src/app/admin/page.tsx` | Restricted administration panel for project publication, moderation, and immutable audit logs |
| `/auth/login` | `src/app/auth/login/page.tsx` | Secure account login UI |
| `/auth/register` | `src/app/auth/register/page.tsx` | Account registration UI |

---

## 4. Running the Application

### Development Server:
```bash
cd "c:\Users\Kisalay Jha\OneDrive\Documents\RABINJA LABS\RABINJA Projex\rabinja-projex"
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```
