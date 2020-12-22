import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'

const Retrive = () => {
    return (
        <div className="content-wrapper" style={{ minHeight: '1592.4px' }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Retriving Records</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Retriving</li>
                        </ol>
                    </div>
                </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Retriving Records From Database</h3>
                <div className="card-tools">
                    <button title="Collapse" className="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="collapse">
                        <i className="fas fa-minus" /></button>
                    <button title="Remove" className="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="remove">
                        <i className="fas fa-times" /></button>
                </div>
            </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6"></div>

                        <div className="col-md-6">

                        <CircularProgress size={40} style={{ color: '#2196f3' }} thickness={7} />
                        </div>

                    </div>
                    <div className="row">
                        Retriving...
                    </div>
                    
                </div>
                {/* /.card-body */}
                
            </div>
            {/* /.card */}
        </section>
        {/* /.content */}
    </div>

    );
};

export default Retrive;