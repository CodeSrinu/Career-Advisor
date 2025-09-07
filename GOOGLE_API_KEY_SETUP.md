# Google API Key Configuration

This document explains how to properly configure the Google API key for the Career Advisor application to enable AI-powered goal validation.

## Prerequisites

1. A Google Cloud Platform account
2. A project created in Google Cloud Console
3. The Generative Language API enabled for your project

## Steps to Configure Google API Key

### 1. Create a Google Cloud Project
- Go to the [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one

### 2. Enable the Generative Language API
- In the Google Cloud Console, navigate to "APIs & Services" > "Library"
- Search for "Generative Language API"
- Click on "Generative Language API" and then click "Enable"

### 3. Create an API Key
- Navigate to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "API Key"
- Copy the generated API key

### 4. Restrict the API Key (Recommended)
- Click on the created API key to edit it
- Under "Application restrictions", select "HTTP referrers (web sites)"
- Add your domain(s) to the referrer list
- Under "API restrictions", select "Restrict key" and choose "Generative Language API"
- Click "Save"

### 5. Add the API Key to Your Environment
Create a `.env.local` file in the root of your project with the following content:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the API key you generated.

## Environment Variables

The application uses the following environment variable:

- `GEMINI_API_KEY`: Your Google Generative AI API key

## Testing the Configuration

After setting up the API key, you can test if it's working correctly by:

1. Restarting your development server
2. Navigating to the goal validation page
3. Completing the validation quiz
4. Checking the browser console for any errors

## Troubleshooting

### Common Issues

1. **API Key Not Valid Error**
   - Ensure the API key is correctly copied without extra spaces
   - Verify that the Generative Language API is enabled for your project
   - Check that the API key restrictions (if any) allow access from your domain

2. **CORS Errors**
   - Make sure your API key restrictions include your domain as an HTTP referrer

3. **Billing Issues**
   - Ensure billing is enabled for your Google Cloud project
   - Check that you haven't exceeded usage quotas

### Fallback Mechanism

If the Google API key is not configured or is invalid, the application will automatically fall back to a simple scoring algorithm. This ensures that the application remains functional even without AI capabilities.

You'll see a notification in the UI when the fallback mechanism is being used:

> "We're currently using a simplified analysis method. For the full AI-powered career validation, please contact the system administrator to configure the Google AI API key."

## Security Considerations

- Never commit your API key to version control
- Use environment variables to store sensitive information
- Restrict API keys to specific domains and APIs
- Regularly rotate your API keys
- Monitor API usage in the Google Cloud Console

## Cost Management

The Generative Language API has usage quotas and pricing. Monitor your usage to avoid unexpected charges:

- Free tier: Up to 60 requests per minute
- Beyond free tier: Pay-per-use pricing applies
- Set up billing alerts in Google Cloud Console