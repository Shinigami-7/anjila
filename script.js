// === DEMO MEDICINES ===
const medicines = [
  { name: "Paracetamol 500mg", price: 25, available: true, image: "paracetamol.webp" },
  { name: "Cough Syrup 100ml", price: 90, available: true, image: "coughSyrup.jpeg" },
  { name: "Antacid Tablets", price: 40, available: false, image: "antacids.jpeg" },
  { name: "Vitamin C Capsules", price: 120, available: true, image: "vitaminc.webp" },
  { name: "Ibuprofen 200mg", price: 55, available: true, image: "ibuprofen.jpg" },
  { name: "Amoxicillin 250mg", price: 65, available: false, image: "Amoxicillin.webp" },
  { name: "Pain Relief Balm", price: 80, available: true, image: "painReliefBalm.jpeg" }
];

// --- MEDICINE DISPLAY LOGIC ---
function displayMedicines(list) {
  const medicineList = document.getElementById("medicineList");
  if (!medicineList) return; // Exit if the element isn't found
  
  medicineList.innerHTML = list.map(med => `
    <div class="medicine-card">
      <img src="${med.image}" alt="${med.name}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:10px;">
      <h3>${med.name}</h3>
      <p>Price: <span class="price">Rs. ${med.price}</span></p>
      <p>Status: ${med.available ? '<span style="color:#00ff99">Available</span>' : '<span style="color:#ff6666">Out of Stock</span>'}</p>
      <button ${!med.available ? "disabled" : ""}>Add to Cart</button>
    </div>
  `).join("");
}

function searchMedicine() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  displayMedicines(medicines.filter(med => med.name.toLowerCase().includes(input)));
}


// --- LOGIN SYSTEM (DEMO) ---

// Get necessary element references for login/register forms
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const registerStatus = document.getElementById('registerStatus');
const registerForm = document.getElementById('registerForm');

const username = document.getElementById('username');
const password = document.getElementById('password');
const loginStatus = document.getElementById('loginStatus');

const loginLink = document.getElementById('loginLink');
const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const showLoginBtn = document.getElementById('showLoginBtn');


function registerUser(e) {
  e.preventDefault();
  const u = regUsername.value.trim(), p = regPassword.value, s = registerStatus;
  if (!u || !p) return s.textContent = 'Please enter a username and password.';
  if (localStorage.getItem('user_' + u)) return s.textContent = 'Username already exists. Choose another.';
  localStorage.setItem('user_' + u, p);
  s.textContent = 'Registration successful! You can now login.';
  registerForm.reset();
}

function loginUser(e) {
  e.preventDefault();
  const u = username.value.trim(), p = password.value, s = loginStatus;
  const stored = localStorage.getItem('user_' + u);
  s.textContent = (stored && stored === p)
    ? '✅ Login Successful! Welcome, ' + u
    : '❌ Invalid credentials or user not registered.';
}

// --- PRESCRIPTION UPLOAD ---
const prescriptionInput = document.getElementById('prescriptionInput');
const previewContainer = document.getElementById('previewContainer');

function previewPrescription() {
  const file = prescriptionInput.files[0], preview = previewContainer;
  preview.innerHTML = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = e.target.result;
      // Add styling to make the preview image look decent
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = '10px';
      img.style.marginTop = '15px';
      preview.appendChild(img);
    } else {
      preview.innerHTML = `<p>Uploaded: ${file.name}</p>`;
    }
  };
  reader.readAsDataURL(file);
}

// --- CONSULTATION ---
function bookConsultation(doctor) {
  alert('Consultation booked with ' +doctor);
}


// === INITIALIZATION & EVENT LISTENERS ===

// Wait for the entire page to load before running the main logic
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. **THE FIX**: Initialize the medicine list
    displayMedicines(medicines);

    // 2. Set up Login/Register Toggle listeners
    if (loginLink && loginBox && registerBox) {
        loginLink.addEventListener('click', e => {
            e.preventDefault();
            const c = document.querySelector('.hero-login-container');
            // Toggle visibility
            c.style.display = c.style.display === 'block' ? 'none' : 'block';
            if (c.style.display === 'block') {
              loginBox.style.display = 'block';
              registerBox.style.display = 'none';
            }
        });
    }

    if (showRegisterBtn && loginBox && registerBox) {
        showRegisterBtn.addEventListener('click', () => {
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });
    }

    if (showLoginBtn && loginBox && registerBox) {
        showLoginBtn.addEventListener('click', () => {
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        });
    }
});