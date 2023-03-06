import { useState, useContext } from "react";
import { Header, Section, Form, Div, Background } from "../../styles/authStyles";
import Link from 'next/link';
import { useRouter } from "next/router";
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from "nookies";
import { useForm } from "../../hooks/useForm";

export default function SignIn() {
    const [form, handleForm, resetForm] = useForm({
        initialState: { email: "", password: "" }
    });
    const { signIn } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signIn(form);
        } catch (error) {
            resetForm();
            console.log(error);
        }
    }

    return (
        <>
            <Background>

                <Header>
                    <h1>SignIn</h1>
                </Header>
                <Section>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <input type="text" name="email" placeholder="Digite seu e-mail" value={form.email} onChange={handleForm} />
                        </div>
                        <div>
                            <label>Senha</label>
                            <input type="password" name="password" placeholder="Digite sua senha" value={form.password} onChange={handleForm} />
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
            </Background>
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