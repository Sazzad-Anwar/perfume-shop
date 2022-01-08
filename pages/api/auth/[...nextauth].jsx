import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "johndoe@mail.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            authorize: async (credentials) => {
                try {
                    let { data: { data: user } } = await axios.get('https://reqres.in/api/users/2')
                    if (user) {
                        return { id: user.id, email: user.email, name: user.first_name + ' ' + user.last_name, avatar: user.avatar }
                    }
                    return null;

                } catch (error) {
                    throw new Error('Credentials does not match')
                }


            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    secret: "test",
    jwt: {
        secret: 'test',
        encryption: true,
    },
    pages: {
        signIn: '/login',
        error: '/login'
    }
})