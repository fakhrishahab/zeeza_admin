var id = $params('id'),
	menu = $params('id_menu'),
	content = $('#input_content'),
	name = $('#input_name'),
	btn_save = $('#btn_save_menu');

if($params('id')){
	var form_type = 'edit'
	$.ajax({
		type:'GET',
		url:constant.API+'admin_menu/detail?id='+id,
		success:function(data){
			console.log(data)
			$('#input_content').val(data[0].content)
			$('#input_name').val(data[0].name)
		},
		error:function(status){

		}
	})
}else{
	form_type = 'save'
}

function save_menu(){
	if(form_type=='edit'){
		var link = constant.API+'admin_menu/edit'
		var method = 'PUT'
	}else{
		link = constant.API+'admin_menu/create'
		method = 'POST'
	}
	$.ajax({
		type:method,
		url:link,
		data:{
			'id' : id || '',
			'menu' : menu,
			'content' : content.val(),
			'name' : $('#input_name').val()
		},
		success:function(data){
			console.log(data)
			if(form_type == 'edit'){
				document.location.href='#menu?id_menu='+menu
			}else{
				reset_form()	
			}
		},
		error:function(status){

		}
	})
}

function reset_form(){
	$('#input_name').val('')
	$('#input_content').val('')
}

btn_save.on('click', function(){
	save_menu();
})