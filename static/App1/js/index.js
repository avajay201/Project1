// $('.forgot-passss').on('mouseover', function(){
//     $(this).css({'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer'});
// })

// $('.forgot-passss').on('mouseout', function(){
//     $(this).css({'color': '#cfcfcf', 'text-decoration': 'none'});
// })


function reload() {
    window.location = '/';
}

$('.sign_up').on('click', function () {
    event.preventDefault();
    username = $('input[name=username]').val();
    fname = $('input[name=first_name]').val();
    lname = $('input[name=last_name]').val();
    email = $('input[name=email]').val();
    password = $('input[name=pass]').val();
    c_password = $('input[name=c_pass]').val();
    user_status = false;
    fname_status = false;
    lname_status = false;
    email_status = false;
    pass_status = false;
    c_pass_status = false;
    if (username == ''){
        $('#username_error').css('display', 'block');
        user_status = false;
    }
    else{
        if (username.length >= 6 & username.length <= 20){
            $('#username_error').css('display', 'none');
            user_status = true;
        }
        else{
            $('#username_error').css('display', 'block');
            $('#username_error').text('Username must be minimum 6 char and maximum 20 char.');
            user_status = false;
        }
    }
    if (fname == ''){
        $('#first_name_error').css('display', 'block');
        fname_status = false;
    }
    else{
        if (fname.length >= 3 & fname.length <= 15){
            $('#first_name_error').css('display', 'none');
            fname_status = true;
        }
        else{
            $('#first_name_error').css('display', 'block');
            $('#first_name_error').text('First Name must be minimum 3 char and maximum 15 char.');
            fname_status = false;
        }
    }
    if (lname == ''){
        $('#last_name_error').css('display', 'block');
        lname_status = false;
    }
    else{
        if (lname.length >= 3 & lname.length <= 15){
            $('#last_name_error').css('display', 'none');
            lname_status = true;
        }
        else{
            $('#last_name_error').css('display', 'block');
            $('#last_name_error').text('Last Name must be minimum 3 char and maximum 15 char.');
            lname_status = false;
        }
    }
    if (email == ''){
        $('#email_error').css('display', 'block');
        email_status = false;
    }
    else{
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(email)) {
            $('#email_error').css('display', 'none');
            email_status = true;
        }
        else {
            $('#email_error').css('display', 'block');
            $('#email_error').text('Please enter correct email.');
            email_status = false;
        }
    }
    if (password == ''){
        $('#pass_error').css('display', 'block');
        pass_status = false;
    }
    else{
        $('#pass_error').css('display', 'none');
        pass_status = true;
    }
    if (c_password == ''){
        $('#c_pass_error').css('display', 'block');
        c_pass_status = false;
    }
    else{
        $('#c_pass_error').css('display', 'none');
        c_pass_status = true;
    }
    form_status = true;
    if (user_status == true & fname_status == true & lname_status == true & email_status == true & pass_status == true & c_pass_status == true){
        form_status = true;
    }
    else{
        form_status = false;
    }
    if (form_status != false) {
        if (password == c_password) {
            data = {
                'fname': fname,
                'lname': lname,
                'email': email,
                'username': username,
                'password': password,
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            }
            $.ajax({
                type: 'post',
                url: 'sign-up',
                data: data,
                success: function (response) {
                    if (response.error == 'Entered username already exists. Please try different username.') {
                        toastr.error(response.error);
                    }
                    else if (response.success == 'Your account successfully created.') {
                        toastr.success(response.success);
                        $('.sign_up').css('display', 'none');
                        $('.sign_in').css('display', 'block');
                        $('#sign_in_btn').css('display', 'none');
                        $('#sign_up_btn').css('display', 'block');
                        $('.form-title').text('Sign In');
                        let remove_ele = [1, 1, 1, 2];
                        for (i of remove_ele){
                            $('.fields').children()[i].remove();
                        }
                    
                        $('.forget_pass').text('Forgot password?');
                        
                        $('.sign_text').text('Or Sign Up Using');
                    }
                    else if (response.error == 'Please enter valid email address.'){
                        toastr.error(response.error);
                    }
                    else{
                        toastr.error('Please try again.');
                    }
                }
            })
        }
        else{
            toastr.error('Password not matched.')
        }
    }
});


