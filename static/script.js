
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        let valid = true;

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


        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        captchaError.textContent = "";

        username.classList.remove("error", "success");
        email.classList.remove("error", "success");
        password.classList.remove("error", "success");
        confirm.classList.remove("error", "success");
        captcha.classList.remove("error", "success");



        if (username.value.trim().length < 3) {

            usernameError.textContent =
                "Логин должен содержать минимум 3 символа.";

            username.classList.add("error");
            valid = false;

        } else if (username.value.trim().length > 20) {

            usernameError.textContent =
                "Логин должен содержать максимум 20 символов.";

            username.classList.add("error");
            valid = false;

        } else if (!/^[A-Za-z0-9]+$/.test(username.value.trim())) {

            usernameError.textContent =
                "Используйте только латинские буквы и цифры.";

            username.classList.add("error");
            valid = false;

        } else {

            username.classList.add("success");
        }



        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {

            emailError.textContent =
                "Введите корректный email.";

            email.classList.add("error");
            valid = false;

        } else {

            email.classList.add("success");
        }



        if (password.length < 6) {

            passwordError.textContent =
                "Пароль должен содержать минимум 6 символов.";

            password.classList.add("error");
            valid = false;

        } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {

            passwordError.textContent =
                "Пароль должен содержать буквы и цифры.";

            password.classList.add("error");
            valid = false;

        } else {

            password.classList.add("success");
        }


        if (confirm.value !== password.value) {

            confirmError.textContent =
                "Пароли не совпадают.";

            confirm.classList.add("error");
            valid = false;

        } else {

            confirm.classList.add("success");
        }



        if (captcha.value.trim() === "") {

            captchaError.textContent =
                "Введите ответ на капчу.";

            captcha.classList.add("error");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });
}




const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        let valid = true;

        const login = document.getElementById("loginInput");
        const password = document.getElementById("loginPassword");
        const captcha = document.getElementById("loginCaptcha");

        const loginError = document.getElementById("loginError");
        const passwordError = document.getElementById("loginPasswordError");
        const captchaError = document.getElementById("loginCaptchaError");


        loginError.textContent = "";
        passwordError.textContent = "";
        captchaError.textContent = "";

        login.classList.remove("error", "success");
        password.classList.remove("error", "success");
        captcha.classList.remove("error", "success");



        if (login.value.trim() === "") {

            loginError.textContent =
                "Введите логин или email.";

            login.classList.add("error");
            valid = false;

        } else {

            login.classList.add("success");
        }



        if (password.value === "") {

            passwordError.textContent =
                "Введите пароль.";

            password.classList.add("error");
            valid = false;

        } else {

            password.classList.add("success");
        }



        if (captcha.value.trim() === "") {

            captchaError.textContent =
                "Введите ответ на капчу.";

            captcha.classList.add("error");
            valid = false;
        }


        if (!valid) {
            event.preventDefault();
        }
    });
}