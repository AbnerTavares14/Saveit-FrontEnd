import styled from "styled-components";

const GridTemplate = styled.section`
  height: 500px;
  transition: 500ms;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  background: #cc96a0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left, .center, .right {
    background: navajowhite;
    transition: 300ms;
  }

  .left:hover, .center:hover, .right:hover {
    background: crimson;
  }

  &:has(.left:hover) {
    grid-template-columns: 2fr 0.5fr 0.5fr;
  }

  &:has(.center:hover) {
    grid-template-columns: 0.5fr 2fr 0.5fr;
  }

  &:has(.right:hover) {
    grid-template-columns: 0.5fr 0.5fr 2fr;
  }
`;

export {
    GridTemplate
}