fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(response => {
        const table = document.querySelector('tbody');
        response.forEach((user) => {
            const tr = document.createElement('tr');
            const pas = document.createElement('td');
            pas.textContent = user.pas;
            const pass = document.createElement('td');
            pass.textContent = user.pass;
            const email = document.createElement('td');
            email.textContent = user.email;
            const name = document.createElement('td');
            name.textContent = user.name;
            const surname = document.createElement('td');
            surname.textContent = user.surname;
            const adress = document.createElement('td');
            adress.textContent = user.adress;
            const zip = document.createElement('td');
            zip.textContent = user.zip;
            const city = document.createElement('td');
            city.textContent = user.city;
            const phone = document.createElement('td');
            phone.textContent = user.phone;
            const agree = document.createElement('td');
            agree.textContent = user.agree;
            tr.append(pas, pass, email, name, surname, adress, zip, city, phone, agree)
            table.append(tr);
          });
    })
