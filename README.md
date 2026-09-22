# Ekta Weddings

Marketing site for Ekta Weddings: curated wedding media, draping and styling.
Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

## Run it

Requires Node 20.9+ (`nvm use 20`).

```bash
npm install
npm run dev        # http://localhost:3000
```

## How content works

Everything the site shows lives in `src/content/`:

| File | What it holds |
|---|---|
| `stories.ts` | Portfolio. One **Story** per shoot/event, tagged by coverage (wedding weekend, single event or shoot), and the events it includes. `treatment` sets the page look only. |
| `team.ts` | Team profiles for the About page. |
| `services.ts` | Services list (Planning is marked "coming soon"). |
| `site.ts` | Instagram handle, email, taglines, and the hand-picked Instagram strip. |

Pages never import those files directly. They go through `src/lib/content.ts`,
so switching to a CMS (Sanity) later only changes that one file.

### Adding a new story

1. Create a folder `public/media/<story-slug>/` and drop in photos (JPG/WebP) and a short hero video (MP4).
2. Copy an existing block in `src/content/stories.ts`, give it the same `slug`, and point `src` fields at your files, e.g. `"/media/<story-slug>/01.jpg"`.
3. Pick a `treatment`: `cinematic` (dark, letterboxed, film grain), `bright` (light, airy masonry) or `editorial` (bold, magazine spreads). It changes the page's colors and gallery layout.
4. Set `featured: true` to show it on the home page. The first featured story is the home page hero.

Media with no `src` shows a placeholder frame, so you can build a page before the files arrive.

**Sample stories** (`sample: true`) only appear in `npm run dev` and are hidden in production builds.

### Media tips (until we move to Mux/Sanity)

- **Hero videos:** 10–20 s loops, 1920px wide, H.264 MP4, no audio, **under ~8 MB**. Export a poster JPG too.
- **Photos:** 2400px on the long edge is plenty. Next.js resizes and serves AVIF/WebP automatically.
- Keep full films on Instagram/YouTube/Vimeo and link to them. Large files don't belong in git.

## Inquiry form

Submissions go through a server action (`src/app/inquire/actions.ts`).
Copy `.env.example` to `.env.local` and add a [Resend](https://resend.com) key to get them by email.
Without a key, submissions print to the terminal in dev.

## Deploying

Push to GitHub, import the repo in [Vercel](https://vercel.com), and add the env vars from `.env.example`.

## Roadmap

- Move content to Sanity (upload from a browser) and videos to Mux (adaptive streaming)
- Real logo and brand assets
- Testimonials page, analytics, full Planning service
