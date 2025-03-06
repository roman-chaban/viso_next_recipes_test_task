# Test Task: Recipe App

## Objective

Create a React-based application that allows users to view recipes, search for them, filter them by category, and manage a list of favorite recipes. The app must use the [TheMealDB API](https://www.themealdb.com/api.php?ref=apilist.fun) for recipe data, and implement pagination, search functionality, and other requirements as described below.

### Technologies

- **Frontend**: React, TypeScript
- **API**: [TheMealDB API](https://www.themealdb.com/api.php?ref=apilist.fun)
- **State Management**: Tanstack Query (for data fetching and caching)
- **Other Libraries**: Any auxiliary libraries as needed

---

## Pages & Features

### 1. All Recipes Page

- Display a list of recipes in a card format.
- Each card should display the following details:
  - Photo
  - Name
  - Category
  - Place of origin (Area)
- **Pagination**: 
  - Implement pagination for the list of recipes. If there are more than 10 pages, display pages 1–7, then `...`, and the last page.
  - The user should be able to navigate through the pages using next/previous buttons and direct page numbers.

### 2. Single Recipe Page

- Display a detailed view of a single recipe, including:
  - Recipe name
  - Image
  - Category
  - Area
  - Cooking instructions
  - Ingredients (with corresponding measurements)
  - Source URL
  - YouTube video link (if available)

### 3. Favorite Recipes Page

- Allow users to add recipes to a "favorites" list (like a shopping cart).
- Display each favorite recipe as a card.
- Display a combined list of all ingredients from the selected recipes along with their measurements.
- Provide cooking instructions for the selected recipes.

---

## Key Requirements

- **Recipe Filtering by Category**: 
  - Implement category filtering on the frontend (no need to filter recipes through the API).
  - Show a dropdown or filter options where users can filter recipes by category.
  
- **Debounced Search**: 
  - Implement a debounced search to search for recipes through the API based on user input.
  
- **Pagination**:
  - Pagination should be implemented only on the frontend (via buttons for navigating pages).
  
- **API Integration**:
  - Use the [TheMealDB API](https://www.themealdb.com/api.php?ref=apilist.fun) to fetch recipe data (search, category filtering, etc.).
  - Use `Tanstack Query` for managing data fetching, caching, and state management instead of using a traditional state manager.

---

## Example Data

```json
{
  "meals": [
    {
      "idMeal": "52850",
      "strMeal": "Chicken Couscous",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "Moroccan",
      "strInstructions": "Heat the olive oil in a large frying pan...",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=GZQGy9oscVk",
      "strIngredient1": "Olive Oil",
      "strIngredient2": "Onion",
      "strIngredient3": "Chicken Breast",
      "strIngredient4": "Ginger",
      "strIngredient5": "Harissa Spice",
      "strIngredient6": "Dried Apricots",
      "strIngredient7": "Chickpeas",
      "strIngredient8": "Couscous",
      "strIngredient9": "Chicken Stock",
      "strIngredient10": "Coriander",
      "strMeasure1": "1 tbsp",
      "strMeasure2": "1 chopped",
      "strMeasure3": "200g",
      "strMeasure4": "pinch",
      "strMeasure5": "2 tblsp ",
      "strMeasure6": "10",
      "strMeasure7": "220g",
      "strMeasure8": "200g",
      "strMeasure9": "200ml",
      "strMeasure10": "Handful",
      "strSource": "https://www.bbcgoodfood.com/recipes/13139/onepan-chicken-couscous"
    }
  ]
}

