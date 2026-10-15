# w3dotcom - A Commerce Platform

AI-native, multi-channel, open-source e-commerce platform built with Next.js, React Native, FastAPI, GraphQL, MongoDB, SQLite, Terraform, and Claude-assisted engineering workflows. The repository is organized as a monorepo so product apps, backend services, shared packages, security artifacts, cloud infrastructure, and contributor workflows can evolve together with consistent validation and governance.[1][2]

## Overview

This project is designed as a portfolio-grade commerce platform with three primary surfaces: a web storefront, a mobile app, and a merchant or admin console. It also includes Python services, a GraphQL gateway, security verification artifacts, and Claude-powered developer workflows using supported GitHub Action and SDK patterns.[3][4][5]

### Goals

- Build a realistic commerce platform rather than a demo storefront.
- Showcase full-stack, mobile, backend, cloud, and security engineering.
- Demonstrate open-source maintainership and contributor onboarding.
- Keep AI integration controlled, reviewable, and secure.
- Prepare strong material for technical interviews, system design discussions, and architecture reviews.

## Core stack

| Area | Technology |
|---|---|
| Web | Next.js, React, TypeScript |
| Mobile | React Native, TypeScript, SQLite |
| Backend | FastAPI, Python |
| API layer | GraphQL gateway |
| Data | MongoDB, SQLite |
| Cloud | AWS, GCP, Azure, Terraform |
| AI workflows | Claude Code, Anthropic SDKs |
| Security | OWASP ASVS-aligned verification artifacts |

## Repository layout

```text
commerce-platform/
├── apps/
│   ├── web/
│   ├── admin/
│   └── mobile/
├── services/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── catalog-service/
│   ├── cart-service/
│   ├── checkout-service/
│   ├── order-service/
│   ├── inventory-service/
│   ├── notification-service/
│   ├── search-service/
│   └── ai-service/
├── gateway/
│   └── graphql/
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── observability/
│   ├── security/
│   ├── prompts/
│   ├── ai-contracts/
│   ├── sdk-js/
│   ├── sdk-swift/
│   └── sdk-kotlin/
├── infra/
├── security/
├── docs/
├── data/
├── .claude/
├── .github/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

Monorepos can make shared validation and dependency management easier across related projects, but they benefit from clear ownership, consistent review practices, and careful dependency discipline.[6][7][1]

## Claude integration

Claude is used in two controlled ways:

1. **Product AI runtime** through the backend `services/ai-service`, which keeps model access behind authenticated server-side boundaries.
2. **Engineering workflow automation** through Claude Code in GitHub Actions and repository-scoped `.claude/` prompts and checklists.[3][8][9][4]

### Claude-related locations

- `services/ai-service/` — backend orchestration for buyer assistant, merchant copilot, summarization, and evaluation flows.[8]
- `.github/workflows/claude.yml` — Claude Code automation for review or repository tasks.[3][4]
- `.claude/commands/` — reusable prompts for architecture review, security review, frontend review, and interview simulation.[9]
- `packages/prompts/` — versioned prompts and test fixtures.
- `packages/ai-contracts/` — structured schemas and optional TypeScript-based AI contracts using the TypeScript Agent SDK where justified.[4]

### Security note

Model API keys must never be exposed in browser bundles or mobile clients. Secrets should be stored in secure backend or CI environments, and repository security features such as secret scanning, controlled CI access, and protected workflows should be enabled for sensitive areas.[7][10][11]

## Quick start

### Prerequisites

- Node.js 20+
- pnpm 10+
- Python 3.11+
- Docker and Docker Compose
- MongoDB locally or via container
- Xcode for iOS development, Android Studio for Android development

### 1. Clone and install

```bash
git clone <your-repository-url>
cd commerce-platform
pnpm install
```

### 2. Configure environment variables

Copy the example file and update the values.

```bash
cp .env.example .env
```

Minimum values to review:

- `MONGODB_URI`
- `ANTHROPIC_API_KEY`
- `CLAUDE_MODEL`
- `JWT_SECRET`
- `AWS_REGION`

### 3. Start local dependencies

```bash
docker compose up -d
```

### 4. Start development services

```bash
pnpm dev
```

### 5. Start Python services

Each Python service can be started independently, for example:

```bash
cd services/ai-service
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
uvicorn app.main:app --reload --port 8088
```

## Common scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm format
```

