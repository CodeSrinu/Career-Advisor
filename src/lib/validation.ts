// src/lib/validation.ts
// Input validation utilities

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate string length
export function validateStringLength(str: string, min: number, max: number): boolean {
  return str.length >= min && str.length <= max;
}

// Validate that a value is not empty
export function validateNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

// Validate that a value is a valid number
export function validateNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Validate that a value is within a numeric range
export function validateNumberRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

// Validate quiz answers format
export function validateQuizAnswers(answers: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check that answers is an object
  if (!answers || typeof answers !== 'object') {
    errors.push('Answers must be an object');
    return { isValid: false, errors };
  }
  
  // Check required fields
  const requiredFields = [
    'childhoodInterests',
    'favoriteToy',
    'childhoodAspiration',
    'spendingPreference',
    'inspirationalStatement',
    'idealDailyVibe',
    'nonNegotiables',
    'publicSpeaking',
    'secretChoice',
    'goalOwnership'
  ];
  
  for (const field of requiredFields) {
    if (answers[field] === undefined || answers[field] === null) {
      errors.push(`Missing required field: ${field}`);
    } else if (typeof answers[field] !== 'string' && !Array.isArray(answers[field])) {
      errors.push(`Invalid type for field: ${field}`);
    } else if (Array.isArray(answers[field]) && answers[field].length === 0) {
      errors.push(`Empty array for field: ${field}`);
    }
  }
  
  // Validate specific fields
  if (answers.publicSpeaking && !validateNumberRange(parseInt(answers.publicSpeaking, 10), 1, 5)) {
    errors.push('Public speaking rating must be between 1 and 5');
  }
  
  if (answers.goalOwnership && !validateNumberRange(parseInt(answers.goalOwnership, 10), 1, 5)) {
    errors.push('Goal ownership rating must be between 1 and 5');
  }
  
  return { isValid: errors.length === 0, errors };
}

// Validate user profile data
export function validateUserProfile(profile: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!profile || typeof profile !== 'object') {
    errors.push('Profile must be an object');
    return { isValid: false, errors };
  }
  
  // Validate name if provided
  if (profile.name !== undefined) {
    if (typeof profile.name !== 'string') {
      errors.push('Name must be a string');
    } else if (!validateStringLength(profile.name, 1, 100)) {
      errors.push('Name must be between 1 and 100 characters');
    }
  }
  
  // Validate email if provided
  if (profile.email !== undefined) {
    if (typeof profile.email !== 'string') {
      errors.push('Email must be a string');
    } else if (!validateEmail(profile.email)) {
      errors.push('Email format is invalid');
    }
  }
  
  // Validate demographics if provided
  if (profile.demographics !== undefined) {
    if (typeof profile.demographics !== 'object') {
      errors.push('Demographics must be an object');
    } else {
      // Validate age if provided
      if (profile.demographics.age !== undefined) {
        if (!validateNumber(profile.demographics.age)) {
          errors.push('Age must be a number');
        } else if (!validateNumberRange(profile.demographics.age, 13, 120)) {
          errors.push('Age must be between 13 and 120');
        }
      }
      
      // Validate location if provided
      if (profile.demographics.location !== undefined) {
        if (typeof profile.demographics.location !== 'string') {
          errors.push('Location must be a string');
        } else if (!validateStringLength(profile.demographics.location, 1, 100)) {
          errors.push('Location must be between 1 and 100 characters');
        }
      }
      
      // Validate education if provided
      if (profile.demographics.education !== undefined) {
        if (typeof profile.demographics.education !== 'string') {
          errors.push('Education must be a string');
        } else if (!validateStringLength(profile.demographics.education, 1, 100)) {
          errors.push('Education must be between 1 and 100 characters');
        }
      }
    }
  }
  
  // Validate preferences if provided
  if (profile.preferences !== undefined) {
    if (typeof profile.preferences !== 'object') {
      errors.push('Preferences must be an object');
    } else {
      // Validate goal if provided
      if (profile.preferences.goal !== undefined) {
        if (typeof profile.preferences.goal !== 'string') {
          errors.push('Goal must be a string');
        } else if (!validateStringLength(profile.preferences.goal, 1, 200)) {
          errors.push('Goal must be between 1 and 200 characters');
        }
      }
      
      // Validate language if provided
      if (profile.preferences.language !== undefined) {
        if (typeof profile.preferences.language !== 'string') {
          errors.push('Language must be a string');
        } else if (!validateStringLength(profile.preferences.language, 1, 50)) {
          errors.push('Language must be between 1 and 50 characters');
        }
      }
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Validate feedback data
export function validateFeedback(feedback: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!feedback || typeof feedback !== 'object') {
    errors.push('Feedback must be an object');
    return { isValid: false, errors };
  }
  
  // Validate required fields
  if (!feedback.userId) {
    errors.push('Missing required field: userId');
  } else if (typeof feedback.userId !== 'string') {
    errors.push('userId must be a string');
  }
  
  if (!feedback.recommendationId) {
    errors.push('Missing required field: recommendationId');
  } else if (typeof feedback.recommendationId !== 'string') {
    errors.push('recommendationId must be a string');
  }
  
  if (!feedback.domainId) {
    errors.push('Missing required field: domainId');
  } else if (typeof feedback.domainId !== 'string') {
    errors.push('domainId must be a string');
  }
  
  if (feedback.rating === undefined) {
    errors.push('Missing required field: rating');
  } else if (!validateNumber(feedback.rating)) {
    errors.push('Rating must be a number');
  } else if (!validateNumberRange(feedback.rating, 1, 5)) {
    errors.push('Rating must be between 1 and 5');
  }
  
  // Validate comments if provided
  if (feedback.comments !== undefined && typeof feedback.comments !== 'string') {
    errors.push('Comments must be a string');
  } else if (feedback.comments && !validateStringLength(feedback.comments, 1, 500)) {
    errors.push('Comments must be between 1 and 500 characters');
  }
  
  return { isValid: errors.length === 0, errors };
}