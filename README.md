<div style="display:flex; justify-content:center; align-item:center; margin-bottom:4rem;" >
<img src="./client/public/branio_logo.svg" width="500"  />
</div>

> **AI-Powered Learning Assessment Platform** — Transform any learning topic into intelligent, personalized tests and get deep insights into your strengths and weaknesses.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)[![Node.js](https://img.shields.io/badge/Node.js-LTS-green)](https://nodejs.org/)[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
<!-- [![License](https://img.shields.io/badge/License-ISC-yellow)](#) -->

## What is Brainio?

Brainio is an intelligent learning platform that revolutionizes how you assess your knowledge. Simply enter any learning topic or concept, and our AI instantly generates customized tests with multiple question formats. Get evaluated by intelligent AI that provides actionable insights into your performance, weak areas, and personalized recommendations for improvement.

**Live Demo:** [https://brainio-v1.vercel.app](https://brainio-v1.vercel.app)

---

## Key Features

### **AI-Powered Test Generation**

- Generate unlimited custom tests from any topic or learning material
- Multiple question formats: Multiple Choice (MCQ), Short Answer, and Conceptual Reasoning
- Adjustable difficulty levels: Easy, Medium, Hard
- 5-20 questions per test based on user preferences

### **Intelligent Response Evaluation**

- AI-based intelligent scoring system
- Concept-wise analysis identifying strengths and weaknesses
- Percentage-based accuracy metrics
- Actionable feedback with improvement recommendations

### **Rich User Experience**

- 8 premium theme options (Pink Gold, Modern Dark, Cyber Neon, and more)
- Smooth animations with Framer Motion
- Responsive design with Tailwind CSS
- Session-based learning tracking

### **Secure Authentication**

- Google OAuth 2.0 authentication
- Secure session management with MongoDB
- HTTPS encrypted communication
- Privacy-first design

### **Performance Dashboard**

- Track learning progress over time
- View assessment history
- Performance trends and analytics
- Personalized learning insights

---

## Architecture Overview

```┌─────────────────────────────────────────────────────┐ │             Frontend (React + TypeScript)           │ │  (Vite, Tailwind, Framer Motion, React Router)     │ └────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────────┐      ┌──────────────────┐
    │ API Routes  │      │ Authentication   │
    │ (Express)   │      │ (Google OAuth)   │
    └─────────────┘      └──────────────────┘
         │
    ┌────┴─────────────────────────────┐
    │                                  │
    ▼                                  ▼
┌────────────────────┐      ┌──────────────────┐
│ Test Generation    │      │ Response         │
│ Service (AI/LLM)   │      │ Evaluation (AI)  │
└────────────────────┘      └──────────────────┘
         │
         └────────────────┬────────────────┘
                          ▼
                  ┌──────────────────┐
                  │ MongoDB Database │
                  │ (Users, Tests,   │
                  │  History)        │
                  └──────────────────┘
```

---

## Project Structure

```
brainio/
├── client/                    # React Frontend Application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components (Generator, Test, Results)
│   │   ├── hooks/            # Custom hooks (useUser, useTheme)
│   │   ├── context/          # Context API providers (User, Prompt, Test, Result)
│   │   ├── types/            # TypeScript type definitions
│   │   ├── data.ts           # Theme configurations
│   │   └── App.tsx           # Main app component
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── vercel.json           # Vercel deployment config
│
├── server/                    # Node.js/Express Backend
│   ├── src/
│   │   ├── config/           # Configuration (Passport, MongoDB, Environment)
│   │   ├── routes/           # API routes (auth, tests, history)
│   │   ├── models/           # MongoDB models (User, History, Assessment)
│   │   ├── services/         # Business logic (AI test generation, evaluation)
│   │   ├── utils/            # Utility functions (JSON extraction, token revocation)
│   │   ├── middleware/       # Express middleware
│   │   └── server.ts         # Express app entry point
│   ├── package.json          # Backend dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   └── vercel.json           # Vercel deployment config
│
├── requirements.md           # Detailed project requirements document
├── design.md                 # System design and architecture
├── homePage.md               # Landing page content specifications
├── profilelinks.ts           # Profile link utilities
├── fakeCompletedData.json    # Mock test data for development
└── tests.ts                  # Test specifications and examples
```

---

##  Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Google OAuth** credentials
- **OpenRouter API** key (for AI functionality) (Currently using GROQ CONSOLE API)

### Installation

#### 1. **Clone the Repository**

```bash
git clone https://github.com/dotHP-harshu/brainio.git
cd brainio
```

#### 2. **Setup Backend (Server)**

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in your environment variables:
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# GOOGLE_REDIRECT_URL=http://localhost:5000/auth/google/callback
# MONGOOSE_URI=your_mongodb_connection_string
# CLIENT_URL=http://localhost:5173
# SESSION_SECRET=your_secret_key
# PORT=5000
# OPEN_ROUTER_KEY=your_GROQ_api_key

# Start development server
npm run dev

# The server runs on http://localhost:5000
```

#### 3. **Setup Frontend (Client)**

```bash
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in your environment variables:
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# The app runs on http://localhost:5173
```

### Environment Variables

**Server (.env)**

```
PORT=5000
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URL=http://localhost:5000/auth/google/callback
MONGOOSE_URI=mongodb+srv://username:password@cluster.mongodb.net/brainio
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-secret-key-here
OPEN_ROUTER_KEY=your-api-key
```

**Client (.env)**

```
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

### Authentication

- `POST /auth/google` — Google OAuth callback
- `GET /auth/user` — Get current user
- `POST /auth/logout` — Logout user

### Tests

- `POST /tests/generate` — Generate a new test
- `POST /tests/submit` — Submit test answers
- `GET /tests/:assessmentId` — Get test results

### History

- `GET /history/:userId` — Get user's assessment history
- `GET /history/:userId/stats` — Get performance statistics

---

## Tech Stack

### Frontend

- **React 19** — UI framework
- **Vite** — Build tool and dev server
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **React Router 7** — Client-side routing
- **Axios** — HTTP client
- **React Helmet** — SEO management
- **React Markdown** — Markdown rendering
- **Lucide React** — Icons

### Backend

- **Node.js** — Runtime
- **Express 5** — Web framework
- **TypeScript** — Type safety
- **MongoDB** — NoSQL database
- **Mongoose** — ODM
- **Passport.js** — Authentication
- **Google OAuth 2.0** — Social login
- **Express Session** — Session management
- **OpenAI API** — AI test generation & evaluation

### Infrastructure & Deployment

- **Vercel** — Frontend & Backend hosting
- **MongoDB Atlas** — Cloud database
- **CORS** — Cross-origin resource sharing

---

## Data Models

### User Model

```typescript
{
  _id: ObjectId,
  googleId: String (unique),
  email: String (unique),
  userName: String,
  photo: String,
  accessToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment Model

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  topic: String,
  difficulty: "Easy" | "Medium" | "Hard",
  questions: [
    {
      type: "objective" | "subjective",
      id: Number,
      question: String,
      options: String[] | null,
      correctAnswer: String,
      hint: String,
      expectedPoints: Number
    }
  ],
  responses: [
    {
      questionId: Number,
      userAnswer: String,
      score: Number,
      feedback: String
    }
  ],
  result: {
    overallScore: Number,
    strengths: String[],
    weaknesses: String[],
    recommendations: String[]
  },
  status: "active" | "completed",
  createdAt: Date,
  updatedAt: Date
}
```

---

## How It Works

### User Journey

1. **Authentication**
   - User clicks \"Continue with Google\"
   - OAuth login creates/retrieves user profile
   - Session established with secure tokens

2. **Test Generation**
   - User enters learning topic and preferences
   - System validates input
   - AI generates personalized test questions
   - Multiple formats: MCQ, Short Answer, Conceptual

3. **Test Taking**
   - User answers questions
   - System tracks time spent
   - Provides hints on request
   - Allows skipping questions

4. **Evaluation**
   - AI intelligently scores responses
   - Generates concept-wise analysis
   - Identifies strengths and weaknesses
   - Provides personalized recommendations

5. **Results & Dashboard**
   - User views detailed results
   - Browses performance history
   - Tracks learning progress
   - Gets improvement suggestions

---

## Security & Privacy

- **Google OAuth 2.0** for secure authentication
- **HTTPS encryption** for all communications
- **Secure sessions** with MongoDB store
- **GDPR compliant** data handling
- **Encrypted data** in transit and at rest
- **Daily backups** of user data
- **Content moderation** for generated questions

---

## Performance

- **Response Time:** < 2 seconds for standard operations
- **Concurrent Users:** Supports up to 1000 concurrent users
- **Uptime:** 99.5% availability during business hours
- **Auto-scaling:** Horizontal scaling support
- **Database:** Optimized MongoDB queries with indexing

---

## Known Issues & Limitations

- Content generation depends on OpenRouter API availability
- Subjective answer evaluation accuracy depends on AI model quality
- Real-time collaboration not yet supported
- Offline mode not available

---

## Roadmap

- [ ] Collaborative study groups
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Spaced repetition system
- [ ] Integration with LMS platforms
- [ ] Video explanation for answers
- [ ] Peer review functionality

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<!-- ##  License

This project is licensed under the ISC License — see the LICENSE file for details.

--- -->

## Support & Contact

Visit the GitHub profile page for the contact details

---

## Acknowledgments

- Built with ❤️ by [dotHP-harshu](https://github.com/dotHP-harshu)
- Powered by modern web technologies
- Inspired by the need for smarter learning assessments
- Thanks to all contributors and users

---

<div align="center">

**⭐ If you found this helpful, please consider giving it a star!**

[View on GitHub](https://github.com/dotHP-harshu/brainio) • [Live Demo](https://brainio-server.vercel.app)

</div>
