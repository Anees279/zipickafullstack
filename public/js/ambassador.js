
document.getElementById('dealershipForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      messageInterest: document.querySelectorAll('#message')[0].value,
      messagePromotion: document.querySelectorAll('#message')[1].value,
      socialMedia: document.getElementById('phone').value,
  };

  // Validation
  if (!formData.name || !formData.email || !formData.messageInterest || !formData.messagePromotion) {
      alert('Please fill in all required fields.');
      return;
  }
  const submitButton = document.getElementById('checkout-bt');

submitButton.innerText = 'Submitting...'; // Set button text during submission
submitButton.disabled = true; // Disable the button to prevent multiple submissions

  try {
      // Send data to the backend
      const response = await fetch('/ambassador', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      // Handle server response
      const data = await response.json();

      if (response.ok) {
        submitButton.innerText = 'Submitted Successfully!'; // Update button text upon success
        submitButton.classList.add('btn-success');
          // Optionally, clear the form
          document.getElementById('dealershipForm').reset();
      } else {
          alert(`Error: ${data.message || 'An error occurred while submitting the form.'}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit your application. Please try again later.');
  }
});

// Populate the countryCode dropdown with social media options
const countryCodeSelect = document.getElementById('countryCode');
const socialMediaPlatforms = [
  { name: 'Instagram', link: 'https://www.instagram.com/' },
  { name: 'Facebook', link: 'https://www.facebook.com/' },
  { name: 'Twitter', link: 'https://www.twitter.com/' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/' },
  { name: 'YouTube', link: 'https://www.youtube.com/' },
];

socialMediaPlatforms.forEach((platform) => {
  const option = document.createElement('option');
  option.value = platform.link;
  option.textContent = platform.name;
  countryCodeSelect.appendChild(option);
});
