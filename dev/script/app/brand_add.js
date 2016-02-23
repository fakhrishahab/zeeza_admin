var id = $params('id'),
	code = $('#input_code'),
	name = $('#input_name'),
	btn_save = $('#btn_save_brand');

if($params('id')){
	var form_type = 'edit'
	$.ajax({
		type:'GET',
		url:constant.API+'admin_brand/detail?access_token='+constant.ACCESS_TOKEN+'&id='+id,
		success:function(data){
			console.log(data)
			$('#input_code').val(data[0].code)
			$('#input_name').val(data[0].name)
		},
		error:function(status){

		}
	})
}else{
	form_type = 'save'
}

function save_brand(){
	if(form_type=='edit'){
		var link = constant.API+'admin_brand/edit'
		var method = 'PUT'
	}else{
		link = constant.API+'admin_brand/create'
		method = 'POST'
	}
	$.ajax({
		type:method,
		url:link,
		data:{
			'id' : id || '',
			'code' : code.val(),
			'name' : $('#input_name').val(),
			'access_token' : constant.ACCESS_TOKEN
		},
		success:function(data){
			console.log(data)
			if(form_type == 'edit'){
				document.location.href='#brand'
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
	$('#input_code').val('')
}

btn_save.on('click', function(){
	save_brand();
})