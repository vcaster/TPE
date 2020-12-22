import React, { useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import {logoutUser} from '../actions/user_actions'
import logo from '../components/utils/logo.png'

const links = [
    {
        name: 'Dashboard',
        linkTo: '/user/dashboard',
        fa: 'nav-icon fas fa-tachometer-alt'
    },
    {
        name: 'Time Sheets',
        linkTo: '/forms/time_sheet_user',
        fa: 'nav-icon fas fa-file-invoice-dollar'
    },
    {
        name: 'Timeline',
        linkTo: '/forms/timeline_user',
        fa: 'nav-icon fas fa-clock'
    },
    {
        name: 'Chat <beta>',
        linkTo: '/chat',
        fa: 'nav-icon fas fa-comments'
    },    
    {
        name: 'Appointments <beta>',
        linkTo: '/forms/appointment_view',
        fa: 'nav-icon fas fa-calendar-alt'
    }, 
    {
        name: 'Change Password',
        linkTo: '/user/reset_password',
        fa: 'nav-icon fas fa-user-lock  '
    },
    // {
    //     name: 'User Information',
    //     linkTo: '/user/view_user/'+this.props.user.userData._id,
    //     fa: 'nav-icon fas fa-user-cog'
    // }
]

const formsUserDaily = [
    {
        name:'Daily Progress Note',
        linkTo: '/forms/daily_progress_note_add',
        header: 'Forms'
    },
    {
        name:'Safety Inspection',
        linkTo: '/forms/safety_inspection_add',
        header: 'Forms'
    },
    {
        name:'Activity Log',
        linkTo: '/forms/activity_log_add',
        header: 'Forms'
    },
    {
        name:'Staff Job Description (3PM)',
        linkTo: '/forms/staff_desc_b_add',
        header: 'Forms'
    },
    {
        name:'Staff Job Description (11PM)',
        linkTo: '/forms/staff_desc_a_add',
        header: 'Forms'
    },
    {
        name:'Individual Attendance',
        linkTo: '/forms/attendance_add',
        header: 'Forms'
    },
    {
        name:'Individual Funds Sheet',
        linkTo: '/forms/fund_sheet_add',
        header: 'Forms'
    },

]

const formsUserShift = [
    {
        name:'Change of Shift',
        linkTo: '/forms/change_shift_add',
        header: 'Forms'
    },
    {
        name:'Bowel Movement',
        linkTo: '/forms/bowel_add',
        header: 'Forms'
    }
]

const formsUserMontly = [
    {
        name:'Fire Safety',
        linkTo: '/forms/fire_safety_add',
        header: 'Forms'
    },
    {
        name:'30 Days Progress Note',
        linkTo: '/forms/days_prog_add',
        header: 'Forms'
    }

]

const formsUserOther = [
    {
        name:'House Meeting',
        linkTo: '/forms/house_meeting_add',
        header: 'Forms'
    },
    {
        name:'Overnight log',
        linkTo: '/forms/overnight_add',
        header: 'Forms'
    },
    {
        name:'Incident Report',
        linkTo: '/forms/incident_add',
        header: 'Forms'
    },
    {
        name:'Employee Statement',
        linkTo: '/forms/statement_add',
        header: 'Forms'
    }
]

const forms = [
    {
        name:'Daily Progress Note',
        linkTo: '/forms/daily_progress_note',
        header: 'Forms'
    },
    {
        name:'Activity Log',
        linkTo: '/forms/activity_log',
        header: 'Forms'
    },
    {
        name:'Safety Inspection',
        linkTo: '/forms/safety_inspection',
        header: 'Forms'
    },
    {
        name:'House Meeting',
        linkTo: '/forms/house_meeting',
        header: 'Forms'
    },
    {
        name:'Fire Safety',
        linkTo: '/forms/fire_safety',
        header: 'Forms'
    },
    {
        name:'30 Days Progress Note',
        linkTo: '/forms/days_prog',
        header: 'Forms'
    },
    {
        name:'Staff Description 11am',
        linkTo: '/forms/staff_desc_a',
        header: 'Forms'
    },
    {
        name:'Staff Description 3pm',
        linkTo: '/forms/staff_desc_b',
        header: 'Forms'
    },
    {
        name:'Change of Shift',
        linkTo: '/forms/change_shift',
        header: 'Forms'
    },
    {
        name:'Behaviour Data Sheet <Depre>',
        linkTo: '/forms/behave_sheet',
        header: 'Forms'
    },
    {
        name:'Funds Sheet',
        linkTo: '/forms/fund_sheet',
        header: 'Forms'
    },    
    {
        name:'Individual Attendance',
        linkTo: '/forms/attendance',
        header: 'Forms'
    },
    {
        name:'Overnight Log',
        linkTo: '/forms/overnight',
        header: 'Forms'
    },
    {
        name:'Bowel Movement',
        linkTo: '/forms/bowel',
        header: 'Forms'
    },
    {
        name:'Training',
        linkTo: '/forms/training',
        header: 'Forms'
    },
    {
        name:'Incident Report',
        linkTo: '/forms/incident',
        header: 'Forms'
    },
    {
        name:'Employee Statement',
        linkTo: '/forms/statement',
        header: 'Forms'
    },


]

const admin = [
    {
        name: 'Users',
        linkTo: '/user/users',
        fa: 'nav-icon fas fa-users'
    },
    {
        name: 'Individuals',
        linkTo: '/individuals/individual',
        fa: 'nav-icon fas fa-user'
    },       
    {
        name:'Medical Tracking <beta>',
        linkTo: '/forms/tracking',
        fa: 'nav-icon fas fa-binoculars'
    },
    {
        name: 'Time Sheets',
        linkTo: '/forms/time_sheet',
        fa: 'nav-icon fas fa-file-invoice-dollar'
    },
    {
        name: 'Address',
        linkTo: '/forms/address',
        fa: 'nav-icon fas fa-map-marked-alt'
    },
    {
        name: 'Message Board',
        linkTo: '/messages/message',
        fa: 'nav-icon fas fa-mail-bulk'
    },
    {
        name: 'Timeline',
        linkTo: '/forms/timeline',
        fa: 'nav-icon fas fa-clock'
    }
]

const adminA = [
    {
        name: 'Time Sheets',
        linkTo: '/forms/time_sheet',
        fa: 'nav-icon fas fa-file-invoice-dollar'
    },
    {
        name: 'Message Board',
        linkTo: '/messages/message',
        fa: 'nav-icon fas fa-mail-bulk'
    },
    // {
    //     name: 'Timeline',
    //     linkTo: '/forms/timeline',
    //     fa: 'nav-icon fas fa-clock'
    // }
]

const adminQ = [
    {
        name:'Incident Report',
        linkTo: '/forms/incident',
        fa: 'nav-icon fas fa-copy'
    },
    {
        name:'Employee Statement',
        linkTo: '/forms/statement',
        fa: 'nav-icon fas fa-user-edit'
    },
    // {
    //     name: 'Message Board',
    //     linkTo: '/messages/message',
    //     fa: 'nav-icon fas fa-mail-bulk'
    // },

]

const adminSs = [    
    {
        name: 'Message Board',
        linkTo: '/messages/message',
        fa: 'nav-icon fas fa-mail-bulk'
    },

]

const adminS = [
    {
        name:'Daily Progress Note',
        linkTo: '/forms/daily_progress_note',
        header: 'Forms'
    },
    {
        name:'Activity Log',
        linkTo: '/forms/activity_log',
        header: 'Forms'
    },
    {
        name:'Safety Inspection',
        linkTo: '/forms/safety_inspection',
        header: 'Forms'
    },
    {
        name:'House Meeting',
        linkTo: '/forms/house_meeting',
        header: 'Forms'
    },
    {
        name:'Fire Safety',
        linkTo: '/forms/fire_safety',
        header: 'Forms'
    },
    {
        name:'30 Days Progress Note',
        linkTo: '/forms/days_prog',
        header: 'Forms'
    },
    {
        name:'Staff Description 11am',
        linkTo: '/forms/staff_desc_a',
        header: 'Forms'
    },
    {
        name:'Staff Description 3pm',
        linkTo: '/forms/staff_desc_b',
        header: 'Forms'
    },
    {
        name:'Change of Shift',
        linkTo: '/forms/change_shift',
        header: 'Forms'
    },
    {
        name:'Funds Sheet',
        linkTo: '/forms/fund_sheet',
        header: 'Forms'
    },    
    {
        name:'Individual Attendance',
        linkTo: '/forms/attendance',
        header: 'Forms'
    },
    {
        name:'Overnight Log',
        linkTo: '/forms/overnight',
        header: 'Forms'
    },
    {
        name:'Bowel Movement',
        linkTo: '/forms/bowel',
        header: 'Forms'
    }
]







    
const UserLayout = (props) => {

    var owl = {
        href: "/view_user/"+props.user.userData._id
      };
    useEffect(() => {
        document.getElementsByTagName('body')[0].className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed';
    });

    const logoutHandler = () =>{
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }

//  generateLogout = () => (
//     <li className="nav-item">
//                                 <a onClick={()=>this.logoutHandler()} className="nav-link">
//                                     <i className="nav-icon fas fa-th" />
//                                     <p>
//                                         Widgets
//                                  <span className="right badge badge-danger">New</span>
//                                     </p>
//                                 </a>
//                             </li>

// )

const generateLinks = (links) =>(
links !== [] ?

    links.map((item,i)=>(
        <li className="nav-item">
                                <Link to={item.linkTo} key={i} className="nav-link">
                                    {<i className={item.fa} />}
                                    <p>
                                    {item.name}
                                    </p>
                             </Link>
                            </li>
    ))
        : null
    
)

const generatetreeview = (links) =>(
            links.map((item,i)=>(
              <li className="nav-item">
              <Link to={item.linkTo} key={i} className="nav-link">
                                    <i className="far fa-circle nav-icon" />
                                    <p>
                                    {item.name}
                                    </p>
                             </Link>
              </li>
              ))

)


const toggle = () => {

    const element = document.getElementById("formz");
    const x = document.getElementById("disp");
    if (x.style.display == "none") {
        x.style.display = "block";
        element.classList.add("menu-open");
    } else if (x.style.display == "block") {
        x.style.display = "none";
        element.classList.remove("menu-open");
    }
}

const togglez = () => {

    const elementz = document.getElementById("formzz");
    const xz = document.getElementById("dispz");
    if (xz.style.display == "none") {
        xz.style.display = "block";
        elementz.classList.add("menu-open");
    } else if (xz.style.display == "block") {
        xz.style.display = "none";
        elementz.classList.remove("menu-open");
    }
}

const toggle1 = () => {

    const element1 = document.getElementById("formz1");
    const x1 = document.getElementById("disp1");
    if (x1.style.display == "none") {
        x1.style.display = "block";
        element1.classList.add("menu-open");
    } else if (x1.style.display == "block") {
        x1.style.display = "none";
        element1.classList.remove("menu-open");
    }
}

const toggle2 = () => {

    const element2 = document.getElementById("formz2");
    const x2 = document.getElementById("disp2");
    if (x2.style.display == "none") {
        x2.style.display = "block";
        element2.classList.add("menu-open");
    } else if (x2.style.display == "block") {
        x2.style.display = "none";
        element2.classList.remove("menu-open");
    }
}

const toggle3 = () => {

    const element3 = document.getElementById("formz3");
    const x3 = document.getElementById("disp3");
    if (x3.style.display == "none") {
        x3.style.display = "block";
        element3.classList.add("menu-open");
    } else if (x3.style.display == "block") {
        x3.style.display = "none";
        element3.classList.remove("menu-open");
    }
}


    return (
        <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="#" className="brand-link">
                    <img src={logo} alt="AdminLTE Logo" className="brand-imag elevation-3"  style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "75%"}} />
                        {/* <span className="brand-text font-weight-light">COMPANY</span> */}
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="https://via.placeholder.com/160x160?text=NO+IMAGE" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href={owl.href} className="d-block">{props.user.userData.name+" "+props.user.userData.lastname}</a>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                {generateLinks(links)}
                                
                                { props.user.userData.isUser ? 
                                <li class="nav-item"><a class="nav-link" href={owl.href}><i class="nav-icon fas fa-user-cog"></i><p>User Profile</p></a></li>
                                : null
                                }

                                { props.user.userData.isUser ? 
                                <li className="nav-header">Forms</li>
                                : null
                                }
                                { props.user.userData.isUser ? 
                                <li id="formz" onClick={()=>toggle()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Every Shift Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="disp" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(formsUserShift)}
                                    </ul>
                                

                                </li>
                                : null
                                }

                                { props.user.userData.isUser ? 
                                <li id="formz1" onClick={()=>toggle1()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Daily Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="disp1" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(formsUserDaily)}
                                    </ul>
                                

                                </li>
                                : null
                                }

                                { props.user.userData.isUser ? 
                                <li id="formz2" onClick={()=>toggle2()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Monthly Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="disp2" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(formsUserMontly)}
                                    </ul>
                                

                                </li>
                                : null
                                }

                                { props.user.userData.isUser ? 
                                <li id="formz3" onClick={()=>toggle3()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Other Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="disp3" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(formsUserOther)}
                                    </ul>
                                

                                </li>
                                : null
                                }
                                
                                
                                { props.user.userData.isAdmin && props.user.userData.isSadmin ? 
                                <li className="nav-header">Admin</li>
                                : null
                                }
                                { props.user.userData.isAdmin && props.user.userData.isSupervisor ? 
                                <li className="nav-header">Supervisor</li>
                                : null
                                }
                                { props.user.userData.isAdmin && props.user.userData.isQa ? 
                                <li className="nav-header">Quality Assurance</li>
                                : null
                                }
                                { props.user.userData.isAdmin && props.user.userData.isAccount ? 
                                <li className="nav-header">Accountant</li>
                                : null
                                }
                                { props.user.userData.isAdmin && props.user.userData.isSadmin ? 
                                <li id="formz" onClick={()=>toggle()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="disp" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(forms)}
                                    </ul>
                                

                                    </li>
                                    : null
                                }

                                { props.user.userData.isAdmin && props.user.userData.isSupervisor ? 
                                <li id="formzz" onClick={()=>togglez()} className="nav-item has-treeview">
                                    <a className="nav-link" >
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Forms
                                        <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                
                                
                                   <ul id="dispz" className="nav nav-treeview" style={{display: 'none'}}>
                                    {generatetreeview(adminS)}
                                    </ul>
                                

                            </li>
                            : null
                        }

                        { props.user.userData.isAdmin && props.user.userData.isSadmin ?
                        generateLinks(admin)
                        :
                        null
                        }

                        { props.user.userData.isAdmin && props.user.userData.isAccount ?
                        generateLinks(adminA)
                        :
                        null
                        }
                        {/* { props.user.userData.isAdmin && props.user.userData.isSupervisor ?
                        generateLinks(adminSs)
                        :
                        null
                        } */}
                        { props.user.userData.isAdmin && props.user.userData.isQa ?
                        generateLinks(adminQ)
                        :
                        null
                        }
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                
            <div className="content-wrapper">
                {props.children}                
            </div>
            </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(UserLayout));