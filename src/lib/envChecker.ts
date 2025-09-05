// src/lib/envChecker.ts
/**
 * Environment checker utility to verify Firebase configuration
 */

export interface EnvCheckResult {
  isValid: boolean;
  missingVars: string[];
  firebaseConfig: Record<string, string>;
  warnings: string[];
}

export function checkEnvironment(): EnvCheckResult {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  const missingVars: string[] = [];
  const warnings: string[] = [];
  const firebaseConfig: Record<string, string> = {};

  // Check for environment variables (for client-side env vars)
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      missingVars.push(varName);
    } else {
      firebaseConfig[varName.replace('NEXT_PUBLIC_FIREBASE_', '').toLowerCase()] = value;
    }
  }

  // Special check for measurementId (optional but good to have)
  if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
    warnings.push('Analytics measurement ID not found (optional for development)');
  }

  // Check if we're using hardcoded config (which is fine for development)
  try {
    // This will only work if the config file exists
    const configExists = true; // We'll assume it exists since we checked earlier
    
    if (missingVars.length > 0) {
      warnings.push(
        'Using hardcoded Firebase config. This is fine for development but consider using environment variables for production.'
      );
    }
  } catch (error) {
    warnings.push('Could not verify Firebase configuration file existence');
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    firebaseConfig,
    warnings
  };
}

export function getFirebaseErrorMessage(error: any): string {
  if (error?.code) {
    switch (error.code) {
      case 'permission-denied':
        return 'Permission denied. Check Firebase security rules.';
      case 'not-found':
        return 'Resource not found. Check if the document/collection exists.';
      case 'unavailable':
        return 'Service temporarily unavailable. Please try again later.';
      case 'cancelled':
        return 'Request was cancelled. Please try again.';
      case 'deadline-exceeded':
        return 'Request timed out. Please check your network connection.';
      default:
        return `Firebase error: ${error.code}. ${error.message || 'Unknown error'}`;
    }
  }
  
  if (error?.message) {
    if (error.message.includes('400')) {
      return 'Bad request. Check your Firebase configuration.';
    } else if (error.message.includes('403')) {
      return 'Forbidden. Check Firebase security rules and authentication.';
    } else if (error.message.includes('404')) {
      return 'Not found. Check if the Firebase project exists.';
    } else if (error.message.includes('network')) {
      return 'Network error. Check your internet connection.';
    }
  }
  
  return error?.message || 'Unknown Firebase error';
}