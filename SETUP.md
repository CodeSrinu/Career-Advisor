# Career Advisor Application

## Overview

This is a Next.js 14 application that implements the core workflow of the Career Advisor platform with AI-powered career recommendations.

## Features

- Google OAuth authentication
- Native language selection (Telugu, Hindi, Tamil, Marathi)
- Psychology quiz for career discovery
- AI-powered career persona generation
- Role recommendations based on user's psychology quiz answers
- Detailed role deep-dive information
- Responsive UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- A Google Cloud account with Generative Language API enabled
- A valid Gemini API key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd career-advisor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# Google Generative AI (Gemini) API Key
# Get your API key from https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Google OAuth Configuration
# Get your credentials from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Firebase Configuration
# These values can be found in your Firebase project settings
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing AI Features

To test the AI features:

1. Ensure your `GEMINI_API_KEY` is properly set in `.env.local`
2. Visit `/check-env` to verify environment variables are correctly configured
3. Visit `/test-ai-service` to automatically test the AI service
4. Complete the full user flow to see AI-generated recommendations

## Deployment

To deploy the application:

1. Set up your hosting platform (Vercel, Netlify, etc.)
2. Configure the environment variables in your hosting platform
3. Deploy the application

For Vercel deployment:
```bash
vercel
```

## Troubleshooting

### Environment Variables Not Set

If you see warnings about environment variables not being set:

1. Verify your `.env.local` file exists and is properly formatted
2. Ensure there are no extra spaces or characters in the file
3. Restart the development server after making changes

### AI Service Not Working

If the AI service is not working:

1. Check that your `GEMINI_API_KEY` is valid
2. Verify that the Generative Language API is enabled in your Google Cloud project
3. Ensure your billing account is properly set up

### Slow Response Times

AI generation can sometimes take a few seconds. The application includes loading states to provide feedback during this time.

## Fallback System

If the AI service is unavailable or returns an error, the application gracefully falls back to sample data to ensure all features remain functional.