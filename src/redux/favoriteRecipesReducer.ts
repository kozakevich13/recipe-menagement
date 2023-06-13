// favoriteRecipesReducer.ts

const initialState: string[] = [];

const favoriteRecipesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_FAVORITE_RECIPE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default favoriteRecipesReducer;
