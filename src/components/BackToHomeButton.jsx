import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

const Button = styled.button`
  margin: 2rem auto 0;
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0664a;
  }
`;

const BackToHomeButton = ({onReset}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onReset) {
      onReset(); // si viene desde Home
    } else {
      navigate("/"); // para otras páginas
    }
  };

  return (
    <Button onClick={handleClick}>
      <FaHome/> Inicio
    </Button>
  );
};

export default BackToHomeButton;