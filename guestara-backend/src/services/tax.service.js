const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

async function resolveTax(item) {
  if (item.tax_applicable !== undefined) {
    return item.tax_percentage || 0;
  }

  if (item.subcategory) {
    const sub = await Subcategory.findById(item.subcategory).populate("category");
    if (sub.tax_applicable !== undefined) return sub.tax_percentage || 0;
    return sub.category.tax_percentage || 0;
  }

  const cat = await Category.findById(item.category);
  return cat.tax_percentage || 0;
}

module.exports = { resolveTax };
