import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
// import MyButton from '../../components/utils/button';
import { connect } from 'react-redux';
import { getIndiv, getBowelToView, adLog } from '../../actions/form_actions';
import CollapseCheckbox from '../../components/utils/collapseCheckbox'
import TableBlock from '../../components/utils/table_block_view_bowel'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import CircularProgress from '@material-ui/core/CircularProgress'
import {COMPANY_INFO} from '../../components/utils/misc'
// import styles from './styles.module.css'

import Retrive from '../../components/utils/retrive'
import logo from '../../components/utils/logo.png'

// const MySwal = withReactContent(Swal)

class ViewBowel extends Component {

    state = {
        loading: true,
        grid:'',
        limit:36,
        skip:0,
        indiv: null,
        date: null,
        filters:{
            individual: []
        }
    }
    
    
    print = () => {
        document.getElementById("prnt").style.display = "none";
        document.getElementById("vew").style.display = "none";
        window.addEventListener("load", window.print());
        setTimeout(()=>{
            document.getElementById("prnt").style.display = "";
            document.getElementById("vew").style.display = "";
        },1)
        
    }
    createjsPdf = () => {
    //     const input = document.body;
    //     html2canvas(input)
    //     .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'JPEG', 20, 60);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("download.pdf");
    //   });

    alert("Click Print then choose desitination \'Save as PDF\' then save");

    // html2canvas(document.body).then(function(canvas){
    //     var wid = 0
    //     var hgt = 0
    //     var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
    //     var hratio = hgt/wid
    //     var doc = new jsPDF('p','pt','letter');
    //     var width = doc.internal.pageSize.width;    
    //     var height = width * hratio
    //     doc.addImage(img,'JPEG',20,20, width+30, height);
    //     doc.save('Test.pdf');
    // });


    }

    componentDidMount() {
        document.getElementsByTagName("footer")[0].style.display = "none";

        // const id = this.props.match.params.id;
        this.props.dispatch(adLog(this.props.user.userData._id,"Viewed Bowel Movment Chart",null,"/overnight_view",'view')).then(response =>{});
        // this.props.dispatch(getOverId(id)).then(response=>{
            
        //     if(this.props.form.form){
        //         this.setState({
        //         loading: false
        //             })
            
        //     };
        // });
        console.log(this.state.filters)
        if(this.props.user.userData.isSadmin){
        this.props.dispatch(getBowelToView(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )).then(response => {
            if (this.props.form.articles) {
                this.setState({
                    loading: false,
                    indiv: this.props.form.indiv,
                    date: this.props.form.date
                })
                // this.downloadIntoServer(this.props.form.form)
                // this.props.dispatch(readBowel(this.props.form.form._id));
            }
        });
        console.log(this.state.filters)
        this.props.dispatch(getIndiv());

    }else{
        this.props.form.articles = [];
        this.props.form.Size = 0;
        this.setState({
            loading:false,
            indiv: "",
            date: ""
        })
}
}
    componentWillUnmount(){
        document.getElementsByTagName("footer")[0].style.display = "";
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
        // if(category === "price"){
        //     let priceValues = this.handlePrice(filters);
        //     newFilters[category] = priceValues
        // }

        this.showFilteredResults(newFilters)

        this.setState({
            filters:newFilters,
            indiv: this.props.form.indiv,
            date: this.props.form.date
        })
    }

    showFilteredResults = (filters) => {
        if(filters['individual'] == "" &&  this.props.user.userData.isSupervisor){
            console.log(filters['individual'])
            this.props.form.articles = [];
            this.props.form.Size = 0;
            this.props.form.date = "";
            this.props.form.indiv = "";

        }
        else {
        this.props.dispatch(getBowelToView(
            0,
            this.state.limit,
            filters)).then(()=>{
                this.setState({
                    skip:0,
                    indiv: this.props.form.indiv,
                    date: this.props.form.date
                })
            })
        }
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        console.log(this.props.form.articles)
        this.props.dispatch(getBowelToView(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.form.articles
        )).then(()=>{
            this.setState({
                skip,
                indiv: this.props.form.indiv,
                date: this.props.form.date
            })
        })

    }

    loadMoreCardsMin = () => {
        let skip = this.state.skip - this.state.limit;
        console.log(this.props.form.articles)
        this.props.dispatch(getBowelToView(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.form.articles
        )).then(()=>{
            this.setState({
                skip,
                indiv: this.props.form.indiv,
                date: this.props.form.date
            })
        })

    }



