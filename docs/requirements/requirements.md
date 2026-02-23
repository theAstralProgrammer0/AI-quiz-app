# Requirements Specification
## AI-Powered Quiz Platform

**Version:** 1.0.0
**Date:** 2026-02-23
**Status:** Draft

---

## 1. Overview

This document defines the functional, non-functional, and technical requirements for an AI-powered quiz platform that generates personalized, adaptive quizzes using the Claude AI API. The platform supports student-driven topic selection, progressive difficulty, detailed feedback, and performance tracking.

---

## 2. Primary User Story

> *As a student interested in learning various subjects, I want an AI-powered quiz platform that generates personalized quizzes on topics I choose, so that I can test my knowledge and improve my understanding through adaptive difficulty progression.*

---

## 3. Acceptance Criteria

| ID | Criterion | Measurable Condition |
|----|-----------|----------------------|
| AC-01 | Topic Selection | User inputs any academic topic and receives a relevant quiz within 30 seconds |
| AC-02 | Progressive Difficulty | Platform adjusts question difficulty based on cumulative user performance |
| AC-03 | Comprehensive Feedback | Detailed explanations provided for both correct and incorrect answers |
| AC-04 | Performance Tracking | Users can view improvement history across all subjects |
| AC-05 | Accessibility | Platform is mobile-responsive and complies with WCAG 2.1 AA standards |

---

## 4. Functional Requirements

### 4.1 Quiz Generation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | The system shall generate quizzes on any user-specified academic topic using the Claude AI API | Must Have |
| FR-02 | The system shall support multiple question types: multiple choice, true/false, and fill-in-the-blank | Must Have |
| FR-03 | Quiz generation shall complete within 10 seconds for a set of 10 questions | Must Have |
| FR-04 | The system shall adjust question difficulty (easy, medium, hard) based on the user's running performance score | Must Have |
| FR-05 | The system shall provide detailed explanatory feedback for each answer, correct or incorrect | Must Have |
| FR-06 | Each quiz session shall contain a configurable number of questions (default: 10) | Should Have |

### 4.2 User Authentication & Profile Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-07 | The system shall support user registration with email and password | Must Have |
| FR-08 | The system shall support secure login and logout with JWT-based session management | Must Have |
| FR-09 | The system shall support password reset via email verification | Should Have |
| FR-10 | Each user shall have a persistent profile storing preferences and historical performance data | Must Have |
| FR-11 | The system shall support OAuth 2.0 social login (Google) | Could Have |

### 4.3 Performance Analytics & Progress Tracking

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-12 | The system shall record each quiz attempt, including score, topic, difficulty, and timestamp | Must Have |
| FR-13 | The system shall display per-topic performance trends over time using visual charts | Must Have |
| FR-14 | The system shall compute and display a cumulative mastery score per subject | Should Have |
| FR-15 | The system shall allow users to export their performance history as a CSV file | Could Have |

### 4.4 User Interface

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-16 | The interface shall be fully responsive across desktop, tablet, and mobile viewports | Must Have |
| FR-17 | The system shall provide a topic search/input field on the dashboard | Must Have |
| FR-18 | Quiz progress (current question / total) shall be visible at all times during a session | Must Have |
| FR-19 | The system shall display a results summary screen at the end of each quiz | Must Have |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Quiz generation response time | < 10 seconds for 10 questions under normal load |
| NFR-02 | API endpoint response time (non-AI routes) | < 500 ms at the 95th percentile |
| NFR-03 | Frontend page load (initial) | < 3 seconds on a 4G connection |

### 5.2 Scalability & Availability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-04 | Concurrent user support (initial) | 100 simultaneous users |
| NFR-05 | System uptime | 99% measured monthly |
| NFR-06 | Database connection pool size (development) | maxPoolSize: 10 |

### 5.3 Security & Compliance

| ID | Requirement | Standard |
|----|-------------|----------|
| NFR-07 | All passwords shall be hashed using bcrypt with a minimum cost factor of 12 | OWASP |
| NFR-08 | All API communication shall use HTTPS/TLS 1.2+ | RFC 8446 |
| NFR-09 | The system shall comply with GDPR data handling regulations | GDPR |
| NFR-10 | The Claude API key shall be stored as an environment variable and never committed to version control | Security best practice |
| NFR-11 | JWT tokens shall expire after 24 hours; refresh tokens after 7 days | Security best practice |

### 5.4 Maintainability & Quality

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-12 | Unit test line coverage | ≥ 80% |
| NFR-13 | Unit test function coverage | ≥ 85% |
| NFR-14 | Unit test branch coverage | ≥ 75% |
| NFR-15 | Unit test statement coverage | ≥ 80% |
| NFR-16 | All code shall pass ESLint checks before merge | Enforced via pre-commit hook |

### 5.5 Accessibility

