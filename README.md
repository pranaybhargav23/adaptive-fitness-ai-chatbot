# FitBuddy AI – Adaptive Fitness Companion

FitBuddy AI is a mobile-first AI-powered fitness chatbot built using React Native (Expo) and OpenAI APIs.
It helps users with workouts, fitness habits, and consistency using adaptive, behavior-aware conversations.

⚠️ FitBuddy AI is not a medical tool and does not provide medical advice.

## 🚀 Tech Stack

**Frontend**

- React Native (Expo – Managed Workflow)
- JavaScript (JS + JSX)
- Zustand (State Management)

**Backend**

- Node.js (v20.x) + Express
- MongoDB (Chat storage)

**AI**

- OpenAI Chat Completion API

## ✨ Core Features

- Welcome screen explaining scope & limitations
- Chat UI (user → right, AI → left)
- Structured AI responses (bullets, plans)
- Quick suggestion pills for common questions
- Adaptive AI behavior (personality + usage + lifestyle)
- Coin-based reward system (1 coin per prompt)
- Chat history (last 20 conversations)
- Safety guardrails for medical topics

## 🧠 Adaptive AI Behavior

FitBuddy AI adapts responses using three layers of context:

**1️⃣ Personality Types**

- **A – Encouragement Seeker**: empathetic, reassuring
- **B – Creative Explorer**: creative, non-rigid
- **C – Goal Finisher**: structured, action-oriented

(Personality is hardcoded for demo.)

**2️⃣ Usage Duration Logic**

- **0–3 days**: empathetic, gentle
- **4–8 days**: friendly guidance
- **9+ days**: coach-like, actionable

**3️⃣ Lifestyle Context (Dummy Data)**

```json
{
  "steps": 4200,
  "exerciseMinutes": 25,
  "sleepHours": 5.5
}
```

The AI explicitly references this data in responses.

## 🧩 Prompt Composition Strategy

Every OpenAI request combines:

- User personality
- Usage duration
- Lifestyle signals
- User question

This logic is implemented in `backend/utils/promptBuilder.js`.

## 🛡️ Safety & Scope Handling

FitBuddy AI politely refuses questions related to:

- Diseases
- Injuries
- Medications or supplements

It clearly states it cannot provide medical advice and suggests consulting a certified professional.

Safety is handled using:

- Keyword checks (`safetyCheck.js`)
- System-level AI instructions

## 🪙 Coin Reward System

Users earn 1 coin for every prompt sent.
Coins are managed using Zustand and displayed in the chat header.

## 🕘 Chat History

The app stores the last 20 conversations locally.
Users can reopen past chats from the History screen.

## ▶️ How to Run the Project

**Backend**

```bash
cd backend
npm install
npm run dev    # For development with nodemon
# OR
npm start      # For production
```

Create a `.env` file:

```
OPENAI_API_KEY=your_openai_key
MONGO_URI=your_mongodb_uri
PORT=3000
```

**Deployed Backend:**

- Production API: `https://adaptive-fitness-ai-chatbot-1.onrender.com`
- The app is configured to use the deployed backend by default

**Frontend**

```bash
npm install
npx expo start
```

## 🎥 Demo & APK

**📱 Android APK Download:**
[Download FitBuddy AI APK](https://expo.dev/accounts/pranaybhargav/projects/fitness-chatbot-starter/builds/b462732e-1683-4aba-8e15-90be64dc4353)

## 🤖 AI Tools Used

- **OpenAI Chat Completion API** (primary AI engine for user-facing chat functionality)

## 📂 Project Architecture

```
├── app/
│   ├── welcomeScreen.jsx    # Landing page with FitBuddy AI intro
│   ├── chat.jsx            # Main chat interface
│   ├── history.jsx         # Past conversations view
│   └── index.jsx           # Tab navigation
├── components/
│   ├── ChatBubble.jsx      # Message display component
│   ├── InputBar.jsx        # Message input with send button
│   ├── Header.jsx          # Chat header with coin count
│   └── QuickSuggestions.jsx # Pre-built question buttons
├── backend/src/
│   ├── controllers/        # API endpoint logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # Express routes
│   └── utils/
│       ├── promptBuilder.js # AI prompt composition
│       └── safetyCheck.js  # Keyword filtering
├── store/
│   └── useChatStore.js    # Zustand state management
└── services/
    └── api.js             # Frontend-backend communication
```

## 🔧 Key Implementation Details

**State Management (Zustand):**

- Personality: Hardcoded as "A" (Encouragement Seeker) for demo
- Usage Days: Set to 2 days for consistent demo behavior
- Lifestyle Data: Mock data (4200 steps, 25 exercise minutes, 5.5 sleep hours)
- Coin System: Persistent across sessions via backend

**AI Integration:**

- OpenAI GPT model with structured system prompts
- Dynamic context injection based on user profile
- Safety layer prevents medical advice responses
- Structured response formatting enforced via prompts

**Backend Features:**

- RESTful API with Express.js
- MongoDB for chat history and coin persistence
- CORS enabled for cross-origin requests
- Error handling and input validation
