const mongoose = require('mongoose');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
require('dotenv').config();

const demoProducts = [
    // Cricket Products
    {
        name: "Professional Cricket Bat",
        description: "Premium willow cricket bat for professionals",
        price: 2499,
        category: "cricket",
        image: "https://dpazadsports.com/wp-content/uploads/2025/02/Feature-img-Best-Bat-Company-Top-Cricket-Bat-Brands-in-India-Worldwide.jpg"
    },
    {
        name: "Cricket Helmet",
        description: "Safety helmet with premium protection",
        price: 1299,
        category: "cricket",
        image: "https://images.pexels.com/photos/13067380/pexels-photo-13067380.jpeg?cs=srgb&dl=pexels-usbofphotography-13067380.jpg&fm=jpg"
    },
    {
        name: "Cricket Batting Gloves",
        description: "Premium leather batting gloves",
        price: 899,
        category: "cricket",
        image: "https://media.istockphoto.com/id/184141809/photo/blue-and-white-leather-batting-gloves-isolated-on-white.jpg?s=612x612&w=0&k=20&c=dsA4haeum94A2nJZ2-wzA47-HKwOcW_QiIowa4bMguU="
    },
    // Football Products
    {
        name: "Professional Football Boots",
        description: "High-performance boots for all surfaces",
        price: 3499,
        category: "football",
        image: "https://cdn.lovellsports.com/features/splash-pages/soccer/boots/nike-mar25.jpg?width=540"
    },
    {
        name: "Professional Football",
        description: "FIFA approved match football",
        price: 1999,
        category: "football",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT436RR-MYgQl9xVFBmGpFMxwG9Vekbi7ny7w&s"
    },
    {
        name: "Football Training Jersey",
        description: "Breathable training jersey with moisture-wicking",
        price: 1299,
        category: "football",
        image: "https://assets.ajio.com/medias/sys_master/root/20240823/Ywmx/66c8a6c71d763220fa94a480/-473Wx593H-469597566-white-MODEL.jpg"
    }
];

async function addDemoProducts() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Find an admin user to associate products with
        const admin = await Admin.findOne();
        if (!admin) {
            console.error('No admin user found. Please create an admin user first.');
            process.exit(1);
        }

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Add demo products with older timestamps to simulate existing inventory
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const productsWithAdmin = demoProducts.map(product => ({
            ...product,
            createdBy: admin._id,
            createdAt: oneWeekAgo,
            updatedAt: oneWeekAgo
        }));

        await Product.insertMany(productsWithAdmin);
        console.log(`Added ${demoProducts.length} demo products successfully!`);

        process.exit(0);
    } catch (error) {
        console.error('Error adding demo products:', error);
        process.exit(1);
    }
}

// Run the script
addDemoProducts();
