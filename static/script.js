
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirm = document.getElementById("confirm");
        const captcha = document.getElementById("captcha");

        const usernameError = document.getElementById("usernameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");
        const captchaError = document.getElementById("captchaError");

        let valid = true;

        // Логин
        if (username.value.trim().length < 3) {
            usernameError.textContent = "Логин должен содержать минимум 3 символа.";
            username.classList.add("error");
            valid = false;
        } else {
            usernameError.textContent = "";
            username.classList.remove("error");
        }

        // Email
        if (!email.value.includes("@")) {
            emailError.textContent = "Введите корректный email.";
            email.classList.add("error");
            valid = false;
        } else {
            emailError.textContent = "";
            email.classList.remove("error");
        }

        // Пароль
        const passwordValue = password.value;

        if (passwordValue.length < 6) {
            passwordError.textContent =
                "Пароль должен содержать минимум 6 символов.";
            password.classList.add("error");
            valid = false;
        } else if (
            !/[A-Za-z]/.test(passwordValue) ||
            !/[0-9]/.test(passwordValue)
        ) {
            passwordError.textContent =
                "Пароль должен содержать буквы и цифры.";
            password.classList.add("error");
            valid = false;
        } else {
            passwordError.textContent = "";
            password.classList.remove("error");
        }

        // Подтверждение пароля
        if (confirm.value !== passwordValue) {
            confirmError.textContent = "Пароли не совпадают.";
            confirm.classList.add("error");
            valid = false;
        } else {
            confirmError.textContent = "";
            confirm.classList.remove("error");
        }

        // CAPTCHA
        if (captcha.value.trim() === "") {
            captchaError.textContent = "Введите ответ капчи.";
            captcha.classList.add("error");
            valid = false;
        } else {
            captchaError.textContent = "";
            captcha.classList.remove("error");
        }

        // Не отправляем форму, если есть ошибка
        if (!valid) {
            event.preventDefault();
        }
    });
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "Скрыть";
    } else {
        input.type = "password";
        button.textContent = "Показать";
    }
}