const showPassword = document.querySelector('.show-password');
const logoutBtn = document.querySelector('#logout-btn');
const editProBtn = document.querySelector('#edit-profile-btn');
const profilePic = document.querySelector('#profile-pic');
const accountVisible = document.querySelector('#account-visible');
const accountDisable = document.querySelector('#account-disable');
const deleteAccountBtn = document.querySelector('#delete-account-btn');
const messagesItems = document.querySelectorAll('.message-item');
const deleteMessageBtns = document.querySelectorAll('.delete-message-btn');
const sendMessageBtn = document.querySelector('#message-send-btn');


if (showPassword) {
    showPassword.addEventListener('click', () => {
        const passwordInput = document.querySelector('#password-input');
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            showPassword.classList.remove('fa-eye')
            showPassword.classList.add('fa-eye-slash')
        } else {
            passwordInput.type = 'password'
            showPassword.classList.remove('fa-eye-slash')
            showPassword.classList.add('fa-eye')
        }
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        document.querySelector('#logout-form').submit();
    })
}

if (profilePic) {
    profilePic.addEventListener('change', () => {
        if (profilePic.length != 0) {
            document.querySelector('#profile-form').submit();
        }
    })
}

if (editProBtn) {
    editProBtn.addEventListener('click', () => {
        function getElementVal(ID) {
            return document.querySelector('#' + ID).value;
        }

        let formData = new FormData();
        formData.append('full_name', getElementVal('full_name'));
        formData.append('date_of_birth', getElementVal('date_of_birth'));
        formData.append('boi', getElementVal('boi'));
        formData.append('email', getElementVal('email'));
        formData.append('facebook', getElementVal('facebook'));
        formData.append('instagram', getElementVal('instagram'));
        formData.append('twitter', getElementVal('twitter'));

        fetch("/profile/",
            {
                body: formData,
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            }).then(response => response.json())
            .then(data => {
                if (data['email']) {
                    document.querySelector('#email-error').innerHTML = `<small class="text-danger pl-2">* ${data['email']}</small>`;
                } else if (data['success']) {
                    location.reload();
                }
            })
    })
}

if (accountVisible) {
    accountVisible.addEventListener('change', () => {
        let formData = new FormData();
        formData.append('type', 'visible');
        fetch("/settings/",
            {
                body: formData,
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            })
    })
}

if (accountDisable) {
    accountDisable.addEventListener('change', () => {
        let formData = new FormData();
        formData.append('type', 'disable');
        fetch("/settings/",
            {
                body: formData,
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            })
    })
}

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
        fetch("/settings/",
            {
                // body: formData,
                method: "DELETE",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            })
    })
}


if (deleteMessageBtns) {
    deleteMessageBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            let formData = new FormData();
            formData.append('id', deleteBtn.attributes.id.value);
            fetch("/messages/",
                {
                    body: formData,
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        "X-CSRFToken": csrftoken
                    }
                }).then(response => response.json())
                .then(data => {
                    if (data['statu'] == 'success') {
                        deleteBtn.parentElement.parentElement.parentElement.remove();
                        document.querySelector(`.show-message${deleteBtn.attributes.id.value}-modal`).remove()
                    }
                })
        })
    });
}


if (messagesItems) {
    messagesItems.forEach(message => {
        message.addEventListener('click', () => {
            let formData = new FormData();
            formData.append('read_id', message.attributes.ID.value);
            fetch("/messages/",
                {
                    body: formData,
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        "X-CSRFToken": csrftoken
                    }
                }).then(response => response.json())
                .then(data => {
                    if (data['statu'] == 'success') {
                        document.querySelector('#msg-icon-' + message.attributes.ID.value).classList.add('has-been-read');
                        document.querySelector('#msg-icon-' + message.attributes.ID.value).classList.remove('text-success');
                    }
                })
        })
    });
}


if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', () => {
        let formData = new FormData();
        formData.append('message', document.querySelector('#message-input').value);
        user = document.querySelector('#message-owner').value
        fetch(`/message/${user}/`,
            {
                body: formData,
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            }).then(response => response.json())
            .then(data => {
                if (data['statu'] == 'success') {
                    document.querySelector('#help-text').remove();
                    document.querySelector('#message-input-div').innerHTML = `
                                    <div class="row justify-content-center mb-4">
                                    <p class="mt-3">
                                        Your message has been sent successfully
                                    </p>
                                    <div class="col-12 text-center">
                                        <img src="/static/img/message-send.png" width=80%>
                                    </div>
                                    <div class="col-6 text-left ">
                                        <a onclick="location.reload();" class="pl-4 text-success">
                                            <i class="fas fa-sync-alt "></i> Another message
                                        </a>
                                    </div>
                                    <div class="col-6 text-right">
                                        <a href="/register" class="pr-4 butt butt-register">Create account</a>
                                    </div>
                                </div>
                    `;
                }
            })
    })
}









function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


