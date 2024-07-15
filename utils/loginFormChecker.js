

const loginFormChecker = ($) => {
    const loginFormIndicaors = ['login', 'log in', 'password', 'signin', 'sign in'];
    let containsLoginForm = false;
    $('form').each((i, form) => {
        const formContent = $(form).text().toLowerCase();
        if (loginFormIndicaors.some(indicator => formContent.includes(indicator))) {
            containsLoginForm = true;
            return false; // just break out of the loop
        }
    });

    return containsLoginForm;
}

module.exports = loginFormChecker;