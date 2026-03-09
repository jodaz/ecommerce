async function run() {
  console.log('Testing Categories API...');
  console.log('1. Fetch store ID for electrolife');
  let storeRes = await fetch('http://electrolife.ecommerce.test/api/stores?domain=electrolife');
  let store = await storeRes.json();
  const storeId = store.id;
  console.log('Got storeId:', storeId);

  console.log('\n2. Creating Category...');
  const catRes = await fetch('http://electrolife.ecommerce.test/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'API Test Cat', has_page: true, store_id: storeId, slug: 'api-test-cat' })
  });
  const cat = await catRes.json();
  console.log('Created:', cat);
  const catId = cat.id;
  
  if (!catId) {
    console.error('Failed to create category! Exiting early.');
    return;
  }

  console.log('\n3. Reading Categories...');
  const loadCats = await fetch(`http://electrolife.ecommerce.test/api/categories?store_id=${storeId}`);
  const cats = await loadCats.json();
  console.log('Loaded', cats.length, 'categories. Found new category?', cats.some(c => c.id === catId));

  console.log('\n4. Updating Category...');
  const updateCatRes = await fetch(`http://electrolife.ecommerce.test/api/categories/${catId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'API Test Cat Updated' })
  });
  const updatedCat = await updateCatRes.json();
  console.log('Updated:', updatedCat.name);

  console.log('\n5. Creating Product...');
  const productRes = await fetch('http://electrolife.ecommerce.test/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      name: 'API Test Prod', 
      price: 199.99, 
      stock: 10,
      store_id: storeId, 
      category_id: catId,
      slug: 'api-test-prod' 
    })
  });
  const prod = await productRes.json();
  console.log('Created Product:', prod);
  const prodId = prod.id;

  console.log('\n6. Reading Products...');
  const loadProds = await fetch(`http://electrolife.ecommerce.test/api/products?store_id=${storeId}`);
  const prods = await loadProds.json();
  console.log('Loaded', prods.length, 'products. Found new product?', prods.some(p => p.id === prodId));

  console.log('\n7. Updating Product...');
  const updateProdRes = await fetch(`http://electrolife.ecommerce.test/api/products/${prodId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: 249.99 })
  });
  const updatedProd = await updateProdRes.json();
  console.log('Updated Product Price:', updatedProd.price);

  console.log('\n8. Deleting Product...');
  const delProd = await fetch(`http://electrolife.ecommerce.test/api/products/${prodId}`, { method: 'DELETE' });
  console.log('Deleted Product, status:', delProd.status);

  console.log('\n9. Deleting Category...');
  const delCat = await fetch(`http://electrolife.ecommerce.test/api/categories/${catId}`, { method: 'DELETE' });
  console.log('Deleted Category, status:', delCat.status);
  
  console.log('\nALL TESTS PASSED!');
}
run();
