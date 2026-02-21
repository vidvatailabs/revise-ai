# AI Model Recommendation for Revise AI

**Date**: February 2026  
**Purpose**: Selecting the right AI model and provider for generating educational content (MCQs, summaries, flashcards, doubt solving) in Revise AI.

---

## Recommendation: Google Gemini API

### Why Gemini?

| Factor | Gemini | OpenAI | Anthropic (Claude) |
|---|---|---|---|
| **Free tier** | ✅ Generous (15 RPM, 1M tokens/day) | ❌ No free tier | ❌ No free tier |
| **Cost (paid)** | Very cheap | Moderate | Moderate |
| **Quality** | Excellent for education | Excellent | Excellent |
| **Indian language support** | Best (Hindi, Tamil, Telugu, etc.) | Good | Good |
| **Speed** | Fast | Fast | Moderate |
| **API signup** | Just a Google account | Requires credit card | Requires credit card |
| **JSON output** | Native support (`responseMimeType`) | Function calling | Tool use |

---

## Models

| Use Case | Model | Why |
|---|---|---|
| MCQ generation | `gemini-2.0-flash` | Fast, cheap, structured JSON output |
| Topic summaries | `gemini-2.0-flash` | Handles long educational content well |
| AI doubt solver | `gemini-2.0-flash` | Good reasoning, fast response time |
| Flashcard generation | `gemini-2.0-flash` | Clean structured output |
| Complex reasoning (fallback) | `gemini-2.0-pro` | Deeper understanding, use sparingly for cost |

**Primary model**: `gemini-2.0-flash` — covers 90%+ of our use cases.  
**Fallback model**: `gemini-2.0-pro` — only for cases where Flash quality isn't sufficient.

---

## Free Tier Limits (No Credit Card Required)

| Limit | Value |
|---|---|
| Requests per minute | 15 |
| Tokens per day | 1,000,000 |
| Requests per day | 1,500 |

This is more than enough for development, testing, and even early production with a small user base.

---

## Cost Comparison (at Scale)

Example: Generating 1,000 MCQs (~2M input tokens + 500K output tokens)

| Provider | Model | Approx. Cost |
|---|---|---|
| **Google Gemini** | gemini-2.0-flash | **~$0.30** |
| OpenAI | gpt-4o-mini | ~$0.75 |
| OpenAI | gpt-4o | ~$10 |
| Anthropic | claude-3.5-sonnet | ~$12 |

Gemini Flash is roughly **3-40x cheaper** than alternatives with comparable quality for education content.

---

## Use Cases for Revise AI

### 1. MCQ Generation
- Generate chapter-wise MCQs with 4 options, correct answer, and explanation
- Bulk generate for new chapters/subjects
- Difficulty levels: Easy, Medium, Hard

### 2. Topic Summaries
- AI-generated concise summaries for quick revision
- Key points extraction from chapter content
- "Revise in 5 minutes" format

### 3. AI Doubt Solver (Future — Pro Feature)
- Students ask questions within a chapter context
- AI provides contextual explanations
- Can explain quiz questions the student got wrong

### 4. Flashcard Generation (Future)
- Auto-generate flashcards from topic content
- Key terms, formulas, definitions, important dates
- Structured output for swipe-based UI

### 5. Smart Revision Suggestions (Future)
- Analyze student's weak areas from quiz performance
- Suggest which topics to revise and in what order
- Personalized study plans

---

## How to Get Started

### Step 1: Get API Key
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with a Google account
3. Click **"Get API Key"** → **"Create API key"**
4. Copy the key — no credit card needed

### Step 2: Add to Environment
```env
# .env.local
GEMINI_API_KEY=your_api_key_here
```

### Step 3: Install SDK
```bash
npm install @google/generative-ai
```

### Step 4: Basic Usage
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Generate MCQs with structured JSON output
const result = await model.generateContent({
  contents: [{
    role: "user",
    parts: [{
      text: `Generate 5 MCQs for Class 10 CBSE Science, 
             Chapter: Chemical Reactions and Equations.
             Return as JSON array with: question, options (array of 4), 
             correctAnswer (index 0-3), explanation.`
    }]
  }],
  generationConfig: {
    responseMimeType: "application/json", // Forces clean JSON output
  },
});

const mcqs = JSON.parse(result.response.text());
```

---

## Decision Summary

| Decision | Choice | Rationale |
|---|---|---|
| **Provider** | Google Gemini | Free tier, cheap at scale, great for Indian education context |
| **Primary Model** | gemini-2.0-flash | Best price-to-performance ratio |
| **Fallback Model** | gemini-2.0-pro | For complex reasoning tasks |
| **Integration** | Server-side only (API routes) | Keep API key secure, control costs |

---

*This document is for internal discussion. Implementation will be done when we're ready to add AI-powered features to Revise AI.*
