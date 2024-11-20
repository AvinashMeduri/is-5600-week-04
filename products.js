// products.js
const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list,
  get
}


/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list (options = {}) {
  const { offset = 0, limit = 25 , tag } = options
  const data = await fs.readFile(productsFile)

  return JSON.parse(data)
    .filter(product => {
        if(!tag) {
          return product
        }
          return product.tags.find(( {title} ) => title == tag)
    })
    .slice(offset, offset + limit) // Slice the products
}

// products.js

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get (id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }

   // If no product is found, return null
  return null;
}

// products.js

exports.deleteProduct = (req, res) => {
    console.log(`Product with ID ${req.params.id} deleted.`);
    res.status(202).send({ message: 'Product deleted.' });
};

exports.updateProduct = (req, res) => {
    console.log(`Product with ID ${req.params.id} updated.`);
    res.status(200).send({ message: 'Product updated.' });
};