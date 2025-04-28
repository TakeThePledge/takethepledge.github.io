function formhandler() {
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var reason = document.getElementById("reason").value;

    var pledge = {
        fname: fname,
        email: email,
        reason: reason
    };

    // Save to Firebase Realtime Database
    firebase.database().ref('pledges').push(pledge)
      .then(function() {
          alert('Thank you for taking the pledge!');
          document.getElementById("form").reset();
      })
      .catch(function(error) {
          console.error('Error saving pledge:', error);
          alert('Oops! Something went wrong.');
      });
}
