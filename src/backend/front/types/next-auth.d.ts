import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      employee_id: number;
      access_token: string;
    }
  }
}