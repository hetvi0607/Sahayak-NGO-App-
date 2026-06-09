# SahayaK

Hyperlocal Volunteer Assistance Platform for free skill and time donation.

SahayaK connects help seekers such as elderly citizens, disabled individuals, low digital literacy users, and NGOs with nearby volunteers who can help with government services and documentation.

This is not a donation platform. It is a volunteer assistance platform.

## Project Folders

`client/` contains the React, Vite, Tailwind CSS frontend.

`client/src/components/` contains reusable UI such as Navbar, Sidebar, cards, maps, badges, uploads, language switcher, and accessibility toggles.

`client/src/pages/` contains route screens such as Landing, Login, Dashboard, Requests, Admin Dashboard, Survey, and NGO registration.

`client/src/layouts/` contains shared page layouts.

`client/src/hooks/` contains reusable React logic such as current location lookup.

`client/src/contexts/` contains global auth and accessibility state.

`client/src/services/` contains Axios API wrappers.

`client/src/utils/` contains helper functions such as badge calculation.

`client/src/assets/` is reserved for images, logos, and static files.

`client/src/i18n/` contains English, Hindi, and Gujarati translations.

`server/` contains the Node.js, Express.js, MongoDB backend.

`server/config/` contains database and Swagger configuration.

`server/controllers/` contains business logic for auth, tasks, users, notifications, surveys, NGOs, uploads, and AI placeholders.

`server/routes/` contains REST API route definitions.

`server/middleware/` contains JWT protection, role permissions, validation, errors, and Multer uploads.

`server/models/` contains Mongoose schemas for Users, Tasks, Notifications, Categories, Surveys, and NGOs.

`server/services/` contains email and notification services.

`server/utils/` contains small shared helpers.

`server/uploads/` stores profile and completion proof images during local development.

`server/seeders/` contains category seed data.

`docs/` contains beginner guides for API, installation, testing, deployment, GitHub, file map, and future scope.

## Installation Commands

Open two terminals.

Backend:

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Frontend:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Seed categories after MongoDB is configured:

```bash
cd server
npm run seed
```

## Environment Variables

Backend `server/.env`:

```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sahayak
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=SahayaK <your-email@gmail.com>
```

Frontend `client/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

## How To Run Locally

1. Start MongoDB Atlas and copy the connection string.
2. Put the connection string in `server/.env`.
3. Start backend with `npm run dev` inside `server`.
4. Start frontend with `npm run dev` inside `client`.
5. Open `http://localhost:5173`.
6. Open API docs at `http://localhost:5000/api/docs`.

## How To Test

Backend:

```bash
cd server
npm test
```

Frontend:

```bash
cd client
npm test
npm run build
```

Manual testing checklist is in `docs/TESTING_GUIDE.md`.

## Main Features

- Role based access control: seeker, volunteer, admin, NGO user.
- JWT auth with bcrypt password hashing.
- Register, login, logout, forgot password, reset password.
- Seeker request creation and request tracking.
- Volunteer nearby tasks with Leaflet/OpenStreetMap.
- Accept task, upload completion proof, complete task.
- Help score: 10 points per completed task.
- Badges: Bronze at 5 tasks, Silver at 20, Gold at 50, Platinum at 100.
- Admin statistics, analytics charts, user table, task table, ban/delete actions.
- Notifications and Nodemailer email templates.
- English, Hindi, Gujarati translations.
- Accessibility: large text, high contrast, ARIA labels, keyboard-friendly controls.
- Search and filters by category, distance, status, date, title, and address.
- Multer profile image and proof image uploads.
- Survey module with analytics and CSV export.
- NGO registration and reports.
- Swagger API documentation.
- Future-ready AI architecture placeholders.

## Important Files

See `docs/FILE_MAP.md` for every generated file, its folder, and why it exists.

See `docs/API_DOCUMENTATION.md` for REST API examples.

See `docs/DEPLOYMENT_GUIDE.md` for Vercel, Railway, and MongoDB Atlas deployment.

See `docs/GITHUB_GUIDE.md` for Git and GitHub steps.
