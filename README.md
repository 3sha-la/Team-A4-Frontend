# House of Salaga

## Run the project

Install Node.js, Docker Desktop, and ensure Docker Desktop is running.

### Frontend

```bash
npm install
npm run dev
```

### Backend and MongoDB

In a second terminal:

```bash
docker compose up -d mongodb
cd backend
npm install
npm start
```

The backend uses the local connection in `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/house-of-salaga
```

MongoDB data is persisted in the Docker volume `mongodb_data`. Stop the database with `docker compose down`.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
