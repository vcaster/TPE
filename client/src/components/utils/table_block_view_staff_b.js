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
                <td className="meta-head3">START DATE</td>
                <td className="meta-head3">STAFF RATIO</td>
                <td className="meta-head3">UNIT</td>
            </tr>
            <tr className="item-row">
                <td><textarea style={{ width: '100%' }} defaultValue={new Date(props.date)} /></td>
                <td><textarea style={{ width: '100%' }} defaultValue={new String(props.ratio)} /></td>
                <td><textarea style={{ width: '100%' }} defaultValue={new String(props.address)} /></td>
            </tr>
        </tbody>
        </table> 
        <table className="rtable  rtable--flip">
                <thead>
                    <tr>
                        <th style={{height:'36px' }}>Date</th>
                        
                        <th style={{height:'36px' }}>Check the beginning of shift checklist</th>
                        
                        <th>Check the "Hot water temperature" before the beginning of shift (Bathroom and kitchen).</th>
                        
                        <th>Prepare dinner by 5 pm with the assitance of the individuals.</th>
                        
                        <th>Review Residential log book at the beginning of the shift.</th>
                        
                        <th>Ensure all residents have their 3pm and 7pm snack</th>
                        
                        <th style={{height:'36px' }}>Complete all IP and BP documentations</th>
                        
                        <th>Meet with the individuals to establish activities of choice for the upcoming week</th>
                        
                        <th>Document all activities of choice in progress notes</th>
                        
                        <th>Document completion of activities participated in activity logs (daily).</th>
                        
                        <th>Complete all residents progress notes daily</th>
                        
                        <th>Ensure unit is clean by the end of your shift</th>
                        
                        <th>Empty/Clean inside and outside of trashcans before the end of shift. Take out all trash.</th>
                        
                        <th>Clean all bathroom before the end of shift</th>
                        
                        <th style={{height:'36px'}}>Mop and Vacuum all floors</th>
                        
                        <th>Prepare lunch with the individuals before the end of shift</th>
                        
                        <th>Wash and put away all laundry before the end of shift</th>
                        
                        <th>Conduct Fire drills (by the 5th of every month)</th>
                        
                        <th style={{height:'36px'}}>Report all maintenance issues</th>
                        
                        <th style={{height:'36px'}}>Conduct vital signs and weight</th>
                        
                        <th>Report all incidences according to agency protocols</th>
                        
                        <th>And other duties that may assigned by supervisor</th>
                        
                        <th>Iron and prepare individuals clothes for the day program and work before the end of shift</th>
                        
                        <th style={{height:'36px'}}>Staff</th>
                        
                        <th style={{height:'42px'}}>Signature</th>
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
            props.size > 0 && props.size >= props.limit && props.formname == 'staff_desc_b_view'?
            
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