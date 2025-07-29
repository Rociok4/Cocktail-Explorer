// Mapea categorías conocidas en la API a su versión en español
const categoriasES = {
  "Ordinary Drink": "Bebida Ordinaria",
  "Cocktail": "Cóctel",
  "Milk / Float / Shake": "Leche / Float / Batido",
  "Other/Unknown": "Otra / Desconocida",
  "Cocoa": "Cacao",
  "Shot": "Trago",
  "Coffee / Tea": "Café / Té",
  "Homemade Liqueur": "Licor Casero",
  "Punch / Party Drink": "Ponche / Bebida de Fiesta",
  "Beer": "Cerveza",
  "Soft Drink / Soda": "Refresco / Soda",
};

// Mapea tipo alcohólico
const tiposAlcoholES = {
  "Alcoholic": "Con Alcohol",
  "Non alcoholic": "Sin Alcohol",
  "Optional alcohol": "Alcohol Opcional",
};

// Traduce instrucciones (en inglés) a español si está el texto, o devuelve el texto original
// Aquí se puede extender con librerías o diccionarios más complejos
function traducirInstrucciones(instr) {
  // Por simplicidad, devuelve el texto original
  return instr;
}

// Función principal que devuelve un objeto cocktail traducido
export function traducirCocktail(cocktail) {
  return {
    ...cocktail,
    strCategory: categoriasES[cocktail.strCategory] || cocktail.strCategory,
    strAlcoholic: tiposAlcoholES[cocktail.strAlcoholic] || cocktail.strAlcoholic,
    strInstructions: traducirInstrucciones(cocktail.strInstructions),
    // Puedes añadir más campos traducidos aquí si quieres
  };
}
