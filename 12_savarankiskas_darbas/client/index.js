fetch('http://localhost:3000/memberships')
  .then((resp) => resp.json())
  .then((data) => {
    const container = document.querySelector('.container');

    data.forEach((memb) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h = document.createElement('h2');
      const p = document.createElement('p');
      h.textContent = `$ ${memb.price} ${memb.name}`;
      p.textContent = `${memb.description}`;
      const hr = document.createElement('hr');
      const div = document.createElement('div');
      const btn = document.createElement('button');
      const img = document.createElement('img');
      img.setAttribute('src', 'trash.png');
      btn.append(img);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/memberships/${memb._id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              location.reload();
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
      div.append(btn);
      div.setAttribute('id', 'del');
      card.append(h, p, hr, div);
      container.append(card);
    });
  });
