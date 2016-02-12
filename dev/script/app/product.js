var limit = 10,
	offset = 0,
	index_page = 0,
	total_data, 
	opened_data = 0;

var get_data = function(limit, offset, id){
	if(id!=undefined){
		var link = constant.API+'admin_product?limit='+limit+'&offset='+offset+'&id='+id
	}else{
		link =constant.API+'admin_product?limit='+limit+'&offset='+offset
	}
	$.ajax({
		method : 'GET',
		url:link,
		success:function(data){
			total_data = data.count;
			$('.table tbody').empty();
			if(data.result.length >= 1){
				for(var i=0; i <data.result.length; i++){
					$('.table tbody').append("<tr><td>"+data.result[i].code+"</td><td>"+data.result[i].name+"</td><td>"+data.result[i].price+"</td><td><img src="+constant.API+"image?img="+data.result[i].code+" height=50></td><td><button>Delete</button></td></tr>")
				}	
			}
			
			check_pagination(data.result.length)
		},
		error:function(){
			console.log('error')
		}
	})
}

get_data(limit, offset);

function check_pagination(opened_data){
	$('button#btn-prev').prop('disabled', true)
	if(opened_data >= total_data){
		$('button#btn-next').prop('disabled', true)
		// $('button#btn-prev').prop('disabled', false)
	}else if(index_page == 0){
		$('button#btn-prev').prop('disabled', true)
	}else if(index_page > 0){
		$('button#btn-prev').prop('disabled', false)
	}
}

$('button#btn-next').on('click', function(){
	index_page += 1;
	var new_offset = index_page * limit;
	get_data(limit, new_offset, 'next');
})

$('button#btn-prev').on('click', function(){
	index_page -= 1;
	var new_offset = index_page * limit;
	get_data(limit, new_offset, 'prev');
})
$('#btn-search').prop('disabled', true);
$('#input-search').on('keyup', function(){
	if($(this).val() != ''){
		$('#btn-search').prop('disabled', false)
	}else{
		$('#btn-search').prop('disabled', true);
	}
})

$('#btn-search').on('click', function(){
	var id=$('#input-search').val()
	get_data(limit, offset, id)
})