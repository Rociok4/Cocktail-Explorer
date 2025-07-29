import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {traducirCocktail} from "../utils/traductorCocktail";
import BackToHomeButton from "../components/BackToHomeButton";
import { LuArrowBigLeft } from "react-icons/lu";



const Container = styled.div`
  padding: 1rem;
  text-align: center;
`;

const DetailWrapper = styled.div`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.184) 0%,
    rgba(245, 245, 245, 0.336) 100%
  );
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  color: #222;
  max-width: 800px;
  margin: 2rem auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;  /* para centrar también el texto */

  @media (max-width: 600px) {
    padding: 1.5rem 1.5rem;
    margin: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  color: #ff7f50;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  font-size: 1.15rem;
  line-height: 1;
  margin: 0.7rem 0;
  color: #ece5e5;
  text-align: center;
`;

const IngredientsList = styled.ul`
  margin-top: 1.2rem;
  padding-left: 0; /* quitar la sangría */
  list-style-position: inside; /* para que los bullets estén dentro */
  text-align: center;
`;

const Ingredient = styled.li`
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 0.3rem;
  color: #ece5e5;
`;

const FavoriteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "favorited"
})`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  color: ${props => (props.favorited ? "red" : "#ccc")};
  transition: color 0.3s;

  &:hover {
    color: red;
  }
`;

const BackButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  background-color: transparent;
  border: none;
  color: #ff7f50;
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    color: #ff4de6;
  }
`;


const CocktailDetail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from.pathname, {
      state: location.state // 👈 le pasamos el estado original
      });
    } else {
      navigate("/");
    }
  };


  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((data) => {
        if (data.drinks && data.drinks.length > 0) {
          const cocktailTraducido = traducirCocktail(data.drinks[0]);
          setCocktail(cocktailTraducido);
          const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
          setIsFavorite(favs.some(c => c.idDrink === data.drinks[0].idDrink));
        } else {
          setError("Cóctel no encontrado.");
        }
      })
      .catch(() => {
        setError("Ocurrió un error al cargar el cóctel.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const extractIngredients = (drink) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ing) {
        ingredients.push(`${measure ? measure : ""} ${ing}`.trim());
      }
    }
    return ingredients;
  };

   const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      // quitar de favoritos
      const newFavs = favs.filter(c => c.idDrink !== cocktail.idDrink);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      // añadir a favoritos
      favs.push(cocktail);
      localStorage.setItem("favorites", JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  if (loading) return <Container><p>Cargando...</p></Container>;
  if (error) return <Container><p>{error}</p></Container>;
  if (!cocktail) return null;

  const ingredients = extractIngredients(cocktail);


  return (
    <Container>
      <DetailWrapper>
      <Title>{cocktail.strDrink}</Title>
      <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <FavoriteButton favorited={isFavorite} onClick={toggleFavorite} aria-label="Añadir a favoritos">
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </FavoriteButton>

      <Info><strong>Categoría:</strong> {cocktail.strCategory}</Info>
      <Info><strong>Tipo:</strong> {cocktail.strAlcoholic}</Info>
      <Info><strong>Instrucciones:</strong> {cocktail.strInstructions}</Info>

      <h2>Ingredientes</h2>
      <IngredientsList>
        {ingredients.map((item, index) => (
          <Ingredient key={index}>{item}</Ingredient>
        ))}
      </IngredientsList>
      <BackToHomeButton/>
      <BackButton onClick={handleBack} aria-label="Volver a resultados">
          <LuArrowBigLeft size={48} />
      </BackButton>
      </DetailWrapper>
    </Container>
  );
};

export default CocktailDetail;
