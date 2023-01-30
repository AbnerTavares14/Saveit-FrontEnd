import { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/router";
import { Header, Section, Form, Div } from "./style";
import Link from "next/link";

export default function Signup() {
    const [informations, setInformations] = useState({ username: "", email: "", password: "", picture: [] });
    const router = useRouter();

    function handleChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setInformations({ ...informations, [e.target.name]: file });
        } else {
            setInformations({ ...informations, [e.target.name]: e.target.value });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.signUp(informations);
            router.push('/signin');
        } catch (error) {
            setInformations(
                { username: "", email: "", password: "", picture: [] }
            );
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

            <Header>
                <h1>SignUp</h1>
            </Header>
            <Section>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Digite seu username" value={informations.username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Digite seu email" value={informations.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" autoComplete="current-password" name="password" placeholder="Digite seu password" value={informations.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Picture</label>
                        <input type="file" name="picture" onChange={handleChange} value={undefined} accept="image/*" size={1024} required />
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
        </>
    )
}