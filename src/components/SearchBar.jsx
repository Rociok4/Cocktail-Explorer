import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  flex-grow: 1;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #e0664a;
    box-shadow: 0 0 6px #ff7f50aa;
  }
`;
const FiltersRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: nowrap;
  width: 100%;
`;

const FiltersTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: #ff7f50;
  margin-top: 0.3rem;
  user-select: none;
`;

const Select = styled.select`
  width: 60%;
  flex: 1;
  min-width: 140px;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #e0664a;
    box-shadow: 0 0 6px #ff7f50aa;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background-color: #ff7f50;
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background-color: #e0664a;
  }

  &:disabled {
    background-color: #f4a285;
    cursor: not-allowed;
  }
`;

const ClearButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ff7f50;
  color: #ff7f50;

  &:hover {
    background-color: #ff7f50;
    color: white;
  }
`;

const ResultCount = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  background-color: #fff8f6;
  border: 1px solid #ffdcd3;
  padding: 0.5rem;
  border-radius: 6px;
`;

const SearchBar = ({ onSearch, resultsCount }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    ingredient: "",
    glass: "",
    category: "",
    alcohol: "",
  });

  const [options, setOptions] = useState({
    ingredients: [],
    glasses: [],
    categories: [],
    alcohol: [],
  });

  useEffect(() => {
    const endpoints = {
      ingredients: "i",
      glasses: "g",
      categories: "c",
      alcohol: "a",
    };

    const fetchOption = async (param) => {
      try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${param}=list`);
        if (!res.ok) throw new Error("Error fetching filters");
        const data = await res.json();
        return data.drinks?.map((item) => Object.values(item)[0]) || [];
      } catch (err) {
        console.error(`Error loading ${param}:`, err);
        return [];
      }
    };

    Promise.all([
      fetchOption(endpoints.ingredients),
      fetchOption(endpoints.glasses),
      fetchOption(endpoints.categories),
      fetchOption(endpoints.alcohol),
    ]).then(([ingredients, glasses, categories, alcohol]) => {
      setOptions({ ingredients, glasses, categories, alcohol });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim(), filters);
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters({
      ingredient: "",
      glass: "",
      category: "",
      alcohol: "",
    });
  };

  const isSearchDisabled =
    !query.trim() &&
    !filters.ingredient &&
    !filters.glass &&
    !filters.category &&
    !filters.alcohol;

  return (
    <Form onSubmit={handleSubmit}>
      <SearchRow>
        <Input
          type="text"
          placeholder="Buscar cóctel por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar cóctel por nombre"
        />
      </SearchRow>
      <FiltersTitle>
        Filtrar:<FaFilter />
      </FiltersTitle>
      <FiltersRow>
        <Select
          name="ingredient"
          onChange={handleFilterChange}
          value={filters.ingredient}
          aria-label="Filtrar por ingrediente"
        >
          <option value="">Ingrediente</option>
          {options.ingredients.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          name="glass"
          onChange={handleFilterChange}
          value={filters.glass}
          aria-label="Filtrar por tipo de vaso"
        >
          <option value="">Tipo de vaso</option>
          {options.glasses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          name="category"
          onChange={handleFilterChange}
          value={filters.category}
          aria-label="Filtrar por categoría"
        >
          <option value="">Categoría</option>
          {options.categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          name="alcohol"
          onChange={handleFilterChange}
          value={filters.alcohol}
          aria-label="Filtrar por alcohol"
        >
          <option value="">Alcohol</option>
          {options.alcohol.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </FiltersRow>

      <ButtonsWrapper>
        <Button type="submit" disabled={isSearchDisabled}>
          Buscar
        </Button>
        <ClearButton type="button" onClick={clearFilters}>
          Limpiar filtros
        </ClearButton>
      </ButtonsWrapper>
      {resultsCount !== null && (
        <ResultCount>
          Resultado: {resultsCount} cóctel{resultsCount === 1 ? "" : "es"}
        </ResultCount>
      )}
    </Form>
  );
};

export default SearchBar;
