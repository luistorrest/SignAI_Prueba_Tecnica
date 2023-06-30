// Get elements
const fileInput = document.getElementById('csv-file');
const uploadForm = document.getElementById('upload-form');

// Add upload event
uploadForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get file
  const file = fileInput.files[0];

  // Create a new FileReader object
  const reader = new FileReader();

  // Set the onload function - this will be called once the file is fully loaded
  reader.onload = function(e) {
    // Get the contents of the file
    const contents = e.target.result;

    // Split the contents into lines
    const lines = contents.split('\n');

    // For each line, split the line into fields and validate and store the data
    for (let i = 0; i < lines.length; i++) {
      const fields = lines[i].split(',');

      // Validate the data
      if (fields.length !== 2 || isNaN(fields[1])) {
        console.log(`Invalid data on line ${i + 1}`);
        continue;
      }

      // Store the data
      const docData = {
        field1: fields[0],
        field2: Number(fields[1])
      };
      firebase.firestore().collection('data').add(docData)
        .then(docRef => {
          console.log(`Document written with ID: ${docRef.id}`);
        })
        .catch(error => {
          console.error(`Error adding document: ${error}`);
        });
    }
  };

  // Read the file as text
  reader.readAsText(file);
});
