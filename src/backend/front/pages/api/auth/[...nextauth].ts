import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "employee",
      credentials: {
        login: { label: "login", type: "text", },
        password: { label: "password", type: "password", }
      },
      authorize: async function (credentials: Record<"login" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        const result_body = await fetch(process.env.URL + "/auth", { cache: "no-cache", body: JSON.stringify({ login: credentials?.login, password: credentials?.password }) })
        const user = await result_body.json()
        if (user) {
          return user
        } else {
          return null
        }
      }
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user }
    },
    session({ session, token, user }) {
      session.user = token as any
      return session // The return type will match the one returned in `useSession()`
    },
  },
  session: {
    strategy: "jwt"
  },
})