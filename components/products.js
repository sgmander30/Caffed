export const PRODUCTS = [
  {
    slug: "chocolate-peanut-butter",
    name: "Chocolate Peanut Butter",
    price: "34.99",
    status: "Best Seller",
    img1: "/products/choc-pb-box.png",
    img2: "/products/PB3.jpg",
    images: [
      "/products/choc-pb-box.png",
      "/products/PB3.jpg",
      "/PB4.jpg",
      "/pbnewlabel.jpg",
    ],
    tagline: "The classic combo. Supercharged.",
    description:
      "Rich milk chocolate wrapped around a creamy peanut butter core — packed with 20g of whey protein and 100mg of natural caffeine so you hit every workout at full power. No crash. No guilt.",
    macros: [
      { label: "Calories", value: "220" },
      { label: "Protein", value: "20g" },
      { label: "Caffeine", value: "100mg" },
      { label: "Sugar", value: "5g" },
      { label: "Carbs", value: "22g" },
      { label: "Fat", value: "9g" },
    ],
    ingredients:
      "Whey protein isolate, dark chocolate coating, peanut butter chips, oats, natural caffeine (from green tea), sunflower oil, sea salt.",
    highlights: [
      "100mg caffeine — equivalent to 1 cup of coffee",
      "20g whey protein isolate",
      "No artificial sweeteners",
      "Gluten-friendly ingredients",
      "220 calories per bar",
    ],
  },
  {
    slug: "rich-chocolate",
    name: "Rich Chocolate",
    price: "34.99",
    status: "New",
    img1: "/products/rich-choc-box.png",
    img2: "/products/Choc4.jpg",
    images: [
      "/products/rich-choc-box.png",
      "/products/Choc4.jpg",
      "/ChocLabel.jpg",
      "/ChocGym.jpg",
    ],
    tagline: "Dark, bold, and unstoppable.",
    description:
      "Double-layer dark chocolate with a smooth chocolate fudge center. For those who take their training — and their chocolate — seriously. Same fuel as always: 20g protein, 100mg caffeine.",
    macros: [
      { label: "Calories", value: "220" },
      { label: "Protein", value: "20g" },
      { label: "Caffeine", value: "100mg" },
      { label: "Sugar", value: "5g" },
      { label: "Carbs", value: "21g" },
      { label: "Fat", value: "10g" },
    ],
    ingredients:
      "Whey protein isolate, dark chocolate coating, cocoa nibs, oats, natural caffeine (from green tea), cocoa butter, sea salt.",
    highlights: [
      "100mg caffeine — equivalent to 1 cup of coffee",
      "20g whey protein isolate",
      "Rich dark chocolate flavor",
      "No artificial sweeteners",
      "220 calories per bar",
    ],
  },
  {
    slug: "cinnamon",
    name: "Cinnamon",
    price: "34.99",
    status: "New",
    img1: "/products/cinnamon-box.png",
    img2: "/products/cinwrap.jpg",
    images: [
      "/products/cinnamon-box.png",
      "/products/cinwrap.jpg",
      "/cinlabel.jpg",
    ],
    tagline: "Warm spice. Cold gains.",
    description:
      "A warm cinnamon roll flavor you'd never expect from a protein bar. Light, crispy layers dusted in cinnamon with a hint of vanilla — and all the fuel your body demands.",
    macros: [
      { label: "Calories", value: "220" },
      { label: "Protein", value: "20g" },
      { label: "Caffeine", value: "100mg" },
      { label: "Sugar", value: "5g" },
      { label: "Carbs", value: "23g" },
      { label: "Fat", value: "8g" },
    ],
    ingredients:
      "Whey protein isolate, white chocolate coating, cinnamon crunch pieces, oats, natural caffeine (from green tea), vanilla extract, sea salt.",
    highlights: [
      "100mg caffeine — equivalent to 1 cup of coffee",
      "20g whey protein isolate",
      "Cinnamon roll flavor profile",
      "No artificial sweeteners",
      "220 calories per bar",
    ],
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
