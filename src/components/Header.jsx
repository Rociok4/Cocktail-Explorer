import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaHeart, FaListAlt } from "react-icons/fa";

const HeaderContainer = styled.header`
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.6);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 2.5rem;
  color: #ff4de6;
  margin: 0;
  text-shadow:
    0 0 5px #ff4de6,
    0 0 10px #ff4de6,
    0 0 20px #ff4de6,
    0 0 40px #ff4de6;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: #ffffff;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition: color 0.3s;
    display: flex;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: #ff4de6;
      transition: width 0.3s;
    }

    &:hover {
      color: #ff4de6;
    }

    &:hover::after {
      width: 100%;
    }

    &.active {
      color: #ff4de6;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>🍸 Cocktail Explorer</Title>
      <NavLinks>
        <NavLink to="/">
          <FaHome style={{ marginRight: "6px" }} /> Inicio
        </NavLink>
        <NavLink to="/favorites">
          <FaHeart style={{ marginRight: "6px" }} /> Favoritos
        </NavLink>
        <NavLink to="/categories">
          <FaListAlt style={{ marginRight: "6px" }} /> Categorías
        </NavLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
