fetch("http://localhost:3000/")
    .then(resp => resp.json())
    .then(response => {
        const nameList = document.querySelector('#list');

        response.forEach((name) => {
            const h3 = document.createElement('h3');
            h3.textContent = name;
            nameList.append(h3);
          });


    })


document.querySelector('#btnAddName').addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    console.log(name);

    fetch('http://localhost:3000/cars', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ name }) 
    })
    .then(() => {
        location.reload()
    });
});