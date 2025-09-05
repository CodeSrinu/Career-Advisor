// Suppress TypeScript error about missing glob types
// This is a workaround for the deprecated @types/glob package issue
declare module 'glob' {
  const value: any;
  export = value;
}