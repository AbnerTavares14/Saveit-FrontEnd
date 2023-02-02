import { createContext, useState } from "react";
import { setCookie } from 'nookies';
import Router from 'next/router';
import api from "@/services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    const isAuthenticated = !!token;

    async function signIn({ email, password }) {
        const { data } = await api.signIn({email, password});
        console.log(data);

        setCookie(undefined, 'nextauth.token', data.token, {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        setToken(data);

        Router.push('/');
    }

    return (
        <AuthContext.Provider value= {{ token, isAuthenticated, signIn }}>
            { children }
        </AuthContext.Provider>
    )
}