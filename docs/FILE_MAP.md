# SahayaK File Map

This file explains every generated folder and important file.

## Client

`client/package.json` exists to list frontend dependencies and scripts.

`client/.env.example` exists to show required frontend environment variables.

`client/index.html` exists as the Vite HTML entry file.

`client/vite.config.js` exists to configure Vite and React.

`client/tailwind.config.js` exists to configure Tailwind CSS colors and file scanning.

`client/postcss.config.js` exists so Tailwind and Autoprefixer run during builds.

`client/src/main.jsx` exists to mount React into the browser.

`client/src/App.jsx` exists to define all frontend routes and route protection.

`client/src/index.css` exists for Tailwind imports, color helpers, buttons, inputs, cards, and accessibility classes.

`client/src/layouts/AppLayout.jsx` exists to wrap protected pages with Navbar, Sidebar, and Footer.

`client/src/components/Navbar.jsx` exists for top navigation, auth links, language switching, and accessibility controls.

`client/src/components/Sidebar.jsx` exists for dashboard navigation by role.

`client/src/components/Footer.jsx` exists for shared footer content.

`client/src/components/ProtectedRoute.jsx` exists to block unauthenticated users and enforce roles.

`client/src/components/LanguageSwitcher.jsx` exists for English, Hindi, and Gujarati switching.

`client/src/components/AccessibilityToggle.jsx` exists for large text and high contrast modes.

`client/src/components/StatCard.jsx` exists for admin and dashboard metrics.

`client/src/components/Badge.jsx` exists to show volunteer reputation badges.

`client/src/components/FileUpload.jsx` exists for profile and proof image selection with preview.

`client/src/components/TaskMap.jsx` exists to display task locations on OpenStreetMap.

`client/src/components/NotificationPanel.jsx` exists to show user notifications.

`client/src/pages/Landing.jsx` exists for the public landing page.

`client/src/pages/AuthPage.jsx` exists for register, login, and forgot password screens.

`client/src/pages/ResetPassword.jsx` exists to set a new password from an email token.

`client/src/pages/Dashboard.jsx` exists for role-aware dashboards.

`client/src/pages/CreateRequest.jsx` exists so seekers and NGOs can create help requests.

`client/src/pages/Requests.jsx` exists for my requests, nearby tasks, accepted tasks, search, filters, and map.

`client/src/pages/TaskDetails.jsx` exists to view, accept, and complete a task.

`client/src/pages/Profile.jsx` exists to update profile details and upload a profile image.

`client/src/pages/AdminDashboard.jsx` exists for stats, charts, user management, and task management.

`client/src/pages/Survey.jsx` exists for societal internship survey responses.

`client/src/pages/Ngo.jsx` exists for NGO partnership registration.

`client/src/services/api.js` exists to configure Axios and attach JWT tokens.

`client/src/services/authService.js` exists for auth API calls.

`client/src/services/taskService.js` exists for task API calls.

`client/src/services/adminService.js` exists for admin API calls.

`client/src/services/miscService.js` exists for categories, surveys, notifications, NGOs, and AI placeholder calls.

`client/src/contexts/AuthContext.jsx` exists to store login state globally.

`client/src/contexts/AccessibilityContext.jsx` exists to store large text and high contrast settings globally.

`client/src/hooks/useCurrentLocation.js` exists to read browser geolocation.

`client/src/utils/badges.js` exists to calculate badge labels and colors.

`client/src/i18n/index.js` exists to initialize react-i18next.

`client/src/i18n/locales/en.json`, `hi.json`, and `gu.json` exist for translated UI text.

## Server

`server/package.json` exists to list backend dependencies and scripts.

`server/.env.example` exists to show required backend environment variables.

`server/src/server.js` exists to connect MongoDB and start Express.

`server/src/app.js` exists to configure Express middleware, routes, uploads, Swagger, and errors.

`server/config/db.js` exists to connect to MongoDB Atlas.

`server/config/swagger.js` exists to generate Swagger documentation.

`server/models/User.js` exists for user accounts, roles, location, help score, password hashing, and badge logic.

`server/models/Task.js` exists for help requests, geospatial task location, status, proof, and relationships.

`server/models/Notification.js` exists for in-app notifications.

`server/models/Category.js` exists for supported government-service categories.

`server/models/SurveyResponse.js` exists for societal survey storage.

`server/models/NGO.js` exists for NGO partnership records.

`server/controllers/authController.js` exists for register, login, profile, forgot password, and reset password.

`server/controllers/taskController.js` exists for create, list, nearby, update, accept, complete, delete, and analytics.

`server/controllers/userController.js` exists for admin user management and profile updates.

`server/controllers/notificationController.js` exists for notification listing and read status.

`server/controllers/categoryController.js` exists to list categories.

`server/controllers/surveyController.js` exists for survey submission, analytics, and CSV export.

`server/controllers/ngoController.js` exists for NGO registration and reports.

`server/controllers/uploadController.js` exists for direct upload endpoints.

`server/controllers/aiController.js` exists for future AI architecture placeholders.

`server/routes/*.js` files exist to map URLs to controller functions.

`server/middleware/authMiddleware.js` exists for JWT protection and role permissions.

`server/middleware/uploadMiddleware.js` exists for Multer image upload storage and validation.

`server/middleware/validateMiddleware.js` exists for express-validator error responses.

`server/middleware/errorMiddleware.js` exists for consistent 404 and server error responses.

`server/services/emailService.js` exists for Nodemailer setup and email templates.

`server/services/notificationService.js` exists to create notifications and optionally send emails.

`server/utils/token.js` exists for JWT signing and safe user output.

`server/utils/asyncHandler.js` exists to avoid repeated try/catch in controllers.

`server/seeders/categorySeeder.js` exists to load the 16 service categories.

`server/uploads/profiles/` exists for local profile images.

`server/uploads/proofs/` exists for local task proof images.
