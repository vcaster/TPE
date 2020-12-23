require('dotenv').config();
const comp_img = process.env.COMP_IMG;
const comp_info = process.env.COMP_INFO;
module.exports = ({ name, individual, createdAt, shift, commactiv, goal1, goal2, sp1, behavgoals, nursingcomm }) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
	const full = month+"-"+day+"-"+year

return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Form</title>
	


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

#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }
#items th { background: #eee; }
#items textarea { width: 80px; height: 50px; }
#items tr.item-row td { border: 0; vertical-align: top; }
#items td.description { width: 300px; }
#items td.item-name { width: 175px; }
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
		<br>
		<img src="${comp_img}" alt="logo" style="display: block; margin-left: auto; margin-right: auto; width: 50%;" />
		<textarea style="display: block; margin-left: auto; margin-right: auto; width: 100%; text-align: center; padding: 20px 0" >${comp_info}</textarea>
		<textarea id="header2">DAILY PROGRESS NOTE</textarea>

		<div id="identity">
		
            

            
		
		</div>
		
		<div style="clear:both"></div>
		
		<div id="customer">

            

            <table id="meta">
                <tbody><tr>
                    <td class="meta-head">Staff Name</td>
                    <td><textarea>${name.name+' '+name.lastname}</textarea></td>
                </tr>
                <tr>

                    <td class="meta-head">Individual</td>
                    <td><textarea id="date">${individual.name+' '+individual.lastname}</textarea></td>
                </tr>
                
            </tbody></table>
		 <table id="meta2">
                <tbody><tr>
                    <td class="meta-head2">Date</td>
                    <td><textarea>${full}</textarea></td>
                </tr>
                <tr>

                    <td class="meta-head2">Shift</td>
                    <td><textarea id="date">${shift}</textarea></td>
                </tr>

            </tbody></table>

		</div>
		
		<table id="items">
		
		  <tbody><tr>
		      <th colspan="5">COMMUNITY INTEGRATION ACTIVITIES</th>
		  </tr>
		  
		  <tr class="item-row">
		      <td colspan="5"><textarea style="width:100%;">${commactiv}</textarea></td>
		  </tr>
		  		
		</tbody></table>

		<table id="items">
		
		  <tbody><tr>
		      <th colspan="5">GOALS/SUPPLEMENTAL PROCEDURES</th>
		  </tr>
		  
		  <tr class="item-row">
		      <th class="meta-head">Goal 1</th>
                    <td colspan="5"><textarea style="width:100%;">${goal1}</textarea></td>
		  </tr>
		  <tr class="item-row">
		      <th class="meta-head">Goal 2</th>
                    <td colspan="5"><textarea style="width:100%;">${goal2}</textarea></td>
		  </tr>
		  		
		</tbody></table>

		<table id="items">
		
		  <tbody><tr>
		      <th colspan="5">SP1: Attend medical apiontment</th>
		  </tr>
		  
		  <tr class="item-row">
		      <td colspan="5"><textarea style="width:100%;">${sp1}</textarea></td>
		  </tr>
		  		
		</tbody></table>

		<table id="items">
		
		  <tbody><tr>
		      <th colspan="5">BEHAVIOUR GOALS/NEW AND CHALLENGING GOALS</th>
		  </tr>
		  
		  <tr class="item-row">
		      <td colspan="5"><textarea style="width:100%;">${behavgoals}</textarea></td>
		  </tr>
		  		
		</tbody></table>

		<table id="items">
		
		  <tbody><tr>
		      <th colspan="5">NURSING COMMENTS</th>
		  </tr>
		  
		  <tr class="item-row">
		      <td colspan="5"><textarea style="width:100%;">${nursingcomm}</textarea></td>
		  </tr>
		  		
		</tbody></table>
	
	
	</div>
	
</body>

</html>
    `;
};
