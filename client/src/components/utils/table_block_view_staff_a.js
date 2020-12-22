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
    const renderComment = () => (
        props.list ? 
        props.list.map((row,i) =>(
            row.comment +" "
        ))
        :null
    )

    return (

        <React.Fragment>   
        <table id="meta3">
        <tbody>
            <tr>
                <td colSpan={2} className="meta-head3">START DATE</td>
            </tr>
            <tr className="item-row">
                <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={new Date(props.date)} /></td>
            </tr>
            <tr>
                <td className="meta-head3">STAFF RATIO</td>
                <td className="meta-head3">UNIT</td>
            </tr>
            <tr className="item-row">
                <td><textarea style={{ width: '100%' }} defaultValue={new String(props.ratio)} /></td>
                <td><textarea style={{ width: '100%' }} defaultValue={new String(props.address)} /></td>
            </tr>
        </tbody>
        </table> 
        <table className="rtable  rtable--flip">
                <thead>
                    <tr>
                    <th style={{height:'36px' }}>Date</th>                    
                    <th>Make sure the individual is dressed appropriately before leaving the unit</th>                    
                    <th style={{height:'36px' }}>Check the individual every 15-30 mins</th>                    
                    <th>Incontinent Individuals bed check is 1am, 3am and 5am</th>                    
                    <th>Clean and degrease oven/stove on Wednesday and Saturday</th>                    
                    <th>Clean arrange kitchen cabinets Monday and Friday</th>      
                    <th>Iron and prepare individuals clothes for the day program and work before the end of shift</th>               
                    <th>Ensure individual room is clean at all times</th>                    
                    <th style={{height:'36px' }}>Take out all trash</th>                    
                    <th>Clean all bathroom before the end of shift</th>                    
                    <th>Clean refrigerator and take out all 2 days old food</th>                    
                    <th style={{height:'36px' }}>Label all othen foods and container</th>                    
                    <th style={{height:'36px' }}>Mop and Vacuum all floors</th>                    
                    <th>Prethare breakfast and lunch for the individual</th>                    
                    <th>Wash and put away all laundry before the end of shift</th>                    
                    <th>Conduct Fire drills (by the 5th of every month)</th>                    
                    <th style={{height:'36px' }}>Report all maintenance issues</th>                    
                    <th>Check all paper work for completion (i.e IP MAR, Medications, Log progress report, change of shift, appiontments etc)</th>                    
                    <th style={{height:'36px' }}>Conduct vital signs and weight</th>                    
                    <th>Report all incidences according to agency protocols</th>                    
                    <th>And other duties that may assigned by supervisor</th>                    
                    <th style={{height:'36px' }}>Staff</th>                    
                    <th style={{height:'36px' }}>Signature</th>
                </tr>
            </thead>
            <tbody>
               {renderRows()}
            </tbody>
        </table>
        
            <table id="meta3">
                <tbody>
                    <tr>
                        <td colSpan={2} className="meta-head3">COMMENT</td>
                    </tr>
                    <tr className="item-row">
                        <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={renderComment()} /></td>
                    </tr>    
               <tr id="prnt">
             {
                props.size >= 0 && props.size <= props.limit ?
                
                    <td ><button onClick={() => props.loadMoremin()} className="btn btn-block btn-primary btn-lg float-right" type="button">Next</button></td>
                
                : null
            }
            {                
                props.size > 0 && props.size >= props.limit && props.formname == 'staff_desc_a_view'?
                
                    <td>
                    <button onClick={()=> props.loadMore()} className="btn btn-block btn-primary btn-lg float-right" type="button">Previous</button>
                </td>
                
                : null
            }
            </tr>
            
            </tbody>
            </table>   
        </React.Fragment> 
    );
};

export default TableBlock;