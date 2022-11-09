// event handler for the login form
const loginHandler = async function (event) {
    event.preventDefault();

    const email = document.querySelector('#email-form').value.trim();
    const password = document.querySelector('#password-form').value.trim();

    if(email && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringyfy({email, password}),
        });


        if (response.ok) {
            document.location.replace('/users')
        } else {
            alert(response.statusText);
        }
    }
};

// event handler for the signup form
const signupHander = async function (event) {
    event.preventDefault();

    const name = document.querySelector('#signup_name').value.trim();
    const email = document.querySelector('#sighup_email').value.trim();
    const password = document.querySelector('#signup_password').value.trim();

    if(name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/users')
        } else {
            alert(response.statusText);
        }
    }
    
};

document.querySelector('.login-formj').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('sublim', signupHander);