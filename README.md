# NEXUS AI — Personal Intelligence. One Connected Workspace.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791?style=flat-square&logo=postgresql)](https://github.com/pgvector/pgvector)
[![Status](https://img.shields.io/badge/Architecture-Phase%201%20%26%202%20Verified-06B6D4?style=flat-square)]()

> **Tagline**: *Your Personal Intelligence. One Connected Workspace.*  
> **Product Category**: Personal AI Operating System  
> **Core Architecture**: Next.js 14+ App Router, Python 3.12 FastAPI Modular Monolith, PostgreSQL with `pgvector` semantic embeddings.

---

## 1. Product Vision & Philosophy

Nexus AI is an intelligent personal operating system designed to understand users, remember user-approved context, connect life and career activities, and turn information into meaningful actions.

### The Three Pillars
1. **Understand the User**: Episodic & semantic memory engine, verified skill evidence, user-controlled privacy.
2. **Help the User Grow**: Career roadmaps, ATS resume intelligence, skill gap analysis, study plans.
3. **Take Meaningful Actions**: Assisted job applications, task scheduling, document synthesis with explicit authorization.

---

## 2. Feature Implementation Status Matrix

To provide total clarity for public evaluation, features are explicitly categorized into **Completed & Live**, **Demo / Sandbox Mode**, and **Planned Roadmap**.

| Module | Feature | Implementation Status | Description |
| :--- | :--- | :--- | :--- |
| **Identity & Access** | JWT Authentication & Salted Bcrypt | **Completed & Live** | SHA-256 JWT sessions, bcrypt 4.0.1 password hashing, user registration & login. |
| **Nexus Core** | Marketing Landing Page (`/`) | **Completed & Live** | Modern SaaS landing page with hero, interactive preview, pricing tiers, and CTAs. |
| **Workspace Shell** | Protected Dashboard Shell (`/dashboard`) | **Completed & Live** | Responsive layout, sticky sidebar, top navigation, mobile drawer, dark/light theme toggle. |
| **Personal Memory** | Episodic Memory Controls (`/settings`) | **Completed & Live** | User-controlled memory toggle, retention metrics, and one-click memory purge. |
| **LifeOS Planner** | Task Manager (`/lifeos`) | **Completed & Live** | Real task creation (`POST /api/v1/lifeos/tasks`), status toggle (`todo` ↔ `completed`), priority tags, habit streak tracker. |
| **CareerOS** | Verified Skill Inventory (`/career`) | **Completed & Live** | Live skill inventory from backend, target role display, interactive add skill modal. |
| **Opportunity Radar** | Opportunity Discovery Feed (`/radar`) | **Completed & Live** | Live curated opportunities with match scores, skill filters, and Assisted Apply modal. |
| **Second Brain** | Knowledge Store Dropzone (`/second-brain`) | **Completed & Live** | Document catalog, vector chunk metrics, and grounded semantic retrieval simulation. |
| **Cyber Hub** | Defensive Safety Tools (`/cyber-hub`) | **Completed & Live** | Real-time password entropy calculator, crack-time estimator, and phishing URL auditor. |
| **Monetization** | Subscription Tiers & AI Wallet (`/billing`) | **Sandbox Mode** | Transparent tier breakdown (₹0, ₹249, ₹599), credit wallet balance, mock HMAC webhook processor. |
| **AI Assistant** | Conversational Core (`/assistant`) | **Demo / Connected** | Multi-module context grounding simulator (CareerOS, LifeOS, Memory) awaiting live Gemini API keys. |
| **Resume Intelligence** | PDF Resume Parser & ATS Tailoring | **Planned (Phase 4)** | Direct PDF resume file upload parser and WeasyPrint export. |
| **Integrations** | Third-party OAuth (GitHub, Google) | **Planned (Phase 5)** | Social login and calendar synchronization. |
| **External Payments** | Live Payment Gateway Activation | **Planned (Phase 8)** | Production Razorpay / Cashfree merchant activation after regulatory business compliance. |

---

## 3. Repository Architecture

```
Nexus_AI/
├── backend/
│   ├── app/
│   │   ├── core/           # Config, JWT Security, Database session lifecycle
│   │   ├── models/         # Complete SQLAlchemy ORM models across all 18 modules
│   │   ├── schemas/        # Pydantic v2 schemas and validation
│   │   ├── api/v1/         # REST API routers (Auth, Dashboard, Memory, LifeOS, Career, Billing, CyberHub)
│   │   └── main.py         # FastAPI application entry with lifespan seeders
│   ├── tests/              # Pytest automated test suite (100% passing)
│   ├── requirements.txt    # Pinned Python dependencies
│   ├── requirements.lock   # Exact frozen dependencies lockfile
│   ├── .env.example        # Environment configuration template
│   └── .venv/              # Isolated virtual environment (gitignored)
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js 14 App Router pages (14 static & dynamic routes)
│   │   ├── components/     # UI Component Library (Button, Card, Badge, Modal, Input, ThemeToggle)
│   │   ├── context/        # Global AuthContext & ThemeContext
│   │   ├── lib/            # Backend API client with fetch helpers
│   │   └── types/          # TypeScript contracts matching backend models
│   ├── scripts/            # Automated frontend-backend integration test script
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env.example        # Frontend environment template
├── docs/                   # Complete Product Architecture, Database Schema, and Roadmap
├── .gitignore              # Multi-tier exclusion for secrets, DBs, venvs, and build outputs
└── README.md
```

---

## 4. Quick Start (Windows / macOS / Linux)

### Prerequisites
- **Python 3.12+**
- **Node.js 20+**
- **npm** or **pnpm**

### 1. Backend Setup (FastAPI)
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # On Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- Interactive API Documentation: **`http://127.0.0.1:8000/docs`**
- Healthcheck: **`http://127.0.0.1:8000/health`**

### 2. Frontend Setup (Next.js)
```powershell
cd frontend
npm install
npm run dev
```
- Web Application: **`http://localhost:3000`**

### 3. Running Automated Tests
```powershell
# Run backend pytest suite
cd backend
.\.venv\Scripts\python.exe -m pytest tests/

# Run frontend-backend integration suite
cd frontend
node scripts/test-frontend.mjs
```

---

## 5. Security & Privacy Guarantees

- **Zero Hardcoded Secrets**: All private keys, JWT secrets, and API credentials are read from `.env` (strictly excluded via `.gitignore`).
- **No Data Fabrication**: Resume intelligence and Opportunity Radar are grounded in verified CareerOS evidence. The platform never invents unverified achievements or false skills.
- **Defensive Sandbox Mode**: Payments and automated job applications operate in safe developer sandbox mode during initial evaluation.
- **Row-Level Tenant Isolation**: All persistence queries strictly filter by authenticated `user_id`.

---

## 6. License
Copyright © 2026 Nexus AI. All rights reserved.
