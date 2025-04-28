document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.database();
    const list = document.getElementById('list');

    db.ref('pledges').once('value')
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              const pledge = childSnapshot.val();
              const listItem = document.createElement('li');
              listItem.textContent = `Name: ${pledge.fname}. Reason for taking the pledge: ${pledge.reason}`;
              list.appendChild(listItem);
          });
      })
      .catch(function(error) {
          console.error('Error loading pledges:', error);
      });
});
