var id = $params('id'),
	name = $('#input_name'),
	btn_save = $('#btn_save_size');

if($params('id')){
	var form_type = 'edit'
	$.ajax({
		type:'GET',
		url:constant.API+'admin_size/detail?id='+id,
		success:function(data){
			console.log(data)
			$('#input_name').val(data[0].name)
		},
		error:function(status){

		}
	})
}else{
	form_type = 'save'
}

function save_size(){
	if(form_type=='edit'){
		var link = constant.API+'admin_size/edit'
		var method = 'PUT'
	}else{
		link = constant.API+'admin_size/create'
		method = 'POST'
	}
	$.ajax({
		type:method,
		url:link,
		data:{
			'id' : id || '',
			'name' : $('#input_name').val()
		},
		success:function(data){
			console.log(data)
			if(form_type == 'edit'){
				document.location.href='#size'
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
}

btn_save.on('click', function(){
	save_size();
})