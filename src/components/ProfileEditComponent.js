import React, {Component} from 'react';
import '../styles.scss';
import '../assets/scss/core.scss';
import '../assets/scss/custom.scss';
import 'bulma/bulma.sass';
import {MainWrapper} from "./MainWrapperComponent";
import * as Feather from 'react-feather';


class EditPicCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.fileInputRef = React.createRef();
    }

    onChangeFile = (e) => {
        if (e.target.files.length) {
            let file = e.target.files[0];
            this.setState({file: URL.createObjectURL(file)});
        }
    };

    fileAddClick = (e) => {
        this.fileInputRef.current.click();
    };

    render() {
        return <div className="flat-card upload-card is-auto">
            <div className="card-body">
                <div id="avatar-upload" className="avatar-wrapper has-simple-popover"
                     data-content="Change profile picture" data-placement="top">
                    <img className="profile-pic" src={this.state.file} alt=""/>
                    <div className="upload-button" onClick={this.fileAddClick}>
                        <Feather.Plus className="upload-icon" aria-hidden="true"/>
                    </div>
                    <input className="file-upload" type="file" accept="image/*" onChange={this.onChangeFile}
                           ref={this.fileInputRef}/>
                </div>

                <div className="username has-text-centered">
                    <span>Elie Daniels</span>
                    <span>eliedaniels@gmail.com</span>
                </div>

                <div className="has-text-centered">
                    <button className="button feather-button secondary-button will-upload">
                        Save picture
                    </button>
                </div>
            </div>
        </div>
    }
}

class EditInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return <div className="flat-card profile-info-card is-auto">
            <div className="card-title">
                <h3>Contact info</h3>
                <div className="confirm-button">
                    <a href="javascript:void(0);" role="button" className="has-simple-popover"
                       data-content="Save Contact info" data-placement="top">
                        <Feather.Check/>
                    </a>
                </div>
            </div>
            <div className="card-body">
                <div className="columns">
                    <div className="column is-6">
                        <div className="info-block">
                            <span className="label-text">First Name</span>
                            <div className="control">
                                <input type="text" className="input is-default" value={this.state.firstName}
                                       onChange={this.onChange} name="firstName"/>
                            </div>
                        </div>

                        <div className="info-block">
                            <span className="label-text">Email</span>
                            <div className="control">
                                <input type="email" className="input is-default"
                                       value={this.state.email}
                                       onChange={this.onChange} name="email"/>
                            </div>
                        </div>
                    </div>

                    <div className="column is-6">
                        <div className="info-block">
                            <span className="label-text">Last Name</span>
                            <div className="control">
                                <input type="text" className="input is-default" value={this.state.lastName}
                                       onChange={this.onChange} name="lastName"/>
                            </div>
                        </div>

                        <div className="info-block">
                            <span className="label-text">Phone</span>
                            <div className="control">
                                <input type="text" className="input is-default" value={this.state.phone}
                                       onChange={this.onChange} name="phone"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export class ProfileEdit extends Component {
    render() {
        return <MainWrapper noLogo>
            <div className="columns is-account-grid is-multiline">
                <div className="column is-4">
                    <EditPicCard/>
                </div>

                <div className="column is-8">
                    <EditInfoCard/>
                </div>
            </div>
        </MainWrapper>;
    }
}
