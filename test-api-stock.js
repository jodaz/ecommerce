async function run() {
  const storeId = '22222222-2222-2222-2222-222222222222';
  const bizId = '11111111-1111-1111-1111-111111111111';
  
  console.log('\nCreating Product with stock...');
  try {
    const productRes = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Stock Test Prod ' + Date.now(),
        price: 199.99,
        stock: 42,
        business_id: bizId,
        slug: 'stock-test-prod-' + Date.now()
      })
    });
    
    const text = await productRes.text();
    console.log('Raw response:', text);
    const prod = JSON.parse(text);
    console.log('Created Product ID:', prod.id);
    
    if (prod.id) {
        console.log('\nReading Products...');
        const loadProds = await fetch(`http://localhost:3000/api/products?business_id=${bizId}`);
        const prods = await loadProds.json();
        const p = prods.find(p => p.id === prod.id);
        console.log('Found product:', p?.name, 'stock:', p?.stock);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
