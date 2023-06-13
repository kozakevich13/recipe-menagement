// customRecipesReducer.ts

const initialState: any[] = [];

const customRecipesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CUSTOM_RECIPE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default customRecipesReducer;
