# Analytics Strategy

This site uses a lightweight first-party analytics layer to coordinate GA4,
Microsoft Clarity, and PostHog without duplicating each tool's role.

## Tool Roles

| Tool                  | Role                                                                      | Notes                                                             |
| --------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| GA4                   | Acquisition, campaign/source reporting, and high-value conversion events  | Loaded directly through `gtag.js`. GTM is intentionally not used. |
| PostHog               | Structured onsite events, funnels, paths, CTA performance, and dashboards | Uses the slim SDK with manual capture only.                       |
| Clarity               | Recordings, heatmaps, scroll behavior, dead/rage clicks, and UX diagnosis | Receives lightweight event markers for filtering recordings.      |
| Vercel Speed Insights | Performance monitoring                                                    | Kept separate from user behavior analytics.                       |

GA4 should answer "where did valuable visitors come from?". PostHog should
answer "what did visitors do on the site?". Clarity should answer "why did a
flow feel confusing or break down?".

## Runtime Behavior

Frontend analytics are gated by:

```bash
NEXT_PUBLIC_ANALYTICS=true
NEXT_PUBLIC_GA4_ID=G-...
NEXT_PUBLIC_GA4_DEBUG=true # optional preview/local DebugView support
NEXT_PUBLIC_CLARITY_ID=...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

The frontend layout renders `AnalyticsProvider` only when
`NEXT_PUBLIC_ANALYTICS === 'true'`.

Current behavior:

- Analytics are enabled by default unless the visitor disables them.
- The first visit shows a dismissible analytics notice.
- Clicking `Disable` stores `tgc_analytics_consent=declined`.
- Dismissing the notice stores `tgc_analytics_notice_dismissed=true`.
- Footer `Privacy settings` dispatches `tgc:analytics-settings` and reopens the settings panel.
- Scripts are loaded lazily after the client marks analytics as enabled.
- If no GA4, Clarity, or PostHog public key is configured, the provider does nothing.

Storage keys:

| Key                              | Value      | Meaning                                                   |
| -------------------------------- | ---------- | --------------------------------------------------------- |
| `tgc_analytics_consent`          | `declined` | User disabled analytics. Absence means analytics may run. |
| `tgc_analytics_notice_dismissed` | `true`     | Notice has been dismissed.                                |

## Provider Configuration

GA4:

- Loads `https://www.googletagmanager.com/gtag/js?id=...` directly.
- Calls `gtag('config', GA4_ID, { send_page_view: false })`.
- Sends manual `page_view` events so SPA navigation does not double-count.
- Can add `debug_mode: true` when `NEXT_PUBLIC_GA4_DEBUG=true`.
- Receives only high-value custom events from the allowlist.

PostHog:

- Dynamically imports `posthog-js/dist/module.slim.no-external`.
- Uses `NEXT_PUBLIC_POSTHOG_HOST`, defaulting to `https://us.i.posthog.com`.
- Uses manual capture only.
- Disables `autocapture`, `capture_pageview`, `capture_pageleave`, `capture_exceptions`, and `disable_session_recording: true`.
- Uses `person_profiles: 'identified_only'` and `respect_dnt: true`.
- Manual `$pageview` events include `$current_url`, `$pathname`, and `$referrer` alongside route metadata.

Clarity:

- Loads `https://www.clarity.ms/tag/{NEXT_PUBLIC_CLARITY_ID}` directly.
- Receives `clarity('event', eventName)` markers for tracked events.
- Receives consent changes through Consent V2, with analytics storage granted or denied and ad storage denied.
- Uses custom events only as lightweight recording filters; detailed event properties remain in PostHog.

Do not re-enable GTM unless there is a specific marketing or ads requirement
that cannot be handled through direct GA4 events.

## Event Flow

`AnalyticsProvider` listens for clicks on:

```html
[data-analytics-event]
```

The clicked element's `data-analytics-*` attributes are converted into event
properties by `getElementAnalyticsProperties()`. Programmatic client events use
`trackEvent(name, properties)`.

Every event is enriched with route-derived page metadata:

| Route shape                                    | `page_type`           | Extra metadata                     |
| ---------------------------------------------- | --------------------- | ---------------------------------- |
| `/`                                            | `home`                | none                               |
| `/about`                                       | `about`               | none                               |
| `/guesthouses`                                 | `guesthouse_index`    | none                               |
| `/guesthouses/[guesthouse]`                    | `guesthouse`          | `guesthouse_slug`                  |
| `/guesthouses/[guesthouse]/articles`           | `guesthouse_articles` | `guesthouse_slug`                  |
| `/guesthouses/[guesthouse]/articles/[article]` | `guesthouse_article`  | `guesthouse_slug`, `article_slug`  |
| `/destinations/[destination]`                  | `destination`         | `destination_slug`                 |
| `/destinations/[destination]/guides/[article]` | `destination_article` | `destination_slug`, `article_slug` |
| anything else                                  | `other`               | none                               |

Supported event properties:

