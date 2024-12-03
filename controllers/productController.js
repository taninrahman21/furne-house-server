// const Product = require('../models/product');

// // Create a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, description, price, image, category, stock } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       image,
//       category,
//       stock
//     });

//     const product = await newProduct.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };