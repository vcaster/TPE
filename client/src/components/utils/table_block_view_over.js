import React from 'react';
import Row from './row';
import MyButton from './button';
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

        <React.Fragment>   
    <table id="meta3">
        <tbody>
            <tr>
            <td  className="meta-head3">NAME</td>
            <td  className="meta-head3">START DATE</td>
            </tr>
            <tr className="item-row">
            <td ><textarea style={{width: '100%'}} defaultValue={new String(props.individual)} /></td>
            <td ><textarea style={{width: '100%'}} defaultValue={new Date(props.date)} /></td>
            </tr>
        </tbody>
        </table>
        
        <div className="row">
               {renderRows()}
        </div>
        <table id="meta3">
            <tbody>
                  
            <tr id="prnt">
         {
            props.size >= 0 && props.size <= props.limit ?
            
                <td ><button onClick={() => props.loadMoremin()} className="btn btn-block btn-primary btn-lg float-right" type="button">Next</button></td>
            
            : null
        }
        {                
            props.size > 0 && props.size >= props.limit && props.formname == 'over_view'?
            
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