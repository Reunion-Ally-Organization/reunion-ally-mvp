# Reunion Ally

**Reunion Planning Reimagined** — A complete reunion management platform that helps organizers manage events, track attendance, handle payments, and coordinate communications — all in one place.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [AWS Amplify Services](#aws-amplify-services)
- [Team](#team)

---

## About

Reunion Ally is a web application designed to eliminate the stress of reunion planning. Whether it's a class reunion, family gathering, or alumni event, Reunion Ally provides organizers with a centralized dashboard to create events, manage attendees, track budgets, and communicate with guests — all from a single platform.

---

## Features

- **Smart Scheduling** — Create and manage multiple reunion events with date, time, location, and color-coded organization
- **Event Dashboard** — A centralized view of event details, attendance stats, and budget overview at a glance
- **Attendance Tracking** — Monitor RSVPs in real-time with confirmed, pending, and declined statuses
- **Budget Management** — Track collected and remaining funds with a clear budget overview
- **Payment Management** — Handle payments, track dues, and integrate payment processing for attendees
- **Unified Communication** — Coordinate with attendees using built-in communication tools
- **User Authentication** — Secure sign-up and login with email/password and social providers (Google, Apple, Facebook)
- **Responsive Design** — Fully responsive UI optimized for desktop, tablet, and mobile

---

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Frontend     | React.js, TypeScript, JavaScript  |
| Markup       | HTML                              |
| Styling      | Vanilla CSS                       |
| Deployment   | AWS Amplify Hosting (CDN)         |
| Auth         | AWS Cognito (via Amplify)         |
| Database     | AWS DynamoDB / GraphQL            |
| Storage      | AWS S3                            |
| APIs         | AWS Amplify APIs                  |

> **Note:** Next.js integration is planned for a future iteration.

---

## Project Structure

```
reunion-ally-mvp/
├── amplify/
│   └── auth.ts                 # AWS Amplify authentication config
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   └── loginPage.tsx   # Login & signup page
│   │   ├── dashboard/
│   │   │   └── dashboard.tsx   # Main dashboard view
│   │   └── homepage/
│   │       └── homepage.tsx    # Landing page
│   └── shared/
│       └── shared.tsx          # Shared components & utilities
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/) (for backend services)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/reunion-ally-mvp.git
cd reunion-ally-mvp

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## AWS Amplify Services

| Service          | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **Cognito**      | User authentication & authorization          |
| **DynamoDB**     | NoSQL database for events, attendees, budgets |
| **GraphQL API**  | Data queries and mutations                   |
| **S3**           | File and asset storage                       |
| **Hosting**      | CDN-based deployment and hosting             |

---

## Team

| Name                      | Role           |
| ------------------------- | -------------- |
| **Alexis Mesa Coria**     | Tech Lead      |
| **Siddhant Kumar**        | Tech Lead      |
| **Sai Katkar**            | Developer      |
| **Murewa Adebajo**        | Developer      |
| **Carmen Hampton**        | Developer      |
| **Vamsi Krishna**         | Developer      |
| **Zori Badkerhanian**     | Developer      |
