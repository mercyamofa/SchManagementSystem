// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");

  // Input fields
  const studentName = document.getElementById("studentName");
  const gender = document.getElementById("gender");
  const studentClass = document.getElementById("class");
  const dob = document.getElementById("dob");
  const religion = document.getElementById("religion");
  const enrollmentDate = document.getElementById("enrollmentDate");
  const fatherName = document.getElementById("fatherName");
  const motherName = document.getElementById("motherName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const occupation = document.getElementById("occupation");
  const address = document.getElementById("address");

  const fileUpload = document.querySelector(".file-upload input");

  // Real-time validation feedback
  const validateField = (field, errorMessage) => {
    const parentRow = field.parentElement;
    let error = parentRow.querySelector(".error-message");

    // Remove existing error message
    if (error) {
      error.remove();
    }

    // Check if field is invalid
    if (!field.value.trim()) {
      error = document.createElement("span");
      error.className = "error-message";
      error.textContent = errorMessage;
      error.style.color = "red";
      parentRow.appendChild(error);
      return false;
    }
    return true;
  };

  // Validate email format
  const validateEmail = (emailField) => {
    const parentRow = emailField.parentElement;
    let error = parentRow.querySelector(".error-message");

    // Remove existing error message
    if (error) {
      error.remove();
    }

    // Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
      error = document.createElement("span");
      error.className = "error-message";
      error.textContent = "Please enter a valid email address.";
      error.style.color = "red";
      parentRow.appendChild(error);
      return false;
    }
    return true;
  };

  // Validate phone format
  const validatePhone = (phoneField) => {
    const parentRow = phoneField.parentElement;
    let error = parentRow.querySelector(".error-message");

    // Remove existing error message
    if (error) {
      error.remove();
    }

    // Check if the phone number format is valid
    const phoneRegex = /^[0-9]{10}$/; // Adjust as per your requirements
    if (phoneField.value && !phoneRegex.test(phoneField.value)) {
      error = document.createElement("span");
      error.className = "error-message";
      error.textContent = "Please enter a valid 10-digit phone number.";
      error.style.color = "red";
      parentRow.appendChild(error);
      return false;
    }
    return true;
  };

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from submitting

    let isFormValid = true;

    // Validate all required fields
    isFormValid &= validateField(studentName, "Student name is required.");
    isFormValid &= validateField(gender, "Gender is required.");
    isFormValid &= validateField(studentClass, "Class is required.");
    isFormValid &= validateField(dob, "Date of birth is required.");
    isFormValid &= validateField(religion, "Religion is required.");
    isFormValid &= validateField(
      enrollmentDate,
      "Enrollment date is required."
    );
    isFormValid &= validateField(address, "Address is required.");
    isFormValid &= validateField(fileUpload, "Student photo is required.");

    // Validate email and phone separately
    isFormValid &= validateEmail(email);
    isFormValid &= validatePhone(phone);

    // If the form is valid, log the data and show success message
    if (isFormValid) {
      const formData = {
        studentName: studentName.value.trim(),
        gender: gender.value.trim(),
        class: studentClass.value.trim(),
        dob: dob.value.trim(),
        religion: religion.value.trim(),
        enrollmentDate: enrollmentDate.value.trim(),
        fatherName: fatherName.value.trim(),
        motherName: motherName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        occupation: occupation.value.trim(),
        address: address.value.trim(),
        photo: fileUpload.files[0]?.name || "No file uploaded",
      };

      console.log("Form Data Collected: ", formData);

      alert("Form submitted successfully!"); // Success feedback
      form.reset(); // Reset form fields
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  });

  // Real-time validation listeners for key fields
  studentName.addEventListener("blur", () =>
    validateField(studentName, "Student name is required.")
  );
  gender.addEventListener("blur", () =>
    validateField(gender, "Gender is required.")
  );
  studentClass.addEventListener("blur", () =>
    validateField(studentClass, "Class is required.")
  );
  dob.addEventListener("blur", () =>
    validateField(dob, "Date of birth is required.")
  );
  religion.addEventListener("blur", () =>
    validateField(religion, "Religion is required.")
  );
  enrollmentDate.addEventListener("blur", () =>
    validateField(enrollmentDate, "Enrollment date is required.")
  );
  address.addEventListener("blur", () =>
    validateField(address, "Address is required.")
  );
  email.addEventListener("blur", () => validateEmail(email));
  phone.addEventListener("blur", () => validatePhone(phone));
});
