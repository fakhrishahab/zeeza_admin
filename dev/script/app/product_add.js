$(document).ready(function(){
	var brand 		= $('#product_brand'),
		category 	= $('#product_category'),
		type 		= $('#product_type'),
		size 		= $('#product_size'),
		code		= $('#product_code'),
		name 		= $('#product_name'),
		description = $('#description'),
		price 		= $('#price'),
		price_disc  = $('#price_disc'),
		price_reseller = $('#price_reseller'),
		photo 		= $('#product_photo');	

	function getCategory(){
		$.ajax({
			method : 'GET',
			url : constant.API+'category/view',
			success:function(data){
				for(var i=0; i < data.length; i++){
					category.append('<option value='+data[i].id_category+'>'+data[i].name+'</option>')	;
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
			success:function(data){
				for(var i=0; i < data.length; i++){
					size.append('<option value='+data[i].id_age+'>'+data[i].name+'</option>')	;
				}
			}
		})	
	}

	function getBrand(){
		$.ajax({
			method : 'GET',
			url : constant.API+'brand/view',
			success:function(data){
				for(var i=0; i < data.length; i++){
					brand.append('<option value='+data[i].id+' data-code='+data[i].code+'>'+data[i].name+'</option>')	;
				}
			}
		})
	}

	getBrand();
	getCategory();
	getSize();

	category.on('change', function(){
		$.ajax({
			method : 'GET',
			url : constant.API+'type/view?id='+$(this).val(),
			success:function(data){
				type.empty()
				type.append('<option value="">---</option>')
				for(var i=0; i < data.length; i++){
					type.append('<option value='+data[i].id_type+'>'+data[i].name+'</option>');
				}
				
			}
		})
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

	function saveProduct(){
		$('.form-wrapper').addClass('layer-loading')
		var formdata = new FormData();
		formdata.append('product_code', $('#product_code').val())
		formdata.append('product_brand', $('#product_brand').val())
		formdata.append('name', $('#product_name').val())
		formdata.append('category', $('#product_category').val())
		formdata.append('type', $('#product_type').val())
		formdata.append('age', $('#product_size').val())
		formdata.append('description', $('#product_desc').val())
		formdata.append('price', $('#price').val())
		formdata.append('price_disc', $('#price_disc').val())
		formdata.append('price_reseller', $('#price_reseller').val())
		formdata.append('image', photo_file[0])

		$.ajax({
			method : 'POST',
			url : constant.API+'product/create',
			data : formdata,
			processData: false,
	        contentType: false,
			success:function(data){
				$('.form-wrapper').removeClass('layer-loading')
				resetForm()
			},
			error:function(status){
				$('.form-wrapper').removeClass('layer-loading')
				console.log('error')
			}
		})
	}

	$('#btn_save_product').on('click', function(){
		saveProduct()
	})
})
