import api from '../services/api';
import UserContext from '@/contexts/UserContext';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function Home({ posts }) {
  return (
    <>
      <ContainerPosts>
        <Header><h1>Home Page</h1></Header>
        {posts.map((post) => {
          return (
            <Posts>
              <h1>{post.users.username}</h1>
              <Image loader={() => post.picture} src={post.picture} alt={post.picture} width={200} height={200} />
            </Posts>
          )
        })
        }
        <Aside>
          <div>dois</div>
          <div>eu</div>
        </Aside>
      </ContainerPosts>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await api.getPosts();
  console.log(data);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 10px;
  width: 300px;
  grid-area: div;
  grid-row: auto;
  grid-column-start: 1;
  justify-self: end;
`;

const ContainerPosts = styled.section`
  display: grid;
  background-color: #534D56;
  grid-template-areas: 
  'header header header'
  'div aside aside'
  'footer footer footer';
  grid-row: 1/3;
  gap: 10px;
`

const Aside = styled.aside`
  grid-area: aside;
  background-color: #86BBD8;
  grid-row-start: 2;
`