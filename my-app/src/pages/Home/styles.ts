import styled from 'styled-components';
import { NavLink as NavLinkReact } from 'react-router-dom';

export const Container = styled.div`
  color: #FFFFFF;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1{
    font-size: 48px;
    margin-bottom: 24px;
  }
`;

export const NavLink = styled(NavLinkReact)`
  button {
    width: 100%;
    font-weight: bold;
    border: 0;
    border-radius: 10px;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    color: #312E38;
    background: #FF9000;
    transition: background-color 0.2s;

    &:hover {
      background: #FF9000;
      opacity: 0.8;
    }
  }
`;

export const Content = styled.div`
  min-width: 500px;
  background: #000;
  border-radius: 6px;
  margin: 0.2rem;
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  h2 {
    color: #ff66c4;
  }

  h3 {
    color: #38b6ff;
  }
`;