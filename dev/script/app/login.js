if(_cookies.get('_token')){
	window.location.href="./"
}
$('#btn-login').on('click', function(){
	var username = $('input[name=input-username]').val(),
		password = $('input[name=input-password]').val(),
		wrapper = $('div.login-wrapper');

	wrapper.find('.error-message').remove();
	$.ajax({
		method:'POST',
		url:constant.API+'login',
		data:{
			'username' : username,
			'password' : password,
			'grant_type' : 'password'
		},
		success:function(data){
			console.log(data)
			if(data.result){
				_cookies.put('_token', data.result.access_token);
				_cookies.putObject('user_info', data.user_info);
				constant.ACCESS_TOKEN = data.result.access_token;
				window.location.href="./";
			}
				
		},
		error:function(response){
			if(response.status == 404){
				wrapper.prepend('<div class=error-message>Password Not Match</div>')
			}
		}
	})
})