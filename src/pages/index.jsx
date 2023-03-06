import api from '../services/api';
import styled from 'styled-components';
import Post from '@/components/Post';
import { parseCookies } from 'nookies';
import { useForm } from '@/hooks/useForm';
import { useState, useEffect, useCallback } from 'react';
import Chat from './chat';
import { AiOutlineWechat } from 'react-icons/ai';
import Link from 'next/link';
import Header from '@/components/Header';


export default function Home({ posts, dataToken }) {

  const [form, handleForm, resetForm] = useForm({
    initialState: { description: "", picture: [] }
  });

  const [publications, setPublications] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  const { token, id: userIdToken } = dataToken;

  async function handlePublish(e) {
    e.preventDefault();
    try {
      await api.createPost(form, token);
      const { data } = await api.getPosts();
      setPublications(data);
      resetForm();
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

  async function getPosts() {
    try {
      const { data } = await api.getPosts();
      setPublications(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetch = useCallback(async () => {
    await getPosts();
  }, []);

  useEffect(() => {
    if (deleting) {
      fetch();
      setDeleting(false);
    }
  }, [deleting]);

  return (
    <>
      <ContainerPosts>
        <Header>
          <h1>Home Page</h1>
          <Link href="/chat">
            <AiOutlineWechat style={{ cursor: 'pointer' }} />
          </Link>
        </Header>
        <Publishing>
          <PublishForm onSubmit={handlePublish}>
            <div>
              <input type="text" autoComplete="off" placeholder='Descrição da publicação...' name="description" value={form.description} onChange={handleForm} />
              <label htmlFor='arquivo'>Enviar imagem</label>
              <input id='arquivo' onChange={handleForm} type="file" name="picture" value={undefined} accept="image/*" />
            </div>
            <button type='submit'><span>Publicar</span></button>
          </PublishForm>
        </Publishing>
        {publications.map((post) => {
          return (
            <Post key={post.id} token={token} userIdToken={userIdToken} setDeleting={() => setDeleting(true)} userId={post.userId} picture={post.users.picture} postPicture={post.picture} username={post.users.username} description={post.description} id={post.id} />
          )
        })
        }
      </ContainerPosts>
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

  const { data } = await api.getPosts();

  return {
    props: {
      posts: data, dataToken
    }
  }
}


const Publishing = styled.section`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  width: 400px;
  background-color: #FF8CC6;
  padding-left: 15px;
  margin-bottom: 30px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`

const PublishForm = styled.form`
  display: flex;
  justify-content: space-between;
  row-gap: 15px;
  input[type=file] {
    display: none;
  }

  input, textarea {
    outline: unset;
    padding: 10px;
    min-width: 300px;
    border: 0 none;
    border-radius: 10px;
    color: #080808;

  }

  button {
    border: 0 none;
    outline: none;
    background-color: #FFDDE2;
    border-radius: 4px;
    width: 60px;
    height: 40px;
    margin-left: 10px;
    transition: 0.5s ease;
    cursor: pointer;    
    span {
      color: #DE369D;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
    }

    &:hover {
      background-color: #F4F7F5;
      span {
        color: #080808;
      }
    }
  }
  
  

  label {
    width: 100px;
    padding: 5px;
    background-color: #BD4089;
    color: #fff;
    display: block;
    border-radius: 9px;
    margin-top: 20px;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    cursor: pointer;
    transition: 0.5s ease;
  }

  label:hover {
    background-color: #FFDDE2;
    color: #080808;
  }

`

// const Header = styled.header`
//   display: flex;
//   width: 100vw;
//   justify-content: space-between;
//   padding: 0 50px 0 50px;
//   align-items: center;
//   background: linear-gradient(to bottom left top, #EBF2FA, #FEC9F1, #DB5461);
//   height: 50px;
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
//   h1 {
//     font-family: 'Roboto', sans-serif;
//     font-size: 16px;
//     color: #656176;
//   }
// `

const ContainerPosts = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background: linear-gradient(to bottom right, #EBF2FA, #FEC9F1, #DB5461);
  justify-content: center;
  align-items: center;
`