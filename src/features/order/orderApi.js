export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}
export function fetchAllOrders(sort,Pagination) {
  let queryString = '';
  for (let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in Pagination){
    queryString += `${key}=${Pagination[key]}&`
  }
  console.log("querryString is "+queryString)
  console.log("Paginationis"+Pagination);
  return new Promise(async (resolve) =>{
    console.log("queryString of orders  is "+queryString);
    const response = await fetch('http://localhost:8080/orders?'+queryString)
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    console.log("total orders are" + totalOrders);
    resolve({data:{orders:data,totalOrders:totalOrders}})
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}


