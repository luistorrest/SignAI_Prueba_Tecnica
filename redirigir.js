// Get elements
const txtLoginUsername = document.getElementById('login-username');
const txtLoginPassword = document.getElementById('login-password');
const btnLogIn = document.getElementById('login-button');

// Add login event
btnLogIn.addEventListener('click', e => {
  // Get username and password
  const username = txtLoginUsername.value;
  const pass = txtLoginPassword.value;
  const auth = firebase.auth();

  // Find the user document
  firebase.firestore().collection('users').where('username', '==', username).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        // Get the email of the user
        const email = doc.data().email;

        // Log in
        auth.signInWithEmailAndPassword(email, pass)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Redirect to the main page
            window.location = "main.html";
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});
