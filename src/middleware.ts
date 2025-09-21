import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/",
  },
})

// Don't invoke Middleware on API routes, static files, or images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}