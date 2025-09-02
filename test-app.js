// Simple test to verify the core functionality of the Career Advisor app

// Mock localStorage for testing
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Mock browser environment
global.localStorage = mockLocalStorage;

// Import the main component
const fs = require('fs');
const path = require('path');

// Read the main page content
const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');

console.log('=== Career Advisor App Test ===');
console.log('Main page file exists:', fs.existsSync(pagePath));
console.log('File size:', pageContent.length, 'characters');
console.log('Uses React hooks:', pageContent.includes('useState') && pageContent.includes('useEffect'));
console.log('Has language selection:', pageContent.includes('Select Your Native Language'));
console.log('Has goal setting:', pageContent.includes('Goal Already Set'));
console.log('Uses localStorage:', pageContent.includes('localStorage'));

// Test localStorage functionality
console.log('\n=== Testing localStorage Mock ===');
localStorage.setItem('testKey', 'testValue');
console.log('Set item testKey = testValue');
console.log('Get item testKey:', localStorage.getItem('testKey'));
console.log('Get item nonExistentKey:', localStorage.getItem('nonExistentKey'));

console.log('\n=== Test Completed ===');