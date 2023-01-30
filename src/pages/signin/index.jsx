import { useState, useContext } from "react";
import { Header, Section, Form, Div } from "../signup/style";
import api from "../../services/api";
import Link from 'next/link';
import { useRouter } from "next/router";
import UserContext from '../../contexts/UserContext';

export default function SignIn() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const router = useRouter();
    const { setToken, token } = useContext(UserContext);

    if (token) {
        router.push("/");
    }

    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await api.signIn(credentials);
            setToken(data.token);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header>
                <h1>SignIn</h1>
            </Header>
            <Section>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Digite seu e-mail" value={credentials.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Digite sua senha" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="submit" value="Entrar" />
                    </div>
                </Form>
            </Section>
            <Div>
                <Link href="/signup">
                    <p>Ainda não tem uma conta? Cadastre-se</p>
                </Link>
            </Div>
        </>
    )
}