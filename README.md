# 🍽️ Food Ordering Front-End

A modern front-end developed using **React**, **Vite**, and **TypeScript**, integrated with the Food Ordering API.

## ✨ Key Features

- Authentication with **Firebase**
- Create and manage **orders** and **foods**
- Visual feedback on **order statuses**
- Payment via **MercadoPago Checkout**
- Responsive UI built with **TailwindCSS** or **Material UI**
- Clean code structure using Hooks, Context API, Zustand, or Redux

## 📂 Project Structure

```text
web/
├── public/
├── src/
│   ├── @types/
│   ├── components/
│   ├── constantes/
│   ├── contexts/
│   ├── extensions/
│   ├── firebase/
│   ├── helpers/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/     <-- API calls
│   └── App.tsx
├── index.html
└── vite.config.ts
```

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-org/foodordering-app.git
cd foodordering-app
npm install
cp .env.example .env   # configure Firebase + API URL
npm run dev
```

### 2. .env Configuration

```env
VITE_PUBLIC_URL_API=http://localhost:8080/api
VITE_FIREBASE_API_KEY=xxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxx
VITE_FIREBASE_MEASUREMENT_ID=xxxxxxxx
VITE_MERCADOPAGO_API_KEY=xxxxxxxx
```

The app runs at **http://localhost:5173**

## 🧑‍💻 Technologies

- React
- TypeScript
- Vite
- Firebase Auth
- ContextAPI
- TailwindCSS
- Axios

back-end project link: https://github.com/gilsonconceicao/food-manager-api

<img width="2558" height="961" alt="image" src="https://github.com/user-attachments/assets/d230b1d9-9420-4051-ab4a-d3e7c416d65b" />
