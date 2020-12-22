import React from 'react';
import Row from './row';
const TableBlock = (props) => {

    const renderRows = () => (
        props.list ? 
        props.list.map((row,i) =>(
            <Row
                key={i}
                {...row}
                formname={props.formname}
                isAdmin={props.isAdmin}
            />
        ))
        :null
    )

    return (
        <React.Fragment>
            {renderRows()}
            {
                props.size > 0 && props.size >= props.limit ?
            <tr>
                <td colSpan={5}><button onClick={()=> props.loadMore()} className="btn btn-block btn-primary btn-lg float-right" type="button">Load More</button></td>
            </tr>
            :null
            }
            
        </React.Fragment>
    );
};

export default TableBlock;