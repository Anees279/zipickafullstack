// images on top
document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".gallery-thumbnail");
  const mainImage = document.getElementById("main-image");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Apply the zoom-out and slide-from-bottom effect
      mainImage.style.transform = "scale(0.8) translateY(20px)"; // Zoom out and slide up

      // Reset the main image src to the clicked thumbnail
      setTimeout(() => {
        mainImage.src = thumbnail.src; // Change the image after the effect
      }, 300); // Wait for the animation to complete before changing the image

      // Add active thumbnail styling
      thumbnails.forEach((thumb) => thumb.classList.remove("active-thumbnail"));
      thumbnail.classList.add("active-thumbnail");

      // Trigger the reverse transition (zoom and slide-in)
      setTimeout(() => {
        mainImage.style.transform = "scale(1) translateY(0)"; // Zoom-in and reset position
      }, 300); // Wait for image to change before applying reverse transition
    });
  });

  // Set the main image's src to the first thumbnail's src on page load
  if (thumbnails.length > 0) {
    mainImage.src = thumbnails[0].src;
  }
});

// Cart data
const cartItems = [
  { name: 'Thinking, Fast and Slow', author: 'ANEES MIR', price: 9.99, format: 'Digital', quantity: 1, img: './g7.jpg' },
  { name: 'Homo Deus: A Brief History of Tomorrow', author: 'Yuval Noah Harari', price: 13.50, format: 'Paperback', quantity: 1, img: './g11.jpg' },
  { name: 'Thinking, Fast and Slow', author: 'ANEES MIR', price: 9.99, format: 'Digital', quantity: 1, img: './g5.jpg' },

];

// Populate cart items
function updateCart() {
  let cartTable = document.getElementById('cart-items');
  cartTable.innerHTML = '';
  cartItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">
        <div class="d-flex align-items-center">
          <img src="${item.img}" class="img-fluid rounded-3" style="width: 120px;" alt="Book">
          <div class="flex-column ms-4">
            <p class="mb-2">${item.name}</p>
            <p class="mb-0">${item.author}</p>
          </div>
        </div>
      </th>
      <td class="align-middle">
        <p class="mb-0" style="font-weight: 500;">${item.format}</p>
      </td>
      <td class="align-middle">
        <div class="d-flex flex-row">
          <button class="btn  px-2" onclick="changeQuantity(${index}, -1)">
            <i class="fas fa-minus"></i>
          </button>
          <input type="number" value="${item.quantity}" min="0" class="form-control form-control-sm" style="width: 50px;" disabled />
          <button class="btn " onclick="changeQuantity(${index}, 1)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </td>
      <td class="align-middle">
        <p class="mb-0" style="font-weight: 500;">$${(item.price * item.quantity).toFixed(2)}</p>
      </td>
    `;
    cartTable.appendChild(row);
  });
  updatePrice();
}

// Update price (subtotal, shipping, total)
function updatePrice() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 2.99;
  const total = subtotal + shipping;
  document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping').innerText = `$${shipping.toFixed(2)}`;
  document.getElementById('total').innerText = `$${total.toFixed(2)}`;
  document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

// Handle quantity change
function changeQuantity(index, delta) {
  cartItems[index].quantity += delta;
  if (cartItems[index].quantity < 0) cartItems[index].quantity = 0;
  updateCart();
}


// Checkout validation and OTP
document.getElementById('checkout-btn').addEventListener('click', () => {
  const cardName = document.getElementById('card-name').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;

  // Simple validation
  if (!cardName || !cardNumber || !expiryDate || !cvv) {
    alert("Please fill all required fields.");
    return;
  }

  // Open OTP modal
  const otpModal = new bootstrap.Modal(document.getElementById('otp-modal'));
  otpModal.show();
});

// Handle OTP submission
document.getElementById('otp-submit-btn').addEventListener('click', () => {
  const otp = document.getElementById('otp-input').value;
  if (!otp) {
    alert("Please enter OTP.");
    return;
  }

  // Successful purchase message
  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.innerText = "Successful Purchase!";
  setTimeout(() => {
    checkoutButton.innerText = "Checkout";
  }, 20000); // 20 seconds
});

// Initialize cart
updateCart();
function validateCardName() {
  const cardName = document.getElementById('card-name');
  const value = cardName.value;

  // Regular expression to allow only alphabets (spaces are allowed for full names)
  const regex = /^[A-Za-z\s]+$/;

  if (!regex.test(value)) {
    // If the input does not match the regex, remove the non-alphabet characters
    cardName.value = value.replace(/[^A-Za-z\s]/g, '');
  }
}
function validateCardNumber() {
  const cardNumber = document.getElementById('card-number');
  let value = cardNumber.value;

  // Replace any non-digit character with empty string (i.e., remove it)
  value = value.replace(/\D/g, '');

  // If the length exceeds 16, truncate it to 16 characters
  if (value.length > 16) {
    value = value.slice(0, 16);
  }

  // Update the input field value
  cardNumber.value = value;
}
function validateExpiryDate() {
  const expiryDate = document.getElementById('expiry-date');
  let value = expiryDate.value;

  // Allow only numeric digits and restrict input to 5 characters (MM/YY)
  value = value.replace(/\D/g, '');

  // Format the value as MM/YY
  if (value.length >= 3) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add slash after the first two digits
  }

  // Update the input field value with the formatted value
  expiryDate.value = value;

  // Ensure the input length does not exceed 5 characters (MM/YY)
  if (value.length > 5) {
    expiryDate.value = value.slice(0, 5);
  }
}
document.getElementById('cvv').addEventListener('input', function(event) {
  let inputValue = event.target.value;

  // Remove non-digit characters
  inputValue = inputValue.replace(/\D/g, '');

  // If more than 3 digits are entered, limit to the first 3 digits
  if (inputValue.length > 3) {
    inputValue = inputValue.slice(0, 3);
  }

  // Update the input field with the valid value
  event.target.value = inputValue;
});

// feedback
const feedbackForm = document.getElementById('feedback-form');
const feedbackContainer = document.getElementById('feedback-container');
const averageRatingElement = document.getElementById('average-rating');
const feedbackCountElement = document.getElementById('feedback-count'); // Static feedback count
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const feedbackText = document.getElementById('feedback');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
let feedbackList = [];
let ratingsList = []; // Separate ratings list
let totalFeedbackCount = 0; // Static feedback count

// Load feedback, ratings, and count from localStorage on page load
window.onload = function () {
  const storedFeedback = localStorage.getItem('feedbackList');
  const storedRatings = localStorage.getItem('ratingsList');
  const storedCount = localStorage.getItem('totalFeedbackCount');

  if (storedFeedback) {
    feedbackList = JSON.parse(storedFeedback);
  }
  if (storedRatings) {
    ratingsList = JSON.parse(storedRatings);
  }
  if (storedCount) {
    totalFeedbackCount = parseInt(storedCount);
  }

  displayFeedback();
  updateAverageRating();
  updateFeedbackCount();
};

// Validate Gmail format using a regex
function isValidGmail(email) {
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailPattern.test(email);
}

// Handle form submission
feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const rating = document.querySelector('input[name="rating"]:checked') ? parseInt(document.querySelector('input[name="rating"]:checked').value) : 0;
  const feedback = feedbackText.value.trim();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (feedback === '' || name === '' || email === '') {
    alert('Please fill out all fields!');
    return;
  }

  if (!isValidGmail(email)) {
    alert('Please enter a valid Gmail address!');
    return;
  }

  if (feedbackList.some(feedback => feedback.email === email)) {
    alert('You have already submitted feedback with this email.');
    return;
  }

  const newFeedback = {
    id: Date.now(),
    name: name,
    email: email,
    rating: rating, // Include rating, even if it's 0
    text: feedback
  };

  // Add the new feedback to the start of the list
  feedbackList.unshift(newFeedback);

  // Only add rating if greater than 0
  if (rating > 0) {
    ratingsList.push(rating);
  }

  // Increment the static feedback count
  totalFeedbackCount++;

  // Limit to 5 feedback items
  if (feedbackList.length > 5) {
    feedbackList.pop(); // Remove the oldest feedback (last one)
  }

  saveFeedback(); // Save feedback, ratings, and count to localStorage
  feedbackForm.reset();
  displayFeedback();
  updateAverageRating();
  updateFeedbackCount(); // Update the static count display
});

// Save feedback, ratings, and count to localStorage
function saveFeedback() {
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  localStorage.setItem('ratingsList', JSON.stringify(ratingsList));
  localStorage.setItem('totalFeedbackCount', totalFeedbackCount); // Save static feedback count
}

// Update the average rating only based on ratingsList
function updateAverageRating() {
  const totalRatings = ratingsList.reduce((sum, rating) => sum + rating, 0);
  const averageRating = ratingsList.length > 0 ? (totalRatings / ratingsList.length).toFixed(1) : 0;

  // Display the average rating with stars
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<i class="fa fa-star${i < Math.round(averageRating) ? '' : '-o'}"></i>`;
  }
  averageRatingElement.innerHTML = `(${averageRating})⭐`;
}

