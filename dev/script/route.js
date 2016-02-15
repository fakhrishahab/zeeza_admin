var constant = {
	// 'API' : 'http://192.168.3.63/laravel/'
	'API' : 'http://localhost/zeeza_api/'
}
function $params(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$('a').on('click', function(e){
	e.preventDefault();
	window.location.hash = $(this).attr('href');
	// history.pushState("", document.title, 'category');	
})

$(window).on('hashchange load', function(e){
	function route(name, config){		
		var base = $("base").prop("href");
		var fullurl = document.location.href;
		var path = fullurl.replace(base,"");
		var end_point = path.split('.')[0];
		if(end_point.indexOf('#') >= 0){
			end_point = end_point.split('#')[1];
		}

		if(end_point.indexOf('?') >= 0){
			end_point = end_point.split('?')[0]
		}

		if(end_point == name){
			function getScript(){
				var script = '';
				if(config.script && config.script.length >= 1){
					for(var i=0; i < config.script.length; i++){	
						script += '<script src=./script/'+config.script[i]+'></script>'
					}
					return script;
				}else{
					return '';
				}
			}

			$.get('view/'+config.template, function(data){	
				$('div#zee-view').empty();
				$('div#zee-view').append(data + getScript());
			})
		}	
	}

	route('', {
		template : 'home.html'
	})

	route('product', {
		template : 'product.html',
		script : [
			'app/product.js'
		]
	})

	route('product_add', {
		template : 'product_add.html',
		script : [
			'app/product_add.js'
		]
	})

	route('category', {
		template : 'category.html',
		script : [
			'app/category.js'
		]
	})

	route('type', {
		template : 'type.html',
		script : [
			'app/type.js'
		]
	})

	route('brand', {
		template : 'brand.html',
		script : [
			'app/brand.js'
		]
	})

	route('size', {
		template : 'size.html',
		script : [
			'app/size.js'
		]
	})

	route('menu', {
		template : 'menu.html',
		script : [
			'app/menu.js'
		]
	})
})
