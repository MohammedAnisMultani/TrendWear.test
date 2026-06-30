const mongoose = require('mongoose');
const productModel = require('./Models/Product');

mongoose.connect('mongodb+srv://MohammedAnis:1234@cluster0.xrcf3h2.mongodb.net/TrendWear')
.then(()=>{console.log("Connected to Database")})
.catch((e)=>{console.log(e)})

const products = [
  // Men
  { name: "Denim Jacket", price: 60, image: "/Images/Denim Jacket.png", category: "men" },
  { name: "Casual Shirt", price: 40, image: "/Images/Casual Shirt.png", category: "men" },
  { name: "Slim Fit Jeans", price: 55, image: "/Images/Slim Fit Jeans.png", category: "men" },
  { name: "Formal Blazer", price: 120, image: "/Images/Formal Blazer.png", category: "men" },
  { name: "Polo T-Shirt", price: 35, image: "/Images/Polo T-Shirt.png", category: "men" },
  { name: "Cargo Pants", price: 50, image: "/Images/Cargo Pants.png", category: "men" },
  { name: "Leather Jacket", price: 150, image: "/Images/Leather Jacket.png", category: "men" },
  { name: "Sweatshirt", price: 45, image: "/Images/Sweat Shirt.png", category: "men" },
  { name: "Track Pants", price: 30, image: "Images/Track Pants.png", category: "men" },
  { name: "Kurta", price: 40, image: "/Images/men-kurta.jpg", category: "men" },
  { name: "Hooded Sweatshirt", price: 48, image: "/Images/men-hoodie.jpg", category: "men" },
  { name: "Bomber Jacket", price: 95, image: "/Images/men-bomber.jpg", category: "men" },
  { name: "Graphic Tee", price: 28, image: "/Images/men-graphic.jpg", category: "men" },
  { name: "Chinos", price: 52, image: "/Images/men-chinos.jpg", category: "men" },
  { name: "Denim Shirt", price: 45, image: "/Images/men-denim-shirt.jpg", category: "men" },
  { name: "Varsity Jacket", price: 110, image: "/Images/men-varsity.jpg", category: "men" },
  { name: "Henley T-Shirt", price: 32, image: "/Images/men-henley.jpg", category: "men" },
  { name: "Pullover Sweater", price: 58, image: "/Images/men-pullover.jpg", category: "men" },
  { name: "Joggers", price: 36, image: "/Images/men-joggers.jpg", category: "men" },
  { name: "Sherwani", price: 140, image: "/Images/men-sherwani.jpg", category: "men" },

  // Women
  { name: "Summer Dress", price: 45, image: "/Images/summer-dress.png", category: "women" },
  { name: "Blouse Top", price: 35, image: "/Images/blouse-top.png", category: "women" },
  { name: "Skirt", price: 50, image: "/Images/skirt.png", category: "women" },
  { name: "Evening Gown", price: 150, image: "/Images/evening-gown.png", category: "women" },
  { name: "Crop Top", price: 25, image: "/Images/crop-top.png", category: "women" },
  { name: "Leggings", price: 30, image: "/Images/leggings.png", category: "women" },
  { name: "Cardigan", price: 60, image: "/Images/cardigan.png", category: "women" },
  { name: "Kurti", price: 40, image: "/Images/women-kurti.jpg", category: "women" },
  { name: "Saree", price: 100, image: "/Images/women-saree.jpg", category: "women" },
  { name: "Anarkali", price: 120, image: "/Images/women-anarkali.jpg", category: "women" },
  { name: "Maxi Dress", price: 70, image: "/Images/women-maxi.jpg", category: "women" },
  { name: "Peplum Top", price: 38, image: "/Images/women-peplum.jpg", category: "women" },
  { name: "Palazzo Pants", price: 55, image: "/Images/women-palazzo.jpg", category: "women" },
  { name: "Jumpsuit", price: 85, image: "/Images/women-jumpsuit.jpg", category: "women" },
  { name: "Tank Top", price: 22, image: "/Images/women-tank.jpg", category: "women" },
  { name: "Shrug", price: 40, image: "/Images/women-shrug.jpg", category: "women" },
  { name: "Lehenga", price: 160, image: "/Images/women-lehenga.jpg", category: "women" },
  { name: "Tunic", price: 42, image: "/Images/women-tunic.jpg", category: "women" },
  { name: "Wrap Dress", price: 65, image: "/Images/women-wrap.jpg", category: "women" },
  { name: "Kaftan", price: 75, image: "/Images/women-kaftan.jpg", category: "women" },

 
  // Kids
  { name: "Kids T-Shirt", price: 20, image: "/Images/kids-tshirt.jpg", category: "kids" },
  { name: "Kids Shorts", price: 25, image: "/Images/kids-shorts.jpg", category: "kids" },
  { name: "Kids Hoodie", price: 30, image: "/Images/kids-hoodie.jpg", category: "kids" },
  { name: "Dungarees", price: 35, image: "/Images/kids-dungarees.jpg", category: "kids" },
  { name: "Kids Jacket", price: 40, image: "/Images/kids-jacket.jpg", category: "kids" },
  { name: "Kids Pajamas", price: 20, image: "/Images/kids-pajamas.jpg", category: "kids" },
  { name: "Kids Sweater", price: 28, image: "/Images/kids-sweater.jpg", category: "kids" },
  { name: "Kids Jeans", price: 32, image: "/Images/kids-jeans.jpg", category: "kids" },
  { name: "Kids Kurta", price: 25, image: "/Images/kids-kurta.jpg", category: "kids" },
  { name: "Kids Frock", price: 30, image: "/Images/kids-frock.jpg", category: "kids" },
  { name: "Kids Polo Shirt", price: 22, image: "/Images/kids-polo.jpg", category: "kids" },
  { name: "Kids Joggers", price: 26, image: "/Images/kids-joggers.jpg", category: "kids" },
  { name: "Kids Raincoat", price: 35, image: "/Images/kids-raincoat.jpg", category: "kids" },
  { name: "Kids Overalls", price: 32, image: "/Images/kids-overalls.jpg", category: "kids" },
  { name: "Kids Sweatsuit", price: 38, image: "/Images/kids-sweatsuit.jpg", category: "kids" },
  { name: "Kids Polo Dress", price: 30, image: "/Images/kids-polo-dress.jpg", category: "kids" },
  { name: "Kids Tracksuit", price: 40, image: "/Images/kids-tracksuit.jpg", category: "kids" },
  { name: "Kids Tunic", price: 24, image: "/Images/kids-tunic.jpg", category: "kids" },
  { name: "Kids Romper", price: 28, image: "/Images/kids-romper.jpg", category: "kids" },
  { name: "Kids Cardigan", price: 34, image: "/Images/kids-cardigan.jpg", category: "kids" },

 
  // Accessories
  { name: "Leather Belt", price: 25, image: "/Images/accessories-belt.jpg", category: "accessories" },
  { name: "Wrist Watch", price: 80, image: "/Images/accessories-watch.jpg", category: "accessories" },
  { name: "Sunglasses", price: 35, image: "/Images/accessories-sunglasses.jpg", category: "accessories" },
  { name: "Handbag", price: 90, image: "/Images/accessories-handbag.jpg", category: "accessories" },
  { name: "Wallet", price: 40, image: "/Images/accessories-wallet.jpg", category: "accessories" },
  { name: "Scarf", price: 20, image: "/Images/accessories-scarf.jpg", category: "accessories" },
  { name: "Cap", price: 15, image: "/Images/accessories-cap.jpg", category: "accessories" },
  { name: "Bracelet", price: 30, image: "/Images/accessories-bracelet.jpg", category: "accessories" },
  { name: "Necklace", price: 60, image: "/Images/accessories-necklace.jpg", category: "accessories" },
  { name: "Earrings", price: 50, image: "/Images/accessories-earrings.jpg", category: "accessories" },
  { name: "Tie", price: 20, image: "/Images/accessories-tie.jpg", category: "accessories" },
  { name: "Backpack", price: 65, image: "/Images/accessories-backpack.jpg", category: "accessories" },
  { name: "Ring", price: 55, image: "/Images/accessories-ring.jpg", category: "accessories" },
  { name: "Brooch", price: 25, image: "/Images/accessories-brooch.jpg", category: "accessories" },
  { name: "Hairband", price: 15, image: "/Images/accessories-hairband.jpg", category: "accessories" },
  { name: "Gloves", price: 30, image: "/Images/accessories-gloves.jpg", category: "accessories" },
  { name: "Keychain", price: 12, image: "/Images/accessories-keychain.jpg", category: "accessories" },
  { name: "Travel Bag", price: 90, image: "/Images/accessories-travelbag.jpg", category: "accessories" },
  { name: "Perfume", price: 100, image: "/Images/accessories-perfume.jpg", category: "accessories" },
  { name: "Anklet", price: 28, image: "/Images/accessories-anklet.jpg", category: "accessories" },

];

const importData = async() => {
    try {
        await productModel.deleteMany()
        await productModel.insertMany(products)
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}
importData()

//to run this seeder.js we need to do node seeder.js
