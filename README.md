# 🐴 Hooves Server

Backend API for **Hooves** — a horse carriage ride-hailing app for Mackinac Island, Michigan. Built on the [NestJS Boilerplate](https://github.com/brocoders/nestjs-boilerplate) with MongoDB (document mode).

## Overview

Hooves lets riders hail horse-drawn carriages on Mackinac Island (where motorized vehicles are banned). Drivers accept rides, track their GPS position, and complete trips — all coordinated through this API.

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Auth:** JWT with refresh tokens, email confirmation
- **Process Manager:** PM2
- **API Docs:** Swagger (auto-generated at `/docs`)

## Features

- **User Management** — Registration, login, roles (SuperAdmin, Admin, Driver, User)
- **Driver Profiles** — Carriage name, availability status, real-time lat/lng
- **Rides** — Full lifecycle: requested → accepted → in_progress → completed/cancelled
- **Ride Locations** — GPS breadcrumb trail recorded per ride for route history
- **Driver Location Ping** — `POST /api/v1/driver-location/ping` updates driver position and records breadcrumbs in one call

## Roles

| Role | ID | Access |
|------|-----|--------|
| Super Admin | 1 | Full system access |
| Admin | 2 | Fleet & ride management |
| Driver | 3 | Own profile, accept/complete rides |
| User | 4 | Hail rides, view own ride history |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)
- PM2 (for production)

### Installation

```bash
git clone https://github.com/NomadNiko/hooves-server.git
cd hooves-server
cp env-example-document .env
npm install
```

### Configuration

Edit `.env` with your MongoDB connection string, JWT secrets, and mail config. Key variables:

```
DATABASE_URL=mongodb+srv://...
AUTH_JWT_SECRET=your-secret
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_SECRET=your-refresh-secret
AUTH_REFRESH_TOKEN_EXPIRES_IN=365d
```

### Development

```bash
npm run start:dev
```

API available at `http://localhost:3000`. Swagger docs at `http://localhost:3000/docs`.

### Production

```bash
npm run build
pm2 start ecosystem.config.js
```

## API Endpoints (Custom)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/driver-location/ping` | Update driver GPS + record breadcrumb |
| CRUD | `/api/v1/driver-profiles` | Driver profile management |
| CRUD | `/api/v1/rides` | Ride lifecycle management |
| CRUD | `/api/v1/ride-locations` | GPS breadcrumb records |

## Project Structure

```
src/
├── driver-location/     # Custom ping endpoint
├── driver-profiles/     # Driver profile resource
├── rides/               # Ride resource
├── ride-locations/      # GPS breadcrumb resource
├── users/               # User management (boilerplate)
├── auth/                # Authentication (boilerplate)
└── app.module.ts        # Root module
```

## Based On

[Brocoders NestJS Boilerplate](https://github.com/brocoders/nestjs-boilerplate) — provides auth, user management, file uploads, mailing, and the resource generator used to scaffold this project.

## License

MIT
