interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const recipeData: Recipe[] = [
  {
    id: 1,
    title: "Паста з грибами",
    description: "Смачна паста з ароматними грибами.",
    ingredients: ["Паста", "Гриби", "Цибуля", "Спеції"],
    instructions:
      "1. Приготуйте пасту. 2. Обсмажте гриби та цибулю. 3. Змішайте з пастою. 4. Додайте спеції за смаком.",
    image: "https://nssz.com.ua/image/catalog/blog/2020/pasta.jpg",
  },
  {
    id: 2,
    title: "Омлет з овочами",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image: "https://blog.metro.ua/wp-content/uploads/2019/06/8-min-1.jpg",
  },
  {
    id: 3,
    title: "Наполеон",
    description: "Смачний омлет з соковитими овочами.",
    ingredients: ["Яйця", "Помідори", "Перець", "Цибуля", "Сир", "Спеції"],
    instructions:
      "1. Розбийте яйця у миску. 2. Додайте нарізані овочі та сир. 3. Приправте спеціями. 4. Змішайте все добре. 5. Випікайте омлет на сковороді до готовності.",
    image:
      "https://static.1000.menu/img/content-v2/7f/64/43702/tort-salat-napoleon-iz-korjei-s-kuricei_1615983245_27_max.jpg",
  },

  // Додайте більше рецептів за потреби
];

export default recipeData;
