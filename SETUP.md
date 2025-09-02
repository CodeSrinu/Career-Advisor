# Career Advisor - Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Google OAuth Credentials (required for authentication)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Secret (generate with `openssl rand -base64 32`)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## How to get Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add the following authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
7. Copy the Client ID and Client Secret to your `.env.local` file

## How to generate NEXTAUTH_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output and paste it as your NEXTAUTH_SECRET value.

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Implemented

- Google OAuth authentication with NextAuth.js
- Language selection (Telugu, Hindi, Tamil, Marathi)
- Goal setting workflow (already set vs. discovery through psychology questions)
- Responsive UI with Tailwind CSS
- Progress indicators
- LocalStorage for data persistence

## Next Steps for Full Implementation

1. ~~Implement proper Google OAuth with NextAuth.js~~ (Completed)
2. Add the full psychology question flow
3. Implement the skill assessment section
4. Add the course content and video viewing features
5. Implement the GitHub portfolio integration
6. Add the job scraping and internship matching features