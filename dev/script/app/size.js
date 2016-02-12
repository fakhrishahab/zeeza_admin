var limit = 10,
	offset = 0,
	index_page = 0,
	total_data, 
	opened_data = 0;
	
function getSize(){
	$.ajax({
		method : 'GET',
		url : constant.API+'size',
		success:function(data){
			for(var i=0; i < data.length; i++){
				$('.table tbody').append("<tr><td>"+data[i].id_age+"</td><td>"+data[i].name+"</td><td><button>Delete</button></td></tr>")
				// category.append('<option value='+data[i].id_category+'>'+data[i].name+'</option>')	;
			}
		},
		error:function(){
			console.log('error cat')
		}
	})	
}

getSize()