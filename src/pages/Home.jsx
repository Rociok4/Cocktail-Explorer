import { useState,useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import CocktailCard from "../components/CocktailCard";
import { useLocation } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  background: url('/tu-fondo.png') no-repeat center center fixed;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 280px;
  min-width: 240px;
  padding: 1rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.179);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`;

const ResultsWrapper = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: start;
  gap: 1.5rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.179);
  padding: 1rem;
  overflow-y: auto;
  min-height: 0;
`;

const EmptyMessage = styled.p`
  font-size: 1.25rem;
  color: #ee4b4b;
  margin: auto;
`;

const ClearScreenButton = styled.button`
  margin: 2rem auto 0;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #e0664a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  display: block;

  &:hover {
    background-color: #ff7f50;
  }
`;

const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [resultsCount, setResultsCount] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();

 useEffect(() => {
  if (location.state?.cocktails) {
    setCocktails(location.state.cocktails);
    setResultsCount(location.state.cocktails.length);
    setHasSearched(true);
    }
  }, [location.state]);

  const handleSearch = (query, filters) => {
    const fetchByName = query
      ? fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`).then((res) =>
          res.json()
        )
      : Promise.resolve({ drinks: null });

    const fetchByFilters = async () => {
      const endpoints = [];
      if (filters.ingredient) endpoints.push(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}`);
      if (filters.glass) endpoints.push(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${filters.glass}`);
      if (filters.category) endpoints.push(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`);
      if (filters.alcohol) endpoints.push(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filters.alcohol}`);

      const results = await Promise.all(endpoints.map(url =>
        fetch(url).then(res => res.json()).then(data => data.drinks || [])
      ));

      const intersected = results.reduce((acc, curr) => {
        if (acc.length === 0) return curr;
        return acc.filter(drink => curr.some(d => d.idDrink === drink.idDrink));
      }, []);

      return intersected;
    };

    Promise.all([fetchByName, fetchByFilters()])
      .then(([nameData, filtered]) => {
        const nameResults = nameData.drinks || [];
        const filteredResults = filtered || [];

        let finalList = [];

        if (query && filteredResults.length) {
          // Intersección entre resultados por nombre y por filtros
          finalList = nameResults.filter(drink =>
            filteredResults.some(f => f.idDrink === drink.idDrink)
          );
        } else if (query) {
          finalList = nameResults;
        } else if (filteredResults.length) {
          finalList = filteredResults;
        }

        setCocktails(finalList);
        setResultsCount(finalList.length);
        setHasSearched(true);
      })
      .catch((err) => {
        console.error("Error fetching cocktails:", err);
        setCocktails([]);
        setResultsCount(0);
        setHasSearched(true);
      });
      };

  return (
    <Container>
      <Content>
        <Sidebar>
          <SearchBar onSearch={handleSearch} resultsCount={resultsCount} />
        </Sidebar>

        <ResultsWrapper>
          {hasSearched && cocktails.length === 0 ? (
            <EmptyMessage>No se encontraron cócteles.</EmptyMessage>
          ) : (
            cocktails.map(drink => <CocktailCard key={drink.idDrink} drink={drink} cocktails={cocktails} />)
          )}
        </ResultsWrapper>
      </Content>

      {cocktails.length > 0 && (
      <ClearScreenButton
        onClick={() => {
          setCocktails([]);
          setResultsCount(0);
          setHasSearched(false);
        }}
      >
        Limpiar pantalla
      </ClearScreenButton>
     )}
    </Container>
  );
};

export default Home;
