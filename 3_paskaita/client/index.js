fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(response => {
        const table = document.querySelector('tbody');
        response.forEach((user) => {
            const tr = document.createElement('tr');
            Object.values(user).forEach((value) => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.append(td);
                });
                table.append(tr);
        });
        table.append(tr);
    });
    
