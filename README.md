# Test locally with wrangler
```bash
npm run dev
```
Call the API at https://localhost:8787/.

# Deploy to Cloudflare
- GitHub CI/CD pipeline: `.github/workflows/ci-cd.yml`

- manually deploy to cloudflare:
```bash
npm run cloudflarelogin
npm run deploy
```
