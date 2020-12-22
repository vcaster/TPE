import React from 'react';
import UserLayout from '../../hoc/user'

const user_profile = () => {
    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">User Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle" alt="User profile picture" src="../../dist/img/user4-128x128.jpg" />
                                    </div>
                                    <h3 className="profile-username text-center">Nina Mcintire</h3>
                                    <p className="text-muted text-center">Software Engineer</p>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Followers</b> <a className="float-right">1,322</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Following</b> <a className="float-right">543</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Friends</b> <a className="float-right">13,287</a>
                                        </li>
                                    </ul>
                                    <a className="btn btn-primary btn-block" href="#"><b>Follow</b></a>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">About Me</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <strong><i className="fas fa-book mr-1" /> Education</strong>
                                    <p className="text-muted">
                                        B.S. in Computer Science from the University of Tennessee at Knoxville
            </p>
                                    <hr />
                                    <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                    <p className="text-muted">Malibu, California</p>
                                    <hr />
                                    <strong><i className="fas fa-pencil-alt mr-1" /> Skills</strong>
                                    <p className="text-muted">
                                        <span className="tag tag-danger">UI Design</span>
                                        <span className="tag tag-success">Coding</span>
                                        <span className="tag tag-info">Javascript</span>
                                        <span className="tag tag-warning">PHP</span>
                                        <span className="tag tag-primary">Node.js</span>
                                    </p>
                                    <hr />
                                    <strong><i className="far fa-file-alt mr-1" /> Notes</strong>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>

                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>


        </UserLayout>
    );
};

export default user_profile;