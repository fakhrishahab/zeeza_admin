var page = 0,limit=10,offset=0,opened=0,total=0, name_search;

$('#btn-refresh').on('click', function(){
	name_search = ''
	getBrand(limit, offset)
	$('#input-search').val('')
	$('#btn-search').prop('disabled', true);
})
	
function getBrand(limit, offset, name){
	if(name!=undefined){
		var link = constant.API+'admin_brand?access_token='+constant.ACCESS_TOKEN+'&limit='+limit+'&offset='+offset+'&name='+name
	}else{
		link = constant.API+'admin_brand?access_token='+constant.ACCESS_TOKEN+'&limit='+limit+'&offset='+offset
	}
	$.ajax({
		method : 'GET',
		url : link,
		success:function(data){
			console.log(data.result)
			total = data.count;
			opened = data.result.length;

			$('.table tbody').empty()
			if(data.result.length >= 1){
				generateView(data)			
			}else{
				$('.table tbody').append('<h1>Data Not Found</h1>')
			}

			check_pagination(total)
			
		},
		error:function(){
			console.log('error cat')
		}
	})	
}

function generateView(data){
	for(var i=0; i < data.result.length; i++){
		$('.table tbody').append("<tr><td>"+data.result[i].id+"</td><td>"+data.result[i].name+"</td>><td>"+data.result[i].code+"</td><td><button onClick=deleteBrand("+data.result[i].id+")>Delete</button> <a href='#brand_add?id="+data.result[i].id+"'><button>EDIT</button></a></td></tr>")
	}
}


function deleteBrand(id){
	var conf = confirm("Are you sure want to delete this data")
	if(conf == true){
		$.ajax({
			type:'DELETE',
			url:constant.API+'admin_brand/delete',
			data:{
				'id' : id,
				'access_token' : constant.ACCESS_TOKEN
			},
			success:function(data){
				getBrand(limit, offset)
			},
			error:function(status){

			}
		})
		
	}else{
		console.log('cancel')
	}
}


function check_pagination(total){
	var prev = $('button#btn-prev')
	var next = $('button#btn-next')
	var total_page = parseInt(total/limit);

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
	getBrand(limit, limit*page, name_search)
})

$('button#btn-prev').on('click', function(){
	page -= 1;
	getBrand(limit, limit*page, name_search)
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
	name_search=$('#input-search').val()
	getBrand(limit, offset, name_search)
})

getBrand(limit, offset)