import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from '../../services/api';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "NextAuthCredentials",
            credentials: {},
            async authorize(credentials) {
                console.log(credentials);
                const {data} = await api.signIn(credentials);
                return {
                    data
                };
            }
        }),
    ]
});