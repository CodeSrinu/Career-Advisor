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
  // Add proper session configuration
  session: {
    strategy: "jwt",
  },
  // Add proper pages configuration
  pages: {
    signIn: "/", // Custom sign in page
  },
})

export { handler as GET, handler as POST }