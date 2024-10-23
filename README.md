# BB Forum - Minimalistic Bulletin Board Forum

### > [Live preview here](https://bbforum.duckdns.org/)

This is a Work In Progress of a minimalisting bulleting board

## Features

- User-friendly Interface: A minimalistic design for ease of use and navigation.
- Post and Comment: Create threads, post topics, and engage with discussions.
- Custom Themes: Support for light and dark themes, allowing users to switch between themes for a personalized experience.
- Server-Side Rendering: Optimized page loading for improved performance and SEO.
- State Management: Lightweight state management with React hooks and Zustand.

## Requirements

- docker
- pnpm

## Getting Started

```bash
pnpm db
pnpm install
pnpm prisma:config
pnpm prisma:migrate
pnpm prisma:generate
pnpm dev
```

Open [http://localhost:4200](http://localhost:4200) with your browser to see the result.
