require('dotenv').config();
const comp_img = process.env.COMP_IMG;
const comp_info = process.env.COMP_INFO;
module.exports = ({ address,
					staff, 
					createdAt, 
					individual, 
					locfire, 
					evactime, 
					exitdoor, 
					rallypoint, 
                    stove, 
                    light,
                    firstfloorf,
                    secondfloorf,
                    basementf,
                    firstfloors,
                    secondfloors,
                    basements,
                    firstaid,
                    tag,
                    comment,
                    staffreport,
                    supervisorsignimg,
                    }) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
	const full = month+"-"+day+"-"+year

return `

<img src="${comp_img}" alt="logo" style="display: block; margin-left: auto; margin-right: auto; width: 50%;" />
	<textarea style="display: block; margin-left: auto; margin-right: auto; width: 100%; text-align: center; padding: 20px 0" >${comp_info}</textarea>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Editable Invoice</title>
	


</head>

<body>

	<style type="text/css">
		#page-wrap { width: 800px; margin: 0 auto; }

textarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }
table { border-collapse: collapse; }
table td, table th { border: 1px solid black; padding: 5px; }

#header { height: 15px; width: 100%; margin: 20px 0 10px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0 10px 0; }
#header2 { height: 15px; width: 100%; margin: 10px 0 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 10px 0 20px 0; }

#address { width: 250px; height: 150px; float: left; }
#customer { overflow: hidden; }

#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }
#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }
#logoctr { display: none; }
#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }
#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}
#logohelp input { margin-bottom: 5px; }
.edit #logohelp { display: block; }
.edit #save-logo, .edit #cancel-logo { display: inline; }
.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }
#customer-title { font-size: 20px; font-weight: bold; float: left; }

#meta { margin-top: 1px; width: 48%; float: right; }
#meta td { text-align: right;  }
#meta td.meta-head { text-align: left; background: #eee; }
#meta td textarea { width: 100%; height: 20px; text-align: right; }

#meta2 { margin-top: 1px; width: 48%; float: left; }
#meta2 td { text-align: right;  }
#meta2 td.meta-head2 { text-align: left; background: #eee; }
#meta2 td textarea { width: 100%; height: 20px; text-align: right; }

#meta3 { margin-top: 1px; width: 100%; float: left; }
#meta3 td { text-align: right;  }
#meta3 td.meta-head3 { text-align: left; background: #eee; font-size: 10px;}
#meta3 td textarea { width: 100%; height: 25px; text-align: left; }

#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }
#items th { background: #eee; }
#items textarea { height: 15px; }
#meta3 textarea.tx {  }
#items tr.item-row td {vertical-align: top; }
#items td.description { width: 20px; }
#items td.item-name { font-size: 12px; width: 250px; }
#items td.description textarea, #items td.item-name textarea { width: 100%; }
#items td.total-line { border-right: 0; text-align: right; }
#items td.total-value { border-left: 0; padding: 10px; }
#items td.total-value textarea { height: 20px; background: none; }
#items td.balance { background: #eee; }
#items td.blank { border: 0; }

#terms { text-align: center; margin: 20px 0 0 0; }
#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }
#terms textarea { width: 100%; text-align: center;}

textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }
	</style>

	<div id="page-wrap">


		<textarea id="header2">Fire Safety</textarea>
		<div id="identity">
		
            

            
		
		</div>
		
		<div style="clear:both"></div>
		
		
		
		<table id="meta3">

		<tbody><tr>
		       <td colspan="" class="meta-head3">ADDRESS</td>
               <td colspan="3" class="meta-head3">DATE</td>
		  </tr>
		  
		  <tr class="item-row">
		      <td ><textarea style="width:100%;">${address.address}</textarea></td>
		      <td ><textarea style="width:100%;">${new Date(createdAt)}</textarea></td>
		  </tr>
		  		
		</tbody>
		
		  <tbody><tr>
		       <td class="meta-head3">PARTICIPATING STAFF</td>
               <td class="meta-head3">PARTICIPATING INDIVIDUALS</td>

		  </tr>
		  
		  <tr class="item-row">
		      <td ><textarea style="width:100%;">${staff}</textarea></td>
		      <td ><textarea style="width:100%;">${individual}</textarea></td>
		  </tr>
		  		
		</tbody>

		<tbody><tr>
		       <td colspan="2" class="meta-head3">HYPOTHETICAL LOCATION OF FIRE</td>
		  </tr>
		  
		  <tr class="item-row">
		      <td colspan="2" ><textarea style="width:100%;">${locfire}</textarea></td>
		  </tr>
		  		
		</tbody>

		<tbody><tr>
		       <td class="meta-head3">EXIT DOOR USED</td>
               <td class="meta-head3">LOCATION OF RALLY POINT WHILE OUTSIDE</td>
		  </tr>
		  
		  <tr class="item-row">
		      <td  ><textarea style="width:100%;">${exitdoor}</textarea></td>
		      <td ><textarea style="width:100%;">${rallypoint}</textarea></td>
		  </tr>
		  		
		</tbody>

	</table>

		<table id="items">
		
		  <tbody><tr>
		      <th style="text-align: left;" colspan="5">SAFETY CHECKS</th>
		  </tr>
		 		  		
		</tbody>
		<tbody><tr>
		      <th colspan="5">KITCHEN</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">Kitchen stove burners - all 4 are working?</td>
		      <td class="description"><textarea>${stove}</textarea></td>
		  </tr>		  		
		</tbody>
		<tbody><tr>
		      <th colspan="5">FLASH LIGHT</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">Flash light is in the top drawer of file cabinet or on top of fridge?</td>
		      <td class="description"><textarea>${light}</textarea></td>
		  </tr>
		 </tbody>
		<tbody><tr>
		      <th colspan="5">FIRE EXTINGUISHERS</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">First Floor?</td>
		      <td class="description"><textarea>${firstfloorf}</textarea></td>
		  </tr>
		  <tr class="item-row">
		      <td class="item-name">Second Floor?</td>
		      <td class="description"><textarea>${secondfloorf}</textarea></td>
		  </tr>
		  <tr class="item-row">
		      <td class="item-name">Basement?</td>
		      <td class="description"><textarea>${basementf}</textarea></td>
		  </tr>		  		
		</tbody>
		<tbody><tr>
		      <th colspan="5">SMOKE ALARMS</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">First Floor?</td>
		      <td class="description"><textarea>${firstfloors}</textarea></td>
		  </tr>
		  <tr class="item-row">
		      <td class="item-name">Second Floor?</td>
		      <td class="description"><textarea>${secondfloors}</textarea></td>
		  </tr>
		  <tr class="item-row">
		      <td class="item-name">Basement?</td>
		      <td class="description"><textarea>${basements}</textarea></td>
		  </tr>		  		
		</tbody>
		<tbody><tr>
		      <th colspan="5">FIRST AID</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">First Aid Kit - in the file cabinet?</td>
		      <td class="description"><textarea>${firstaid}</textarea></td>
		  </tr>
		</tbody>
		<tbody><tr>
		      <th colspan="5">FIRE EXTINGUISHER TAG</th>
		  </tr>
		 		  		
		</tbody>
		<tbody>		  
		  <tr class="item-row">
		      <td class="item-name">Fire extinguisher tag/initial dated?</td>
		      <td class="description"><textarea>${tag}</textarea></td>
		  </tr>
		</tbody>
		<tbody><tr>
		      <th colspan="5">COMMENTS</th>
		  </tr>	
		  <tr>
		  	<td colspan="2"><textarea  style="width: 100%; height: 40px">${comment}</textarea></td>
		  </tr>		 		  		
		</tbody>
	</table>
	<table id="meta3">

		<tbody><tr>
		       <td colspan="" class="meta-head3">NAME OF STAFF COMPLETING THE AUDIT</td>
               <td colspan="3" class="meta-head3">SUPERVISOR'S SIGNATURE</td>
		  </tr>
		  
		  <tr class="item-row">
		      <td ><textarea style="width:100%;">${staffreport.name} ${staffreport.lastname}</textarea></td>
              <td><img style="background-size: 200px 50px; width: 200px; height: 50px; background-color: white;" src="${supervisorsignimg}" alt="signature"></td>
              </tr>
		  		
		</tbody>
		
	</table>
			
	
	</div>
	
</body>

</html>
    `;
};
