import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
  // Add error handling
  events: {
    signIn: async ({ user, account, profile, isNewUser }) => {
      console.log("Sign in event", { user, account, profile, isNewUser });
    },
    signOut: async ({ session, token }) => {
      console.log("Sign out event", { session, token });
    },
  },
  // Add error page configuration
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  }
})

export { handler as GET, handler as POST }

export { handler as GET, handler as POST }