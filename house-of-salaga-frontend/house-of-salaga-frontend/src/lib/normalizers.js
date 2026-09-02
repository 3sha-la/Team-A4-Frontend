export function productStatus(stock) {
  const value = Number(stock) || 0;
  if (value <= 0) return 'OUT OF STOCK';
  if (value <= 5) return 'LOW STOCK';
  return 'IN STOCK';
}

export function normalizeProduct(product = {}) {
  const id = product._id || product.id || '';
  const image = product.image || product.img || '';
  const price = Number(product.price) || 0;
  const stock = Number(product.stock) || 0;

  return {
    ...product,
    id,
    _id: product._id || id,
    code: product.code || product.sku || '',
    sku: product.code || product.sku || '',
    name: product.name || '',
    category: product.category || '',
    description: product.description || '',
    price,
    stock,
    image,
    img: image,
    swatch:
      product.swatch ||
      (image
        ? `url("${image}")`
        : 'linear-gradient(135deg, #efe6d6, #c9a227)'),
    status: product.status || productStatus(stock),
  };
}

export function normalizeWishlistItem(item = {}) {
  const populated = item.product && typeof item.product === 'object' ? item.product : null;
  return normalizeProduct({
    ...(populated || {}),
    _id: populated?._id || item.product,
    name: populated?.name || item.name,
    image: populated?.image || item.image,
    price: populated?.price ?? item.price,
  });
}

export function normalizeCartItem(item = {}) {
  const populated = item.product && typeof item.product === 'object' ? item.product : null;
  return {
    id: populated?._id || item.product,
    productId: populated?._id || item.product,
    name: populated?.name || item.name || '',
    qty: Number(item.quantity) || 1,
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || Number(populated?.price) || 0,
    img: populated?.image || item.image || '',
    image: populated?.image || item.image || '',
    stock: Number(populated?.stock) || 0,
    itemTotal: Number(item.itemTotal) || 0,
  };
}

export function splitName(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' '),
  };
}
