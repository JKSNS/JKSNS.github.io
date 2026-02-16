# Jackson Stephens — Portfolio Site

Personal portfolio built with [Jekyll](https://jekyllrb.com/) + [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy), deployed via GitHub Pages.

- **Domain**: [jackson.stephens.sh](https://jackson.stephens.sh)
- **Repo**: [JKSNS/JKSNS.github.io](https://github.com/JKSNS/JKSNS.github.io)

---

## Running Locally

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

## Site Structure

```
_config.yml              # Site config
CNAME                    # Custom domain
Gemfile                  # Ruby dependencies
index.html               # Home page
_tabs/
  categories.md          # Projects (reads _data/projects.yml)
  archives.md            # Competitions (reads _data/competitions.yml)
  about.md               # About page (edit directly)
_data/
  projects.yml           # Project entries
  competitions.yml       # Competition entries
  contact.yml            # Sidebar links
  share.yml              # Post sharing buttons
_posts/                  # Blog posts (optional)
assets/img/
  profile/               # avatar.png
  projects/              # Project screenshots
  competitions/          # Competition photos
  favicons/              # Favicon files
.github/workflows/
  pages-deploy.yml       # Build & deploy
```

---

## Adding a Project

Edit `_data/projects.yml` — uncomment the template or add a new entry:

```yaml
- name: "New Project"
  repo: "https://github.com/JKSNS/repo-name"
  description: "Short description of the project."
  image: "/assets/img/projects/screenshot.png"
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name |
| `repo` | Yes | GitHub URL |
| `description` | Yes | One or two sentences |
| `image` | No | Screenshot in `assets/img/projects/` |

---

## Adding a Competition

Edit `_data/competitions.yml` — uncomment the template or add a new entry:

```yaml
- name: "Competition Name"
  placement: "1st Place"
  date: 2024-01-01
  image: "/assets/img/competitions/photo.jpg"
  description: "Brief description."
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Competition name |
| `date` | Yes | `YYYY-MM-DD` (used for sorting) |
| `placement` | No | Award or placement |
| `image` | No | Photo in `assets/img/competitions/` |
| `description` | No | Short description |

---

## GitHub Pages Setup

Assuming the repo `JKSNS/JKSNS.github.io` already exists and this code has been pushed to `main`:

### Pages Source

1. Go to **Settings > Pages**
2. Under **Build and deployment > Source**, select **GitHub Actions**

This is required. The default "Deploy from a branch" option uses the `github-pages` gem, which doesn't include the Chirpy theme and will fail to build.

### Custom Domain

1. In **Settings > Pages > Custom domain**, enter `jackson.stephens.sh` and save
2. Wait for the DNS check to pass
3. Check **Enforce HTTPS**

DNS must have a CNAME record pointing `jackson.stephens.sh` to `JKSNS.github.io`. The `CNAME` file in the repo root is already configured.

### Actions

Only the **Build and Deploy Site** workflow (defined in `.github/workflows/pages-deploy.yml`) should be active.

### Verify

Push a commit and confirm **Build and Deploy Site** completes successfully in the **Actions** tab. The site should be live within a few minutes.

After setup, just push to `main` and it deploys automatically.

## Theme

[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) v7.3+. Color scheme, comments, and analytics can be configured in `_config.yml`.

## License

[MIT](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/LICENSE) (Chirpy theme).
