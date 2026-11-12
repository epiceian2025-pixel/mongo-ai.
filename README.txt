MONGO AI V1 — STARTER PROJECT

WHAT'S INCLUDED
- public/index.html: black and blood-red mobile-friendly chat website
- server.js: small backend that keeps your API key private
- .env.example: configuration template
- package.json: required Node.js packages

IMPORTANT SECURITY NOTE
Do NOT put your API key in index.html, browser JavaScript, screenshots, or a public GitHub repository.
The browser calls /api/chat. The server reads AI_API_KEY from .env and sends it to your AI provider.

RUN LOCALLY
1. Install Node.js (LTS).
2. Extract this ZIP.
3. Open a terminal in the extracted mongo-ai-starter folder.
4. Copy .env.example to a new file named .env.
5. Edit .env and put your API key after AI_API_KEY=.
6. Run: npm install
7. Run: npm start
8. Open http://localhost:3000

PROVIDER COMPATIBILITY
This starter uses the common OpenAI-compatible /chat/completions API format.
For a different provider, set AI_BASE_URL and AI_MODEL to that provider's documented values.
Do not assume every provider uses the same API format.

DEPLOYMENT
Deploy the Node.js app to a host that supports server-side environment variables.
Add AI_API_KEY, AI_BASE_URL, and AI_MODEL in the host's environment-variable settings.
Do not deploy this as a static-only GitHub Pages site: GitHub Pages cannot run server.js or keep a server-side API key.
Add rate limiting, usage limits, and monitoring before sharing the site publicly, since API usage can cost money.
