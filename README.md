# GYMFIT PRO 360 — GitHub Pages PWA

Buildless HTML, CSS and ES modules. Deploy this folder's **contents** at the root of a GitHub Pages repository. Keep `assets`, `css`, `js`, the manifests and `service-worker.js` beside the HTML entry points.

| Entry | Experience |
| --- | --- |
| `index.html` | Member: Home · Book · Workout · Progress · Profile |
| `admin.html` | Management workspace |
| `trainer.html` | Trainer schedule, assigned members, plans and notes |

Backend business settings supply identity, theme, masters, prices, available modules and operations. `js/runtime.js` contains only deployment API routing: loopback 3500 locally, `https://fitness.mdmsportal.uk` for hosted pages. Frontend code contains no database or integration credentials.

## Publish

1. Upload these contents to a GitHub repository. Commit `.nojekyll` too.
2. Enable Pages from the chosen branch's root. See [GitHub's official instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Set the exact Pages origin in backend `.env` `CORS_ORIGINS`.
4. Set both backend `.env` `FRONTEND_URL` and saved **Settings → Data & System → Frontend URL** to the complete site URL with its repository path/trailing slash.
5. Run the backend in production and keep the existing remotely managed Cloudflare tunnel running. Production `/` on the API hostname is intentionally API-only; use the Pages site for the interface.

Relative asset paths support GitHub repository subpaths. Run local preview through the backend rather than opening HTML as `file://`.

## Install and refresh

Open the corresponding Member/Admin/Trainer page before installing, so that its role-specific manifest is selected. The same static service-worker scope serves all three interfaces. Live manifests fetch current Branding from the backend, with bundled manifests available as initial fallbacks. An already installed operating-system app name/icon may require reinstalling after a branding change; in-app identity refreshes immediately.

On iPhone, use the browser Share action and **Add to Home Screen**; see [Apple's web-app guide](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/27/ios/27). Apple supports web push for Home Screen web apps on iOS 16.4 and later; permission still needs a user action. See [Apple's web-push documentation](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers). On Android/desktop, use the browser's available install option.

Use Profile → Enable notifications after the backend has VAPID configured. The shell and local fonts/photos can be cached. Business operations require an online API; the worker bypasses API, media, Socket.IO and authenticated requests. Reconnect/window focus refreshes current configuration and records. JWT access sessions live in sessionStorage and expire after two hours; there is no offline transaction queue.

## Visual assets

Deep charcoal surfaces, configurable lime accent and locally bundled **Sora** headings / **Manrope** UI typography. Five original generated default gym images and compact thumbnails ship in `assets`; see [asset credits and creative briefs](assets/README.md). Font files include their SIL Open Font License. Uploaded branding, avatars and galleries are optimized by the backend and use new versioned media URLs.

For source changes, update the service-worker cache version when changing the static shell list. Never add API responses, payment proofs or member data to that list.

Backend setup, first owner creation and provider instructions are in [BACKEND-CLOUDFLARED/README.md](../BACKEND-CLOUDFLARED/README.md).
