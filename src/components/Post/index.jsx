import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Image from 'next/image';
import { AiTwotoneLike } from "react-icons/ai";
import Link from "next/link";
import { TfiCommentAlt } from "react-icons/tfi";
import Modal from "react-modal";
import { useForm } from "../../hooks/useForm";
import { BsTrashFill } from "react-icons/bs";

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
    const { picture, token, userIdToken, postPicture, username, description, id, userId, setDeleting } = props;
    const sizeDescription = description?.length;
    const [readMore, setReadMore] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const [form, handleForm, resetForm] = useForm({
        initialState: { comment: "" }
    });
    const [comments, setComments] = useState([]);

    const fetch = useCallback(async () => {
        const { data } = await api.checkIfUserAlreadyLikedThisPost(id, token);
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
            console.log(token)
            await api.like(id, token);
            setLike(!like);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleComments() {
        try {
            const { data } = await api.getComments(id);
            setComments(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function postComment(e) {
        e.preventDefault();
        try {
            await api.commentOnPost(id, { comment: form.comment }, token);
            handleComments();
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    async function deletePost() {
        try {
            await api.deletePost(id, token);
            setDeleting();
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
                {userIdToken === userId ? <Trash onClick={deletePost}>
                    <BsTrashFill />
                </Trash> : <></>}
                {sizeDescription > 100 ? <Description onClick={toggleReadMore} height={readMore ? "auto" : '50px'}>
                    <p>{description}</p>
                </Description> :
                    <Description height={"auto"}>
                        <p>{description}</p>
                    </Description>}
                <Image unoptimized style={{ marginTop: 0, borderRadius: 10 }} loader={() => postPicture} src={postPicture} alt={postPicture} width={350} height={400} />
                <Icons>
                    {like ? <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "#E34A6F", }} /> : <AiTwotoneLike onClick={() => toggleLike(id)} style={{ cursor: "pointer", color: "#6F5E76" }} />}
                    <TfiCommentAlt style={{ cursor: "pointer", color: "#000" }} onClick={toggleModal} />
                </Icons>
                <WriteComment onSubmit={postComment}>
                    <input type="text" name="comment" autoComplete="off" value={form.comment} onChange={handleForm} placeholder="Escreva um comentário" />
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
                                            <span>{item.users.username}</span><p>{item.comment}</p>
                                        </div>
                                    </Comment>
                                )
                            })}
                            <div className="comment">
                                <form onSubmit={postComment}>
                                    <input type="text" autoComplete="off" value={form.comment} onChange={handleForm} name="comment" placeholder="Comente aqui" />
                                </form>
                            </div>
                        </>
                    </Comments>

                </Modal>
            </Posts>
        </>
    )
}

const Trash = styled.div`
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    transition: 0.5s ease;
    
    &:hover {
        color: red;
    }
`

const WriteComment = styled.form`
    width: 90%;
    margin-bottom: 15px;
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
    justify-self: end;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;