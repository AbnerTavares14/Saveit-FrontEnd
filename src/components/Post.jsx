import { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import Image from 'next/image';
import { AiTwotoneLike } from "react-icons/ai";
// import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { parseCookies } from "nookies";
import { TfiCommentAlt } from "react-icons/tfi";
import Modal from 'react-modal';
import { useQuery } from 'react-query';


import api from "@/services/api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: 'rgb(0 0 0 / 75%)',
        height: '70%',
        minHeight: '70%',
        margin: '0 auto',
    },
    overlay: {
        backgroundColor: 'rgb(0 0 0 / 80%)',
        border: '0 none',
        display: 'flex',
        alignItems: "center"
    }
};

export default function Post(props) {
    const { picture, postPicture, username, description, id, userId } = props;
    const [readMore, setReadMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
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

    function handleChange(e) {
        setComment(e.target.value);
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
        try {
            const { data } = await api.getComments(id);
            setComments(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function postComment(e) {
        e.preventDefault();
        try {
            await api.commentOnPost(id, { comment }, dataToken);
            handleComments();
            setComment("");
        } catch (error) {
            console.log(error);
        }
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
                    {like ? <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "blue" }} /> : <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "#E3F2FD" }} />}
                    <TfiCommentAlt style={{ cursor: "pointer", color: "#000" }} onClick={toggleModal} />
                </Icons>
                <WriteComment onSubmit={postComment}>
                    <input type="text" placeholder="Escreva um comentário" />
                </WriteComment>
                <Modal isOpen={modalIsOpen}
                    onAfterOpen={handleComments}
                    overLayClassName="modal-overlay"
                    onRequestClose={toggleModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className="modal-container"
                >
                    <Comments>
                        <>

                            {comments.map((item) => {
                                return (
                                    <Comment key={item.id}>
                                        <Image unoptimized width={40} height={40} style={{ borderRadius: 20, position: 'absolute', left: 5 }} loader={() => { item.users.picture }} src={item.users.picture} alt={item.users.picture} />
                                        <div>
                                            <p>{item.comment}</p>
                                        </div>
                                    </Comment>
                                )
                            })}
                            <div className="comment">
                                <form onSubmit={postComment}>
                                    <input type="text" value={comment} onChange={handleChange} placeholder="Comente aqui" />
                                </form>
                            </div>
                        </>
                    </Comments>

                </Modal>
            </Posts>
        </>
    )
}

const WriteComment = styled.form`
    width: 90%;
    input, textarea {
        width: 100%;
        height: 30px;
        border-radius: 10px;
        outline: none;
        background-color: #EBEBEB;
        border: 0 none;
        color: #000;
        padding: 10px;
        font-family: 'Roboto', sans-serif;
        margin-top: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
`

const Comment = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 20px ;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Comments = styled.section`
    position: relative;
    min-width: 40vh;
    max-width: 400px;
    height: 700px;
    padding: 30px;
    background-color: #DBDBDB;
    column-gap: 7px;
    box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    
    .comment {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0;
        margin: 0;

        input, textarea {
            width: 100%;
            height: 40px;
            outline: none;
            background-color: #EBEBEB;
            border: 0 none;
            color: #000;
            padding: 5px;
            font-family: 'Roboto', sans-serif;
        }
    }

    div {
        width: 100%;
        height: fit-content;
        min-height: 40px;
        padding: 1px 10px 3px 0;
        box-sizing: border-box;
        background-color: #D1D1D1;
        margin-left: 20px;
        
        
        p {
            overflow-wrap: break-word;
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
    color: #000;
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
        color: #000;
    }
    margin-bottom: 5px;
`;

const Posts = styled.div`
    position: relative;
    display: flex;
    padding-top: 50px;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    width: 400px;
    height: fit-content;
    min-height: 600px;
    justify-self: end;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;`;