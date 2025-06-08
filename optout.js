function optoutformhandler() {
    var fname2 = document.getElementById("fname2").value;

    var optout = {
        fname2: fname2,
    };

    // Save to Firebase Realtime Database
    firebase.database().ref('removals').push(optout)
      .then(function() {
          alert('Your name should be removed by 7 days. ');
          document.getElementById("form").reset();
      })
      .catch(function(error) {
          console.error('Error saving removal:', error);
          alert('Oops! Something went wrong.');
      });
}
