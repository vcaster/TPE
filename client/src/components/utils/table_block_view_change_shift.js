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
            <td ><textarea style={{width: '100%'}} defaultValue={new Date(props.date)} /></td>
            </tr>
            <tr>
            <td  className="meta-head3">UNIT</td>
            </tr>
            <tr className="item-row">
            <td ><textarea style={{width: '100%'}} defaultValue={new String(props.address)} /></td>
            </tr>
        </tbody>
        </table>
        <table className="rtable  rtable--flip">
                <thead>
                    <tr>
                    <th style={{height:'36px' }}>Date</th>                    
                    <th style={{height:'36px' }}>Shift</th>                    
                    <th>All individuals accounted for &amp; in good status</th>                    
                    <th style={{height:'36px' }}><strong>MEDICATION CABINET/RECORDS</strong></th>                    
                    <th style={{height:'36px' }}>Medication cabinet neat and well organised</th>                    
                    <th style={{height:'36px' }}>PMOF's current, signed &amp; dated</th>      
                    <th>All medications entered on MAR's as seen in PMOF</th>               
                    <th style={{height:'36px' }}>Pills administered intiated on blister pack</th>                    
                    <th>Medication errors/ommission. RN notification documented</th>                    
                    <th style={{height:'36px' }}>Controlled drugs under double lock</th>                    
                    <th>Controlled drug count accurate, count sheet signed by previous shift</th>                    
                    <th>New Medications and all PRN\'s accompanied with PMOF</th>                    
                    <th>First Aid kit with enough supplies and with no item missing</th>                    
                    <th>Medication cabinet locked and key handed over</th>                    
                    <th style={{height:'36px' }}><strong>OTHER RECORDS</strong></th>                    
                    <th style={{height:'36px' }}>Behaviour, GOAL charts recorded</th>                    
                    <th>Fluid intake, BM, AON log, Siezure Charts all updated</th>                    
                    <th style={{height:'36px' }}>Nurse Contact Log (if applicable)</th>                    
                    <th>Food supply adequate, appropriate as per menu</th>                    
                    <th>Hygiene items/linen supply adequate (if NOT, write report)</th>                    
                    <th>Cleaning/Laundry supplies adequate (if NOT, write report)</th>  
                    <th style={{height:'36px' }}><strong>STATE OF UNIT</strong></th>                    
                    <th style={{height:'36px' }}>ALU: Living Room-neat &amp; clean. Beds made.</th> 
                    <th style={{height:'36px' }}>Kitchen: Clean &amp; Neat</th>                    
                    <th style={{height:'36px' }}>Individual Rooms: Neat &amp; Clean Beds made.</th> 
                    <th style={{height:'36px' }}>Laundry Completed.</th>                    
                    <th>Water temperature checked &amp; not above 110F</th> 
                    <th>All unit chores compeleted, Trash removed</th>                    
                    <th>Maintenance request/repairs? (write report)</th> 
                    <th>Incident Report if any during shift - completed &amp; reported</th>                    
                    <th style={{height:'36px' }}><strong>VEHICLE (all staff to check before accepting report)</strong></th> 
                    <th style={{height:'36px' }}>Vehicle FREE of unreported damage</th>                    
                    <th style={{height:'36px' }}>Vehicle mileage, Log Sheet recorded</th>  
                    <th>Vehicle parked in assigned location, Key &amp; Log book in Unit</th>                 
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
            props.size > 0 && props.size >= props.limit && props.formname == 'change_shift_view'?
            
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