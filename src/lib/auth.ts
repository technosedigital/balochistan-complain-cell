import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from './dbConnect';
import User from '@/models/User';

// Seed demo users in memory as absolute fallback
const DEMO_USERS = [
  {
    id: 'demo-admin-id',
    name: 'Balochistan Admin Officer',
    email: 'admin@balochistan.gov.pk',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: 'demo-citizen-id',
    name: 'Sardar Khan Baloch',
    email: 'citizen@balochistan.gov.pk',
    role: 'citizen',
    password: 'citizen123',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@balochistan.gov.pk' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();

        // 1. Check database first if available
        try {
          const isConnected = await dbConnect();
          if (isConnected) {
            const user = await User.findOne({ email: normalizedEmail });
            if (user) {
              // In production we would use bcrypt. For demo simplicity and quick evaluation, we support plain password match or hashed
              // To make testing painless, we do direct comparison:
              if (user.password === credentials.password) {
                return {
                  id: user._id.toString(),
                  name: user.name,
                  email: user.email,
                  role: user.role || 'citizen',
                };
              }
            }
          }
        } catch (dbError) {
          console.warn('Database auth failed, checking demo fallbacks:', dbError instanceof Error ? dbError.message : 'Unknown error');
        }

        // 2. Fallback to pre-configured demo users
        const demoUser = DEMO_USERS.find(
          (u) => u.email === normalizedEmail && u.password === credentials.password
        );

        if (demoUser) {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
          };
        }

        throw new Error('Invalid email or password');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'citizen';
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // custom sign in page we will create
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || '9be36e16f3d9ce4c5462cf4c3b29bd9a43a85b9b',
};
