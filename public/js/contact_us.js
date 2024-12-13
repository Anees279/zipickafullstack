document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the submit button element
  const submitButton = document.querySelector('#contactForm button[type="submit"]');

  // Collect form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    orderNumber: document.getElementById('orderNumber').value.trim(),
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  // Disable the button and show loading text
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  // Perform a POST request to send the data to the backend
  fetch('/contact_us', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
      return response.json();
    })
    .then((data) => {
      // Show the success message
      document.getElementById('responseMessage').textContent = 'Form submitted successfully!';
      submitButton.textContent = 'Submitted Successfully';
      submitButton.classList.add('success'); // Optional: Add a success class for styling
      setTimeout(() => {
        submitButton.textContent = 'Submit';
        submitButton.disabled = false; // Re-enable the button
        submitButton.classList.remove('success'); // Remove the success class
      }, 10000); // Optional: Reset the button text after 10 seconds
    })
    .catch((error) => {
      // Show the error message
      document.getElementById('responseMessage').textContent = 'Error: ' + error.message;
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    })
    .finally(() => {
      document.getElementById('contactForm').reset(); // Reset the form
    });
});
