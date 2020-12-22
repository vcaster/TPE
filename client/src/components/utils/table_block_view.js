import React from 'react';
import Row from './row';
// import MyButton from './button';
// import moment from 'moment'
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
                <td colSpan={2} className="meta-head3">INDIVIDUAL</td>
                <td colSpan={2} className="meta-head3">UNIT</td>
            </tr>
            <tr className="item-row">
                <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={new String(props.individual)} /></td>
                <td colSpan={2}><textarea style={{ width: '100%' }} defaultValue={new String(props.address)} /></td>
            </tr>
                                                    
            <tr>
                <td className="meta-head3">DATE</td>
                <td className="meta-head3">PLANNED ACTIVITIES<br />(Refer to interest &amp; preference in IP Goals)</td>
                <td className="meta-head3">STAFF INITIALS</td>
                <td className="meta-head3">COMPLETED</td>
            </tr>        
               {renderRows()}
               <tr id="prnt">
             {
                props.size >= 0 && props.size <= props.limit ?
                
                    <td colSpan={2}><button onClick={() => props.loadMoremin()} className="btn btn-block btn-primary btn-lg float-right" type="button">Next</button></td>
                
                : null
            }
            {                
                props.size > 0 && props.size >= props.limit && props.formname == 'activity_log_view'?
                
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