fetch('http://localhost:3000/users')
  .then((resp) => resp.json())
  .then((data) => {
    const main = document.querySelector('#main');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    main.append(container);
    data.forEach((user) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const hName = document.createElement('h2');
      const pEmail = document.createElement('p');
      const pMembership = document.createElement('p');
      const pIp = document.createElement('p');
      hName.textContent = `${user.first_name} ${user.last_name}`;
      pEmail.textContent = `Email Address: ${user.email}`;
      pMembership.textContent = `Membership: ${user.membership.name}`;
      pIp.textContent = `ip: ${user.ip}`;
      card.append(hName, pEmail, pMembership, pIp);
      container.append(card);
    });
  });

let toggle = 'desc';

document.querySelector('#btnSort').addEventListener('click', () => {
  toggle = toggle === 'desc' ? 'asc' : 'desc'; // Toggle between 'asc' and 'desc'

  fetch(`http://localhost:3000/users/${toggle}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (document.querySelector('.container')) {
        document.querySelector('.container').remove();
      }
      const main = document.querySelector('#main');
      const container = document.createElement('div');
      container.setAttribute('class', 'container');
      main.append(container);
      data.forEach((user) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const hName = document.createElement('h2');
        const pEmail = document.createElement('p');
        const pMembership = document.createElement('p');
        const pIp = document.createElement('p');
        hName.textContent = `${user.first_name} ${user.last_name}`;
        pEmail.textContent = `Email Address: ${user.email}`;
        pMembership.textContent = `Membership: ${user.membership.name}`;
        pIp.textContent = `ip: ${user.ip}`;
        card.append(hName, pEmail, pMembership, pIp);
        container.append(card);
      });
    });
});
