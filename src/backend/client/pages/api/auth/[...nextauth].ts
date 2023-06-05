import NextAuth, { RequestInternal } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        room_id: { label: "Room", type: "text", },
        cellphone: { label: "cellphone", type: "text", }
      },
      authorize: async function (credentials: Record<"room_id" | "cellphone", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        const result_body = await fetch(process.env.URL + "/auth/client", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ room_id: credentials?.room_id, login: credentials?.cellphone }) })

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
      // console.log("JWT token");
      // console.log(token);
      return { ...token, ...user }
    },
    session({ session, token, user }) {
      // console.log("Session token");
      // console.log(token);
      session.user = token as any
      return session // The return type will match the one returned in `useSession()`
    },
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url)
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
})