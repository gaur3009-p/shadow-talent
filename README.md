# TalentFlow Backend API
### Proof-of-Skill Hiring System by Webnique

A scalable, production-ready backend for a proof-of-skill hiring platform. Not a job portal — a system that evaluates *what candidates can actually do*.

---

## 🏗️ Architecture

```
src/
├── config/          # DB, Cloudinary setup
├── controllers/     # Route handlers (thin, delegate to services)
├── middlewares/     # Auth, validation, error handling, rate limiting
├── models/          # Mongoose schemas
├── routes/          # Express routers
├── services/        # Business logic (scoring, AI)
└── utils/           # Logger, API response helpers
```

---

## ⚙️ Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT (RS256-compatible) |
| File Uploads | Cloudinary |
| AI Resume | OpenAI GPT-3.5-turbo |
| Logging | Winston |
| Validation | Joi |
| Deployment | Render / Railway |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd talentflow-backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Fill in your values
```

### 3. Run
```bash
npm run dev      # Development (nodemon)
npm start        # Production
```

---

## 📡 API Reference

**Base URL:** `https://your-domain.com/api/v1`

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/auth/signup` | Public | Register (candidate/recruiter/hr) |
| POST | `/auth/login` | Public | Login → JWT |
| GET | `/auth/me` | Any auth | Get own user |
| POST | `/auth/change-password` | Any auth | Change password |

### Candidate
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/candidate/create` | Candidate | Create/update profile |
| PUT | `/candidate/update` | Candidate | Update profile |
| GET | `/candidate/me` | Candidate | Own profile |
| GET | `/candidate/:id` | Any auth | View candidate |
| GET | `/candidates` | Any auth | List + filter candidates |
| POST | `/candidate/upload-resume` | Candidate | Upload PDF resume |
| POST | `/candidate/upload-video` | Candidate | Upload intro video |

**Filter params for GET /candidates:**
```
?skill=React&min_rating=3&min_score=6&is_open_to_work=true&page=1&limit=10&sort=-deployability_score
```

### HR
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/hr/evaluate/:candidateId` | HR, Admin | Rate + tag candidate |
| GET | `/hr/candidates` | HR, Admin | Candidates evaluated by me |
| GET | `/hr/evaluation/:candidateId` | HR, Admin | My evaluation for candidate |
| GET | `/hr/stats` | HR, Admin | My evaluation stats |

### AI
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/ai/generate-resume` | Candidate, HR, Admin | Generate AI resume |
| GET | `/ai/resume/:candidateId` | Recruiter, HR, Admin | Get cached AI resume |

### Recruiter
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/recruiter/dashboard` | Recruiter, Admin | Platform stats |
| GET | `/recruiter/candidates` | Recruiter, Admin | Browse all candidates |
| GET | `/recruiter/candidate/:id` | Recruiter, Admin | Full candidate view |

### Admin
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/admin/stats` | Admin | Platform-wide stats |
| GET | `/admin/users` | Admin | All users |
| PATCH | `/admin/users/:id/toggle-active` | Admin | Activate/deactivate user |
| DELETE | `/admin/candidate/:id` | Admin | Delete candidate |

---

## 🧠 Deployability Score

```
Score = (skill_score + hr_rating_normalized + project_quality + consistency) / 4
```

| Component | Weight | Details |
|-----------|--------|---------|
| `skill_score` | 25% | Skills count, capped at 15 for max score |
| `hr_rating_normalized` | 25% | HR 1–5 rating → normalized to 0–10 |
| `project_quality` | 25% | Avg of per-project quality (title + desc + link + stack) |
| `consistency` | 25% | Profile completeness (bio, links, avatar, etc.) |

Score range: **0–10**

---

## 🔐 Security

- JWT authentication on all protected routes
- Role-based access: `candidate | recruiter | hr | admin`
- Helmet.js HTTP headers
- Rate limiting: 100 req/15min globally, 20 req/15min on auth, 10 req/hr on AI
- Input sanitization via Joi (stripUnknown: true)
- Passwords hashed with bcrypt (12 rounds)

---

## 🚀 Deploy to Render

1. Push to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect repo → auto-detects `render.yaml`
4. Set environment variables in Render dashboard
5. Deploy

Or use the included `render.yaml` for automatic configuration.

---

## 📦 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret for signing tokens |
| `JWT_EXPIRES_IN` | ✅ | Token expiry (e.g. `7d`) |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `OPENAI_API_KEY` | ✅ | OpenAI API key |
| `PORT` | ❌ | Defaults to 5000 |
| `NODE_ENV` | ❌ | `development` or `production` |
| `RATE_LIMIT_MAX` | ❌ | Max requests per window (default 100) |

---

## 🔮 Future Enhancements

- [ ] Email verification on signup
- [ ] Refresh token rotation
- [ ] WebSocket notifications for new evaluations
- [ ] Elasticsearch for candidate search
- [ ] Stripe for recruiter subscriptions
- [ ] Automated skill assessment tests

---

*Built by Webnique — TalentFlow v1.0*
