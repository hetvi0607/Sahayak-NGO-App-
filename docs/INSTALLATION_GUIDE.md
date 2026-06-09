# Installation Guide

## Required Software

Install:

1. Node.js LTS
2. VS Code
3. Git
4. MongoDB Atlas account

## Backend Setup

Folder location: `server/`

Commands:

```bash
cd server
npm install
copy .env.example .env
```

Open `server/.env` and fill:

```bash
MONGO_URI=your MongoDB Atlas connection string
JWT_SECRET=any long random text
CLIENT_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

Test:

Open `http://localhost:5000/api/health`.

## Frontend Setup

Folder location: `client/`

Commands:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Seed Categories

Folder location: `server/`

Command:

```bash
npm run seed
```

This creates:

- Aadhaar Update
- PAN Card
- Senior Citizen Card
- Disability Pension
- Scholarship
- Health Insurance
- Property Tax
- Birth Certificate
- Death Certificate
- Ration Card
- Widow Allowance
- Domicile Certificate
- Caste Certificate
- Electricity Connection
- Water Connection
- Jan Dhan Account
