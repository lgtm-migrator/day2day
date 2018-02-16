/* global $ */
/* global Cookies */

var main = function() {

    var userID,
        avatar;

    //posting auth info from auth.html
    $("#createAccount").on("click", function() {
        $.ajax({
            url: "/user",
            type: 'POST',
            data: {
                username: $("#username").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                passwordRepeat: $("#passwordRepeat").val()
            },
            success: function(data) {
                userID = data._id;
                console.log(userID);
                avatar = data.avatar;
                console.log("id: " + userID + " avatar: " + avatar);

                if (userID != undefined) {
                    Cookies.remove('userid');
                    Cookies.set('userid', userID);
                    window.location = "/index.html";
                }

                //show alerts in auth page
                if (data.includes('E1') === true) {
                    console.log("Need a valid email");
                    $("#email").parent().addClass("has-danger").append('<div class="form-control-feedback">Please use a valid email</div>');
                }
                if (data.includes('E2') === true) {
                    console.log('Password do not match');
                    $("#passwordRepeat").parent().addClass("has-danger").append('<div class="form-control-feedback">Password do not match</div>');
                }
                if (data.includes('E3') === true) {
                    console.log('Password should be at least 5 character long');
                    $("#password").parent().addClass("has-danger").append('<div class="form-control-feedback">Password should have more than 5 character </div>');
                }
                if (data.includes('E4') === true) {
                    console.log('email taken');
                    $("#email").parent().addClass("has-danger").append('<div class="form-control-feedback">Email alerady used</div>');
                }
                else {
                    window.location = "/index.html";
                }
            }
        });
    });

    $('.signin__link').on('click', function() {
        handleShow('signIn')
    });

    $(".signup__link").on('click', function() {
        handleShow('signUp')
    });

    $('#forgotPassword').on('click', function() {
        handleShow('forgotPassword');
    });

    // request to login
    $("#login").on("click", function() {
        $.ajax({
            url: "/login",
            type: 'POST',
            data: {
                username: $("#emailLogIn").val(),
                password: $("#passwordLogIn").val(),
            },
            success: function(data) {
                console.log(data);
                if (data === "not found") {
                    console.log("wrong credentials")
                    $("#emailLogIn").parent().addClass("has-danger").append('<div class="form-control-feedback">Credentials do not match</div>');
                }
                else {
                    Cookies.set('userid', data);
                    window.location.replace("/index.html");
                }
            }
        });
    });

    $('#sendResetEmail').on('click', function() {
        resetPassword();
    });
};

$(document).ready(main);

function resetPassword() {
    console.log('super');
    let passwordToResetForEmail = $("#passwordToReset").val();
    $.ajax({
        url: "/forget",
        type: 'POST',
        data: {
            passwordToResetForEmail
        },
        success: function(data) {
            console.log(data);
        }
    });
}

//auto sign in if cookie's here
if (Cookies.get('userid') !== undefined && window.location.pathname === "/auth.html") {
    window.location = "index.html";
}

// handling what to display
function handleShow(section) {
    console.log(section);
    if (section === 'forgotPassword') {
        $('#signUp, #signIn').hide();
        $('#resetPassword').show();
    }
    else if (section === 'signUp') {
        $('#resetPassword, #signIn').hide();
        $('#signUp').show();
    }
    else if (section === 'signIn') {
        $('#resetPassword, #signUp').hide();
        $('#signIn').show();
    }
}
