export async function getBusinessBySlug(slug: string) {
  const res = await fetch(`/api/businesses?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Error fetching business');
  return res.json();
}

export async function getProducts(businessId: string) {
  const res = await fetch(`/api/products?business_id=${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Error fetching product');
  return res.json();
}

export async function getCategories(businessId: string) {
  const res = await fetch(`/api/categories?business_id=${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('Error fetching categories');
  return res.json();
}

export async function getCategory(id: string) {
  const res = await fetch(`/api/categories/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Error fetching category');
  return res.json();
}

export async function createCategory(categoryData: any) {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error creating category');
  return res.json();
}

export async function updateCategory(id: string, categoryData: any) {
  const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error('Error updating category');
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting category');
}

export async function uploadProductImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', 'products');

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error uploading image');
  const data = await res.json();
  return data.url;
}

export async function createProduct(productData: any) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error creating product');
  return res.json();
}

export async function updateProduct(id: string, productData: any) {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error updating product');
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting product');
}

export async function getPaymentMethods(businessId: string) {
  const res = await fetch(`/api/payment-methods?business_id=${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('Error fetching payment methods');
  return res.json();
}

export async function createPaymentMethod(data: any) {
  const res = await fetch('/api/payment-methods', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating payment method');
  return res.json();
}

export async function updatePaymentMethod(id: string, data: any) {
  const res = await fetch(`/api/payment-methods/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating payment method');
  return res.json();
}

export async function deletePaymentMethod(id: string) {
  const res = await fetch(`/api/payment-methods/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting payment method');
}

export async function getStores(businessId: string) {
  const res = await fetch(`/api/stores?business_id=${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('Error fetching stores');
  return res.json();
}

export async function createStore(data: any) {
  const res = await fetch('/api/stores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating store');
  return res.json();
}

export async function updateStore(id: string, data: any) {
  const res = await fetch(`/api/stores/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating store');
  return res.json();
}

export async function deleteStore(id: string) {
  const res = await fetch(`/api/stores/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting store');
}
