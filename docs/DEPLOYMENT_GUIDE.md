# Deployment Guide

## MongoDB Atlas

1. Go to `https://www.mongodb.com/atlas`.
2. Create an account.
3. Create a free cluster.
4. Create a database user.
5. Add your IP address under Network Access.
6. Click Connect.
7. Choose Drivers.
8. Copy the connection string.
9. Replace username and password in the string.
10. Use database name `sahayak`.

## Backend on Railway

1. Go to `https://railway.app`.
2. Login with GitHub.
3. Click New Project.
4. Select Deploy from GitHub repo.
5. Choose the SahayaK repository.
6. Set root directory to `server`.
7. Add environment variables from `server/.env.example`.
8. Set `CLIENT_URL` to your Vercel frontend URL.
9. Deploy.
10. Open Railway generated backend URL.
11. Test `/api/health`.

Common Railway errors:

- `MONGO_URI missing`: add environment variable.
- `MongoServerError authentication failed`: fix database username/password.
- `CORS error`: set `CLIENT_URL` to exact Vercel domain.
- `Cannot find module`: ensure root directory is `server`.

## Frontend on Vercel

1. Go to `https://vercel.com`.
2. Login with GitHub.
3. Click Add New Project.
4. Import the SahayaK repository.
5. Set root directory to `client`.
6. Add environment variable:

```bash
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

7. Click Deploy.

Common Vercel errors:

- Blank page: check `VITE_API_URL`.
- Build error: run `npm run build` locally inside `client`.
- API not working: Railway backend may be sleeping or CORS `CLIENT_URL` is wrong.

## Domain Setup

Frontend domain:

1. Open Vercel project.
2. Click Domains.
3. Add your domain.
4. Follow DNS instructions.

Backend domain:

1. Open Railway service.
2. Open Settings.
3. Generate domain or add custom domain.
4. Update frontend `VITE_API_URL`.
5. Update backend `CLIENT_URL`.
