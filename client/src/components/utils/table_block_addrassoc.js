import React from 'react';
import Row from './row';
const TableBlockA = ({list,uid,removeAddrAss}) => {

    const renderRows = () => (
        list ? 
        list.map((row,i) =>(
            <tr>
            <button  
                className={"btn btn-block bg-gradient-danger"}
                type="button"
                onClick={()=> removeAddrAss(uid,row._id)}>
                Delete
            </button>
            <td> {row.name}</td>
        </tr>  
        ))
        :null
    )

    return (
        <tbody>
            {renderRows()}            
        </tbody>
    );
};

export default TableBlockA;