// Update the static feedback count display
function updateFeedbackCount() {
  feedbackCountElement.textContent = `(${totalFeedbackCount})`;
}

// Display feedback items
function displayFeedback() {
  feedbackContainer.innerHTML = '';

  feedbackList.forEach((item) => {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('class="fg','col-12', 'col-md-6', 'col-lg-4', 'mb-2', 'feedback-item',);

    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += `<i class="fa fa-star${i < item.rating ? '' : '-o'}"></i>`;
    }

    const truncatedFeedback = truncateText(item.text, 300);

    feedbackDiv.innerHTML = `
      <div class="feedback-item-content">
        <p><strong>${item.name}</strong> (${item.email})</p>
        <p>${truncatedFeedback}</p>
        <div>${stars}</div>
        <span class="remove-feedback" onclick="removeFeedback(${item.id})">X</span>
      </div>
    `;
    feedbackContainer.appendChild(feedbackDiv);
  });
}

// Function to limit feedback text to 300 words
function truncateText(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

// Remove feedback
function removeFeedback(id) {
  // Find the feedback item being removed
  const feedbackToRemove = feedbackList.find(feedback => feedback.id === id);

  // Remove feedback from the list
  feedbackList = feedbackList.filter(feedback => feedback.id !== id);

  // If feedback had a rating, remove it from ratingsList
  if (feedbackToRemove && feedbackToRemove.rating > 0) {
    const index = ratingsList.indexOf(feedbackToRemove.rating);
    if (index !== -1) {
      ratingsList.splice(index, 1); // Remove only the first occurrence
    }
  }

  saveFeedback(); // Save updated lists to localStorage
  displayFeedback(); // Re-render the feedback list
  updateAverageRating(); // Recalculate average rating
}
