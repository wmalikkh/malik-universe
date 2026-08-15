# malikk.xyz — portfolio

Single-page React site. No UI framework, no CSS library — one component, all styles inline in `src/Portfolio.jsx`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the build locally
```

## Deploy (Hetzner + nginx)

```bash
npm run build
rsync -avz --delete dist/ root@YOUR_SERVER:/var/www/malikk.xyz/

# on the server, first time only:
cp nginx.conf /etc/nginx/sites-available/malikk.xyz
ln -s /etc/nginx/sites-available/malikk.xyz /etc/nginx/sites-enabled/
certbot --nginx -d malikk.xyz -d www.malikk.xyz
nginx -t && systemctl reload nginx
```

## Before going live

- [ ] Drop your CV at `public/Malik-Khelfah-CV.pdf` (the hero button links to `/Malik-Khelfah-CV.pdf`)
- [ ] Add a 1200x630 social preview image at `public/og.png`
- [ ] Replace the LinkedIn placeholder URL in `src/Portfolio.jsx` (search for `linkedin.com`)
- [ ] Rewrite the StegLens and MacroFlow descriptions — those are placeholders
- [ ] Contact form currently opens the visitor's mail client via `mailto:`. For a real inbox-delivered form, swap `send()` for a POST to Formspree / Web3Forms / your own FastAPI endpoint.

## Structure

```
index.html            meta tags, fonts, scrollbar + base styles
src/main.jsx          React entry
src/Portfolio.jsx     the entire site — CSS string, SVG icons, content data, sections
public/               favicon, robots.txt, sitemap.xml (+ your CV and og.png)
nginx.conf            production server block
```

## Editing content

Everything is in the data blocks near the middle of `src/Portfolio.jsx`:

| Constant   | What it controls                                   |
|------------|----------------------------------------------------|
| `TICKER`   | scrolling tech strip under the hero                |
| `SKILLS`   | icon-badge groups (key must match a name in `ICONS`)|
| `JOBS`     | experience timeline                                |
| `FEATURED` | Dar Alfeneq, the big card                          |
| `PROJECTS` | the smaller project cards                          |
| `CERTS`    | certificate pills                                  |

To add a skill icon: add an SVG to `ICONS`, then reference its key in `SKILLS`.

## Deploy on GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Create the repo and push:
   ```bash
   git init && git add . && git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/wmalikkh/portfolio.git
   git push -u origin main
   ```
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Wait for the Actions run to go green. Site is live.

### Base path matters

| Repo name | URL | `base` in vite.config.js |
|---|---|---|
| `wmalikkh.github.io` | wmalikkh.github.io | `/` (default) |
| `portfolio` | wmalikkh.github.io/portfolio | `/portfolio/` |
| any, + custom domain | malikk.xyz | `/` (default) |

Wrong base = blank page with 404s on the JS file. That's the one thing that trips people up.

### Custom domain (malikk.xyz on Pages)

1. Add `public/CNAME` containing one line: `malikk.xyz`
2. At your DNS provider:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `wmalikkh.github.io`
3. Settings → Pages → Custom domain → `malikk.xyz` → tick **Enforce HTTPS**

Note this replaces your Hetzner setup for this domain — point DNS at one or the other, not both.
