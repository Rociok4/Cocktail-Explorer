import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CocktailCard from "../components/CocktailCard";

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff7f50;
`;

const Message = styled.p`
  font-size: 1.2rem;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const CategoryDetail = () => {
  const { name } = useParams();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener los cócteles");
        return res.json();
      })
      .then(data => {
        if (data.drinks) {
          setCocktails(data.drinks);
        } else {
          setError("No se encontraron cócteles para esta categoría.");
        }
      })
      .catch(err => {
        setError("Error al cargar los cócteles.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <Container>
      <Title>Cócteles de la categoría: {name}</Title>

      {loading && <Message>Cargando cócteles...</Message>}
      {error && <Message>{error}</Message>}

      {!loading && !error && cocktails.length === 0 && (
        <Message>No hay cócteles en esta categoría.</Message>
      )}

      {!loading && !error && cocktails.length > 0 && (
        <CardGrid>
          {cocktails.map((drink) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))}
        </CardGrid>
      )}
    </Container>
  );
};

export default CategoryDetail;
