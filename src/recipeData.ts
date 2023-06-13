interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const recipeData: Recipe[] = [
  {
    title: "Паста з грибами",
    description: "Смачна паста з ароматними грибами.",
    ingredients: ["Паста", "Гриби", "Цибуля", "Спеції"],
    instructions:
      "1. Приготуйте пасту. 2. Обсмажте гриби та цибулю. 3. Змішайте з пастою. 4. Додайте спеції за смаком.",
    image: "https://example.com/images/pasta-mushrooms.jpg",
  },
  {
    title: "Омлет з овочами",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image: "https://example.com/images/vegetable-omelette.jpg",
  },
  {
    title: "Омлет з овочами",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image: "https://example.com/images/vegetable-omelette.jpg",
  },
  {
    title: "Омлет з овочами",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image: "https://example.com/images/vegetable-omelette.jpg",
  },
  {
    title: "Омлет з овочами",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image: "https://example.com/images/vegetable-omelette.jpg",
  },
  // Додайте більше рецептів за потреби
];

export default recipeData;
