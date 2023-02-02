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
          console.log(post.users.picture)
          return (
            <Post userId={post.userId} picture={post.users.picture} postPicture={post.picture} username={post.users.username} description={post.description} id={post.id} />
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
  // console.log(data);

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
  background-color: #F8F1FF;
  height: 50px;
  grid-area: header;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #656176;
  }
`

const Posts = styled.div`
  position: relative;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 10px;
  width: 400px;
  height: 600px;
  justify-self: end;
`;

const ContainerPosts = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background-color: #534D56;
  justify-content: center;
  align-items: center;
`