    render(){
    const title = "Bowel Movment Chart";
            if (this.state.loading) {
                return (
                <Retrive/>
            );
            }

    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>View {title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">

                        <div className="card card-primary" id="vew">
                                <div className="card-header">
                                    <h3 className="card-title">Filters</h3>
                                    <div className="card-tools">
                                        <button className="btn btn-tool" type="button" data-card-widget="collapse"><i className="fas fa-plus" />
                                        </button>
                                    </div>
                                    {/* /.card-tools */}
                                </div>
                                {/* /.card-header */}
                                <div className="card-body" style={{ display: 'block' }}>
                                    {this.props.user.userData.isSupervisor ?
                                    <CollapseCheckbox
                                        initState={true}
                                        title="Individual"
                                        list={this.props.user.userData.individual}
                                        handleFilters={(filters)=>this.handleFilters(filters,'individual')}
                                    />
                                    :null
                                    }
                                    {this.props.user.userData.isSadmin ?
                                    <CollapseCheckbox
                                        initState={false}
                                        title="Individual"
                                        list={this.props.form.individual}
                                        handleFilters={(filters)=>this.handleFilters(filters,'individual')}
                                    />
                                    :null
                                    }
                                        </div>
                                {/* /.card-body */}
                            </div>

                            <div className="invoice p-3 mb-3">
                                <div className="row" id="divToPrint">
                                <div className="col-12">
                                        <div>
                                        <style type="text/css" dangerouslySetInnerHTML={{__html: "\n\t\t#page-wrap { width: 800px; margin: 0 auto; }\n\ntextarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }\ntable { border-collapse: collapse; }\ntable td, table th { border: 1px solid black; padding: 5px; }\n\n#header { height: 15px; width: 100%; margin: 20px 0 10px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 20px 0 10px 0; }\n#header2 { height: 15px; width: 100%; margin: 10px 0 20px 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 9px; padding: 10px 0 20px 0; }\n\n#address { width: 250px; height: 150px; float: left; }\n#customer { overflow: hidden; }\n\n#logo { text-align: right; float: right; position: relative; margin-top: 25px; border: 1px solid #fff; max-width: 540px; max-height: 100px; overflow: hidden; }\n#logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }\n#logoctr { display: none; }\n#logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }\n#logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}\n#logohelp input { margin-bottom: 5px; }\n.edit #logohelp { display: block; }\n.edit #save-logo, .edit #cancel-logo { display: inline; }\n.edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }\n#customer-title { font-size: 20px; font-weight: bold; float: left; }\n\n#meta { margin-top: 1px; width: 48%; float: right; }\n#meta td { text-align: right;  }\n#meta td.meta-head { text-align: left; background: #eee; }\n#meta td textarea { width: 100%; height: 20px; text-align: left; }\n\n#meta2 { margin-top: 1px; width: 48%; float: left; }\n#meta2 td { text-align: right;  }\n#meta2 td.meta-head2 { text-align: left; background: #eee; }\n#meta2 td textarea { width: 100%; height: 20px; text-align: left; }\n\n#meta3 { margin-top: 1px; width: 100%; }\n#meta3 td { text-align: right;  }\n#meta3 td.meta-head3 { text-align: left; background: #eee; font-size: 13px;}\n#meta3 td textarea { width: 100%; height: 40px; text-align: left; }\n\n#items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }\n#items th { background: #eee; }\n#items textarea { height: 12px; }\n#meta3 textarea.tx {  }\n#items tr.item-row td {vertical-align: top; }\n#items td.description { width: 20px; }\n#items td.item-name { font-size: 12px; width: 300px; }\n#items td.description textarea, #items td.item-name textarea { width: 100%; }\n#items td.total-line { border-right: 0; text-align: right; }\n#items td.total-value { border-left: 0; padding: 10px; }\n#items td.total-value textarea { height: 20px; background: none; }\n#items td.balance { background: #eee; }\n#items td.blank { border: 0; }\n\n#terms { text-align: center; margin: 20px 0 0 0; }\n#terms h5 { text-transform: uppercase; font: 13px Helvetica, Sans-Serif; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }\n#terms textarea { width: 100%; text-align: center;}\n\ntextarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }\n* {\n  box-sizing: border-box;\n}\n\n/* Create four equal columns that floats next to each other */\n.column {\n  float: left;\n  width: 10.71%;\n  padding: 10px;\n  height: auto; /* Should be removed. Only for demonstration */\n}\n.column2 {\n  float: left;\n  width: 25%;\n  padding: 10px;\n  height: auto; /* Should be removed. Only for demonstration */\n}\n/* Clear floats after the columns */\n.row:before {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\t" }} />

                                             <div id="page-wrap">
                                                <img src={logo} alt="logo" style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "50%", height:"60%"}}/>
                                                <textarea style={{display: "block", marginLeft: "auto", marginRight: "auto",  width: "100%", textAlign: "center", padding: "20px 0"}} defaultValue={COMPANY_INFO}/>
                                                <textarea id="header2" defaultValue={"BOWEL MOVEMENT CHART"} />
                                                <div id="identity">
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <table id="meta3">
                                                    <tbody>
                                                    <TableBlock
                                                        list= {this.props.form.articles}
                                                        limit={this.state.limit}
                                                        size={this.props.form.Size}
                                                        formname= 'bowel_view'                                        
                                                        loadMore={()=>this.loadMoreCards()}
                                                        loadMoremin={()=>this.loadMoreCardsMin()}
                                                        individual={this.state.indiv}
                                                        date={this.state.date}
                                                    />
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                  
                                </div>
                                                             
                                </div>
                                <div className="row no-print">
                                <div className="col-2">
                                
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-4">
                                    <button className="btn btn-block bg-gradient-primary" type="button" onClick={()=> this.print()}>
                                    Print
                                </button>
                                
                                </div>
                                <div id="prnt" style={{marginTop: 20, marginBottom: 20}} className="col-4">
                                <button className="btn btn-block bg-gradient-success" type="button" onClick={()=> this.createjsPdf()}>
                                    Download
                                </button>
                                </div>
                                <div className="col-2">
                                
                                </div>

                                
                                {/* /.col */}
                            </div>                       

                            </div>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            <script src="../../plugins/sweetalert2/sweetalert2.min.js"></script>                           
        </UserLayout>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        form: state.form
    }
}

export default connect(mapStateToProps)(ViewBowel);