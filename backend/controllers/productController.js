// 1. Search API - (GET /api/products/search?query=laptop)
const searchProducts = async (req, res) => {
  const { query } = req.query;
  res.status(200).json({
    success: true,
    message: `Search results for: ${query || 'All'}`,
    count: 2,
    products: [
      { id: "p101", title: "Used Laptop Stand", price: 2500, category: "Electronics" },
      { id: "p102", title: "Course Textbook", price: 1200, category: "Books" }
    ]
  });
};

// 2. Filter API - (GET /api/products/filter?category=Electronics&minPrice=1000&maxPrice=5000)
const filterProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  res.status(200).json({
    success: true,
    filtersApplied: { category, minPrice, maxPrice },
    count: 1,
    products: [
      { id: "p101", title: "Used Laptop Stand", price: 2500, category: category || "Electronics" }
    ]
  });
};

// 3. Stock Availability API - (GET /api/products/:id/stock)
const checkStock = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    productId: id,
    inStock: true,
    availableQuantity: 5,
    status: "Available"
  });
};

// 4. Product Validation API - (POST /api/products/validate)
const validateProduct = async (req, res) => {
  const { title, price, category } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed: Title, price, and category are required fields."
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed: Price must be greater than zero."
    });
  }

  res.status(200).json({
    success: true,
    message: "Product validation passed successfully!",
    validatedData: { title, price, category }
  });
};

module.exports = {
  searchProducts,
  filterProducts,
  checkStock,
  validateProduct
};