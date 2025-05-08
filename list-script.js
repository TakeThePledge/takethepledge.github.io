document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.database();
    const list = document.getElementById('list');

    db.ref('pledges').once('value')
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              const pledge = childSnapshot.val();
              const listItem = document.createElement('li');
              listItem.classList.add('pledge-entry');

              const name = document.createElement('strong');
              name.textContent = `Name: ${pledge.fname}`;

              const reason = document.createElement('p');
              reason.textContent = `Reason for taking the pledge: ${pledge.reason}`;

              listItem.appendChild(name);
              listItem.appendChild(reason);
              list.appendChild(listItem);
          });
      })
      .catch(function(error) {
          console.error('Error loading pledges:', error);
      });
});
