# SEO Infrastructure Documentation

Technical reference for the SEO implementation in JSOS.

---

## Architecture Overview

The portfolio uses a **Hybrid State Architecture** that enables search engines to crawl a Single-Page Application (SPA) "OS" interface. URLs drive the system state server-side, ensuring every "Window" has a unique, indexable URL while maintaining the spatial OS visual metaphor.

```
URL Request → Server Component → Parse Path → Hydrate Store → SSR Window Content
```

---

## URL Schema

| Pattern | Description | Example |
|---------|-------------|---------|
| `/` | Desktop (no windows) | `https://jackson.stephens.sh` |
| `/about` | About window | `/about` |
| `/projects/rmccdc` | RMCCDC project | `/projects/rmccdc` |
| `/projects/[slug]` | Project markdown | `/projects/sandia-hackathon` |
| `/experience/[slug]` | Experience markdown | `/experience/nccdc-competitor` |

### Slug Mappings

**Apps:**
```
rmccdc → AppID.Yield (RMCCDC)
nccdc → AppID.Debate (National CCDC)
cyberforce → AppID.PassFX (CyberForce)
about → AppID.About
contact → AppID.Contact
terminal → AppID.Terminal
settings → AppID.Settings
projects → AppID.FolderProjects
experience → AppID.FolderExperience
markdown → AppID.MarkdownViewer
```

**Files:**
```
rmccdc → file.rmccdc
nccdc → file.nccdc
cyberforce → file.cyberforce
sandia-hackathon → file.sandia-hackathon
security-tooling → file.security-tooling
forensics-ir → file.forensics-ir
nccdc-competitor → file.nccdc-competitor
security-research → file.security-research
```

---

## Schema.org Structured Data

**File:** `src/lib/seo/schema.ts`

### Person Schema

Injected in `app/layout.tsx` on every page:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://jackson.stephens.sh/#person",
    "name": "Jackson Stephens",
    "jobTitle": "Security Engineer & Researcher",
    "sameAs": [
      "https://github.com/JKSNS",
      "https://www.linkedin.com/in/profile-jackson-stephens/",
      "https://twitter.com/JKSNS"
    ],
    "knowsAbout": ["Security Engineering", "Penetration Testing", "Vulnerability Research", ...]
  }
}
```

---

## File Structure

```
src/lib/seo/
├── index.ts          # Barrel exports
├── url-state.ts      # URL ↔ State mapping
├── metadata.ts       # Dynamic metadata generation
├── path-metadata.ts  # Path-based metadata
├── path-routing.ts   # Path-based routing
├── entity.ts         # Entity identity data
├── schema.ts         # Schema.org JSON-LD
└── SiteIndex.tsx     # Hidden nav for crawlers

src/features/os/
├── store/
│   └── StoreHydrator.tsx    # Zustand hydration
├── filesystem/
│   └── files.ts             # Virtual filesystem
├── desktop/
│   ├── wallpapers.ts        # Wallpaper config
│   └── dock/
│       └── dock-config.tsx  # Dock configuration
└── ssr/
    ├── SSRContentProjection.tsx
    ├── SSREntityCard.tsx
    ├── SSRFAQContent.tsx
    └── SSRResumeContent.tsx

app/
├── (os)/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── yield/page.tsx    (RMCCDC)
│   │   ├── debate/page.tsx   (National CCDC)
│   │   ├── passfx/page.tsx   (CyberForce)
│   │   └── [slug]/page.tsx
│   ├── experience/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── resume/page.tsx
│   └── faq/page.tsx
├── layout.tsx
├── sitemap.ts
└── robots.ts
```

---

## Verification

### Test URL States
```
https://jackson.stephens.sh                        # Desktop
https://jackson.stephens.sh/about                  # About window
https://jackson.stephens.sh/projects/rmccdc        # RMCCDC project
https://jackson.stephens.sh/experience/nccdc-competitor  # NCCDC experience
```
