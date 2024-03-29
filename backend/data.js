import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("HusWL98.?fG", 8),
      isAdmin: true,
    },
    {
      name: "Customer1",
      email: "customer1@admin.com",
      password: bcrypt.hashSync("HusWL98.?fG", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 1200,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High Quality Product",
      countInStock: 6,
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 1400,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "High Quality Product",
      countInStock: 2,
    },
    {
      name: "Lacoste Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 2000,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "High Quality Product",
      countInStock: 36,
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      image: "/images/p1.jpg",
      price: 3100,
      brand: "Nike",
      rating: 5.0,
      numReviews: 20,
      description: "High Quality Product",
      countInStock: 16,
    },
    {
      name: "Puma Slim Pant",
      category: "Pants",
      image: "/images/p1.jpg",
      price: 12000,
      brand: "Puma",
      rating: 3.2,
      numReviews: 6,
      description: "High Quality Product",
      countInStock: 8,
    },
    {
      name: "Adidas Slim Pant",
      category: "Pants",
      image: "/images/p1.jpg",
      price: 12000,
      brand: "Adidas",
      rating: 3.7,
      numReviews: 3,
      description: "High Quality Product",
      countInStock: 0,
    },
  ],
};
export default data;
