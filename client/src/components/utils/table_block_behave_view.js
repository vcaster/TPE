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

            
           <tbody>
            <tr>
                <td colSpan={4} className="meta-head3">INDIVIDUAL</td>
                <td colSpan={5} className="meta-head3">SETTING</td>
            </tr>
            <tr className="item-row">
                <td colSpan={4}><textarea style={{ width: '100%' }} defaultValue={new String(props.indiv)} /></td>
                <td colSpan={5}><textarea style={{ width: '100%' }} defaultValue={new String(props.setting)} /></td>
            </tr>
            <tr>
		       <td colspan={9} className="meta-head3">START DATE</td>
		  </tr>
		  
		  <tr className="item-row">
		      <td colspan={9}><textarea style={{ width: '100%' }} defaultValue={new Date(props.date)} ></textarea></td>
		  </tr>
		  <tr>
		       <td colspan={9} className="meta-head3" style={{textAlign: "center"}}>TARGET BEHAVIOURS</td>
		  </tr>
                                                    
            <tr>
		      <td className="meta-head3" style={{width: '15%'}}>DATE</td>
		      <td className="meta-head3">TIME BEGIN</td>
		      <td className="meta-head3">TIME END</td>
		      <td  className="meta-head3">Inappropriate Snacking</td>
		      <td  className="meta-head3">Property Destruction</td>
		      <td  className="meta-head3">Vocal Agitation</td>
		      <td  className="meta-head3">SIB</td>
		      <td  className="meta-head3">Elopement</td>
		      <td  className="meta-head3">Severity Ratiing</td>
		  </tr>       
               {renderRows()}
               <tr id="prnt">
             {
                props.size >= 0 && props.size <= props.limit ?
                
                    <td colSpan={2}><button onClick={() => props.loadMoremin()} className="btn btn-block btn-primary btn-lg float-right" type="button">Next</button></td>
                
                : null
            }
            {                
                props.size > 0 && props.size >= props.limit && props.formname == 'behave_sheet_view'?
                
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