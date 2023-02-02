import { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import Image from 'next/image';
import { AiTwotoneLike } from "react-icons/ai";
// import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { parseCookies } from "nookies";
import { TfiCommentAlt } from "react-icons/tfi";
import Modal from 'react-modal';

import api from "@/services/api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
    },
};

Modal.setAppElement('#posts');

export default function Post(props) {
    const { picture, postPicture, username, description, id, userId } = props;
    const [readMore, setReadMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const { 'nextauth.token': dataToken } = parseCookies();

    const fetch = useCallback(async () => {
        const { data } = await api.checkIfUserAlreadyLikedThisPost(id, dataToken);
        if (data) {
            setLike(true);
        }
    }, [setLike], id);

    useEffect(() => {
        fetch();
    }, []);

    function toggleModal() {
        setIsOpen(!modalIsOpen);
    }

    function toggleReadMore() {
        setReadMore(!readMore);
    }

    async function toggleLike(id) {
        try {
            await api.like(id, dataToken);
            setLike(!like);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleComments() {

    }

    return (
        <>
            <Posts id="posts">
                <Link href={`/user/${userId}`}>
                    <Profile>
                        <Image unoptimized style={{ borderRadius: '90px' }} loader={() => picture} src={picture} alt={picture} width={40} height={40} />
                        <h1>{username}</h1>
                    </Profile>
                </Link>
                <Description onClick={toggleReadMore} height={readMore ? "auto" : 50}>
                    <p>{description}</p>
                </Description>
                <Image unoptimized style={{ marginTop: 0, borderRadius: 10 }} loader={() => postPicture} src={postPicture} alt={postPicture} width={350} height={400} />
                <Icons>
                    {like ? <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "blue" }} /> : <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "#fff" }} />}
                    <TfiCommentAlt style={{ cursor: "pointer" }} onClick={toggleModal} />
                    <Modal isOpen={modalIsOpen}
                        onAfterOpen={handleComments}
                        overLayClassName="modal-overlay"
                        onRequestClose={toggleModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        className="modal-container"
                    >
                        <Comments>
                            <div>
                                <p>Muito foda fi slc</p>
                            </div>
                        </Comments>
                    </Modal>
                </Icons>
            </Posts>
        </>
    )
}

const Comments = styled.section`
    display: flex;
    width: 400px;
    height: 100%;
    padding: 10px;

    div {
        width: 100%;
        height: auto;
        background-color: #E1EFF6;

        p {
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            color: black;
        }
    }
`;

const Icons = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    padding: 10px 0 0 25px;
    column-gap: 20px;

    .modal-container {
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-overlay {
        background: black;
    }
    
`;

const Profile = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 15px;
  justify-content: flex-start;
  align-items: center;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    margin-left: 7px;
  }
`;

const Description = styled.span`
    margin-top: 20px;
    width: 350px;
    height: 50px;
    height: ${props => props.height};
    box-sizing: border-box;
    overflow-wrap: break-word;
    overflow: hidden;
    p{
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
    margin-bottom: 5px;
`;

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