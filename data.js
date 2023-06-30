// Get element
const dataContainer = document.getElementById('data-container');

// Get data from Firestore
firebase.firestore().collection('data').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      // Create a new div for the document
      const docDiv = document.createElement('div');
      docDiv.textContent = `Field1: ${doc.data().field1}, Field2: ${doc.data().field2}`;
      docDiv.id = doc.id;

      // Create an edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', e => {
        // Edit the document
        const newField1 = prompt('Enter new field1:');
        const newField2 = prompt('Enter new field2:');
        firebase.firestore().collection('data').doc(doc.id).update({
          field1: newField1,
          field2: Number(newField2)
        })
        .then(() => {
          console.log("Document successfully updated!");
          // Update the div
          docDiv.textContent = `Field1: ${newField1}, Field2: ${newField2}`;
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
      });

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', e => {
        // Delete the document
        firebase.firestore().collection('data').doc(doc.id).delete()
        .then(() => {
          console.log("Document successfully deleted!");
          // Remove the div
          docDiv.remove();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      });

      // Add the buttons to the div
      docDiv.appendChild(editButton);
      docDiv.appendChild(deleteButton);

      // Add the div to the data container
      dataContainer.appendChild(docDiv);
    });
  })
  .catch(error => {
    console.log("Error getting documents: ", error);
  });