CI should run validation on every pull request, and critical workflows such as release automation and AI-assisted review should be tightly controlled because CI configuration itself is a sensitive attack surface.[12][7]

## Product surfaces

### Web storefront

The web storefront is built for SEO, performance, personalized discovery, and conversion-oriented shopping flows. It should handle product browsing, filters, product detail pages, cart, checkout, account management, and order history.

### Mobile app

The mobile app focuses on cross-platform shopping experiences, offline cart support, push notifications, and secure session handling with device-appropriate storage and native extensions.

### Admin console

The admin surface supports merchant operations such as catalog management, inventory handling, campaign controls, audit review, and security or operational dashboards.

## Backend and gateway

FastAPI services handle domain logic such as auth, catalog, checkout, orders, inventory, notifications, and AI orchestration. A GraphQL gateway provides a client-friendly API boundary and should enforce authorization, validation, and abuse protections around queries and mutations.

## Cloud and infrastructure

Terraform is used to define multi-cloud infrastructure across AWS, GCP, and Azure. The cloud design should be justified through resilience, service specialization, regional strategy, compliance needs, or cost trade-offs rather than adding multiple clouds without an operational reason.

## Security

Security is a first-class concern in this repository. OWASP ASVS provides a basis for testing web application technical security controls, while secure open-source guidance emphasizes prominent vulnerability reporting, CI hardening, secret handling, access control, and dependency governance.[10][7][13]

Key security areas:

- ASVS mapping and verification evidence in `security/asvs/`.[10]
- Threat models in `security/threat-models/`.
- Security test cases and abuse cases in `security/test-cases/`.
- SBOM and dependency governance in `security/sbom/`.[13]
- Responsible disclosure process in `SECURITY.md`.[10][11]

## Open-source contribution

A strong README, contribution guide, templates, and visible security policies help turn a codebase into a usable open-source project and improve contributor onboarding.[2][14]

Please read before contributing:

- `CONTRIBUTING.md`
- `SECURITY.md`
- `docs/onboarding/`
- `.claude/context/`

Suggested contribution areas:

- Frontend and UX
- React Native and offline sync
- Backend domain services
- GraphQL gateway
- Security verification and abuse testing
- Terraform, CI/CD, and observability
- AI evaluation, prompts, and safeguards
- Documentation and interview-prep content

## Recommended repository settings

For healthier maintenance and security in a monorepo, enable:

- Branch protection rules
- CODEOWNERS for sensitive directories
- Secret scanning
- Dependabot or Renovate
- Required status checks
- Restricted workflow modification permissions
- Private vulnerability reporting if available

These practices are widely recommended for securing repositories, especially when CI, secrets, and shared infrastructure code live in the same repository.[7][12][11]

## Documentation roadmap

- `docs/architecture/` — high-level and service-level design
- `docs/adr/` — architecture decisions and trade-offs
- `docs/api/` — API and schema notes
- `docs/interviews/` — system design and design-pattern preparation notes
- `docs/paired-programming/` — Claude usage guidelines and prompt conventions
- `security/` — verification evidence and operational security docs

## Interview value

This project is structured to support technical discussions around:

- full-stack product architecture
- mobile and web delivery trade-offs
- GraphQL and backend service boundaries
- AI integration safety and developer productivity workflows
- cloud reliability, cost, and security
- open-source maintainership and contributor scaling

## License

Apache-2.0 is a strong default for this project because it is permissive and business-friendly while also providing explicit patent language that many teams prefer for serious software projects.[13]

## Status

This repository is intended to evolve incrementally. The most useful early milestones are a working storefront, AI service scaffolding, GraphQL gateway, security baseline, contributor onboarding, and CI validation.
