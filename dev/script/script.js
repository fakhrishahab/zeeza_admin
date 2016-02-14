$.ajax({
	method : 'GET',
	url : constant.API+'admin_content/menu',
	success:function(data){
		for(var i=0; i<data.length;i++){
			$('#menu_content').append('<li><a href=#menu?id='+data[i].id+'>'+data[i].name+'</a></li>')
		}
	},
	error:function(){

	}
})