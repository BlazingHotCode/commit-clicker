# Commit Clicker

Commit Clicker is an incremental game about writing code, creating bugs, fixing bugs, shipping projects, earning reputation, and eventually prestiging for permanent speed bonuses.

## Current Features

- Write code for Lines of Code
- Bugs can appear while writing code
- Fix bugs to earn reputation
- Buy upgrades to improve production
- Ship projects for permanent run rewards
- Unlock achievements and milestones
- Autosave and offline progress
- Prestige system
- Optional debug tools for development

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Debug Tools

Debug tools are controlled by this constant in `src/App.tsx`:

```ts
const DEBUG_TOOLS_ENABLED = false;
```

Set it to `true` while testing progression.
