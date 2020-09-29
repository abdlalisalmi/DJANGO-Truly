const showPassword = document.querySelector('.show-password');
const termsOfUseBtn = document.querySelector('#terms_of_use');
const logoutBtn = document.querySelector('#logout-btn');
const editProBtn = document.querySelector('#edit-profile-btn');
const profilePic = document.querySelector('#profile-pic');
const accountVisible = document.querySelector('#account-visible');
const accountDisable = document.querySelector('#account-disable');
const deleteAccountBtn = document.querySelector('#delete-account-btn');
const messagesItems = document.querySelectorAll('.message-item');
const deleteMessageBtns = document.querySelectorAll('.delete-message-btn');
const sendMessageBtn = document.querySelector('#message-send-btn');
const searchBtn = document.querySelector('#search-btn');


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

if (termsOfUseBtn) {
    termsOfUseBtn.addEventListener('change', () => {
        btnState = document.querySelector('#signup-btn');
        btnState.disabled = !btnState.disabled;
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
                        msgIcon = document.querySelector('#msg-icon-' + message.attributes.ID.value)
                        msgIcon.classList.add('has-been-read');
                        if (data['is_last']) {
                            document.querySelector('#messages-badge1').remove();
                            document.querySelector('#messages-badge2').remove();
                        }
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
                                    <div class="col-6 text-center ">
                                        <a onclick="location.reload();" class="pl-4 text-success">
                                            <i class="fas fa-sync-alt "></i> Another message
                                        </a>
                                    </div>
                                    
                                </div>
                    `;
                }
            })
    })
}


if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchInput = document.querySelector('#search-input').value;
        if (searchInput) {
            document.querySelector('#query').value = searchInput;
            document.querySelector('#search-form').submit();
        }
    })
}

/* contact us */
let contactUSForm = document.getElementById('contact-us-form');
let contactUSSubmitBtn = document.getElementById('form-submit');
let formName = document.getElementById('form-name');
let formEmail = document.getElementById('form-email');
let formMessage = document.getElementById('form-message');

if (contactUSSubmitBtn) {
    contactUSSubmitBtn.addEventListener('click', () => {
        // Build formData object.
        let formData = new FormData();
        formData.append('full_name', formName.value);
        formData.append('email', formEmail.value);
        formData.append('message', formMessage.value);

        fetch("/contact-us/",
            {
                body: formData,
                method: "post",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            }).then(response => response.json())
            .then(data => {
                function changeToF(element) {
                    if (element.parentElement.classList.contains('has-success')) {
                        element.parentElement.classList.remove('has-success');
                        element.parentElement.classList.add('has-danger');
                    } else {
                        element.parentElement.classList.add('has-danger');
                    }
                }
                function changeToS(element) {
                    if (element.parentElement.classList.contains('has-danger')) {
                        element.parentElement.classList.remove('has-danger');
                        element.parentElement.classList.add('has-success');
                    } else {
                        element.parentElement.classList.add('has-success');
                    }
                }
                function clearInputs() {
                    formName.parentElement.classList.remove('has-danger');
                    formEmail.parentElement.classList.remove('has-danger');
                    formMessage.parentElement.classList.remove('has-danger');
                    formName.parentElement.classList.remove('has-success');
                    formEmail.parentElement.classList.remove('has-success');
                    formMessage.parentElement.classList.remove('has-success');
                    document.getElementById('name-error').innerHTML = '';
                    document.getElementById('email-error').innerHTML = '';
                    document.getElementById('message-error').innerHTML = '';
                }

                if (data.success) {
                    formName.value = '';
                    formEmail.value = '';
                    formMessage.value = '';
                    clearInputs();
                    document.getElementById('form-container').innerHTML = `
                    <div class="col-12 mb-5 text-center">
                        <i class="fa fa-check-circle fa-5x text-success"></i>
                        <p class="display-2" style="color:#adb5bd">Your message has sent successfully.</p>
                        <a href="/" class="btn btn-secondary text-capitalize m-2">Home</a>
                    </div>
                    `;
                } else {
                    if (data.errors.full_name) {
                        changeToF(formName);
                        document.getElementById('name-error').innerHTML = `<small class="text-danger">${data.errors.full_name}</small>`
                    } else {
                        changeToS(formName);
                        document.getElementById('name-error').innerHTML = '';
                    }

                    if (data.errors.email) {
                        changeToF(formEmail);
                        document.getElementById('email-error').innerHTML = `<small class="text-danger">${data.errors.email}</small>`
                    } else {
                        changeToS(formEmail);
                        document.getElementById('email-error').innerHTML = '';
                    }
                    if (data.errors.message) {
                        changeToF(formMessage);
                        document.getElementById('message-error').innerHTML = `<small class="text-danger">${data.errors.message}</small>`
                    } else {
                        changeToS(formMessage);
                        document.getElementById('message-error').innerHTML = '';
                    }
                }
            });
    })
}
/* end contact us */




function copyLink() {
    /* Get the text field */
    var link = document.getElementById("profile-link");
    /* Select the text field */
    link.select();
    link.setSelectionRange(0, 99999); /*For mobile devices*/

    // /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    const copyLinkBtn = document.getElementById("copy-link-btn");
    copyLinkBtn.classList.add('btn-default')
    copyLinkBtn.innerHTML = `
        <i class="ni ni-check-bold pr-2"></i> Link copied
    `
}

const interval = 60000 * 5;
// const interval = 3000;
function newMessagesCheck() {
    if (!document.getElementById('messages-badge1')) {
        fetch("/messages/check/",
            {
                // body: formData,
                method: "post",
                credentials: 'same-origin',
                headers: {
                    "X-CSRFToken": csrftoken
                }
            }).then(response => response.json())
            .then(data => {
                if (data['messages']) {
                    document.getElementById('nofification-div').innerHTML = `<span class="unread_messages" id="messages-badge1"></span>`;
                    document.getElementById('messages-badge2').innerText = data['numbre_of_messages'];
                }
            })
    }
}

setInterval(newMessagesCheck, interval)


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


