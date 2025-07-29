import { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryList from "../components/CategoryList";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";

const Container = styled.div`
  max-width: 800px;
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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener categorías");
        return res.json();
      })
      .then(data => {
        if (data.drinks) {
          setCategories(data.drinks);
        } else {
          setError("No se encontraron categorías");
        }
      })
      .catch(err => {
        setError("Error al cargar las categorías");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Cuando clicas una categoría
  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <Container>
      <Title>Categorías de Cócteles</Title>
      {loading && <Message>Cargando categorías...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && (
        <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
      )}
       <BackToHomeButton />
    </Container>
  );
};

export default Categories;
