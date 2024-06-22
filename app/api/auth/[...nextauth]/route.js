

import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mongoose from 'mongoose';
import User from '@/models/User';
import payment from '@/models/payment';
import connectDb from '@/db/connectDb';

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            await connectDb();

            const currentUser = await User.findOne({ email: email });

            // If user exists, ensure they are logging in with the same provider
            if (currentUser) {
                if (currentUser.provider !== account.provider) {
                    throw new Error('Please use your original provider to login');
                }
            } else {
                // If user does not exist, create a new user
                const newUser = await User.create({
                    email: user.email,
                    username: user.email.split('@')[0],
                    provider: account.provider, // Store the provider information
                });
                user.name = newUser.username;
                console.log(newUser);
            }

            return true;
        },
        async session({ session, user, token }) {
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.name = dbUser.username;
                session.user.provider = dbUser.provider; // Add provider information to the session
            }
            return session;
        },
    },
});

export { authoptions as GET, authoptions as POST };
