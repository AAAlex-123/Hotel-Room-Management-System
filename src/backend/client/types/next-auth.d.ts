import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      reservation_id: number;
      access_token: string;
    }
  }
}