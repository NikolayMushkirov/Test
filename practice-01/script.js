const validateForm = () => {
  let isValid = true;

  const organizationInput = document.querySelector(".organization-input");
  const organizationError = document.querySelector(".organization-error");
  if (organizationInput.value.trim().length < 2) {
    isValid = false;
    organizationInput.classList.add("invalid");
    organizationError.textContent =
      "Название организации должно содержать минимум 2 символа";
  } else {
    organizationInput.classList.remove("invalid");
    organizationError.textContent = "";
  }

  const phoneInput = document.querySelector(".phone-input");
  const phoneError = document.querySelector(".phone-error");

  const isValidPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      phoneInput.value
    );

  if (!isValidPhone) {
    isValid = false;
    phoneError.textContent =
      "Номер телефона должен состоять минимум из 10 цифр";
    phoneInput.classList.add("invalid");
  } else {
    phoneError.textContent = "";
    phoneInput.classList.remove("invalid");
  }

  const emailInput = document.querySelector(".email-input");
  const emailError = document.querySelector(".email-error");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  if (!isValidEmail) {
    isValid = false;
    emailError.textContent = "Некорректный адрес электронной почты";
    emailInput.classList.add("invalid");
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
  }

  const selectField = document.querySelector(".modal__form-select");
  const selectError = document.querySelector(".modal__form-select-error");
  if (selectField.selectedIndex === 0) {
    isValid = false;
    selectField.classList.add("invalid");
    selectError.textContent = "Пожалуйста, выберите направление";
  } else {
    selectField.classList.remove("invalid");
    selectError.textContent = "";
  }

  if (!isValid) {
    return false;
  }
  return true;
};

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
