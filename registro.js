// Get elements
const txtUsername = document.getElementById('signup-username');
const txtEmail = document.getElementById('signup-email');
const txtPassword = document.getElementById('signup-password');
const btnSignUp = document.getElementById('signup-button');

// Add signup event
btnSignUp.addEventListener('click', e => {
  // Get email, password, and username
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const username = txtUsername.value;
  const auth = firebase.auth();

  // Sign up
  const promise = auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => {
      return firebase.firestore().collection('users').doc(cred.user.uid).set({
        username: username
      });
    });
  promise.catch(e => console.log(e.message));
});
