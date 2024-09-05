import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        const config = {
          method: "POST",
          body: JSON.stringify(credentials),
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, config);
        const data = await res.json();
        console.log(data);
        if (res.status !== 200) throw new Error(data.error);
        return data;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }: any) => {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Username" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//       },
//       authorize: async (credentials) => {
//         const config = {
//           method: "POST",
//           body: JSON.stringify(credentials),
//         };
//         const res = await fetch(`http://127.0.0.1:3000/api/auth/login`, config);
//         const data = await res.json();
//         if (res.status !== 200) throw new Error(data);
//         return data;
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       return { ...token, ...user };
//     },
//     session: async ({ session, token }: any) => {
//       session.user = token;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

export default authOptions;
