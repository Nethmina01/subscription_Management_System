📦 Subscription Management System API

Automated Subscription Tracking & Email Reminder Backend

A production-ready backend API that helps users manage subscriptions and avoid unexpected renewals by sending automated email reminders before renewal dates, powered by serverless background workflows.

Built with Node.js, Express, MongoDB, and modern cloud-native services following real-world backend engineering best practices.

✨ Why This Project Exists

Subscriptions are everywhere — streaming platforms, SaaS tools, utilities — but users often forget renewal dates and get charged unexpectedly.

This project solves that problem by:

Automatically tracking subscription renewal dates

Proactively notifying users before renewals happen

Running reminders reliably in the background

Remaining stable even if the API server restarts

The goal is predictability, transparency, and user trust.

🧠 What This System Does 

Authenticates users securely using JWT

Allows users to create and manage subscriptions

Automatically calculates renewal dates

Triggers background workflows on subscription creation

Sends multiple email reminders before renewal

Protects APIs against bots and abuse

Scales cleanly using stateless APIs and serverless workflows

🏗️ System Architecture Overview
Client (Postman / Frontend)
        |
        v
  Express REST API
        |
        ├── JWT Authentication
        ├── Arcjet Security Layer
        ├── Controllers
        │     ├── Auth
        │     ├── User
        │     ├── Subscription
        │     └── Workflow
        |
        ├── MongoDB (Mongoose)
        |
        └── Upstash Workflow (QStash)
              └── Automated Email Reminders

Architectural Principles

Stateless API design

Separation of concerns

Fail-open third-party integrations

Asynchronous background processing

Environment-based configuration

🔐 Authentication & Authorization

User sign-up and sign-in using JWT

Password hashing with bcrypt

Authorization middleware for protected routes

Token-based access control (Bearer tokens)

Example
Authorization: Bearer <JWT_TOKEN>

📦 Subscription Lifecycle
Subscription Creation

When a user creates a subscription:

Input is validated

Renewal date is automatically calculated

Subscription status is determined (active / expired)

Subscription is saved to the database

A background workflow is triggered

Subscription Status

Active → Renewal date is in the future

Expired → Renewal date has passed

🔔 Automated Email Reminder System (Core Feature)
How It Works

A subscription is created

The system calculates the renewal date

A serverless workflow is triggered via Upstash

The workflow schedules reminders at:

7 days before renewal

5 days before renewal

2 days before renewal

1 day before renewal
(these dates can be changed based on your preference)
On each reminder date:

The workflow wakes up

An email notification is sent

Users can renew or cancel in advance

Why Background Workflows?

Traditional approaches like setTimeout or cron jobs:

Fail on server restarts

Don’t scale reliably

Are hard to retry safely

Upstash Workflows solve this by:

Persisting workflow state

Sleeping in the cloud

Resuming execution reliably

Retrying failed steps automatically

🔁 Background Workflow Responsibilities

Receive subscription ID payload

Fetch subscription data safely

Validate subscription state

Calculate reminder dates

Sleep until scheduled times

Trigger email delivery logic

Run independently of API uptime

🌐 API Design & Endpoints
Authentication
POST /api/v1/auth/sign-up
POST /api/v1/auth/sign-in

Users
GET /api/v1/user/me
GET /api/v1/user/:id

Subscriptions
POST /api/v1/subscription
GET  /api/v1/subscription/:userId

Workflows (Internal)
POST /api/v1/workflows/subscription/reminder


Workflow endpoints are not intended for public use and are invoked internally by Upstash.

📁 Project Structure
subscriptionManagementSystem/
│
├── app.js                     # App entry point
│
├── config/
│   ├── env.js                  # Environment configuration
│   └── upstash.js              # Upstash workflow client
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── subscription.controller.js
│   └── workflow.controller.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── subscription.routes.js
│   └── workflow.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── arcjet.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── subscription.model.js
│
├── database/
│   └── mongodb.js
│
└── package.json

🛡️ Security Considerations

Passwords are never stored in plain text

JWT secrets are environment-scoped

Bot protection and rate limiting enabled

Sensitive fields excluded from responses

Background workflows isolated from API logic

📦 Technology Stack
Backend

Node.js

Express

MongoDB

Mongoose

Security

JWT

bcrypt

Arcjet

Background Automation

Upstash Workflow

QStash

Utilities

dotenv

dayjs

cookie-parser

nodemon

⚙️ Environment Configuration

Example .env.development.local:

PORT=5500
NODE_ENV=development

DB_URI=mongodb://localhost:27017/subscriptions

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

QSTASH_TOKEN=your_qstash_token
QSTASH_URL=https://qstash.upstash.io

SERVER_URL=http://localhost:5500

▶️ Running the Application
npm install
npm run dev

🚫 Non-Goals (Intentional Scope)

This project does not:

Process payments

Handle billing or invoices

Integrate payment gateways

Replace full CRM systems

It focuses on subscription tracking and reminders, not financial transactions.

📈 Future Enhancements

Email provider integration (SES / SendGrid / Resend)

User notification preferences

Admin roles & dashboards

Subscription analytics

Swagger / OpenAPI documentation

Unit & integration tests

🧠 Key Takeaway

This project demonstrates real-world backend engineering:

Secure REST API design

Subscription lifecycle management

Automated email reminders

Serverless background workflows

Production-ready architecture
