import styled from 'styled-components';

export default function Header({ children }) {
    return (
        <HeaderComponent>
            {children}
        </HeaderComponent>
    )
}

const HeaderComponent = styled.header`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  padding: 0 50px 0 50px;
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