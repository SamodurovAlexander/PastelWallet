import React, { Component } from 'react';
import * as style from './style.module.scss';
import Wrapper from '../Wrapper';
import history from '../../../history';
import { Divider, Input, Button } from '../../../components/common';
import { BTN_TYPE_LIGHT_BLUE } from '../../../components/common/constants';
import { ipcRenderer } from '../../../ipc/ipc';
import { connect } from 'react-redux';
import * as actionTypes from '../../../actionTypes';
import { setPasteIDError } from '../../../actions';

class Create extends Component {
  constructor (props) {
    super(props);
    this.state = {
      passphrase: '',
      disabled: false
    };
  }
  resetErrors = () => {
    this.props.error && this.props.dispatch(setPasteIDError(null));
    this.props.msg && this.props.dispatch({
      type: actionTypes.SET_PASTEL_ID_MSG,
      value: null
    });
  };

  createAndRegister = () => {
    this.setState({disabled: true});
    ipcRenderer.send('pastelIdCreateAndRegister', {
      passphrase: this.state.passphrase,
      blockchainAddress: this.props.blockchainAddress
    });
  };
  createNoRegisterClick = () => {
    this.setState({disabled: true});
    ipcRenderer.send('pastelIdCreate', { passphrase: this.state.passphrase });
  };
  onPassphraseChange = (e) => {
    this.setState({passphrase: e.target.value});
    this.props.dispatch({type: actionTypes.SET_PASTEL_ID_ERROR, value: null});
  };
  render () {
    const error = this.props.error ? <div className={style['error-msg']}>{this.props.error.message}</div> :null;
    return <Wrapper>
      <div className={style.text}>
        If you have <b>Pastel ID,</b> <span style={{ color: 'var(--green)', cursor: 'pointer' }}
                                            onClick={() => {
                                              history.push('/pastel_id/select');
                                              this.resetErrors();
                                            }}>choose</span> one of them
      </div>
      <Divider style={{ marginTop: '21px' }}/>
      <div className={style.text} style={{ marginTop: '16px' }}>
        Create new <b>Pastel ID</b>
      </div>
      <Input name={'passphrase'} label={'Passphrase'} style={{ width: '100%' }} containerStyle={{ marginTop: '8px' }}
             value={this.state.passphrase} onChange={this.onPassphraseChange}
      />
      {error}
      <Button style={{ width: '100%', marginTop: '15px' }} disabled={this.state.passphrase === '' || this.state.disabled} onClick={this.createAndRegister}>Create and
        register</Button>
      <Button btnType={BTN_TYPE_LIGHT_BLUE} style={{ width: '100%', marginTop: '7px' }}
              disabled={this.state.passphrase === '' || this.state.disabled} onClick={this.createNoRegisterClick}>Create without registration</Button>
    </Wrapper>;
  }
}

export default connect(state => ({
  blockchainAddress: state.blockchain.blockchainAddress,
  error: state.pastelid.pastelIDError,
  msg: state.pastelid.pastelIDMsg
}))(Create);
