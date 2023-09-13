export function fetchProductsByFilters(filter,sort,Pagination,admin) {
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in Pagination){
    queryString += `${key}=${Pagination[key]}&`
  }
  if(admin){
    queryString += 'admin=true';
  }
  return new Promise(async (resolve) =>{
    const response = await fetch('/products?'+queryString)
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    console.log("total products are"+totalItems);
    resolve({data:{products:data,totalItems:totalItems}})
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/categories')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchProductsById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+id)
    const data = await response.json()
    resolve({data})
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products',{
    method : 'POST',
    body : JSON.stringify(product),
    headers:{'content-type':'application/json'}}
    )
    const data = await response.json()
    resolve({data})
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/"+product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

