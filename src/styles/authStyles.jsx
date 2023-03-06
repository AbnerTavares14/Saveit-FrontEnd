import styled from "styled-components"
import animeGirl from "../assets/cuteanimegirl.png";

const Header = styled.header`

    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 50px; */

    h1 {
        font-family: 'Roboto', sans-serif;
        color: white;
    }
`

const Background = styled.div`
    width: 800px;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 20px;
    box-sizing: content-box;
    height: 600px;
    background: url(${animeGirl?.src}) no-repeat -100px center;
    background-color: #F65BE3;
    background-size: contain;
    box-shadow: rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;

    @media(max-width: 600px) {
        width: 450px;
        background: url("");
        background: #F65BE3;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;     
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-top: 0;
        height: 100vh;
    }
    `

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const Form = styled.form`
    font-family: 'Roboto', sans-serif;

    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    input, textarea {
        outline: unset;
        padding: 20px;
        min-width: 300px;
        border: 0 none;
        border-radius: 10px;
        color: #080808;
    }

    input[type=submit] {
        background-color: #D7DEDC;
        cursor: pointer;
        transition: 0.5s ease;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 16px;
        &:hover{
            background-color: inherit;
            color: #E8E5DA;
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        }
    }

    input[type=file]::-webkit-file-upload-button {
        visibility: hidden;
    }

    input[type=file]::before {
        content: "Foto: ";
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 15px;
        color: #4F000B;
    }

    label {
        margin-left: 5px;
        margin-bottom: 4px;
        color: #4F000B;
    }

    .file {
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

  .file:hover {
    background-color: #FFDDE2;
    color: #080808;
  }
    
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: white;
    }
`;

export {
    Header,
    Section,
    Form,
    Div,
    Background
}