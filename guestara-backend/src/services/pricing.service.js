async function calculatePrice(item, quantity = 1, time = null, addons = []) {
  if (!item || !item.pricing) {
    throw new Error("Invalid item or pricing configuration");
  }

  // quantity comes from query → always string
  quantity = Number(quantity);

  let price = 0;
  let appliedRule = item.pricing.type;

  switch (item.pricing.type) {
    case "STATIC":
      if (item.pricing.base_price == null) {
        throw new Error("Static pricing requires base_price");
      }
      price = item.pricing.base_price;
      break;

    case "COMPLIMENTARY":
      price = 0;
      break;

    case "TIERED":
      if (!Array.isArray(item.pricing.tiers)) {
        throw new Error("Tiered pricing requires tiers array");
      }

      const tier = item.pricing.tiers.find(
        (t) => quantity <= t.upto
      );

      if (!tier) {
        throw new Error("No matching tier found for given quantity");
      }

      price = tier.price;
      break;

    case "DISCOUNTED":
      if (!item.pricing.base_price || !item.pricing.discount) {
        throw new Error("Discounted pricing requires base_price and discount");
      }

      price = item.pricing.base_price;

      if (item.pricing.discount.type === "FLAT") {
        price -= item.pricing.discount.value;
      } else if (item.pricing.discount.type === "PERCENT") {
        price -= (price * item.pricing.discount.value) / 100;
      }

      price = Math.max(price, 0);
      break;

    case "DYNAMIC":
      if (!Array.isArray(item.pricing.time_windows)) {
        throw new Error("Dynamic pricing requires time_windows");
      }

      if (!time) {
        throw new Error("Time is required for dynamic pricing");
      }

      const window = item.pricing.time_windows.find(
        (w) => time >= w.from && time <= w.to
      );

      if (!window) {
        throw new Error("Item not available at this time");
      }

      price = window.price;
      break;

    default:
      throw new Error("Unknown pricing type");
  }

  return {
    appliedRule,
    basePrice: price
  };
}

module.exports = calculatePrice;