$('.sign_in').on('click', function () {
    event.preventDefault();
    username = $('input[name=username]').val();
    password = $('input[name=pass]').val();
    user_status = false;
    pass_status = false;
    if (username == ''){
        $('#username_error').css('display', 'block');
        user_status = false;
    }
    else{
        $('#username_error').css('display', 'none');
        user_status = true;
    }
    if (password == ''){
        $('#pass_error').css('display', 'block');
        pass_status = false;
    }
    else{
        $('#pass_error').css('display', 'none');
        pass_status = true;
    }
    if (user_status == true & pass_status == true){
        data = {
            'username': username,
        'password': password,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        }
        $.ajax({
            type: 'POST',
            url: 'sign-in',
            data: data,
            success: function (data) {
                if (data.error == 'Please enter correct username or password.') {
                    toastr.error(data.error);
                }
                else if (data.success == 'Sign in successfully.') {
                    toastr.success(data.success);
                    setTimeout(reload, 1000);
                }
                else{
                    toastr.error('Please try again.')
                }
            }
        })
    }
})

$('.forget_pass_otp').on('click', function(){
    $('.spinner').css('display', 'block');
    email = $('input[name=email]').val();
    email_status = false;
    if (email == ''){
        $('#email_error').css('display', 'block');
        email_status = false;
    }
    else{
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(email)) {
            $('#email_error').css('display', 'none');
            email_status = true;
        }
        else {
            $('#email_error').css('display', 'block');
            $('#email_error').text('Please enter correct email.');
            email_status = false;
        }
    }
    if (email_status == true){
        $.ajax({
            type: 'post',
            url: 'forget-password',
            data: {
                email: email,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response){
                if (response.success == 'Done'){
                    $('.spinner').css('display', 'none');
                    $('.otp_submit').css('display', 'block');
                }
                else if (response.error == 'Not Done'){
                    alert(response.error);
                }
                else{
                    alert('Try again');
                }
            }
        })
    }
})

$('#sign_in_btn').on('click', function(){
    $('.required_fields').css('display', 'none');
    $('.sign_up').css('display', 'none');
    $('.sign_in').css('display', 'block');
    $(this).css('display', 'none');
    $('#sign_up_btn').css('display', 'block');
    $('.form-title').text('Sign In');
    let remove_ele = [1, 1, 1, 2];
    for (i of remove_ele){
        $('.fields').children()[i].remove();
    }

    $('.forget_pass').text('Forgot password?');
    
    $('.sign_text').text('Or Sign Up Using');
})

$('#sign_up_btn').on('click', function(){
    $('.sign_in').css('display', 'none');
    $('.sign_up').css('display', 'block');
    $(this).css('display', 'none');
    $('#sign_in_btn').css('display', 'block');
    $('.form-title').text('Sign Up');
    $('.fields').find('div')[1].remove();
    let sign_up_field = `<div
        class="wrap-input100 validate-input m-b-23"
    >
        <span class="label-input100">First Name</span>
        <input
        class="input100"
        type="text"
        name="first_name"
        placeholder="Type your First Name"
        maxlength="15"
        />
        <span class="focus-input100" data-symbol="&#xf190;"></span>
        <span class="required_fields display_none" id="first_name_error">This field is required.</span>
        </div><div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Last Name</span>
    <input
        class="input100"
        type="text"
        name="last_name"
        placeholder="Type your Last Name"
        maxlength="15"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields display_none" id="last_name_error">This field is required.</span>
    </div><div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Email</span>
    <input
    class="input100"
    type="email"
    name="email"
    placeholder="Type your email"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields display_none" id="email_error">This field is required.</span>
    </div><div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Password</span>
    <input
    class="input100"
    type="password"
    name="pass"
    placeholder="Type your password"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields display_none" id="pass_error">This field is required.</span>
    </div><div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Confirm Password</span>
    <input
    class="input100"
    type="password"
    name="c_pass"
    placeholder="Type your Confirm Password"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields display_none" id="c_pass_error">This field is required.</span>
    </div>`;
    $('.fields').append(sign_up_field);
    $('.forget_pass').text('');
    $('.sign_text').text('Or Sign In Using');
})


$('.forget_pass').on('click', function(){
    $(this).css('display', 'none');
    $('.forget_pass_otp').css('display', 'block');
    $('.form-title').text('Reset Password')
    $('.sign_in').css('display', 'none');
    $('.sign_text').css('display', 'none');
    $('#sign_up_btn').css('display', 'none');
    $('.sign_up').css('display', 'none');
    let remove_ele = [0, 0];
    for (i of remove_ele){
        $('.fields').children()[i].remove();
    }
    $('.fields').append(`<div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Email</span>
    <input
    class="input100"
    type="email"
    name="email"
    placeholder="Type your email"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields display_none" id="email_error">This field is required.</span>
    </div>`);
})