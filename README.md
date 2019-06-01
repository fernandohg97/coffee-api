# **COFFEE API**

## RESTful API PROVIDING COFFEE DATA

### **What is COFFEE API?**
It is an open source RESTful API providing many coffee data.

### **What type of data?**
You can consume data as coffee beverages (latte, espresso, cappuccino, cortado and many others.

### **What’s the purpose of this project?**
We built this project because we love coffee. So, if you are a developer and a coffee lover, we want it to share this data to you to use it in your projects for free.

It was a challenge for us to built this. We decided to implement product variants concept into our database. So, you can choose between a simple 12oz latte or a vainilla 12oz latte. It is just one product with two variants.

You can implement it in you personal projects or commercial projects. Please, feel free to let us know what improvements we can make and if we miss a type of coffee that you know or like let us know also to include it into our database.

**Let’s build!**


## ENDPOINTS
### **Product endpoints**

- Get user products /api/products
- Get admin products /api/products/admin
- Get products by product name /api/products/name
- Get products sku /api/products/sku
- Get products count /api/products/count
- Get one product /api/products/:product_id
- Get products by category /api/products/category/:category_id
- Get product variant values by sku /api/products/variants/values/:sku_id

### **Variant endpoints**

- Get all variants name /api/variants
- Get all variant values /api/variants/values
- Get one variant /api/variants/:variant_id
- Get all variant values by product /api/variants/product/:product_id
- Get variants count by product /api/variants/product/total/:product_id

### **Category endpoints**

- Get all categories /api/categories
- Get one category /api/categories/:category_id

