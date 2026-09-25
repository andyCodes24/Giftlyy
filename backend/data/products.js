// GiftLy Product Catalogue
// ------------------------------------------------------
// This file contains the products that GiftLy actually sells.
//
// The backend will use this catalogue as the source of truth.
// The Products page will eventually display these products,
// and the Recommendation system will only recommend products
// from this catalogue.
//
// This means we do NOT recommend products that GiftLy does
// not actually have.

// The four occasions supported by GiftLy are:
// - Birthday
// - Wedding
// - Valentine's Day
// - Anniversary
//
// The five product categories are:
// - Cards
// - Treats
// - Flowers
// - Gift Sets
// - Vouchers

const products = [

    
    // BIRTHDAY PRODUCTS
    

    {
        name: "Birthday Gift Box",
        description:
            "A cheerful birthday gift box filled with thoughtful treats and surprises.",
        price: 299.99,
        category: "Gift Sets",
        occasion: ["Birthday"],
        contents: [
            "Birthday Card",
            "Chocolate Bar",
            "Assorted Sweets",
            "Small Teddy Bear",
            "Gift Wrapping"
        ],
        image: "birthday-gift-box.jpg",
        stock: 10,
        isActive: true
    },

    {
        name: "Birthday Chocolate Hamper",
        description:
            "A delicious selection of chocolates and sweet treats, perfect for celebrating a birthday.",
        price: 249.99,
        category: "Treats",
        occasion: ["Birthday"],
        contents: [
            "Assorted Chocolates",
            "Chocolate Bar",
            "Gourmet Sweets",
            "Gift Wrapping"
        ],
        image: "birthday-chocolate-hamper.jpg",
        stock: 12,
        isActive: true
    },

    {
        name: "Colourful Birthday Bouquet",
        description:
            "A bright and colourful flower bouquet arranged especially for a birthday celebration.",
        price: 279.99,
        category: "Flowers",
        occasion: ["Birthday"],
        contents: [
            "Mixed Fresh Flowers",
            "Decorative Wrapping",
            "Birthday Card"
        ],
        image: "birthday-bouquet.jpg",
        stock: 8,
        isActive: true
    },

    {
        name: "Birthday Celebration Card",
        description:
            "A cheerful birthday greeting card for someone special.",
        price: 49.99,
        category: "Cards",
        occasion: ["Birthday"],
        contents: [
            "Birthday Greeting Card",
            "Envelope"
        ],
        image: "birthday-card.jpg",
        stock: 20,
        isActive: true
    },

    {
        name: "Birthday Shopping Voucher",
        description:
            "A flexible shopping voucher that lets the birthday recipient choose their own gift.",
        price: 300.00,
        category: "Vouchers",
        occasion: ["Birthday"],
        contents: [
            "R300 Shopping Voucher"
        ],
        image: "birthday-voucher.jpg",
        stock: 15,
        isActive: true
    },


    
    // WEDDING PRODUCTS
    

    {
        name: "Wedding Celebration Gift Set",
        description:
            "An elegant gift set created to celebrate a couple's special day.",
        price: 499.99,
        category: "Gift Sets",
        occasion: ["Wedding"],
        contents: [
            "Decorative Photo Frame",
            "Two Glasses",
            "Wedding Card",
            "Gift Wrapping"
        ],
        image: "wedding-gift-set.jpg",
        stock: 7,
        isActive: true
    },

    {
        name: "Elegant Wedding Card",
        description:
            "A beautifully designed card for congratulating a newly married couple.",
        price: 59.99,
        category: "Cards",
        occasion: ["Wedding"],
        contents: [
            "Wedding Greeting Card",
            "Envelope"
        ],
        image: "wedding-card.jpg",
        stock: 20,
        isActive: true
    },

    {
        name: "Wedding Flower Arrangement",
        description:
            "An elegant flower arrangement suitable for celebrating a beautiful wedding.",
        price: 399.99,
        category: "Flowers",
        occasion: ["Wedding"],
        contents: [
            "Fresh Flower Arrangement",
            "Decorative Wrapping",
            "Wedding Card"
        ],
        image: "wedding-flowers.jpg",
        stock: 6,
        isActive: true
    },

    {
        name: "Luxury Chocolate Collection",
        description:
            "A premium chocolate collection that makes a thoughtful wedding celebration gift.",
        price: 349.99,
        category: "Treats",
        occasion: ["Wedding", "Anniversary"],
        contents: [
            "Premium Chocolate Selection",
            "Assorted Truffles",
            "Decorative Gift Box"
        ],
        image: "luxury-chocolates.jpg",
        stock: 10,
        isActive: true
    },

    {
        name: "Wedding Gift Voucher",
        description:
            "A flexible gift voucher that allows the newly married couple to choose something they love.",
        price: 500.00,
        category: "Vouchers",
        occasion: ["Wedding"],
        contents: [
            "R500 Gift Voucher"
        ],
        image: "wedding-voucher.jpg",
        stock: 10,
        isActive: true
    },


   
    // VALENTINE'S DAY PRODUCTS
   

    {
        name: "Valentine's Romance Gift Box",
        description:
            "A romantic gift box filled with treats and thoughtful surprises for Valentine's Day.",
        price: 449.99,
        category: "Gift Sets",
        occasion: ["Valentine's Day"],
        contents: [
            "Romantic Card",
            "Box of Chocolates",
            "Small Teddy Bear",
            "Red Rose",
            "Gift Wrapping"
        ],
        image: "valentines-gift-box.jpg",
        stock: 10,
        isActive: true
    },

    {
        name: "Red Rose Bouquet",
        description:
            "A classic bouquet of red roses designed to express love and appreciation.",
        price: 299.99,
        category: "Flowers",
        occasion: ["Valentine's Day", "Anniversary"],
        contents: [
            "12 Red Roses",
            "Decorative Wrapping",
            "Gift Card"
        ],
        image: "red-rose-bouquet.jpg",
        stock: 8,
        isActive: true
    },

    {
        name: "Valentine's Chocolate Collection",
        description:
            "A romantic selection of chocolates made for sharing with someone special.",
        price: 249.99,
        category: "Treats",
        occasion: ["Valentine's Day", "Anniversary"],
        contents: [
            "Assorted Chocolates",
            "Chocolate Truffles",
            "Decorative Gift Box"
        ],
        image: "valentines-chocolates.jpg",
        stock: 15,
        isActive: true
    },

    {
        name: "Valentine's Love Card",
        description:
            "A romantic greeting card for expressing your love on Valentine's Day.",
        price: 49.99,
        category: "Cards",
        occasion: ["Valentine's Day"],
        contents: [
            "Valentine's Greeting Card",
            "Envelope"
        ],
        image: "valentines-card.jpg",
        stock: 20,
        isActive: true
    },

    {
        name: "Valentine's Experience Voucher",
        description:
            "A romantic experience voucher that gives your loved one something special to enjoy.",
        price: 500.00,
        category: "Vouchers",
        occasion: ["Valentine's Day"],
        contents: [
            "Romantic Experience Voucher"
        ],
        image: "valentines-voucher.jpg",
        stock: 10,
        isActive: true
    },


    
    // ANNIVERSARY PRODUCTS
    

    {
        name: "Anniversary Gift Set",
        description:
            "A thoughtful gift set designed to celebrate another special year together.",
        price: 499.99,
        category: "Gift Sets",
        occasion: ["Anniversary"],
        contents: [
            "Decorative Photo Frame",
            "Chocolate Box",
            "Anniversary Card",
            "Gift Wrapping"
        ],
        image: "anniversary-gift-set.jpg",
        stock: 8,
        isActive: true
    },

    {
        name: "Anniversary Flower Bouquet",
        description:
            "A beautiful bouquet of fresh flowers for celebrating a special anniversary.",
        price: 349.99,
        category: "Flowers",
        occasion: ["Anniversary"],
        contents: [
            "Fresh Flower Bouquet",
            "Decorative Wrapping",
            "Anniversary Card"
        ],
        image: "anniversary-bouquet.jpg",
        stock: 8,
        isActive: true
    },

    {
        name: "Anniversary Chocolate Hamper",
        description:
            "A delicious chocolate hamper created for a sweet anniversary celebration.",
        price: 299.99,
        category: "Treats",
        occasion: ["Anniversary"],
        contents: [
            "Assorted Chocolates",
            "Chocolate Truffles",
            "Decorative Gift Box"
        ],
        image: "anniversary-chocolates.jpg",
        stock: 12,
        isActive: true
    },

    {
        name: "Anniversary Card",
        description:
            "A heartfelt anniversary card for celebrating love and another year together.",
        price: 49.99,
        category: "Cards",
        occasion: ["Anniversary"],
        contents: [
            "Anniversary Greeting Card",
            "Envelope"
        ],
        image: "anniversary-card.jpg",
        stock: 20,
        isActive: true
    },

    {
        name: "Anniversary Experience Voucher",
        description:
            "A special experience voucher for couples celebrating their anniversary.",
        price: 500.00,
        category: "Vouchers",
        occasion: ["Anniversary"],
        contents: [
            "Couples Experience Voucher"
        ],
        image: "anniversary-voucher.jpg",
        stock: 10,
        isActive: true
    }
];

// Export the catalogue so other backend files can use it.
module.exports = products;