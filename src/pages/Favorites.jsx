import { useState, useEffect } from "react";
import CocktailCard from "../components/CocktailCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";

const Container = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem; 
  padding: 1rem;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

const FavoriteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px; 
`;
const Toast = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  font-weight: bold;
  z-index: 1000;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;

  @keyframes fadein {
    from {opacity: 0; bottom: 10px;}
    to {opacity: 1; bottom: 20px;}
  }
  @keyframes fadeout {
    from {opacity: 1; bottom: 20px;}
    to {opacity: 0; bottom: 10px;}
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  useEffect(() => {
  if (toastMessage) {
    const timer = setTimeout(() => {
      setToastMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [toastMessage]);

  // Función para eliminar favorito
  const removeFavorite = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este cóctel de favoritos?");
    if (!confirmDelete) return;

    const newFavs = favorites.filter((drink) => drink.idDrink !== id);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setToastMessage("Cóctel eliminado de favoritos");
  };

  if (favorites.length === 0) {
    return (
      <Container>
        <BackToHomeButton/>
        <Title>Favoritos</Title>
        <p>No tienes cócteles favoritos aún.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Favoritos</Title>
      <List>
        {favorites.map((drink) => (
          <FavoriteCard key={drink.idDrink}>
            <CocktailCard drink={drink} />
            <RemoveButton onClick={() => removeFavorite(drink.idDrink)}>
              Eliminar
            </RemoveButton>
            {toastMessage && <Toast>{toastMessage}</Toast>}
          </FavoriteCard>
        ))}
      </List>
      <BackToHomeButton/>
    </Container>
    
  );
};

export default Favorites;
