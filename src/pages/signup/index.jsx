import api from "../../services/api";
import { useRouter } from "next/router";
import { Header, Section, Form, Div, Background } from "../../styles/authStyles";
import Link from "next/link";
import { useForm } from "../../hooks/useForm";

export default function Signup() {
    const [form, handleForm, resetForm] = useForm({
        initialState: { username: "", email: "", password: "", picture: [] }
    });
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.signUp(form);
            router.push('/signin');
        } catch (error) {
            resetForm();
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }

    }

    return (
        <>
            <Background>
                <Header>
                    <h1>SignUp</h1>
                </Header>
                <Section>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div>
                            <label>Usuário</label>
                            <input autoComplete="off" type="text" name="username" placeholder="Digite seu nome de usuário" value={form.username} onChange={handleForm} required />
                        </div>
                        <div>
                            <label>E-mail</label>
                            <input autoComplete="off" type="email" name="email" placeholder="Digite seu email" value={form.email} onChange={handleForm} required />
                        </div>
                        <div>
                            <label>Senha</label>
                            <input type="password" autoComplete="current-password" name="password" placeholder="Digite sua senha" value={form.password} onChange={handleForm} required />
                        </div>
                        <div>
                            <label className="file" htmlFor="file">Foto</label>
                            <input id="file" type="file" name="picture" onChange={handleForm} value={undefined} accept="image/*" size={1024} required />
                        </div>
                        <div>
                            <input type="submit" value="Cadastrar" />
                        </div>

                    </Form>
                </Section>
                <Div>
                    <Link href="/signin">
                        <p>Já tem uma conta? Faça o login</p>
                    </Link>
                </Div>
            </Background>
        </>

    )
}