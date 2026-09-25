const Product = require("../models/ProductModels");

// Get gift recommendations
// GET /api/recommendations
const getRecommendations = async (req, res, next) => {
try {
const { occasion, budget } = req.query;


    const filter = {
        isActive: true
    };

   // Match the selected occasion with the product name or description
if (occasion) {
    filter.$or = [
        {
            name: {
                $regex: occasion,
                $options: "i"
            }
        },
        {
            description: {
                $regex: occasion,
                $options: "i"
            }
        }
    ];
}

    // Filter according to budget
    if (budget) {
        const budgetAmount = Number(budget);

        if (isNaN(budgetAmount) || budgetAmount <= 0) {
            res.status(400);
            return next(new Error("Budget must be a valid positive number"));
        }

        filter.price = {
            $lte: budgetAmount
        };
    }

    const products = await Product.find(filter)
        .sort({ price: 1 });

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });

} catch (error) {
    next(error);
}


};

module.exports = {
getRecommendations
};
