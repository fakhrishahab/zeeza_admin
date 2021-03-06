var form_type = 'save', product_detail;
var type_arr=[], size_arr = [];
$(document).ready(function(){
	var brand 		= $('#product_brand'),
		category 	= $('#product_category'),
		type 		= $('#product_type'),
		size 		= $('#product_size'),
		code		= $('#product_code'),
		name 		= $('#product_name'),
		description = $('#product_desc'),
		price 		= $('#price'),
		price_disc  = $('#price_disc'),
		price_reseller = $('#price_reseller'),
		photo 		= $('#product_photo');	

price_disc.on('keyup', function(){
	var discount = Math.round($(this).val() * 30/100);
	price.val(parseInt($(this).val())+discount)
})
getCategory();
getSize();
getType();

	if($params('id') != null){		
		form_type = 'edit';

		$.ajax({
			type:'GET',
			url:constant.API+'product/detail?id='+$params('id'),
			async:false,
			success:function(data){
				// console.log(data)
				product_detail = data;
				code.val(data[0].code);
				name.val(data[0].name);
				description.html(data[0].description);
				price.val(data[0].price);
				price_disc.val(data[0].price_disc);
				price_reseller.val(data[0].price_reseller);
				brand.prop('disabled', true)
				// $('input[name=product_size][value=4]').prop('checked', true);
				for(var i=0; i< data[0].size.length; i++){
					size_arr.push(data[0].size[i].id_age.toString())
					$('input[name=product_size][value='+data[0].size[i].id_age+'], .size-list ul').prop('checked', true);
				}
				for(var i=0; i<data[0].type.length; i++){
					type_arr.push(data[0].type[i].id_type.toString())
					$('input[name=product_type][value='+data[0].type[i].id_type+'], .category-list ul').prop('checked', true);
				}
			},
			error:function(status){
				console.log('error')
			}
		})
	}

	function getCategory(){
		$.ajax({
			method : 'GET',
			url : constant.API+'admin_category?access_token='+constant.ACCESS_TOKEN,
			async:false,
			success:function(data){
				for(var i=0; i < data.length; i++){
					$('.category-list').append('<ul id='+data[i].id_category+'><li class="title-list">'+data[i].name+'<li></ul>')
					// category.append('<option value='+data[i].id_category+'>'+data[i].name+'</option>')	;
					// if(form_type == 'edit'){
					// 	category.val(product_detail[0].category);
					// }
				}
			},
			error:function(){
				console.log('error cat')
			}
		})	
	}

	function getSize(){
		$.ajax({
			method : 'GET',
			url : constant.API+'size',
			async:false,
			success:function(data){
				for(var i=0; i < data.length; i++){
					$('.size-list ul').append('<li><input type="checkbox" name="product_size" id='+data[i].id_age+' value='+data[i].id_age+'>'+data[i].name+'</li>')
					// size.append('<option value='+data[i].id_age+'>'+data[i].name+'</option>');
					// if(form_type == 'edit'){
					// 	size.val(product_detail[0].age);
					// }
				}
			}
		})	
	}

getBrand();
	function getBrand(){
		$.ajax({
			method : 'GET',
			url : constant.API+'brand/view',
			async:false,
			success:function(data){
				for(var i=0; i < data.length; i++){
					brand.append('<option value='+data[i].id+' data-code='+data[i].code+'>'+data[i].name+'</option>');
					if(form_type == 'edit'){
						brand.val(product_detail[0].brand);
					}
				}
			}
		})
	}

	

	function getType(cat){
		$.ajax({
			method : 'GET',
			url : constant.API+'type/view',
			async:false,
			success:function(data){
				for(var i=0; i < data.length; i++){
					// $('.category-list ul#'+data[i].id_category).empty()
					$('.category-list ul#'+data[i].id_category).append('<li><input name="product_type" type="checkbox" value='+data[i].id_type+'>'+data[i].name+'</li>')

					// type.append('<option value='+data[i].id_type+'>'+data[i].name+'</option>');

					// if(form_type == 'edit'){
					// 	type.val(product_detail[0].type);
					// }
				}
				
			}
		})
	}	

	if(form_type == 'edit'){
		// getType(product_detail[0].category);
	}
	
	$('input[name=product_type]').on('click', function(){
		if($(this).prop('checked') == true){
			type_arr.push($(this).val())
		}else{
			var ind = _.indexOf(type_arr, $(this).val())
			type_arr.splice(ind, 1);
		}	
	})

	$('input[name=product_size]').on('click', function(){
		if($(this).prop('checked') == true){
			size_arr.push($(this).val())
		}else{
			var ind = _.indexOf(size_arr, $(this).val())
			size_arr.splice(ind, 1);
		}	
	})

	var photo_file;
	photo.on('change', function(event){
		photo_file = event.target.files
	})

	brand.on('change', function(){
		$.ajax({
			method:'GET',
			url:constant.API+'last_code/'+$(this).val(),
			success:function(data){
				var code = parseInt(data.substr(-3));
				var prefix = $('option:selected').data('code');
				
				if(data!= null && data != ''){
					var id = code+1;
					var newcode = ('000' + id).substr(-3)
				}else{
					newcode = '001';
				}

				$('#product_code').val(prefix+newcode);
			},
			error:function(status){
				console.log('error')
			}
		})
	})

	function resetForm(){
		$('#product_brand').val('');
		$('#product_code').val('');
		$('#product_name').val('');
		$('#product_category').val('');
		$('#product_type').val('')
		$('#product_size').val('')
		$('#product_desc').val('')
		$('#price').val('')
		$('#price_disc').val('')
		$('#price_reseller').val('')
		$('#product_photo').val('')
		photo_file = '';
	}

	function preload(){
		$('.layer-loading').append('<div class="outer"><img src="assets/images/preload.gif"><br/>LOADING...</div>')
	}
	preload()

	function saveProduct(form_type){
		$('.form-wrapper').addClass('layer-loading')
		var formdata = new FormData();
		if(form_type != 'edit'){			
			formdata.append('product_brand', $('#product_brand').val())	
			var link = constant.API+'product/create'
			var method = 'POST'
		}else{
			link = constant.API+'product/edit'
			formdata.append('id', product_detail[0].id)
			method = 'POST'
		}
		formdata.append('product_code', $('#product_code').val())
		formdata.append('name', $('#product_name').val())
		// formdata.append('category', $('#product_category').val())
		formdata.append('type', type_arr)
		formdata.append('age', size_arr)
		formdata.append('description', $('#product_desc').val())
		formdata.append('price', $('#price').val())
		formdata.append('price_disc', $('#price_disc').val())
		formdata.append('price_reseller', $('#price_reseller').val())
		if(form_type=='edit'){
			if(photo_file){
				formdata.append('image', photo_file[0])
			}else{
				formdata.append('image', '')
			}
		}else{
			formdata.append('image', photo_file[0])
		}
		

		$.ajax({
			type : method,
			url : link,
			data : formdata,
			// dataType:'JSON',
			contentType : false,
			// headers:{
			// 	'Content-Type' : 'application/json'
			// },
			processData: false,
			success:function(data){
				$('.form-wrapper').removeClass('layer-loading')
				if(form_type =='edit'){
					document.location.href="#product";
				}else{
					resetForm()	
				}
				
			},
			error:function(status){
				if(status.status == 200){
					// resetForm()
				}
				
				$('.form-wrapper').removeClass('layer-loading')
				console.log('error')
			}
		})
	}

	$('#btn_save_product').on('click', function(){
		saveProduct(form_type)
	})
})
