fetch("http://localhost:3000/products")
    .then(resp => resp.json())
    .then(response => {
        const productList = document.querySelector('#list');

        response.forEach((product, price) => {
            const h3 = document.createElement('h3');
            h3.textContent = `Produktas: ${product.name} Kaina: ${product.price}`;
            productList.append(h3);
          });
    })


document.querySelector('#btnAddName').addEventListener("click", () => {
    const product = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    
    //console.log(product price);

    fetch('http://localhost:3000/products', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({name: product, price: price}),
    })
    .then(() => {
        location.reload()
    });
});