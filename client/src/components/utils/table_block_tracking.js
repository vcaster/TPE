import React from 'react';
import Row from './row';
import MyButton from './button';
const TableBlock = (props) => {

    const renderRows = () => (
        props.list ? 
        props.list.map((row,i) =>(
            // props.list2.map((row2,i) =>(
            <Row
                key={i}
                {...row}                
                // {...row2}
                formname={props.formname}
            />
        ))
        :null
    )

    return (

            
           <tbody>
            <tr>
                <td colSpan={3} className="meta-head3">INDIVIDUAL</td>
                <td colSpan={5} className="meta-head3">LOCATION</td>
            </tr>
            <tr className="item-row">
                <td colSpan={3}>.</td>
                <td colSpan={5}>.</td>
            </tr>
            {/* <tr>
		       <td colspan={9} className="meta-head3">INIDIVIDUAL</td>
		  </tr>
		  
		  <tr className="item-row">
		      <td colspan={9}><textarea style={{ width: '100%' }} defaultValue={"."}></textarea></td>
		  </tr> */}
		  {/* <tr>
		       <td colspan={9} className="meta-head3" style={{textAlign: "center"}}>TARGET BEHAVIOURS</td>
		  </tr> */}
                                                    
            <tr>
		      {/* <td className="meta-head3" style={{width: '15%'}}>DATE</td> */}
		      <td className="meta-head3">Service</td>
		      <td className="meta-head3">Frequency</td>
		      <td  className="meta-head3">Current</td>
		      <td  className="meta-head3">Follow Up</td>
		      <td  className="meta-head3">Next Appt</td>
		  </tr>       
               {renderRows()}
               <tr id="prnt">
               <td ><button onClick={() => props.createjsWord()} className="btn btn-block btn-primary btn-lg float-right" type="button">Export</button></td>
            </tr>
        </tbody>
    );
};

export default TableBlock;