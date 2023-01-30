import styled from "styled-components"

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    h1 {
        font-family: 'Roboto', sans-serif;
    }
`


const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 10px;
`

const Form = styled.form`
    font-family: 'Roboto', sans-serif;

    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
    }

    input, textarea {
        outline: unset;
        padding: 20px;
        min-width: 300px;
        border: 0 none;
        border-radius: 10px;
        color: #080808;

        &:focus{
            background-color: #E8E5DA;
        }
    }

    input[type=submit] {
        background-color: #9EB7E5;
        cursor: pointer;
        &:hover{
            background-color: #648DE5;
            color: #E8E5DA;
        }
    }


    label {
        margin-left: 5px;
        margin-bottom: 4px;
    }
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }
`;

export {
    Header,
    Section,
    Form,
    Div
}