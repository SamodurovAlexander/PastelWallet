import * as constants from '../constants';
import { store } from '../app';
import { setCurrentPassphrase, setCurrentPasteID, setPasteIDError, setPasteIDList } from '../actions';
import history from '../history';
import {ipcRenderer} from './ipc';
import * as actionTypes from '../actionTypes';


ipcRenderer.on('pastelIdListResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch(setPasteIDError(data.err));
      break;
    case constants.RESPONSE_STATUS_OK:
      const pastelIdList = data.data;
      store.dispatch(setPasteIDList(pastelIdList));
      break;
    default:
      break;
  }
});

ipcRenderer.on('pastelIdCreateResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch(setPasteIDError(data.err));
      break;
    case constants.RESPONSE_STATUS_OK:
      // set message,
      store.dispatch({
        type: actionTypes.SET_PASTEL_ID_MSG,
        value: 'Pastel ID was created'
      });
      ipcRenderer.send('pastelIdList', {});
      history.push('/pastel_id/select');
      break;
    default:
      break;
  }
});

ipcRenderer.on('pastelIdImportResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch(setPasteIDError(data.err));
      break;
    case constants.RESPONSE_STATUS_OK:
      store.dispatch({
        type: actionTypes.SET_PASTEL_ID_MSG,
        value: 'Pastel ID was imported'
      });
      ipcRenderer.send('pastelIdList', {});
      history.push('/pastel_id/select');
      break;
    default:
      break;
  }

});

ipcRenderer.on('pastelIdRegisterResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch(setPasteIDError(data.err));
      break;
    case constants.RESPONSE_STATUS_OK:
      store.dispatch({
        type: actionTypes.SET_PASTEL_ID_MSG,
        value: 'Pastel ID registration ticket was successfully created.'
      });
      store.dispatch({
        type: actionTypes.SET_SELECTED_PASSPHRASE,
        value: ''
      });
      store.dispatch({
        type: actionTypes.SET_SELECTED_PASTEL_ID,
        value: null
      });

      //refresh pastelid list
      ipcRenderer.send('pastelIdList', {});
      break;
    default:
      break;
  }
});

ipcRenderer.on('pastelIdCheckPassphraseResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch(setPasteIDError(data.err));
      break;
    case constants.RESPONSE_STATUS_OK:
      // At this point we start wallet_api python proccess from main_electron with given pastelID and passphrase
      store.dispatch(setCurrentPasteID(data.pastelID));
      store.dispatch(setCurrentPassphrase(data.passphrase));
      history.push('/main');
      ipcRenderer.send('getProfile', {pastelid: data.pastelID});
      break;
    default:
      break;
  }
});

ipcRenderer.on('aniImportResponse', (event, data) => {
  switch (data.status) {
    case constants.RESPONSE_STATUS_ERROR:
      store.dispatch({type: actionTypes.SET_ANI_KEY_ERROR, value: data.err});
      break;
    case constants.RESPONSE_STATUS_OK:
      if (data.data.error) {
        store.dispatch({type: actionTypes.SET_ANI_KEY_ERROR, value: data.data.err});
      } else {
        store.dispatch({type: actionTypes.SET_ANI_KEY_MSG, value: `Key is imported: ${data.data.result}`});
      }

      console.log(data);
      break;
    default:
      break;
  }

});