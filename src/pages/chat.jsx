import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from '@/hooks/useForm';
import { socket } from './_app';
import { parseCookies } from 'nookies';

export default function Chat({ token }) {
    const [form, handleForm, resetForm] = useForm({
        initialState: { message: "" }
    });
    const [messages, setMessages] = useState([]);
    const { id, username, picture } = token;

    socket.on("connect", () => {
        console.log(`${socket.id} está conectado `);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} desconectado`);
    });

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            setMessages([...messages, data]);
        });
    }, [socket, messages]);


    function handleMessage(e) {
        e.preventDefault();
        socket.emit('message', {
            text: form.message,
            participant1: id,
            participant2: "fulano",
            name: username,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id
        });
        resetForm();
    }


    return (
        <>
            <Header>
                <Link href="/">
                    <h1>Home</h1>
                </Link>
            </Header>
            <ContainerLayoutChat>

                <ContainerChat>
                    <TitleContainer>
                        <h1>Conversas</h1>
                    </TitleContainer>
                    <Conversations>
                        <div>
                            <Image style={{ borderRadius: '90px' }} loader={() => "https://geekdama.com.br/wp-content/uploads/2022/10/one-piece-manga-1063-law-mulher-fanart-by-monkeyd_rock-postcover-1280x670.jpg"} src="https://geekdama.com.br/wp-content/uploads/2022/10/one-piece-manga-1063-law-mulher-fanart-by-monkeyd_rock-postcover-1280x670.jpg" alt="law mulher" width={40} height={40} />
                            <h1>Shambles</h1>
                        </div>
                        <p>Testando o teste do teste que testa o teste</p>
                    </Conversations>
                </ContainerChat>
                <ContainerChatSelected>
                    <p>Conversa Atual</p>
                    <Conversation>
                        {messages.map((value) => {
                            return (
                                <Message>
                                    <p>{value.text}</p>
                                </Message>
                            )
                        })}
                        <SendingMessages onSubmit={handleMessage}>
                            <input autoComplete="off" type="text" value={form.message} onChange={handleForm} name="message" />
                        </SendingMessages>
                    </Conversation>
                </ContainerChatSelected>

            </ContainerLayoutChat>

        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { 'nextauth.token': token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }
    const dataToken = JSON.parse(token);

    return {
        props: {
            token: dataToken
        }
    }
}

const Message = styled.div`
    width: fit-content;
    max-width: 100%;
    min-height: 40px;
    height: fit-content;
    padding: 3px;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
     p {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        overflow-wrap: break-word;
    }
`

const SendingMessages = styled.form`
    height: 40px;
    position: absolute;
    bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    input, textarea {
        width: 68vw;
        outline: unset;
        padding: 10px;
        min-width: 300px;
        border: 0 none;
        border-radius: 10px;
        color: #080808;
    }

`

const Conversation = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    border-radius: 8px;
    background-color: #988B8E;
    padding: 10px;
`;

const ContainerLayoutChat = styled.section`
    display: flex;
`
const ContainerChatSelected = styled.section`
    position: relative;
    background-color: #fff;
    margin-left: 50px;
    margin-top: 21px;
    box-sizing: border-box;
    width: 70%;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    border-radius: 8px;
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #EF959D;
        margin-bottom: 20px;
    }  
`;

const TitleContainer = styled.div`
    height: 30px;
    padding: 10px;
    box-sizing: border-box;
    h1 {
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #EF959D;
    }
`;

const ContainerChat = styled.aside`
    margin-top: 20px;
    width: 300px;
    box-sizing: border-box;
    height: 92vh;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const Conversations = styled.div`
    width: 100%;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    padding: 10px;

    p {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        height: 16px;
        margin-left: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h1 {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 600;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 7px;
    }
`
