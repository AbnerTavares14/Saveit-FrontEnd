import { useState, useContext } from "react";
import { Header, Section, Form, Div } from "../signup/style";
import Link from 'next/link';
import { useRouter } from "next/router";
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from "nookies";

export default function SignIn() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { signIn } = useContext(AuthContext);


    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signIn(credentials);
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

export const getServerSideProps = async (ctx) => {
    const { 'nextauth.token': token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    } else {
        return {
            props: {}
        }
    }
}