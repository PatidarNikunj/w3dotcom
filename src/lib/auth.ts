import "server-only";

// Mock authentication: a single demo account. Replace this module with a real
// auth provider later; the login form only depends on verifyCredentials.
const DEMO_ACCOUNT = {
  email: "demo@example.com",
  password: "password123",
};

export function verifyCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_ACCOUNT.email &&
    password === DEMO_ACCOUNT.password
  );
}
