This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It is a project resembling a mini-twitter. It has the following functionalities:
- auth with google, using nextauth
- ability to see posts, write posts, edit, delete
- search through posts
- view profile pages
- using mongodb for data storage
- back-end api in nextjs

Disclaimers:
- The scope of this project was to familiarise myself with the latest version of React and with Nextjs 14 and  their tools and utilities, such as:
  - nextauth
  - folder-based nextjs routing
  - react hooks usage and their perks and edge cases
  - interaction with third party apis
- the styling is pretty rough around the edges, as this was not a css exercise
- this project is inspired and following https://www.jsmastery.pro course

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
