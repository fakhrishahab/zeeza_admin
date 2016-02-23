var id = $params('id'),
	category = $('#input_category'),
	rank = $('#input_rank'),
	name = $('#input_name'),
	btn_save = $('#btn_save_type');

if($params('id')){
	var form_type = 'edit'	

	$.ajax({
		type:'GET',
		url:constant.API+'admin_type/detail?access_token='+constant.ACCESS_TOKEN+'&id='+id,
		success:function(data){
			console.log(data)
			$('#input_rank').val(data[0].rank)
			$('#input_category').val(data[0].id_category)
			$('#input_name').val(data[0].name)
		},
		error:function(status){

		}
	})
}else{
	form_type = 'save'
}

$.ajax({
	type:'GET',
	url:constant.API+'admin_category?access_token='+constant.ACCESS_TOKEN,
	async:false,
	success:function(data){
		for(var i =0; i < data.length;i++){
			category.append('<option value='+data[i].id_category+'>'+data[i].name+'</option>')	
		}
	},
	error:function(status){

	}
})

function save_type(){
	if(form_type=='edit'){
		var link = constant.API+'admin_type/edit'
		var method = 'PUT'
	}else{
		link = constant.API+'admin_type/create'
		method = 'POST'
	}
	$.ajax({
		type:method,
		url:link,
		data:{
			'id' : id || '',
			'id_category' : category.val(),
			'rank' : rank.val(),
			'name' : $('#input_name').val(),
			'access_token' : constant.ACCESS_TOKEN
		},
		success:function(data){
			console.log(data)
			if(form_type == 'edit'){
				document.location.href='#type'
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
	$('#input_rank').val('')
	$('#input_category').val('')
}

btn_save.on('click', function(){
	save_type();
})