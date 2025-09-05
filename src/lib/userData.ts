// src/lib/userData.ts
import { db } from './firebase';
import { collection, doc, setDoc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { PSYCHOLOGY_QUIZ_VERSION } from './psychologyScoring';
import { RECOMMENDATION_ENGINE_VERSION } from './recommendationEngine';

// Define TypeScript interfaces for our data structures
export interface QuizResponse {
  userId: string;
  answers: Record<string, any>;
  timestamp: Date;
  quizVersion?: string; // Version of the quiz used
  userAgentInfo?: string; // Browser/OS information
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  traits?: string[];
  strengths?: string[];
  matchCriteria?: Record<string, any>;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  category?: string;
  matchWeights?: Record<string, number>;
  careerPaths?: any[];
  marketInfo?: any;
}

export interface DomainMatch {
  id: string;
  name: string;
  description: string;
  matchScore: number;
  matchPercentage: number;
  confidence: string;
}

export interface Recommendation {
  userId: string;
  persona: Persona & { matchScore?: number; confidence?: string };
  domains: DomainMatch[];
  timestamp: Date;
  engineVersion?: string; // Version of the recommendation engine used
}

export interface UserFeedback {
  userId: string;
  recommendationId: string;
  domainId: string;
  rating: number;
  comments: string;
  timestamp: Date;
  // Granular feedback data
  helpfulness?: number; // How helpful was the recommendation (1-5)
  accuracy?: number; // How accurate was the recommendation (1-5)
  relevance?: number; // How relevant was the recommendation (1-5)
  easeOfUse?: number; // How easy was it to understand the recommendation (1-5)
  wouldRecommend?: boolean; // Would the user recommend this platform to others
  improvementSuggestions?: string; // Specific suggestions for improvement
  quizQuestionFeedback?: Record<string, { 
    relevance: number; // How relevant was this question (1-5)
    clarity: number; // How clear was this question (1-5)
    influence: number; // How much did this question influence the recommendation (1-5)
  }>;
  domainSpecificFeedback?: Record<string, {
    interestLevel: number; // Interest level in this domain (1-5)
    careerFit: number; // How well this domain fits their career goals (1-5)
    skillMatch: number; // How well their skills match this domain (1-5)
  }>;
  userAgentInfo?: string; // Browser/OS information
  sessionDuration?: number; // Time spent on the results page in seconds
}

export interface UserProfile {
  name?: string;
  email?: string;
  createdAt?: Date;
  lastLogin?: Date;
  demographics?: {
    age?: number;
    location?: string;
    education?: string;
  };
  preferences?: {
    hasGoal?: boolean;
    goal?: string;
    language?: string;
  };
  onboardingCompleted?: Date;
}

export async function saveQuizResponse(userId: string, answers: Record<string, any>, userAgentInfo?: string): Promise<string | null> {
  try {
    const responseRef = doc(collection(db, 'quizResponses'));
    // Filter out undefined values before saving to Firestore
    const quizData: Partial<QuizResponse> = {
      userId,
      answers,
      timestamp: new Date(),
      quizVersion: PSYCHOLOGY_QUIZ_VERSION
    };
    
    // Only add userAgentInfo if it's defined
    if (userAgentInfo !== undefined) {
      quizData.userAgentInfo = userAgentInfo;
    }
    
    await setDoc(responseRef, quizData);
    return responseRef.id;
  } catch (error) {
    console.error('Error saving quiz response:', error);
    // Don't throw the error, just return null to allow the app to continue
    return null;
  }
}

export async function saveRecommendation(userId: string, persona: Persona, domains: DomainMatch[]): Promise<string> {
  try {
    const recRef = doc(collection(db, 'userRecommendations'));
    await setDoc(recRef, {
      userId,
      persona,
      domains,
      timestamp: new Date(),
      engineVersion: RECOMMENDATION_ENGINE_VERSION
    } as Recommendation);
    return recRef.id;
  } catch (error) {
    console.error('Error saving recommendation:', error);
    throw error;
  }
}

export async function saveUserFeedback(
  userId: string, 
  recommendationId: string, 
  domainId: string, 
  rating: number, 
  comments: string,
  additionalFeedback?: Partial<UserFeedback>
): Promise<string> {
  try {
    const feedbackRef = doc(collection(db, 'userFeedback'));
    await setDoc(feedbackRef, {
      userId,
      recommendationId,
      domainId,
      rating,
      comments,
      timestamp: new Date(),
      ...additionalFeedback
    } as UserFeedback);
    return feedbackRef.id;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() as UserProfile : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function saveUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<string> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      userId,
      updatedAt: new Date(),
    }, { merge: true });
    return userId;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}