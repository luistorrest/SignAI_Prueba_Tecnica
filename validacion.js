const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.validateUser = functions.auth.user().onCreate((user) => {
  // Get the email and uid of the new user
  const email = user.email;
  const uid = user.uid;

  // Check if the email is valid
  if (!validateEmail(email)) {
    // If the email is not valid, delete the user
    return admin.auth().deleteUser(uid);
  }

  // Check if the username is empty
  return admin.firestore().collection('users').doc(uid).get()
    .then(doc => {
      const username = doc.data().username;
      if (!username) {
        // If the username is empty, delete the user
        return admin.auth().deleteUser(uid);
      }
      return null;
    });
});

function validateEmail(email) {
  // A simple regex for email validation
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
