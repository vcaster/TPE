import React from 'react';
import Row from './row';
// import MyButton from './button';
import moment from 'moment'
const TableBlock = (props) => {

    const renderRows = () => (
        props.list ? 
        props.list.map((row,i) =>(
            <Row
                key={i}
                {...row}
                formname={props.formname}
            />
        ))
        :null
    )

    return (

            
           <tbody>
            <tr>
		       <td colSpan={5} className="meta-head3">INDIVIDUAL</td>
               <td colSpan={5} className="meta-head3">UNIT</td>
		  </tr>
		  
		  <tr className="item-row">
		      <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={new String(props.individual)}></textarea></td>
		      <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={new String(props.address)}></textarea></td>
		  </tr>
		  <tr>
		       <td colSpan={5} className="meta-head3">DATE</td>
		       <td colSpan={5} className="meta-head3">STAFF</td>
		  </tr>
		  
		  <tr className="item-row">
		      <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={new Date(props.date)}></textarea></td>
		      <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={new String(props.staff)}></textarea></td>
		  </tr>
		  <tr>
		      <td className="meta-head3" style={{ width: '15%' }}>DATE</td>
		      <td className="meta-head3">Amount Received</td>
		      <td className="meta-head3">Amount Spent</td>
		      <td  className="meta-head3">Out-Going Staff</td>
		      <td  className="meta-head3">In-coming Staff</td>
		      <td  className="meta-head3">Daily Balance</td>
		      <td  className="meta-head3">Checked By</td>
		      <td  className="meta-head3">Receipt</td>
		      <td  className="meta-head3">Comment</td>
		      <td  className="meta-head3">Accounts Clerk Verify</td>
		    </tr>       
               {renderRows()}
               <tr id="prnt">
             {
                props.size >= 0 && props.size <= props.limit ?
                
                    <td colSpan={2}><button onClick={() => props.loadMoremin()} className="btn btn-block btn-primary btn-lg float-right" type="button">Next</button></td>
                
                : null
            }
            {                
                props.size > 0 && props.size >= props.limit && props.formname == 'fund_sheet_view'?
                
                    <td colSpan={2}>
                    <button onClick={()=> props.loadMore()} className="btn btn-block btn-primary btn-lg float-right" type="button">Previous</button>
                </td>
                
                : null
            }
            </tr>
        </tbody>
    );
};

export default TableBlock;