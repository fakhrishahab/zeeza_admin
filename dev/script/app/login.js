if(_cookies.get('_token')){
	window.location.href="./"
}
$('#btn-login').on('click', function(){
	var username = $('input[name=input-username]').val(),
		password = $('input[name=input-password]').val(),
		wrapper = $('div.login-wrapper');

	wrapper.find('.error-message').remove();
	$.ajax({
		type:'POST',
		url:constant.API+'login',
		data:{
			'username' : username,
			'password' : password,
			'grant_type' : 'password'
		},
		success:function(data){
			console.log(data)
			if(data.access_token){
				_cookies.put('_token', data.access_token);
				_cookies.putObject('user_info', data.user_info);
				constant.ACCESS_TOKEN = data.access_token;
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