"use strict";
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");
const PRODUCTS_FILE = path.join(__dirname, "products.json");

app.use(cors());
app.use(express.json());

function loadUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }

  let users;
  try {
    users = loadUsers();
  } catch (err) {
    console.error("Could not read users.json:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }

  const match = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!match) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: { username: match.username },
  });
});

function loadProducts() {
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}
const saveProducts = (list) =>
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(list, null, 2));

const safe = (fn) => (req, res) => {
  try {
    fn(req, res);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

function validateProduct(b) {
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const category = typeof b.category === "string" ? b.category.trim() : "";
  if (!name || !category)
    return { error: "Product name and category are required" };
  if (name.length > 120 || category.length > 60)
    return { error: "Product name or category is too long" };
  if (typeof b.price !== "number" || !Number.isFinite(b.price) || b.price < 0)
    return { error: "Price must be a number, 0 or more" };
  if (!Number.isInteger(b.quantity) || b.quantity < 0)
    return { error: "Quantity must be a whole number, 0 or more" };
  return { value: { name, category, price: b.price, quantity: b.quantity } };
}

const notFound = (res) =>
  res.status(404).json({ success: false, message: "Product not found" });

// READ all
app.get(
  "/api/products",
  safe((req, res) => {
    res.status(200).json({ success: true, products: loadProducts() });
  }),
);

app.get(
  "/api/products/:id",
  safe((req, res) => {
    const product = loadProducts().find((p) => p.id === Number(req.params.id));
    if (!product) return notFound(res);
    res.status(200).json({ success: true, product });
  }),
);

app.post(
  "/api/products",
  safe((req, res) => {
    const { value, error } = validateProduct(req.body || {});
    if (error) return res.status(400).json({ success: false, message: error });
    const products = loadProducts();
    const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const product = { id, ...value };
    products.push(product);
    saveProducts(products);
    res
      .status(201)
      .json({ success: true, message: "Product created", product });
  }),
);

app.put(
  "/api/products/:id",
  safe((req, res) => {
    const products = loadProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) return notFound(res);
    const { value, error } = validateProduct(req.body || {});
    if (error) return res.status(400).json({ success: false, message: error });
    products[index] = { id: products[index].id, ...value };
    saveProducts(products);
    res.status(200).json({
      success: true,
      message: "Product updated",
      product: products[index],
    });
  }),
);

app.delete(
  "/api/products/:id",
  safe((req, res) => {
    const products = loadProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) return notFound(res);
    products.splice(index, 1);
    saveProducts(products);
    res.status(200).json({ success: true, message: "Product deleted" });
  }),
);

app.use((err, req, res, next) => {
  if (err.status === 400 || err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON in request body" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Server error" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
