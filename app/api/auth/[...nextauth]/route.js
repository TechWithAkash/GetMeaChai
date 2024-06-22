import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
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

    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                await connectDb()

                const currentUser = await User.findOne({ email: email })

                // if user is not exist create a new user
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split('@')[0],
                    })
                    // await newUser.save()
                    user.name = newUser.username
                    console.log(newUser);
                }
               
                return true
            }

        },
        async session({ session, user, token }) {
            const dbuser = await User.findOne({ email: session.user.email })
            console.log(dbuser)
            session.user.name = dbuser.username
            return session
        },
    }


})
export { authoptions as GET, authoptions as POST }

