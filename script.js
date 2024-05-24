document.getElementById("myForm").addEventListener('submit', function(e) {
  e.preventDefault();

  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let otherNames = document.getElementById('otherNames').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let gender = document.getElementById('gender').value;

  let errorMessages = [];

  if (firstName.length < 1 || lastName.length < 1) {
    errorMessages.push("First name and last name are required.");
  }

  if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    errorMessages.push("First name and last name cannot contain numbers.");
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMessages.push("Email address is not valid.");
  }

  if (phone.length !== 11) {
    errorMessages.push("Phone number must be 11 characters.");
  }

  if (gender === "") {
    errorMessages.push("Gender is required.");
  }

  if (errorMessages.length > 0) {
    document.getElementById('errorMessages').innerHTML = "<ul><li>" + errorMessages.join("</li><li>") + "</li></ul>";
  } else {
    let formData = {
      firstName: firstName,
      lastName: lastName,
      otherNames: otherNames,
      email: email,
      phone: phone,
      gender: gender
    };

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.ok) {
        alert('Form submitted successfully!');
        document.getElementById('myForm').reset();
        document.getElementById('errorMessages').innerHTML = "";
      } else {
        throw new Error('Failed to submit form.');
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }
});
