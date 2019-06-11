# **COFFEE API**

## RESTful API PROVIDING COFFEE DATA

### **What is COFFEE API?**
It is an open source RESTful API providing many coffee data.

### **What type of data?**
You can consume data as coffee beverages (latte, espresso, cappuccino, cortado and many others).

### **What’s the purpose of this project?**
We built this project because we love coffee. So, if you are a developer and a coffee lover, we want it to share this data to you to use it in your projects for free.

It was a challenge for us to built this. We decided to implement product variants concept into our database. So, you can choose between a simple 12oz latte or a vainilla 12oz latte. It is just one product with two variants.

You can implement it in you personal projects or commercial projects. Please, feel free to let us know what improvements we can make and if we miss a type of coffee that you know or like let us know also to include it into our database.

**Let’s build!**


## ENDPOINTS
### **Product endpoints**

- Get all products

    - URL: /api/v1/products
    - Description: Retrieve all product name and description.

<!-- - Get admin products

    - URL: /api/products/admin
    - Description: Retrieve all product id, product name, sku, description and image.
-->
- Get products by product name

    - URL: /api/v1/products/name
    - Description: Retrieve all product name, description, image and category.

- Get products sku

    - URL: /api/v1/products/sku
    - Description: Retrieve all product name, description, sku and price.

- Get products count

    - URL: /api/v1/products/count
    - Description: Retrieve the total number of products.

- Get one product

    - URL: /api/v1/products/:product_id
    - Description: Retrieve product name, description, image and category.

- Get products by category

    - URL: /api/v1/products/category/:category_id
    - Description: Retrieve all product name, description, image and category.

- Get product variant values by sku

    - URL: /api/v1/products/variants/values/:sku_id
    - Description: Retrieve product name, description, sku, price and variant values.

### **Variant endpoints**

- Get all variants name

    - URL: /api/v1/variants
    - Description: Retrieve all variant id and variant name.

- Get all variant values

    - URL: /api/v1/variants/values
    - Description: Retrieve all value id, value name, product id and variant id.

- Get one variant

    - URL: /api/v1/variants/:variant_id
    - Description: Retreive variant id and variant name.

- Get all variant values by product id

    - URL: /api/v1/variants/product/:product_id
    - Description: Retrieve value names corresponding to the product.

- Get variants count by product

    - URL: /api/v1/variants/product/total/:product_id
    - Description: Retrieve the total number of variants by product.

### **Category endpoints**

- Get all categories

    - URL: /api/v1/categories
    - Description: Retrieve all category id and category name.

- Get one category

    - URL: /api/v1/categories/:category_id
    - Description: Retrieve category id and category name.


## Setup

### Prerequisites

- MySQL

### **Installing**

1. Clone this repository `https://github.com/fernandohg97/coffee-api.git`.
2. Edit database config in `app/db/database.js` setting your user and password.
3. Run command `npm run createdb` to build the database.
4. Run command `npm install` to install packages.
5. Run command `npm start` to test the project.
6. Go to `http://localhost:3000` in your browser.
