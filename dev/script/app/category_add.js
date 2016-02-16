var id = $params('id'),
	rank = $('#input_rank'),
	name = $('#input_name'),
	btn_save = $('#btn_save_category');

if($params('id')){
	var form_type = 'edit'

	$.ajax({
		type:'GET',
		url:constant.API+'admin_category/detail?id='+id,
		success:function(data){
			rank.val(data[0].rank)
			$('#input_name').val(data[0].name)
		},
		error:function(status){

		}
	})	
}else{
	form_type = 'save'
}

function save_category(){
	if(form_type=='edit'){
		var link = constant.API+'admin_category/edit'
		var method = 'PUT'
	}else{
		link = constant.API+'admin_category/create'
		method = 'POST'
	}
	$.ajax({
		type:method,
		url:link,
		data:{
			'id' : id || '',
			'rank' : rank.val(),
			'name' : $('#input_name').val()
		},
		success:function(data){
			console.log(data)
			if(form_type == 'edit'){
				document.location.href='#category'
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
}

btn_save.on('click', function(){
	save_category();
})

