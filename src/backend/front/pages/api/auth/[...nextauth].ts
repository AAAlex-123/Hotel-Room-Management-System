import { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "employee",
      credentials: {
        username: { label: "Username", type: 'text' },
        password: { label: "Password", type: 'password' }
      },
      authorize: async function (credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        const responce = await fetch("http://host.docker.internal:8081/api/auth",
          {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify({
              login: credentials?.username,
              password: credentials?.password,
            })
          })
        if (responce.ok) {
          return await responce.json()
        }
        return null
      },
    }), CredentialsProvider({
      name: "client",
      credentials: {
        phone: {
          label: "Last 6 digits of cellphone", type: "telephone"
        }
      },
      authorize: async function (credentials: Record<"phone", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        const responce = await fetch("http://host.docker.internal:8081/api/auth",
          {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify({
              login: credentials?.phone,
            })
          })
        if (responce.ok) {
          return await responce.json()
        }
        return null
      }
    })
  ], session: {
    strategy: 'jwt'
  },
}