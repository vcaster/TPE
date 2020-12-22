import React, { memo } from 'react';
import { Link } from 'react-router-dom'

const MyButton = (props) => {

    const buttons = () => {
        let template = '';
    
        switch(props.type){
            case "default":
                template = <Link                    
                    to={props.linkTo}
                    {...props.addStyles}
                ><button  
                className={!props.altClass ? 'btn btn-block bg-gradient-primary': props.altClass}
                type="button">
                    {props.title}
                    </button>
                </Link>
            break;
            case "default-group":
                template = <Link                    
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    <button  
                className={!props.altClass ? 'btn btn-default': props.altClass}
                type="button">
                    {props.title}
                    </button>
                </Link>
            break;            
            case "default-a":
                template = <p className="mb-0"><Link
                    className={'text-center'}                 
                    to={props.linkTo}
                    {...props.addStyles}
                >
                  {props.title}  
                </Link></p>
            break;
            // case "bag_link":
            //     template = 
            //         <div className="bag_link"
            //             onClick={()=>{
            //                 props.runAction();
            //             }}
            //         >
            //             <FontAwesomeIcon
            //                 icon={faShoppingBag}
            //             />
    
            //         </div>
    
            // break;
            // case "add_to_cart_link":
            //     template = 
            //     <div className="add_to_cart_link"
            //     onClick={()=>{
            //         props.runAction();
            //     }}>
            //         <FontAwesomeIcon
            //                 icon={faShoppingBag}
            //             />
            //             Add to cart
            //     </div>
            // break;
            default:
                template='';
        }
        return template
    }
    

    return (
        <div>
            {buttons()}
        </div>
    );
};

export default MyButton;