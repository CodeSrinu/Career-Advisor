import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/",
  },
})

// Don't invoke Middleware on some paths including API routes for auth
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}