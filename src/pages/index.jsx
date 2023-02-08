import api from '../services/api';
import styled from 'styled-components';
import Post from '@/components/Post';
import { parseCookies } from 'nookies';

export default function Home({ posts }) {
  return (
    <>
      <ContainerPosts>
        <Header><h1>Home Page</h1></Header>
        {posts.map((post) => {
          return (
            <Post key={post.id} userId={post.userId} picture={post.users.picture} postPicture={post.picture} username={post.users.username} description={post.description} id={post.id} />
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

  const { data } = await api.getPosts();

  return {
    props: {
      posts: data
    }
  }
}


const Header = styled.header`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom left top, #EBF2FA, #FEC9F1, #DB5461);
  height: 50px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #656176;
  }
`

const ContainerPosts = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background: linear-gradient(to bottom right, #EBF2FA, #FEC9F1, #DB5461);
  justify-content: center;
  align-items: center;
`