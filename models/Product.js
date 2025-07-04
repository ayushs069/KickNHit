// In-memory storage for Day 2 (replace with database later)
let products = [
    {
        id: 1,
        name: 'Professional Cricket Bat',
        description: 'High-quality willow cricket bat for professional players',
        price: 2499,
        category: 'cricket',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVi_V4PxSEsCrR_qmOF9MtDzxJnKpBI3-ikg&s',
        isActive: true,
        createdBy: 1
    },
    {
        id: 2,
        name: 'Football Size 5',
        description: 'Official size 5 football for matches and training',
        price: 1299,
        category: 'football',
        image: 'https://i.ebayimg.com/images/g/wqwAAOSwU0JjFook/s-l1200.webp',
        isActive: true,
        createdBy: 1
    },
    {
        id: 3,
        name: 'Cricket Complete Kit',
        description: 'Everything you need for cricket - bat, ball, pads, gloves',
        price: 4999,
        category: 'cricket',
        image: 'https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/5b0ea239e50527b43e3253a7f103e237/d/s/dsc-2020-cricket-kit_2.webp',
        isActive: true,
        createdBy: 1
    }
];

class Product {
    constructor(name, description, price, category, image, createdBy, isActive = true) {
        this.id = Math.max(...products.map(p => p.id), 0) + 1;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.isActive = isActive;
        this.createdBy = createdBy;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Save product to memory
    save() {
        products.push(this);
        return this;
    }

    // Update product
    update(updates) {
        Object.assign(this, updates);
        this.updatedAt = new Date();
        return this;
    }

    // Find product by ID
    static findById(id) {
        return products.find(product => product.id === parseInt(id));
    }

    // Get all products
    static getAll() {
        return products;
    }

    // Get active products
    static getActive() {
        return products.filter(product => product.isActive);
    }

    // Get products by category
    static getByCategory(category) {
        return products.filter(product => product.category === category && product.isActive);
    }

    // Get product by ID
    static getById(id) {
        return products.find(product => product.id === parseInt(id) && product.isActive);
    }

    // Update product by ID
    static updateById(id, updates) {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            Object.assign(product, updates);
            product.updatedAt = new Date();
            return product;
        }
        return null;
    }

    // Delete product by ID (soft delete)
    static deleteById(id) {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            product.isActive = false;
            product.updatedAt = new Date();
            return true;
        }
        return false;
    }

    // Hard delete product by ID
    static removeById(id) {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products.splice(index, 1);
            return true;
        }
        return false;
    }

    // Search products
    static search(query) {
        const searchQuery = query.toLowerCase();
        return products.filter(product => 
            product.isActive && (
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery)
            )
        );
    }
}

module.exports = Product;
