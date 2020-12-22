import React from 'react';
import Row from './row';
const TableBlockI = ({list,uid,removeIndivAss}) => {

    const renderRows = () => (
        list ? 
        list.map((row,i) =>(
            <tr>
            <button  
                className={"btn btn-block bg-gradient-danger"}
                type="button"
                onClick={()=> removeIndivAss(uid,row._id)}>
                Delete
            </button>
            <td> {row.name}</td>
            <td> {row.lastname}</td>
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

export default TableBlockI;