# Ufinity SWE — Education Admin (Teachers & Classes)

A full-stack app for a private education to manage **teachers** and **classes**.
This README helps evaluators and contributors spin up a **working local instance** of both the **web app** and the **API server**, plus documents assumptions and gives (optional) API design notes.

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18.20.x (LTS)  
- **npm** ≥ 9  
- **PostgreSQL** ≥ 14 (local or remote)  
- **Git**

> Tip: if you use `nvm`, run `nvm use 18`.

---

## 1) API Server — Local Setup (`server/`)

### 1.1 Environment variables

Create `server/.env`
- PORT: 4000
- REACT_BASE_URL:http://localhost:5173
- DATABASE_URL: YOUR OWN POSTGRESQL PATH

### 1.2 Install & generate Prisma client
```
cd server
npm install
npx prisma generate
```

### 1.3 Migrate & (optional) seed
```
npx prisma migrate dev --name init
```
#### Run seed script
`npm run prisma:seed`

### 1.4 Run the server (dev)
`npm run dev`
	•	Starts Express with ts-node + nodemon
	•	Default: http://localhost:4000

## 2) Web App — Local Setup (client/)

### 2.1 Install & run
```
cd client
npm install
npm run dev
```

	•	Default: http://localhost:5173

 ## 3) Running Both (Dev)
 ### Terminal A
 ```
cd server && npm run dev
```
### Terminal B
```
cd client && npm run dev
```

### Postman Link
https://web.postman.co/workspace/Iman-Workspace~b44e4d25-017b-4cbb-b7f4-d1398751cb51/collection/30664907-b3b5a4df-7e22-4d2e-8070-c87310f91d68?action=share&source=copy-link&creator=30664907