| ID | Requirement | Standard |
|----|-------------|----------|
| NFR-17 | All interactive elements shall be keyboard-navigable | WCAG 2.1 AA |
| NFR-18 | All images shall include descriptive alt text | WCAG 2.1 AA |
| NFR-19 | Colour contrast ratio shall meet a minimum of 4.5:1 for normal text | WCAG 2.1 AA |

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (LTS) |
| Backend Framework | Express.js |
| Database | MongoDB with Mongoose ODM |
| AI Integration | Anthropic Claude AI API |
| Authentication | JWT + bcrypt |
| Testing Framework | Jest |
| Frontend | React (responsive, mobile-first) |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Code Quality | ESLint, Husky pre-commit hooks |
| Reverse Proxy (future) | Nginx |

### 6.2 Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── config/         # DB and Claude API configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express route definitions
│   │   ├── middleware/     # Auth, error handling, validation
│   │   ├── services/       # Business logic, AI integration
│   │   └── server.js       # Application entry point
│   ├── tests/
│   │   ├── unit/           # Unit tests (Jest)
│   │   └── integration/    # Integration tests (Jest + Supertest)
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── frontend/               # React application
├── docker/
│   ├── mongodb/
│   │   └── init-scripts/
│   ├── nginx/
│   │   └── nginx.conf
│   └── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   └── pre-commit
├── scripts/
│   ├── dev-setup.sh
│   └── quality-check.sh
├── docker-compose.yml
└── requirements.md
```

### 6.3 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Runtime environment (`development`, `production`, `test`) | Yes |
| `PORT` | HTTP server port (default: 3000) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `CLAUDE_API_KEY` | Anthropic Claude API key | Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens | Yes |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g., `24h`) | Yes |

---

## 7. Testing Requirements

### 7.1 Unit Tests

| Test File | Scope |
|-----------|-------|
| `backend/tests/unit/config/database.test.js` | MongoDB connection validation |
| `backend/tests/unit/config/claude.test.js` | Claude AI API configuration validation |
| `backend/tests/unit/app.test.js` | Express application initialisation |

### 7.2 Integration Tests

| Test File | Scope |
|-----------|-------|
| `backend/tests/integration/api.test.js` | API endpoint contract tests |
| `backend/tests/integration/database.test.js` | Database read/write operations with live MongoDB |

### 7.3 Test Execution

```bash
cd backend

# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode (development)
npm run test:watch

# Integration tests only
npm run test -- --testPathPattern=integration

# Integration tests with coverage
npm run test:coverage -- --testPathPattern=integration
```

---

## 8. CI/CD & Automation Requirements

| ID | Requirement |
|----|-------------|
| AUTO-01 | GitHub Actions workflow (`.github/workflows/ci.yml`) shall run on every push and pull request to `main` |
| AUTO-02 | CI pipeline shall execute linting, unit tests, and integration tests in sequence |
| AUTO-03 | Pull requests shall be blocked from merging if any CI step fails |
| AUTO-04 | Husky pre-commit hook shall run ESLint and unit tests before allowing a commit |
| AUTO-05 | `scripts/dev-setup.sh` shall automate local environment bootstrap (dependency install, env file copy, DB seed) |
| AUTO-06 | `scripts/quality-check.sh` shall run linting and full test suite with coverage reporting |

---

## 9. Containerisation Requirements

| ID | Requirement |
|----|-------------|
| CONT-01 | `backend/Dockerfile` shall produce a production-ready Node.js image |
| CONT-02 | `docker-compose.yml` shall orchestrate the backend service and a MongoDB container |
| CONT-03 | `docker/mongodb/init-scripts/init-db.js` shall seed the database with initial configuration on first startup |
| CONT-04 | `docker/nginx/nginx.conf` shall be prepared for future load balancing and reverse proxy configuration |
| CONT-05 | All secrets shall be injected via environment variables; no secrets shall be baked into images |

---

## 10. Definition of Done

The initial project component is considered complete when all of the following conditions are met:

- [ ] Development environment is fully configured and passes all smoke tests
- [ ] Git repository is initialised with the defined project structure
- [ ] This requirements document has been reviewed and approved by all team members
- [ ] Basic project skeleton (`npm run dev`) starts without errors and prints expected startup messages
- [ ] All team members can clone the repository and run the project locally by following `README.md`
- [ ] Unit test suite executes successfully and meets coverage thresholds (FR-12 – FR-15)
- [ ] Integration tests pass against a locally running MongoDB instance
- [ ] CI pipeline executes successfully on at least one push to the main branch
- [ ] Pre-commit hooks are active on all developer machines
- [ ] Docker Compose brings up all services without manual intervention

---

## 11. Constraints & Assumptions

- The Claude AI API requires a valid API key with sufficient quota for quiz generation requests.
- MongoDB 6.0+ is used as the primary database; schema migrations are managed manually in this phase.
- The initial target of 100 concurrent users is a development/staging constraint; production scaling is out of scope for this phase.
- GDPR compliance applies to users in the European Economic Area; data residency requirements will be addressed in a subsequent phase.
- The frontend (React) is developed in parallel and consumes the backend REST API; its detailed requirements are captured separately.

---

*End of Requirements Specification*
