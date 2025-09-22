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
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
  // Add error page configuration
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
    signIn: "/",
  }
})

export { handler as GET, handler as POST }