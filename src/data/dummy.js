const dummyRestaurant = {
  id: 0,
  name: "Route 66 - American Diner",
  description:
    "At <strong>Route 66 - American Diner</strong>, we're more than just a restaurant; we're a destination. Our menu is a homage to classic American fare, featuring everything from juicy burgers and thick shakes to hearty breakfasts and homemade pies. <br/> <strong>Every dish is made with love</strong>, using recipes that have been passed down through generations and perfected over time. Our staff, a diverse team of Route 66 enthusiasts and culinary talents, is dedicated to providing a warm, welcoming experience to everyone who walks through our doors. <br/>Whether you're a local making your regular visit, a tourist exploring the historic route, or a traveler looking for a taste of Americana, we strive to make your experience memorable.",
  type: ["American", "Hamburger"],
  max_seats: 82,
  free_seats: 28,
  avg_rating: 4.5,
  address: "425E Rte 66",
  city: "Williams",
  country: "Arizona, US",
  openings: [
    {
      day: "Monday",
      lunch: {
        start: "-1",
        end: "-1",
      },
      dinner: {
        start: "-1",
        end: "-1",
      },
    },
    {
      day: "Tuesday",
      lunch: {
        start: "-1",
        end: "-1",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
    {
      day: "Wednesday",
      lunch: {
        start: "11:00",
        end: "15:00",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
    {
      day: "Thursday",
      lunch: {
        start: "11:00",
        end: "15:00",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
    {
      day: "Friday",
      lunch: {
        start: "11:00",
        end: "15:00",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
    {
      day: "Saturday",
      lunch: {
        start: "11:00",
        end: "15:00",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
    {
      day: "Sunday",
      lunch: {
        start: "11:00",
        end: "15:00",
      },
      dinner: {
        start: "19:00",
        end: "22:00",
      },
    },
  ],
  profile_img: {
    src: "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "dummy",
  },
  about_img: {
    src: "https://d3emaq2p21aram.cloudfront.net/media/cache/venue_carousel/uploads/venues/35233/originals/jrosenberg_nickel&diner_hires-5561.jpg",
    alt: "Our restaurant",
  },
  gallery: [
    {
      src: "/images/diner.webp",
      alt: "Our next diner, in NY",
      caption:
        "These is the concept art for the new and second Route 66 Diner, opening next year in NY, stay hungry! 😋",
    },
    {
      src: "https://images.pexels.com/photos/18338616/pexels-photo-18338616/free-photo-of-uomo-cameriere-in-piedi-sorridente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "serving our food",
      caption: "Serving our food for the customers.",
    },
    {
      src: "https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Our special one, out of the menu",
      caption:
        "The special one, only available on fridays as a limited out of menu.",
    },
  ],
  menu: [
    {
      name: "Classic Cheeseburger",
      description:
        "A juicy beef patty topped with melted cheese, lettuce, tomato, and our special sauce, served on a toasted bun.",
      price: 5.99,
      category: "Burgers",
    },
    {
      name: "Crispy Chicken Sandwich",
      description:
        "Crispy fried chicken breast with pickles and mayo on a soft bun.",
      price: 6.49,
      category: "Sandwiches",
    },
    {
      name: "Veggie Burger",
      description:
        "A delicious, plant-based patty topped with avocado, lettuce, tomato, and vegan mayo, served on a whole grain bun.",
      price: 7.99,
      category: "Burgers",
    },
    {
      name: "Large Fries",
      description: "A generous portion of our signature crispy, golden fries.",
      price: 2.99,
      category: "Sides",
    },
    {
      name: "Chocolate Milkshake",
      description:
        "Rich and creamy chocolate milkshake, topped with whipped cream and a cherry.",
      price: 3.99,
      category: "Beverages",
    },
    {
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
      price: 5.49,
      category: "Salads",
    },
  ],
};

export default dummyRestaurant;
