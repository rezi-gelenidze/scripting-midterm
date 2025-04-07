// Utility function for form validation error display
const showError = (input, message, withIcon = false) => {
    const error = document.createElement("div");
    error.className = "error";

    if (withIcon) {
        error.innerHTML = `
            <img src="img/error-triangle.png" alt="Warning" class="error-icon">
            <span>${message}</span>
        `;
    } else {
        error.textContent = message;
    }

    input.parentElement.appendChild(error);
};


// field name mapping
const fields = [
    { id: "fname", name: "First name" },
    { id: "lname", name: "Last name" },
    { id: "email", name: "Email" },
    { id: "password", name: "Password" }
];

// Form submission event listener
document.getElementById("group-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Clear prev errors
    document.querySelectorAll(".error")
        .forEach(el => el.remove());


    // Validity flag
    let isValid = true;

    // Empty Field Check
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) {
            showError(input, `${field.name} is required`);
            input.classList.add("error-input");
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value)) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Password length check
    const password = document.getElementById("password");
    if (password.value.trim() && password.value.length < 8) {
        showError(password, "Password must be at least 8 characters long");
        isValid = false;
    }

    // Technologies checkbox group (min 3)
    const checkedCount = Array
        .from(document.querySelectorAll('.checkbox-group input[type="checkbox"]'))
        .filter(cb => cb.checked).length;
    if (checkedCount < 3) {
        showError(document.querySelector('.checkbox-group'), "Choose at least 3 technologies", true);
        isValid = false;
    }

    if (isValid) {
        // if valid, hide form and show game div
        document.getElementById("form-wrapper").style.display = "none";
        document.getElementById("game-wrapper").style.display = "block";
    }
});