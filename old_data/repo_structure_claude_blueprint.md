# Monorepo Blueprint for the E-Commerce Platform with Claude Integration

This document provides a practical repository structure, dependency placement, and starter file templates for a multi-channel e-commerce platform using Next.js, React Native, FastAPI, GraphQL, MongoDB, SQLite, Terraform, and Claude-assisted workflows. Anthropic documents a TypeScript Agent SDK package named `@anthropic-ai/claude-agent-sdk`, provides a Python SDK for backend integrations, and supports Claude Code automation in GitHub Actions, so this blueprint keeps Claude dependencies concentrated in AI service and engineering workflow layers rather than scattering them across the whole stack.[1][2][3][4]

## Architecture goals

The repository should support three application surfaces, multiple Python domain services, shared packages, cloud infrastructure, security artifacts, contributor onboarding, and AI-assisted coding and review workflows. Keeping prompt assets, command templates, and Claude automation in dedicated folders improves maintainability and makes the AI integration easier to explain in system design or team-process discussions.[5][6][4]

## Repository tree

```text
commerce-platform/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── tsconfig.json
│   │
│   ├── admin/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── tsconfig.json
│   │
│   └── mobile/
│       ├── src/
│       ├── ios/
│       ├── android/
│       ├── package.json
│       └── tsconfig.json
│
├── services/
│   ├── api-gateway/
│   │   ├── app/
│   │   ├── tests/
│   │   ├── pyproject.toml
│   │   └── Dockerfile
│   │
│   ├── auth-service/
│   ├── catalog-service/
│   ├── cart-service/
│   ├── checkout-service/
│   ├── order-service/
│   ├── inventory-service/
│   ├── notification-service/
│   ├── search-service/
│   └── ai-service/
│       ├── app/
│       │   ├── api/
│       │   ├── clients/
│       │   ├── prompts/
│       │   ├── evaluators/
│       │   ├── safety/
│       │   └── schemas/
│       ├── tests/
│       ├── pyproject.toml
│       └── Dockerfile
│
├── gateway/
│   └── graphql/
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── observability/
│   ├── security/
│   ├── prompts/
│   │   ├── buyer-assistant/
│   │   ├── merchant-copilot/
│   │   ├── code-review/
│   │   └── interview-simulator/
│   ├── ai-contracts/
│   ├── sdk-js/
│   ├── sdk-swift/
│   └── sdk-kotlin/
│
├── infra/
│   ├── terraform/
│   │   ├── aws/
│   │   ├── gcp/
│   │   ├── azure/
│   │   └── shared/
│   ├── kubernetes/
│   ├── docker/
│   ├── github-actions/
│   └── policy/
│
├── security/
│   ├── asvs/
│   ├── threat-models/
│   ├── test-cases/
│   ├── sbom/
│   └── runbooks/
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── api/
│   ├── interviews/
│   ├── paired-programming/
│   └── onboarding/
│
├── data/
│   ├── seed/
│   ├── fixtures/
│   └── evaluation/
│
├── .claude/
│   ├── commands/
│   │   ├── architecture-review.md
│   │   ├── api-review.md
│   │   ├── security-review.md
│   │   ├── frontend-review.md
│   │   ├── mobile-review.md
│   │   └── interview-simulator.md
│   ├── context/
│   │   ├── repo-summary.md
│   │   ├── service-boundaries.md
│   │   └── domain-glossary.md
│   ├── review-checklists/
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   ├── cloud.md
│   │   └── security.md
│   └── templates/
│       ├── pr-prompt.md
│       └── system-design-prompt.md
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── security.yml
│   │   ├── release.yml
│   │   └── claude.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

## Dependency placement

Claude dependencies should live only where they are needed. Anthropic’s TypeScript Agent SDK is intended for TypeScript-based agent use cases, while Anthropic’s Python SDK suits backend orchestration services, and Claude Code actions can be used inside GitHub workflows for repository automation.[1][2][3]

| Workspace | Key dependencies | Notes |
|---|---|---|
| Root | `pnpm`, `turbo`, `typescript`, `eslint`, `prettier`, `husky`, `lint-staged` | Monorepo tooling only |
| `apps/web` | `next`, `react`, `react-dom`, GraphQL client, query/state libs | Avoid direct Claude SDK by default |
| `apps/admin` | Same as web plus admin-specific UI/data tooling | Admin should still call internal AI service |
| `apps/mobile` | `react-native`, navigation, SQLite, secure storage, notifications | No direct model secret exposure |
| `gateway/graphql` | `graphql`, GraphQL server/gateway libs, auth and validation middleware | Client-friendly API boundary |
| `services/*` | `fastapi`, `pydantic`, DB drivers, test and tracing libs | One `pyproject.toml` per service or shared base |
| `services/ai-service` | Anthropic Python SDK, `fastapi`, `httpx`, evaluation tooling | Central AI orchestration point[2] |
| `.github/workflows/claude.yml` | Claude Code GitHub Action | PR automation and repo tasks[3][4] |
| `.claude/*` | Prompt/context markdown files | Reusable paired-programming setup |

## Root `package.json`

```json
{
  "name": "commerce-platform",
  "private": true,
  "packageManager": "pnpm@10.0.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

## `pnpm-workspace.yaml`

```yaml
packages:
  - apps/*
  - services/*
  - gateway/*
  - packages/*
```

## `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"],
      "outputs": ["coverage/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    }
  }
}
```

## `apps/web/package.json`

```json
{
  "name": "@apps/web",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "graphql": "^16.0.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^5.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^2.0.0"
  }
}
```

## `apps/mobile/package.json`

```json
{
  "name": "@apps/mobile",
  "private": true,
  "scripts": {
    "start": "react-native start",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-native": "^0.80.0",
    "@react-navigation/native": "^7.0.0",
    "zustand": "^5.0.0",
    "zod": "^3.0.0"
  }
}
```

## `gateway/graphql/package.json`

```json
{
  "name": "@gateway/graphql",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json",
    "lint": "eslint src --ext .ts",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "graphql": "^16.0.0",
    "graphql-yoga": "^5.0.0",
    "zod": "^3.0.0"
  }
}
```

## `services/ai-service/pyproject.toml`

```toml
[project]
name = "ai-service"
version = "0.1.0"
description = "Claude-powered orchestration service for commerce assistants"
requires-python = ">=3.11"
dependencies = [
  "fastapi>=0.115.0",
  "uvicorn[standard]>=0.30.0",
  "pydantic>=2.0.0",
  "httpx>=0.27.0",
  "anthropic>=0.40.0",
  "tenacity>=9.0.0",
  "structlog>=24.0.0"
]

[project.optional-dependencies]
dev = [
  "pytest>=8.0.0",
  "pytest-asyncio>=0.23.0",
  "ruff>=0.6.0",
  "mypy>=1.11.0"
]
```

Anthropic’s Python SDK belongs here because the backend should mediate model access, apply auth and rate limits, and keep secrets away from browsers and mobile clients.[2][4]

## Optional TypeScript Claude workspace

If a TypeScript service or engineering tool needs direct agent integration, isolate it into a separate package using Anthropic’s TypeScript Agent SDK.[1]

### `packages/ai-contracts/package.json`

```json
{
  "name": "@packages/ai-contracts",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "eslint src --ext .ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "latest",
    "zod": "^3.0.0"
  }
}
```

Use this only when there is a real TypeScript-side agent need, such as tooling, structured schema enforcement, or automated analysis workflows, rather than adding it to every app by default.[1]

## `.env.example`

```bash
# Shared
NODE_ENV=development
APP_ENV=local

# GraphQL
GRAPHQL_PORT=4000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/commerce

# AI service
AI_SERVICE_PORT=8088
ANTHROPIC_API_KEY=replace_me
CLAUDE_MODEL=claude-sonnet-4-20250514
AI_FEATURES_ENABLED=true
PROMPT_VERSION=v1

# Security
JWT_SECRET=replace_me
ENCRYPTION_KEY=replace_me

# Cloud
AWS_REGION=eu-west-1
GCP_PROJECT_ID=replace_me
AZURE_SUBSCRIPTION_ID=replace_me
```

`ANTHROPIC_API_KEY` should exist only in secure backend or CI environments, not in browser-exposed bundles or mobile client source.[2][4]

## `.github/workflows/claude.yml`

Claude Code is available as a GitHub Action, so a dedicated workflow can automate issue grooming, PR review, or architecture suggestions using repository secrets and controlled triggers.[3][4]

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]
  workflow_dispatch:

jobs:
  claude-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run Claude Code Action
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this pull request for:
            - architecture concerns
            - security risks
            - test coverage gaps
            - maintainability problems
            - documentation issues
            Return actionable comments only.
```

## `.claude/commands/security-review.md`

```md
Act as an application security reviewer using OWASP ASVS as the framing model.

Context:
- This is a multi-channel e-commerce platform.
- Stack: Next.js, React Native, FastAPI, GraphQL, MongoDB, SQLite, Terraform.
- Sensitive flows: auth, cart, checkout, admin actions, file upload, AI endpoints.

Task:
1. Identify abuse cases.
2. Flag missing controls.
3. Suggest verification tests.
4. Recommend evidence to store in /security.

Output:
- Findings
- Risk level
- Suggested fixes
- Verification checklist
```

## `.claude/commands/architecture-review.md`

```md
Act as a staff engineer reviewing service boundaries for this commerce platform.

Services:
- auth-service
- catalog-service
- cart-service
- checkout-service
- order-service
- inventory-service
- notification-service
- search-service
- ai-service
- graphql gateway

Review for:
1. coupling and ownership problems
2. data consistency risks
3. scaling bottlenecks
4. trade-offs suitable for a senior system design interview

Return:
- boundary concerns
- suggested refactor
- interview-ready explanation
```

## `.claude/commands/interview-simulator.md`

```md
Act as an interviewer for a senior full-stack, platform, and cloud role.
Use this repository as the case study.

Ask one question at a time about:
- system design
- backend trade-offs
- frontend architecture
- GraphQL design
- cloud reliability
- security verification

After each answer:
1. score clarity out of 10
2. score technical depth out of 10
3. identify weak trade-offs
4. ask a harder follow-up
```

## Suggested contributor docs

Add these project-level files for a healthier open-source workflow and more explainable team process:

- `README.md` with architecture and setup
- `CONTRIBUTING.md` with local setup and coding standards
- `SECURITY.md` for responsible disclosure
- `docs/architecture/high-level.md`
- `docs/paired-programming/claude-usage.md`
- `docs/interviews/system-design-cheatsheet.md`

## Why this structure works

This structure keeps product delivery, AI runtime access, security verification, and engineering automation separated into understandable layers. That is helpful for maintainers, contributors, and interviewers because it clearly shows that Claude is treated as both a product capability and a controlled engineering assistant, using official SDKs and workflow automation where appropriate rather than being embedded everywhere.[1][2][3][4]
