document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const pas = document.querySelector('#pas').value;
    let checkPas = document.querySelector('#checkPas');
    let emailExists = document.querySelector('#emailExists');
    checkPas.textContent = "";
    emailExists.textContent = "";

    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(response => {
        const table = document.querySelector('tbody');
        response.forEach((user) => {
            if (email === user.email) {
                if (pas === user.pas) {
                    window.open("index.html", "_blank");
                } else {
                    checkPas.textContent = "Wrong password";
                }
            } else {
                emailExists.textContent = "This email NOT exist"
            }
        });
    })


})