$(document).on('pageshow', 'div[data-role*="page"]', function () {
	simpleCart.init();
	simpleCart.bind( 'load' , function(){
	  console.log( "simpleCart has loaded " + simpleCart.quantity() + " items from from localStorage" ); 
	});
	
	$('#menu-button').bind("click",function(){
		$('#menu').toggle('fast');
	});
	
	$('#refresh-button').bind("click",function(){
		location.reload();
	});
	
	$('#exit-button').bind("click",function(){
		navigator.app.exitApp();
	});
	
	$('.exit-button').bind("click",function(){
		navigator.app.exitApp();
	});
	
	
	//if(simpleCart.quantity()==0 || simpleCart.quantity()=='0' || simpleCart.quantity()=='') {
		//$('a#checkout-button').addClass('ui-disabled');
	//}
});
$(document).on('pageshow', 'div[id*="page-order"]', function () {
	
	function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
	function onDeviceReady() {
        if (navigator.network.connection.type == 'none' || navigator.network.connection.type == 'NONE') {
			alert('Please check your network, connection not available.\n\Press OK to go back to main page.');
			window.location.href="index.html";
		}
		if(navigator.geolocation){
		  var options = {enableHighAccuracy: true};
		  navigator.geolocation.getCurrentPosition(onSuccess, 
												   onError,
												   options);
	   }else{
		  alert("Sorry, mobile does not support geolocation!");
	   }
		document.addEventListener("menubutton", onMenuKeyDown, false);
		document.addEventListener("backbutton", backKeyDown, false);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var lat = position.coords.latitude;
		var lon = position.coords.longitude;
	  
		var latitude = document.getElementById('latitude');
        var longitude = document.getElementById('longitude');
		
		latitude.value = lat;
		longitude.value = lon;
		
		var myLatlng = new google.maps.LatLng(lat,lon);
		var mapOptions = {
			zoom: 16,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		
		$('#order-div').html('<div id="order-div2"><a data-role="button" href="javascript:;" class="simpleCart_checkout" id="order-button">Order</a></div>').trigger('create');
    }


    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	//WEB GEO//
	function getLocation(){

	   if(navigator.geolocation){
		  var options = {enableHighAccuracy: true};
		  navigator.geolocation.getCurrentPosition(onSuccessWeb, 
												   onErrorWeb,
												   options);
	   }else{
		  alert("Sorry, browser does not support geolocation!");
	   }
	}
	function onSuccessWeb(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		//alert("Latitude : " + lat + " Longitude: " + lon);
		
		var latitude = document.getElementById('latitude');
        var longitude = document.getElementById('longitude');
		
		latitude.value = lat;
		longitude.value = lon;
		
		var myLatlng = new google.maps.LatLng(lat,lon);
		var mapOptions = {
			zoom: 16,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		
		$('#order-div').html('<div id="order-div2"><a data-role="button" href="javascript:;" class="simpleCart_checkout" id="order-button">Order</a></div>').trigger('create');
	}

	function onErrorWeb(err) {
	  if(err.code == 1) {
		alert("Error: Access is denied!");
	  }else if( err.code == 2) {
		alert("Error: Position is unavailable!");
	  }
	}
	
	// Handle the menu button
    //
    function onMenuKeyDown() {
		$('#menu').toggle('fast');
    }
	
	function backKeyDown() {
        //navigator.app.exitApp();
    }
	
	///////////////////////////////////////////////////
	
	$("#popupDialog").on({
		popupbeforeposition: function () {
			$('.ui-popup-screen').off();
		}
	});
	$("#popupDialog2").on({
		popupbeforeposition: function () {
			$('.ui-popup-screen').off();
		}
	});
	
	//////////////////////////////////////////////////////
	
	
		
		$('.simpleCart_remove').bind("click", function(){
			location.reload();
		});
		
		value = $.jStorage.get('checkout');
		if(value=='yes') {
			$.jStorage.set('checkout', 'no');
			simpleCart.empty();
			$('#popupDialogBtn').click();
		}
		
		else if(simpleCart.quantity()==0 || simpleCart.quantity()=='0' || simpleCart.quantity()=='') {
			$('#popupDialogBtn2').click();
		}
		
		simpleCart({
		checkout: {
		  type: "SendForm",
		  url: "http://www.kmqatar.com/mobileapps/petite-mobile-app/order.php"
		}
	  });
	  
	  simpleCart.bind( 'beforeCheckout' , function( data ){
		  /*if (navigator.network.connection.type == 'none' || navigator.network.connection.type == 'NONE') {
			alert('Please check your network, connection not available.\n\Press OK to go back to main page.');
			window.location.href="index.html";
		  }	*/
			
		  data.ClientName = document.getElementById( 'name' ).value;
		  if(data.ClientName=="" || data.ClientName.length==0) {alert('Please enter your Name');return false;}
		  
		  data.ClientMobile = document.getElementById( 'mobile' ).value;
		  if(data.ClientMobile=="" || data.ClientMobile.length==0) {alert('Please enter your Mobile Number');return false;}
		  
		  data.ClientEmail = document.getElementById( 'email' ).value;
		  data.ClientAddress = document.getElementById( 'address' ).value;
		  data.ClientLatitude = document.getElementById( 'latitude' ).value;
		  data.ClientLongitude = document.getElementById( 'longitude' ).value;
		  data.ClientType =  $("input[name=type]:checked").val();
		  data.ClientBranch =  $("input[name=branch]:checked").val();
		  $.jStorage.set('checkout', 'yes');
		});
		
		$('#branchp').hide();
		$('#branch').hide();
		
		$('input[name=type]').click(function() {
			if($(this).val() == "Takeaway") {
				$('#address-show-hide').hide();
				$('#branchp').show();
			} else {
				$('#address-show-hide').show();
				$('#branchp').hide();
			}
		});
		
	onLoad;
	getLocation();
});