# PRAGATI AI - Project Knowledge Base (Brain)

## 1. Project Theme and Core Idea
**PRAGATI AI** is a Voice-to-Decision Governance Agent designed to transform fragmented citizen feedback into structured, evidence-based decision intelligence. It acts as an AI-powered Governance Layer, providing a citizen portal for submitting complaints (text/audio/images) and an Admin Command Center for viewing AI-prioritized issues, geographic hotspots, analytics, and auto-generated daily governance briefs.

## 2. Complete Folder Structure and File Organization

```
pragati-ai/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── config/           # Database and environment configurations
│       ├── controllers/      # Route handlers and business logic
│       │   ├── aiController.js
│       │   ├── analyticsController.js
│       │   ├── authController.js
│       │   ├── complaintController.js
│       │   └── issueController.js
│       ├── middleware/       # Express middlewares
│       │   ├── authMiddleware.js
│       │   ├── errorMiddleware.js
│       │   └── validationMiddleware.js
│       ├── models/           # Mongoose schemas
│       │   ├── complaintModel.js
│       │   ├── issueModel.js
│       │   └── userModel.js
│       ├── routes/           # API route definitions
│       │   ├── aiRoutes.js
│       │   ├── analyticsRoutes.js
│       │   ├── authRoutes.js
│       │   ├── complaintRoutes.js
│       │   └── issueRoutes.js
│       ├── services/         # External integrations (e.g., Gemini)
│       │   └── aiService.js
│       └── utils/            # Helper functions
│           ├── logger.js
│           └── upload.js
├── docs/                     # Project documentation (ai, api, architecture, deployment)
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/       # Reusable UI components
        │   ├── common/       # Badges, Buttons, Cards, Inputs, Modals, etc.
        │   └── layout/       # AdminLayout, CitizenLayout, Navbar, Sidebar
        ├── context/          # React Contexts (Auth, Language, Theme)
        ├── data/             # Mock data for frontend development
        ├── pages/            # View components corresponding to routes
        │   ├── AdminDashboardPage.jsx
        │   ├── AnalyticsPage.jsx
        │   ├── ChatbotPage.jsx
        │   ├── CitizenDashboardPage.jsx
        │   ├── LoginPage.jsx
        │   ├── MapViewPage.jsx
        │   └── ... (other pages)
        ├── routes/           # React Router configuration (AppRoutes.jsx)
        └── utils/            # API clients and helpers
```

## 3. High-Level Architectural Overview
The project follows a standard MERN (MongoDB, Express, React, Node.js) monorepo structure.
- **Frontend**: A Single Page Application (SPA) built with React and Vite. It communicates with the backend via RESTful APIs. State management is handled primarily through React Contexts.
- **Backend**: A Node.js/Express REST API that handles citizen submissions, authentication, and data aggregation.
- **AI Integration**: The backend interfaces with Google Gemini (`@google/generative-ai`) via `aiService.js` to process and classify complaints, extract insights, and power the chatbot functionalities.
- **Database**: MongoDB is used for persistent storage, accessed via Mongoose ODM.

## 4. Summary of Key Modules and Components

### Backend Modules
- **`app.js` & `index.js`**: Application entry points. `app.js` configures middlewares (Helmet, CORS, Rate Limit) and mounts routers.
- **Controllers (`*Controller.js`)**: Handle HTTP requests, validate input, interact with models, and send responses. Example: `complaintController.js` processes new citizen reports.
- **Routes (`*Routes.js`)**: Map HTTP endpoints to controller methods. Protected by `authMiddleware.js`.
- **Services (`aiService.js`)**: Encapsulates external API calls. Depends on `@google/generative-ai`. Returns structured AI responses.
- **Models (`*Model.js`)**: Define Mongoose schemas for `User`, `Complaint`, and `Issue`.

### Frontend Modules
- **Contexts**: `AuthContext.jsx` manages user sessions; `ThemeContext.jsx` handles UI themes; `LanguageContext.jsx` manages localization.
- **Layouts**: `AdminLayout.jsx` and `CitizenLayout.jsx` provide role-specific shell wrappers around page content.
- **Pages**: Role-specific views (e.g., `AdminDashboardPage`, `CitizenDashboardPage`, `ReportComplaintPage`).
- **Common Components**: Foundational UI elements (Buttons, Cards, Modals) styled with Tailwind CSS for consistent reusability.
- **Utils (`api.js`)**: Axios/Fetch wrappers for communicating with the backend API.

## 5. Technology Stack and Frameworks
- **Frontend**: React 19, Vite 8, React Router v7, Tailwind CSS v3, Framer Motion, React Hook Form, Zod, React-Leaflet.
- **Backend**: Node.js, Express.js v5, MongoDB, Mongoose, `@google/generative-ai`, JWT, bcryptjs, multer, Zod, Winston.

## 6. Key Design Decisions and Patterns
- **Role-Based Routing**: The frontend uses layouts and context to separate Citizen and Admin interfaces.
- **AI Chat Session Management**: The AI assistant uses `model.startChat({ history })` to retain conversation context up to the last 12 messages.
- **Redirection & UX Error Banners**: Registration redirects to `LoginPage` instead of auto-logging in. Forms use Amazon/Apple-style inline alerts instead of browser alerts.
- **AI as a Service**: Gemini integration is abstracted into `aiService.js` to keep AI logic separate from standard CRUD operations.
- **Centralized Validation**: Zod is used on both frontend (form validation) and backend (request validation via `validationMiddleware.js`).
- **Styling**: Tailwind CSS is used extensively alongside vanilla CSS (`index.css`) for micro-animations and global resets.

## 7. Current State of Implementation
- **Done**: Basic project scaffolding, routing setup, Mongoose models, authentication flows, mock data injection, layout components, security hardening (strict multer typing), Ponytail audit to remove over-engineering, UI polishing (applying "frontend-design" aesthetics), registration redirects, error banner patterns, and multi-turn conversational AI chatbot history.
- **In Progress**: Full integration of Gemini AI endpoints with frontend components, deployment configurations.
- **Planned**: Fine-tuning rate limits per endpoint.

## 8. Configuration Details and Environment Setup
- **Backend `.env` Requirements**: `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `PORT` (default 5000).
- **Frontend**: API calls map to `http://localhost:5000/api`. Starts on port 5173.
- **Run Commands**: `npm run dev` in respective folders.

## 9. Constraints, Limitations, or Known Issues
- **Tailwind Conflict**: Resolved. The user requested to keep TailwindCSS while applying premium aesthetics on top of it.
- **Security Updates Completed**: Multer configurations have been updated to robust disk storage with strict MIME-type validation. Rate limits are globally applied but may need fine-tuning per endpoint in the future.
