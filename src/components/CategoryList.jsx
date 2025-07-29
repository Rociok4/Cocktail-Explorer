import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const CategoryItem = styled.li`
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  user-select: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  margin-top:1rem;
  margin-bottom:2rem;

  &:hover {
    transform: scale(1.05);
    background-color: #ff7f50;
    color: #fff;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  }
`;

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <List>
      {categories.map(({ strCategory }) => (
        <CategoryItem
          key={strCategory}
          onClick={() => onCategoryClick(strCategory)}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === "Enter") onCategoryClick(strCategory); }}
        >
          {strCategory}
        </CategoryItem>
      ))}
      
    </List>
    
  );

};

export default CategoryList;
