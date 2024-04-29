const organizationInput = document.querySelector(".organization-input");
const organizationError = document.querySelector(".organization-error");

const phoneInput = document.querySelector(".phone-input");
const phoneError = document.querySelector(".phone-error");

const emailInput = document.querySelector(".email-input");
const emailError = document.querySelector(".email-error");

const selectField = document.querySelector(".modal__form-select");
const selectError = document.querySelector(".modal__form-select-error");

const photoInput = document.querySelector(".modal__form-photo-input");
const photoLoad = document.querySelector(".modal__form-photo-load");
const photoBox = document.querySelector(".modal__form-photo-box");
const photoRemove = document.querySelector(".modal__form-photo-remove");
const photoError = document.querySelector(".modal__form-photo-error");

const validateForm = () => {
  let isValid = true;

  if (organizationInput.value.trim().length < 2) {
    isValid = false;
    organizationInput.classList.add("invalid");
    organizationError.textContent =
      "Название организации должно содержать минимум 2 символа";
  } else {
    organizationInput.classList.remove("invalid");
    organizationError.textContent = "";
  }

  const phoneLength = phoneInput.value.length;

  if (phoneLength < 18) {
    isValid = false;
    phoneError.textContent =
      "Номер телефона должен состоять минимум из 10 цифр";
    phoneInput.classList.add("invalid");
  } else {
    phoneError.textContent = "";
    phoneInput.classList.remove("invalid");
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  if (!isValidEmail) {
    isValid = false;
    emailError.textContent = "Некорректный адрес электронной почты";
    emailInput.classList.add("invalid");
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
  }

  if (selectField.selectedIndex === 0) {
    isValid = false;
    selectField.classList.add("invalid");
    selectError.textContent = "Пожалуйста, выберите направление";
  } else {
    selectField.classList.remove("invalid");
    selectError.textContent = "";
  }

  if (!photoInput.files[0]) {
    isValid = false;
    photoError.textContent = "Необходимо приложить фото";
  } else {
    photoError.textContent = "";
  }

  if (!isValid) {
    return false;
  }
  return true;
};

const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

phoneInput.addEventListener("input", () => {
  const value = phoneInput.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (phoneInput.value.includes("+8") || phoneInput.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  phoneInput.value = result;
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    photoBox.style.background = `center / cover no-repeat url(${e.target.result})`;
    photoLoad.style.display = "none";
  };

  reader.readAsDataURL(file);
});

photoRemove.addEventListener("click", () => {
  photoBox.style.background = `center / cover no-repeat url("./assets/icons/photo.png")`;
  photoLoad.style.display = "block";
  photoInput.value = "";
  photoInput.files = null;
});

const modal = document.querySelector(".modal");
const form = document.querySelector(".modal__form");
const openButton = document.querySelector(".modal-open-button");
const submitButton = document.querySelector(".modal__button-submit");
const closeButton = document.querySelector(".modal__button-close");

const closeModal = () => {
  modal.classList.add("modal__closed");
  openButton.classList.add("modal-open-button-active");
};
const openModal = () => {
  modal.classList.remove("modal__closed");
  openButton.classList.remove("modal-open-button-active");
};

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    form.submit();
  }
});
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
