$(document).ready(function(){
	
		/*simpleCart.bind('update', function(){
		  if( simpleCart.quantity() === 0 ){
			//$('#view-order').addClass('ui-disabled');
			$('#view-order').hide();
		  } else {
			//$('#view-order').removeClass('ui-disabled');
			$('#view-order').fadeIn('slow');
		  }
		  });*/
		  
		
		
		simpleCart.bind( 'beforeAdd' , function( item ){
		  var quantity = $('.item_Quantity').val();
		  if(isNaN(quantity) || quantity==''){
			alert('Please enter a Numeric Quantity');
			$('.item_Quantity').val('');
			$('.item_Quantity').focus();
			return false; // prevents item from being added to cart
		  }
		});
	  
		simpleCart.bind( "afterAdd" , function( item ){
			$('#popupDialogBtn').click();
			$('#popupDialog h1').html($('.item_Quantity').val() + " Item(s) Added");
			$('#popupDialog h3').html(item.get("name") + " was added to your Meal!");
		});
		
		$("#popupDialog").on({
			popupbeforeposition: function () {
				$('.ui-popup-screen').off();
			}
		});
		
	});