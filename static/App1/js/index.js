$('.forgot-passss').on('mouseover', function(){
    $(this).css({'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer'});
})

$('.forgot-passss').on('mouseout', function(){
    $(this).css({'color': '#cfcfcf', 'text-decoration': 'none'});
})

// $('.forgot-passss').on('click', function(){
//     $('.login_').replaceWith('<h2 class="login_">Reset Password</h2>')
//     $('.forgot-pass').remove();
//     $('#login_password').parent().remove();
//     $('#sign_in_btn').replaceWith('<button type="button" class="submit" id="reset_pass_btn">Submit</button>')
// })

function reload() {
    window.location = '/';
}

$('.sign_up').on('click', function () {
    event.preventDefault();
    username = $('input[name=username]').val();
    fname = $('input[name=first_name]').val();
    lname = $('input[name=last_name]').val();
    emal = $('input[name=emal]').val();
    password = $('input[name=pass]').val();
    c_password = $('input[name=c_pass]').val();
    user_status = false;
    fname_status = false;
    lname_status = false;
    emal_status = false;
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
    if (emal == ''){
        $('#emal_error').css('display', 'block');
        emal_status = false;
    }
    else{
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(emal)) {
            $('#emal_error').css('display', 'none');
            emal_status = true;
        }
        else {
            $('#emal_error').css('display', 'block');
            $('#emal_error').text('Please enter correct email.');
            emal_status = false;
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
    if (user_status == true & fname_status == true & lname_status == true & emal_status == true & pass_status == true & c_pass_status == true){
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
                'emal': emal,
                'username': username,
                'password': password,
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            }
            $.ajax({
                type: 'post',
                url: 'sign_up',
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
            url: 'sign_in',
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

$('#sign_in_btn').on('click', function(){
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
        <span class="required_fields" id="first_name_error">This field is required.</span>
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
    <span class="required_fields" id="last_name_error">This field is required.</span>
    </div><div
    class="wrap-input100 validate-input m-b-23"
    >
    <span class="label-input100">Emal</span>
    <input
    class="input100"
    type="email"
    name="emal"
    placeholder="Type your emal"
    />
    <span class="focus-input100" data-symbol="&#xf190;"></span>
    <span class="required_fields" id="emal_error">This field is required.</span>
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
    <span class="required_fields" id="pass_error">This field is required.</span>
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
    <span class="required_fields" id="c_pass_error">This field is required.</span>
    </div>`;
    $('.fields').append(sign_up_field);
    $('.forget_pass').text('');
    $('.sign_text').text('Or Sign In Using');
})