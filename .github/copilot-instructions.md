# Portfolio Project Instructions

## Project goal

Build a polished personal portfolio that helps prospective clients, employers, and collaborators quickly understand James Caldwell's capabilities and start a conversation. The experience should feel creative and memorable while remaining fast, accessible, and easy to navigate.

Use https://www.wokine.com/ as a reference for its creative split-screen composition, pacing, and editorial confidence. Do not copy its branding, assets, text, or implementation. Create an original visual identity for this portfolio.

## Current stack

- Frontend: React, TypeScript, and Vite in `react-ts/`.
- Backend: Express.js API when server behavior is needed. Keep it lightweight and separate from the frontend; use .NET only when a requirement genuinely benefits from the author's existing .NET Core experience.
- Prefer existing dependencies and browser/platform APIs. Add a dependency only when it materially reduces complexity or improves security, accessibility, or maintainability.
- `src/App.tsx` and `src/main.tsx` remain at the `src/` root.

## Information architecture

Implement these primary destinations with URL-aware navigation:

- Home: concise identity, elevator pitch, capabilities, availability, and a clear path to work together.
- About: a quick, human overview of interests and what James enjoys outside software development.
- Resume: a scannable web version of the resume PDF, with quick navigation to the sections employers and clients need most. Treat the source PDF in `assets/design-foundations` as the source of truth when it is present, and preserve a link to download the PDF.
- Projects: a flexible portfolio index for different kinds of work, with project detail views where useful. Each project should communicate context, role, contribution, technology, and outcome without inventing facts.
- Contact: a protected contact form and a separate or clearly distinguished freelancer inquiry form for project details, goals, budget or range, timeline, and contact information.

## Component architecture

Keep components in the existing atomic structure under `react-ts/src/components/`:

- `pages/`: route-level parent components. Pages compose sections and own page-specific orchestration; they should not contain low-level reusable markup.
- `organisms/`: large page sections with a coherent topic, such as a split hero, project gallery, resume overview, or contact form.
- `molecules/`: reusable groups of atoms and localized UI logic, such as navigation groups, project metadata, form field groups, or resume section links.
- `atoms/`: the smallest reusable visual and interaction pieces, such as buttons, links, labels, inputs, icons, and status indicators.

Keep shared types, utilities, and API clients in appropriately named `src/` folders rather than placing unrelated logic in `App.tsx`. Use `App.tsx` for top-level routing/layout composition only. Keep `main.tsx` limited to application bootstrapping.

## Design and UX standards

- Make the split-screen layout a recognizable foundation, while allowing each page to have its own rhythm and responsive adaptation.
- Prioritize typography, spacing, composition, and meaningful motion over decorative effects. Use original or properly licensed visual assets.
- Make the first viewport immediately communicate who James is, what he does, and what action a visitor can take.
- Design mobile-first. On narrow screens, stack or transform the split layout intentionally; never allow clipped text, horizontal overflow, or overlapping panels.
- Use semantic HTML, visible keyboard focus, sensible heading hierarchy, descriptive labels, alt text, and sufficient color contrast.
- Navigation must work with keyboard and screen readers, and the active route must be clear.
- Forms must provide inline validation, useful error messages, loading states, success states, and an accessible failure recovery path.
- Avoid placeholder copy, starter-template branding, unverified claims, and fabricated project outcomes.

## Backend and form security

- Keep secrets and CAPTCHA credentials on the server. Never put private keys or verification secrets in client code.
- Validate and normalize all submitted data on the server even when the client validates it.
- Add rate limiting, origin/CSRF protections appropriate to the deployment, bot protection, and spam-resistant handling before exposing contact endpoints.
- Use a provider-neutral CAPTCHA abstraction where practical so Re-Captcha or another provider can be changed without rewriting form components.
- Do not log message contents, credentials, CAPTCHA tokens, or unnecessary personal data. Document required environment variables in an example env file, never in source control.
- Return safe, intentional API errors; do not expose stack traces or internal implementation details to visitors.

## Feature workflow for Copilot

For each new feature:

1. Inspect the nearest existing component, route, style, type, and test/build configuration before editing.
2. State the smallest implementation approach and identify the user-visible behavior it changes.
3. Put new components in the correct atomic folder and keep public props/types explicit.
4. Reuse existing patterns before introducing abstractions, dependencies, or global styles.
5. Include responsive, accessibility, loading, empty, error, and success states relevant to the feature.
6. For forms or API work, include server-side validation and security considerations.
7. Run the narrowest relevant check first, then `npm run lint` and `npm run build` from `react-ts/` when applicable.
8. Summarize changed files, behavior, validation performed, and any assumptions or follow-up decisions.

## Code standards

- Use strict TypeScript; avoid `any` and non-null assertions unless the invariant is clear.
- Keep components focused and prefer composition over deeply nested conditional markup.
- Keep side effects in the appropriate hooks or service boundaries; do not hide network calls in presentational atoms.
- Use descriptive names and small functions. Add comments only for non-obvious decisions.
- Preserve existing formatting and do not mix unrelated refactors into feature work.
- Do not commit secrets, generated build output, or personal visitor data.