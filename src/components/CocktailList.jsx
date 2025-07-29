import styled from "styled-components";
import { Link } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  display: block;
  width: 200px;
  border-radius: 10px;
  text-decoration: none;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  padding: 0.5rem;
`;

const CocktailList = ({ cocktails }) => {
  return (
    <Grid>
      {cocktails.map((drink) => (
        <Card key={drink.idDrink} to={`/cocktail/${drink.idDrink}`}>
          <Image src={drink.strDrinkThumb} alt={drink.strDrink} />
          <Name>{drink.strDrink}</Name>
        </Card>
      ))}
    </Grid>
  );
};

export default CocktailList;