| Property           | Purpose                                                                          |
| ------------------ | -------------------------------------------------------------------------------- |
| `page_path`        | Current pathname.                                                                |
| `page_type`        | Route category inferred from the URL.                                            |
| `source_section`   | Where the interaction happened, such as `guesthouse_hero` or `property_preview`. |
| `cta_label`        | Human-readable button/link label.                                                |
| `destination_slug` | Destination context when known.                                                  |
| `guesthouse_slug`  | Guesthouse context when known.                                                   |
| `article_slug`     | Article context when known.                                                      |
| `booking_platform` | External booking platform name, usually NightsBridge.                            |
| `target_url`       | Destination URL for outbound or navigational clicks.                             |

Do not send personal data in event properties. Use slugs, labels, URLs, section
names, and platform names only.

## Event Reference

| Event                      | Sent to               | Meaning                                                                          |
| -------------------------- | --------------------- | -------------------------------------------------------------------------------- |
| `page_view`                | GA4, PostHog          | Manual pageview. PostHog receives this as `$pageview`.                           |
| `booking_click`            | GA4, PostHog, Clarity | User clicked an outbound booking or availability CTA.                            |
| `booking_menu_open`        | PostHog, Clarity      | User opened the navbar booking menu.                                             |
| `property_detail_click`    | GA4, PostHog, Clarity | User clicked through to a guesthouse/property details page.                      |
| `article_click`            | PostHog, Clarity      | User clicked an article card or article list link.                               |
| `article_guesthouse_click` | GA4, PostHog, Clarity | Article or destination content moved the user toward a guesthouse/property flow. |
| `article_anchor_click`     | PostHog, Clarity      | User used article/table-of-contents/section navigation.                          |
| `contact_click`            | GA4, PostHog, Clarity | User clicked phone or email contact CTAs.                                        |
| `maps_click`               | PostHog, Clarity      | User clicked a directions or Google Maps link.                                   |
| `share_click`              | PostHog, Clarity      | User used copy, WhatsApp, email, or native share.                                |
| `faq_open`                 | PostHog, Clarity      | User opened an FAQ item.                                                         |
| `gallery_open`             | PostHog, Clarity      | User opened a guesthouse or room gallery.                                        |

GA4 high-value allowlist in `src/lib/analytics/client.ts`:

```ts
const GA4_EVENTS = new Set([
  'booking_click',
  'contact_click',
  'property_detail_click',
  'article_guesthouse_click'
])
```

Only add an event to this allowlist when it is valuable for acquisition,
campaign, or conversion reporting. Most interaction events should stay in
PostHog and Clarity only.

## How To Add Tracking

Prefer declarative attributes for links and buttons:

```tsx
<Link
  href={bookingUrl}
  data-analytics-event='booking_click'
  data-analytics-source-section='guesthouse_hero'
  data-analytics-cta-label='Book online'
  data-analytics-guesthouse-slug={guesthouse.slug}
  data-analytics-booking-platform='NightsBridge'
  data-analytics-target-url={bookingUrl}
>
  Book online
</Link>
```

Use programmatic tracking for client-only interactions that are not simple
clicks, such as share callbacks or controlled component state:

```tsx
import { trackEvent } from '@/lib/analytics/client'

trackEvent('share_click', {
  source_section: 'share_button',
  cta_label: 'copy',
  target_url: window.location.href
})
```

When adding a new event:

1. Use a stable snake_case name.
2. Include `source_section` and `cta_label` where possible.
3. Include slugs instead of names when identifying content.
4. Keep GA4 focused on high-value conversions.
5. Verify the event in PostHog before using it in dashboards.

## NightsBridge Attribution

The current implementation tracks outbound NightsBridge intent through
`booking_click`. Completed bookings are not attributed in v1 because the final
booking happens outside this site.

Completed-booking attribution requires NightsBridge support for confirmation
page tracking, cross-domain GA4, GTM, or another server/client callback. Until
that exists, treat `booking_click` as the reliable conversion intent metric.

## Verification

Local/browser checks:

- With analytics enabled and no declined flag, the notice can appear and scripts load lazily.
- After clicking `Disable`, `localStorage.tgc_analytics_consent` is `declined`.
- When declined, GA4, Clarity, and PostHog should not capture new events.
- Footer `Privacy settings` should reopen the settings panel.

Provider checks:

- GA4: use DebugView to confirm `page_view`, `booking_click`, `contact_click`, `property_detail_click`, and `article_guesthouse_click`.
- PostHog: use Live Events and schema/property views to confirm `$pageview` and custom events include expected properties.
- Clarity: filter recordings by custom events such as `booking_click`, `article_guesthouse_click`, `faq_open`, and `gallery_open`.
- Clarity dashboard: keep masking set to `Balanced`, avoid `Relaxed`, and review heatmaps/recordings by URL, device, dead clicks, rage clicks, and custom events.

Code checks:

```bash
pnpm lint
pnpm build
```

Build may log unrelated Nodemailer auth verification warnings in local
environments. Those warnings are not analytics failures if the build exits
successfully.

## Maintenance Rules

- Do not add GTM back by default.
- Do not enable PostHog autocapture, heatmaps, web vitals, or replay while Clarity and Vercel cover those jobs.
- Do not duplicate the same dashboard in every tool; assign each question to the tool best suited to answer it.
- Do not add PII to event names or properties.
- Keep event names stable once dashboards depend on them.
