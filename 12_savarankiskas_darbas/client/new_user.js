function generateRandomIP() {
  let ip = [];
  for (let i = 0; i < 4; i++) {
    ip.push(Math.floor(Math.random() * 256));
  }
  return ip.join('.');
}

document.querySelector('#btn').addEventListener('click', (e) => {
  e.preventDefault();
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const select = document.querySelector('#select').value;
  const ip = generateRandomIP();
  const err = document.querySelector('#error');
  if (firstName === '') {
    err.textContent = 'Enter the first name';
  } else if (lastName === '') {
    err.textContent = 'Enter the last name';
  } else if (email === '') {
    err.textContent = 'Enter email address';
  } else {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        service_id: select,
        ip,
      }),
    }).then(() => {
      err.textContent = 'Membership added successfully, loading...';
      setTimeout(() => {
        window.location.href = 'users.html';
      }, 2000);
    });
  }
});

fetch('http://localhost:3000/memberships')
  .then((resp) => resp.json())
  .then((data) => {
    const select = document.querySelector('#select');

    data.forEach((memb) => {
      const option = document.createElement('option');
      option.setAttribute('value', memb._id);
      const optionText = document.createTextNode(memb.name);
      option.appendChild(optionText);
      select.appendChild(option);
    });
  });

document.querySelector('#aUser').style.color = 'rgb(155, 155, 160)';
document.querySelector('#aMemb').style.color = 'blue';
