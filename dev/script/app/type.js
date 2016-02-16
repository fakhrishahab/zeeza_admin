var page = 0,limit=10,offset=0,opened=0,total=0, id_search;
	
function getType(limit, offset){
	$.ajax({
		method : 'GET',
		url : constant.API+'admin_type?limit='+limit+'&offset='+offset,
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
		$('.table tbody').append("<tr><td>"+data.result[i].id_type+"</td><td>"+data.result[i].category+"</td><td>"+data.result[i].name+"</td><td><button onClick=deleteType("+data.result[i].id_type+")>Delete</button> <a href='#type_add?id="+data.result[i].id_type+"'><button>EDIT</button></td></tr>")
	}
}

function deleteType(id){
	var conf = confirm("Are you sure want to delete this data")
	if(conf == true){
		$.ajax({
			type:'DELETE',
			url:constant.API+'admin_type/delete',
			data:{
				'id' : id
			},
			success:function(data){
				getType(limit, offset)
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
	getType(limit, limit*page, id_search)
})

$('button#btn-prev').on('click', function(){
	page -= 1;
	getType(limit, limit*page, id_search)
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
	getType(limit, offset, id_search)
})

getType(limit, offset)