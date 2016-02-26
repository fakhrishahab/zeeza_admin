// console.log(constant)
$.ajax({
	method : 'GET',
	url : constant.API+'admin_content/menu?access_token='+constant.ACCESS_TOKEN,
	success:function(data){
		for(var i=0; i<data.length;i++){
			$('#menu_content').append('<li><a href=#menu?id_menu='+data[i].id+'>'+data[i].name+'</a></li>')
		}
	},
	error:function(){

	}
})

function destroySession(){
	_cookies.delete('_token');
	_cookies.delete('user_info');
	window.location.href='./login.html'
}

$('#btn-logout').on('click', function(){
	destroySession()
})

$(document).ajaxError(function(test){
	destroySession()
})