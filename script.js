document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const currentPath = window.location.pathname.split('/').pop();

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Update active state
  document.querySelectorAll('.nav-links a').forEach(link => {
    if(link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Close menu on click outside (mobile)
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.nav-container') && window.innerWidth <= 768) {
      navLinks.classList.remove('active');
    }
  });
});

function selectCar(carModel) {
    // Store selected car in localStorage
    localStorage.setItem('selectedCar', carModel);
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
    
    // Or show confirmation message
    // alert(`You've selected ${carModel}. Redirecting to checkout...`);
}

// Checkout Page Script
document.addEventListener('DOMContentLoaded', () => {
    const selectedCar = localStorage.getItem('selectedCar');
    if(selectedCar) {
        document.getElementById('selected-car-model').textContent = `Selected Car: ${selectedCar}`;
    }

    const form = document.getElementById('booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const pickupDate = document.getElementById('pickup-date').value;
        const pickupTime = document.getElementById('pickup-time').value;
        const returnDate = document.getElementById('return-date').value;
        const returnTime = document.getElementById('return-time').value;
        const specialRequests = document.getElementById('special-requests').value;

        // Basic validation
        if(!pickupDate || !pickupTime || !returnDate || !returnTime) {
            alert('Please fill in all required fields!');
            return;
        }

        // Create WhatsApp message
        const message = `*New Car Booking Request*%0A%0A
        🚗 *Car Selected:* ${selectedCar}%0A
        📅 *Pickup Date:* ${pickupDate}%0A
        ⏰ *Pickup Time:* ${pickupTime}%0A
        📅 *Return Date:* ${returnDate}%0A
        ⏰ *Return Time:* ${returnTime}%0A
        💬 *Special Requests:* ${specialRequests || 'None'}`;

        // Replace with your WhatsApp number (remove spaces and country code)
        const phoneNumber = '601139101169'; // Example: 60 11-3910 1169 becomes 601139101169
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
        
        // Clear storage
        localStorage.removeItem('selectedCar');
    });
});