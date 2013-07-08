<?php 
if($_SERVER['REQUEST_METHOD'] == "POST"){
	//print_r($_POST);
	echo 'Redirecting...';
	require_once 'phpmailer.php';
	
	$mail             = new PHPMailer(); // defaults to using php "mail()"
	
	$itemCount = stripslashes($_POST["itemCount"]);
	$client = stripslashes($_POST["ClientName"]);
	$email = stripslashes($_POST["ClientEmail"]);
	$mobile = stripslashes($_POST["ClientMobile"]);
	$address = stripslashes($_POST["ClientAddress"]);
	if($address=="") $address="N/A";
	$lat = stripslashes($_POST["ClientLatitude"]);
	$lon = stripslashes($_POST["ClientLongitude"]);
	$type = stripslashes($_POST["ClientType"]);
	$branch = stripslashes($_POST["ClientBranch"]);
	
	$body = '<b>Client Name</b> : '.$client.'<br>';
	$body .= '<b>Client Email</b> : '.$email.'<br>';
	$body .= '<b>Client Mobile</b> : '.$mobile.'<br>';
	$body .= '<b>Order Type</b> : '.$type.'<br>';
	if($type=='Delivery'){
		$body .= '<b>Client Address</b> : '.$address.'<br>';
		$body .= '<b>Client Location</b> : <a href="https://maps.google.com/maps?q='.$lat.','.$lon.'&z=15">View Location on Google Maps</a><br>';
	}
	else {
		$body .= '<b>Branch</b> : '.$branch.'<br>';
	}
	
	$body .= '<table width="100%">';
	$body .= '<tbody>';
	$body .= '<tr>';
	$body .= '<th style="text-align:left;">Name</th>';
	$body .= '<th style="text-align:left;">Quantity</th>';
	$body .= '<th style="text-align:left;">Price</th>';
	$body .= '<th style="text-align:left;">total Price</th>';
	$body .= '</tr>';
	$total=0;
	for($i=1;$i<=$itemCount;$i++){
		$item_name = stripslashes($_POST["item_name_$i"]);
		$item_quantity = stripslashes($_POST["item_quantity_$i"]);
		$item_price = stripslashes($_POST["item_price_$i"]);
		$body .= '<tr>';
		$body .= '<td>'.$item_name.'</td>';
		$body .= '<td>'.$item_quantity.'</td>';
		$body .= '<td>QR '.$item_price.'</td>';
		$total_price=$item_quantity*$item_price;
		$body .= '<td>QR '.$total_price.'</td>';
		$body .= '</tr>';
		
		$total=$total+$total_price;
	}
	$body .= '</tbody>';
	$body .= '</table>';
	
	$body .= '<br>';
	$body .= '<b>Grand Total</b>: QR '.$total;
	
	if($itemCount!='' || $client!='' || $mobile!=''){
		
		if($email !==''){
			$mail->SetFrom($email, $client);
		} else {
			$mail->SetFrom('email-not-available@kmqatar.com', $client);
		}

		$mail->AddAddress("ghaleb.kabbara@kmqatar.com", "Krom Qatar");

		$mail->Subject    = "Order $type";

		$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

		$mail->MsgHTML($body);

		if(!$mail->Send()) {
		  echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
			if($email !== ''){
				$mail             = new PHPMailer(); // defaults to using php "mail()"
				
				if($type=='Delivery') {
					$body = '<p>Thank you for using our mobile services.<br /> Your order will be delivered within the hour.</p>';
					$body .= '<table width="100%">';
					$body .= '<tbody>';
					$body .= '<tr>';
					$body .= '<th style="text-align:left;">Name</th>';
					$body .= '<th style="text-align:left;">Quantity</th>';
					$body .= '<th style="text-align:left;">Price</th>';
					$body .= '<th style="text-align:left;">total Price</th>';
					$body .= '</tr>';
					$total=0;
					for($i=1;$i<=$itemCount;$i++){
						$item_name = stripslashes($_POST["item_name_$i"]);
						$item_quantity = stripslashes($_POST["item_quantity_$i"]);
						$item_price = stripslashes($_POST["item_price_$i"]);
						$body .= '<tr>';
						$body .= '<td>'.$item_name.'</td>';
						$body .= '<td>'.$item_quantity.'</td>';
						$body .= '<td>QR '.$item_price.'</td>';
						$total_price=$item_quantity*$item_price;
						$body .= '<td>QR '.$total_price.'</td>';
						$body .= '</tr>';
						
						$total=$total+$total_price;
					}
					$body .= '</tbody>';
					$body .= '</table>';
					
					$body .= '<br>';
					$body .= '<b>Grand Total</b>: QR '.$total;
				}
				else {
					$body = '<p>Thank you for using our mobile services.<br /> Your order will be ready for takeaway in 30 minutes at the following address : <br /><br />Suhaim Bin Hamad Street, Opposite TGIF, C Ring Road, Bin Mahmoud</p>';
					$body .= '<table width="100%">';
					$body .= '<tbody>';
					$body .= '<tr>';
					$body .= '<th style="text-align:left;">Name</th>';
					$body .= '<th style="text-align:left;">Quantity</th>';
					$body .= '<th style="text-align:left;">Price</th>';
					$body .= '<th style="text-align:left;">total Price</th>';
					$body .= '</tr>';
					$total=0;
					for($i=1;$i<=$itemCount;$i++){
						$item_name = stripslashes($_POST["item_name_$i"]);
						$item_quantity = stripslashes($_POST["item_quantity_$i"]);
						$item_price = stripslashes($_POST["item_price_$i"]);
						$body .= '<tr>';
						$body .= '<td>'.$item_name.'</td>';
						$body .= '<td>'.$item_quantity.'</td>';
						$body .= '<td>QR '.$item_price.'</td>';
						$total_price=$item_quantity*$item_price;
						$body .= '<td>QR '.$total_price.'</td>';
						$body .= '</tr>';
						
						$total=$total+$total_price;
					}
					$body .= '</tbody>';
					$body .= '</table>';
					
					$body .= '<br>';
					$body .= '<b>Grand Total</b>: QR '.$total;
				}

				$mail->SetFrom("order@petite.com", "Petite Cafe");
				
				$mail->AddAddress($email, $client);

				$mail->Subject    = "Order $type Received";

				$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

				$mail->MsgHTML($body);

				if(!$mail->Send()) {
				  echo "Mailer Error: " . $mail->ErrorInfo;
				} else {
				  //echo "Message sent!";
				}
			}
		  ?><script>history.go(-1)</script><?php
		}
	}
}

?>