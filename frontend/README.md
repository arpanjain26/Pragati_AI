# Pragati AI Frontend

## Environment

Set the following environment variable in Vercel for the frontend app:

- VITE_API_URL=https://pragati-ai-backend-seven.vercel.app

The frontend will use this value in production so auth and all API routes call the backend correctly.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
