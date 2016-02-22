var page = 0,limit=10,offset=0,opened=0,total=0, id_search;

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
			total = data.count;
			opened = data.result.length;
			$('.table tbody').empty();

			if(data.result.length >= 1){
				generateView(data)			
			}else{
				$('.table tbody').append('<h1>Data Not Found</h1>')
			}
			
			
			check_pagination(total)
		},
		error:function(){
			console.log('error')
		}
	})
}

function generateView(data){
	for(var i=0; i <data.result.length; i++){
		$('.table tbody').append("<tr><td>"+data.result[i].code+"</td><td>"+data.result[i].name+"</td><td>"+data.result[i].price+"</td><td><img src="+constant.API+"image?img="+data.result[i].code+" height=50></td><td><button onClick=deleteProduct("+data.result[i].id+",'"+data.result[i].code+"')>Delete</button>  <a href='#product_add?id="+data.result[i].id+"'><button>EDIT</button></a></td></tr>")
	}	
}

function deleteProduct(id, code){
	var conf = confirm('Are you sure want to delete this data')
	if(conf == true){
		$.ajax({
			type:'DELETE',
			url:constant.API+'product/delete',
			data:{
				'id' : id,
				'code' : code
			},
			success:function(data){
				get_data(limit, offset)
			},
			error:function(status){

			}
		})
		
	}else{
		console.log('cancel')
	}	
}

get_data(limit, offset);

$('#btn-refresh').on('click', function(){
	id_search = ''
	get_data(limit, offset)
	$('#input-search').val('')
})

function check_pagination(total){
	var prev = $('button#btn-prev')
	var next = $('button#btn-next')
	var total_page = parseInt(total/limit)+1;
	// console.log(total_page)

	if(page <= 0){
		if(total_page >= 1){
			$('button#btn-next').prop('disabled', false)
		}
		$('button#btn-prev').prop('disabled', true)		
	}else{
		$('button#btn-prev').prop('disabled', false)		
		if(page < total_page-1){
			$('button#btn-next').prop('disabled', false)		
		}else{
			$('button#btn-next').prop('disabled', true)		
		}
	}
}

$('button#btn-next').on('click', function(){
	page += 1;
	get_data(limit, limit*page, id_search)
})

$('button#btn-prev').on('click', function(){
	page -= 1;
	get_data(limit, limit*page, id_search)
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
	id_search=$('#input-search').val()
	get_data(limit, offset, id_search)
})