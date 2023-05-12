document.querySelector('#btn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const err = document.querySelector('#error');
  if (name === '') {
    err.textContent = 'Enter the membership name';
  } else if (price === '') {
    err.textContent = 'Enter the membership price';
  } else if (description === '') {
    err.textContent = 'Enter the membership description';
  } else {
    fetch('http://localhost:3000/memberships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description }),
    }).then(() => {
      err.textContent = 'Membership added successfully, loading...';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
  }
});
