import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";


const Card = styled(Link)`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;      /* para que no tenga subrayado */
  color: inherit;             /* para que herede el color */
  display: block;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    color: #ff4de6;
  }
`;

const DrinkImage = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const DrinkName = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  
`;

const Category = styled.p`
  font-size: 0.9rem;
  color: #666;
`;


const CocktailCard =({drink, cocktails})=>{
  const location = useLocation();
  
  if (!drink) return null;
    return(
      <Card
        to={`/cocktail/${drink.idDrink}`}
        state={{ from: location, cocktails }}>
      <DrinkImage src={drink.strDrinkThumb} alt={drink.strDrink} />
      <DrinkName>{drink.strDrink}</DrinkName>
      <Category>{drink.strCategory}</Category>
    </Card>
    );
  };

export default CocktailCard