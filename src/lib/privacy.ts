// src/lib/privacy.ts

// Define TypeScript interfaces for our data structures
export interface UserData {
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: any; // Allow additional properties
}

export interface Consent {
  dataCollection: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface User {
  consent?: Consent;
  [key: string]: any; // Allow additional properties
}

// Simple hash function for demonstration purposes
// In a production environment, use a proper cryptographic hash function
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function anonymizeUserData(userData: UserData): Omit<UserData, 'name' | 'email' | 'phone' | 'address'> {
  // Remove personally identifiable information for analysis
  const { name, email, phone, address, ...anonymousData } = userData;
  
  // Add hashed userId for tracking without identification
  if (userData.userId) {
    anonymousData.userId = simpleHash(userData.userId);
  }
  
  return anonymousData;
}

export function getConsent(user: User | null | undefined): Consent {
  // Implement consent management
  return {
    dataCollection: user?.consent?.dataCollection || false,
    analytics: user?.consent?.analytics || false,
    marketing: user?.consent?.marketing || false
  };
}

export function validateConsent(consent: any): consent is Consent {
  // Validate that consent object has the required properties
  if (!consent || typeof consent !== 'object') {
    return false;
  }
  
  const requiredFields = ['dataCollection', 'analytics', 'marketing'] as const;
  return requiredFields.every(field => 
    typeof consent[field] === 'boolean'
  );
}

export function sanitizeDataForExport(data: Record<string, any>): Omit<Record<string, any>, 'name' | 'email' | 'phone' | 'address' | 'userId' | 'ipAddress'> {
  // Remove sensitive fields before data export
  const sanitized = { ...data };
  
  // Remove PII fields
  delete sanitized.name;
  delete sanitized.email;
  delete sanitized.phone;
  delete sanitized.address;
  delete sanitized.userId;
  
  // Anonymize any other identifying fields
  if (sanitized.ipAddress) {
    delete sanitized.ipAddress;
  }
  
  return sanitized;
}