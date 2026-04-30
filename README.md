# Persona-Based AI Chatbot

A full-stack AI chatbot application featuring **3 selectable personas**, each with unique personality traits, communication styles, and domain expertise. Built with a glassmorphism UI and powered by Google's Gemini API.

![Persona AI Chatbot](./screenshots/placeholder.png)

---

## ✨ Features

- **3 Distinct Personas**: Anshuman Singh (Entrepreneur), Abhimanyu Saxena (Product Architect), Kshitij Mishra (Educator)
- **Glassmorphism UI**: Frosted glass cards, soft blur backgrounds, subtle gradients, clean typography
- **Smart Chat**: Message bubbles, typing indicator, auto-scroll, suggestion chips
- **Persona Switching**: Instant switch with automatic chat reset
- **Error Handling**: Graceful API error messages — no crashes
- **Responsive Design**: Works beautifully on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express |
| AI | Google Gemini API (`gemini-2.0-flash`) |
| Styling | Vanilla CSS (Glassmorphism) |

---

## 📁 Project Structure

```
Persona-AI-Chatbot/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── data/            # Persona metadata
│   │   ├── App.jsx          # Main application
│   │   └── index.css        # Design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                  # Express backend
│   ├── routes/chat.js       # POST /chat endpoint
│   ├── prompts/personas.js  # System prompts
│   ├── index.js             # Server entry point
│   └── package.json
├── README.md
├── prompts.md               # System prompt documentation
├── reflection.md            # Reflection document
└── .env.example             # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Persona-AI-Chatbot.git
cd Persona-AI-Chatbot
```

### 2. Set up the backend

```bash
cd server
npm install
cp ../.env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

The server starts at `http://localhost:3001`.

### 3. Set up the frontend

```bash
cd client
npm install
npm run dev
```

The app opens at `http://localhost:5173`.

> **Note:** The Vite dev server proxies `/chat` requests to `localhost:3001` automatically.

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`
5. Deploy

### Backend → Render

1. Create a new Web Service on [Render](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable: `GEMINI_API_KEY=your_key_here`
6. Deploy

**Live Demo:** [Placeholder — add your link here]

---

## 📸 Screenshots

<!-- Add screenshots after deployment -->
| Desktop | Mobile |
|---------|--------|
| _screenshot_ | _screenshot_ |

---

## 📝 Documentation

- [System Prompts (prompts.md)](./prompts.md)
- [Reflection (reflection.md)](./reflection.md)

---

## 📄 License

This project is for educational purposes as part of the Scaler GenAI module.
