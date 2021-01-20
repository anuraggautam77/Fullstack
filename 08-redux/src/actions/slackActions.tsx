
import { SlackApplicationTypes } from "../actiontypes";


export function getChannelMessgae(payload: any) {
  return { type: SlackApplicationTypes.GET_CHANNEL_MESSAGE, payload }
};


export function addNewChannel(payload: any) {
  return { type: SlackApplicationTypes.ADD_NEW_CHANNEL, payload }
}


export function addNewMessage(payload: any) {
  return { type: SlackApplicationTypes.ADD_NEW_MESSAGE, payload }
}

export function deleteMessage(payload: any) {
  return { type: SlackApplicationTypes.DELETE_MESSAGE, payload }
}

export function  currentChannel(payload:any){
  return { type: SlackApplicationTypes.GET_CURRENT_CHANNEL, payload }
}

