# QuickHire — Admin Console

A modern **admin dashboard** for **QuickHire** job board. It lets administrators sign in, manage job postings (create, edit, delete), view and filter applications, and access profile and dashboard overview—all integrated with the QuickHire REST API.

---

## 🔗 Live & Documentation

| Resource | URL |
|----------|-----|
| **Admin panel (live)** | [https://quick-hire-console.mimkhatun.me/](https://quick-hire-console.mimkhatun.me/) |
| **API base** | [https://quickhire-api.mimkhatun.me/](https://quickhire-api.mimkhatun.me/) |
| **API documentation** | [https://quickhire-api.mimkhatun.me/api/docs/](https://quickhire-api.mimkhatun.me/api/docs/) |
| **Public job board** | [https://quick-hire.mimkhatun.me/](https://quick-hire.mimkhatun.me/) |

---

## 🛠 Tech Stack

- **Build:** [Vite 7](https://vitejs.dev/)
- **Framework:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **UI:** [Ant Design 5](https://ant.design/)
- **State:** [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **HTTP:** Axios
- **Rich text:** react-quill-new (job descriptions)
- **Styling:** Tailwind CSS v4 (utility)

---

## ✨ Features

- **Authentication**
  - Email/password login with JWT (access + refresh)
  - Protected routes; redirect to login when unauthenticated
  - Role-based access (admin); persisted session
- **Dashboard home**
  - Stats from API: open jobs, total applications, applications today, total jobs
  - Recent jobs and recent applications lists
- **Jobs**
  - List with search, pagination, and table view
  - Create job (dedicated page with rich-text description via Quill)
  - Edit job (same form, pre-filled from API)
  - View job details (modal with HTML description)
  - Delete job (with confirmation)
- **Applications**
  - Paginated list with optional filter by applicant email
  - View application details (name, email, job ID, resume link, cover note, date)
- **Profile**
  - Current user info loaded from `/api/auth/me` (id, name, email, role)
- **UX**
  - Responsive layout, sidebar navigation, breadcrumbs, loading states, error handling
  - Centralized API client with auth interceptors and 401 logout

---

## 📁 Project Structure

```
src/
├── app/
│   └── common/                    # Errors (404, 403, 500), loading, ErrorBoundary
├── components/
│   ├── form/                     # QuillEditor (rich text)
│   ├── layouts/
│   │   ├── auth/                 # AuthLayout (login wrapper)
│   │   └── dashboard/            # DashboardLayout, Header, Sidebar
│   └── ...
├── config/
│   ├── env.ts                    # Vite env (BASE_URL, etc.)
│   ├── menuItems.ts              # Sidebar menu definition
│   ├── routes.ts                 # Route path constants
│   └── theme.ts
├── core/
│   ├── api/
│   │   ├── api-client.ts         # Axios instance, interceptors
│   │   └── endpoints.ts          # API path constants
│   ├── router/
│   │   ├── AppRouter.tsx         # Route definitions
│   │   └── guards/               # ProtectedRoute
│   └── store/                    # Redux store, rootReducer, persist
├── features/
│   ├── auth/                     # Login, authSlice, authService, types
│   ├── dashboard/                # DashboardHome (stats + recent lists)
│   ├── jobs/                     # AdminJobs, JobUpsertPage, jobService, types
│   ├── applications/             # AdminApplications, applicationService
│   └── user/                     # Profile (me API)
├── providers/                    # AppProviders, AuthProvider
├── utils/                        # tokenUtils, storage
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### 1. Clone and install

```bash
git clone https://github.com/mim2041/quick-hire-console.git
cd quick-hire-console
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```env
# API base URL (origin only, no trailing slash). Paths like /api/auth/login are appended in code.
VITE_API_BASE_URL_LOCAL=http://localhost:9001
VITE_API_BASE_URL=https://quickhire-api.mimkhatun.me

# Optional
VITE_NODE_ENV=development
VITE_REDUX_PERSIST_SECRET=your-secret-key
VITE_MAINTENANCE_MODE=false
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port Vite prints). Sign in with an admin account to access the dashboard.

### 4. Build for production

```bash
npm run build
npm run preview
```

Use the output under `dist/` with any static host (e.g. Vercel, Netlify). For production, set `VITE_API_BASE_URL` to your live API URL.

---

## 🏗 Architecture Notes

- **API layer:** Centralized in `src/core/api/` (axios client, `endpoints.ts`). Feature-specific services live under `features/*/services/` and unwrap envelope responses where needed.
- **Auth:** Redux slice stores user and tokens; axios request interceptor attaches the Bearer token; 401 triggers logout and redirect to login.
- **Routing:** React Router with a single dashboard layout; nested routes for dashboard home, jobs, jobs/new, jobs/:id/edit, applications, profile. `ProtectedRoute` enforces auth and admin role.
- **Sidebar:** Menu items and selection use path-prefix matching so sub-routes (e.g. `/dashboard/jobs/new`) highlight the correct parent item (Jobs).

---

## 📜 Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript compile + production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project was developed as an assessment task. All rights reserved.

---

## 👤 Author

**Mim Khatun**  
Full Stack Developer  
📧 [mimkhatun.4941@gmail.com](mailto:mimkhatun.4941@gmail.com)  
📞 +8801705934910
