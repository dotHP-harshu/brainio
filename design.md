# Design Document – Brainio (Refined to Match Requirements)

## Overview

Brainio is an AI-powered learning assessment platform that converts learning topics into intelligent tests and evaluates user understanding through adaptive feedback and analytics. The system follows a scalable web-based architecture using a React frontend, Node.js backend, AI services for generation and evaluation, and secure Google OAuth 2.0 authentication.

The design focuses on:

* Prompt-based AI test generation
* Intelligent response evaluation
* Personalized learning insights
* High performance and data security

---

## High-Level Architecture

```
User (Web App)
↓
React Frontend
↓
API Layer (Node.js / Express)
↓
---------------------------------
| Auth Service (Google OAuth)   |
| Test Generation Service       |
| Evaluation Service            |
---------------------------------

Database (mongoDB)
↓
AI APIs (LLM for generation & scoring)
```

---

## Core System Components

### 1. Frontend (React)

* Google OAuth Login
* Topic & prompt input screen
* Test interface (MCQ + short answers)
* Result & feedback screen
* Performance dashboard

---

### 2. Backend API Layer (Node.js)

Handles all system logic and AI orchestration.

Main Responsibilities:

* User session management
* Test generation requests
* Answer submission
* Evaluation processing

Example Endpoints:

POST /auth/google
POST /tests/generate
POST /tests/submit
GET /results/{assessmentId}
GET /history/{userId}

---

### 3. AI Services Layer

#### Test Generation Engine

Process:

1. Validate topic and parameters
2. Build structured AI prompt
3. Generate MCQs & descriptive questions
4. Filter unsafe content
5. Store generated test

#### Evaluation Engine

Process:

1. Receive user answers
2. Score objective & subjective responses
3. Generate concept-wise feedback
4. Identify weak areas
5. Recommend improvement topics

---

## Data Architecture

### Users Modle

```js
{
  _id,
  googleId,
  name,
  email,
  profileImage,
  preferences,
  createdAt
}
```


### Assessments Table
```js
{
  _id,
  userId,
  topic,
  difficulty,
  questions: [
    {
      type,              // mcq | short | descriptive
      id,
      content,
      options,           // for MCQ
      correctAnswer,     // AI expected answer
    }
  ],
  responses: [
    {
      questionId,
      userAnswer,
      score,
      feedback
    }
  ],
  result: {
    overallScore,
    strengths,
    weaknesses,
    recommendations
  },
  status,              // active | completed
  createdAt
}

```

## Security Design

* Google OAuth 2.0 authentication
* HTTPS encrypted communication
* Encrypted database fields

---

## Performance & Scalability

* Stateless backend services
* Horizontal scaling support
* Asynchronous AI processing

---

## AI Safety & Quality Controls

* Prompt filtering
* Content moderation
* Topic restriction handling
* Accuracy validation checks
* User content reporting flow

---

## System Flow (User Journey)

1. User logs in with Google
2. Enters learning topic & preferences
3. AI generates personalized test
4. User completes assessment
5. AI evaluates responses
6. Dashboard displays:

   * Score
   * Concept weaknesses
   * Improvement suggestions

---
