import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Remote {
  remote_name: string;
  remote_id: string;
}

interface Receiver {
  receiverName: string;
  receiverID: string;
  remotes: Remote[];
}

interface RemoteState {
  receivers: Receiver[];
  currentReceiver: string;
  // device: USBDevice | string;
}

const initialState: RemoteState = {
  receivers: [],
  currentReceiver: "",
  // device: "",
};

const remoteSlice = createSlice({
  name: "remote",
  initialState,
  reducers: {
    addReceiver: (
      state,
      action: PayloadAction<{ receiverName: string; receiverID: string }>
    ) => {
      state.receivers.push({
        receiverName: action.payload.receiverName,
        receiverID: action.payload.receiverID,
        remotes: [],
      });
    },
    addRemote: (
      state,
      action: PayloadAction<{
        receiverID: string;
        remote: { remote_name: string; remote_id: string };
      }>
    ) => {
      const receiver = state.receivers.find(
        (r) => r.receiverID === action.payload.receiverID
      );
      if (receiver) {
        receiver.remotes.push(action.payload.remote);
      }
    },
    updateReceiverName: (
      state,
      action: PayloadAction<{ receiverID: string; receiverName: string }>
    ) => {
      const receiver = state.receivers.find(
        (r) => r.receiverID === action.payload.receiverID
      );
      if (receiver) {
        receiver.receiverName = action.payload.receiverName;
      }
    },
    updateRemoteName: (
      state,
      action: PayloadAction<{
        receiverID: string;
        remote_id: string;
        remote_name: string;
      }>
    ) => {
      const receiver = state.receivers.find(
        (r) => r.receiverID === action.payload.receiverID
      );
      if (receiver) {
        const remote = receiver.remotes.find(
          (r) => r.remote_id === action.payload.remote_id
        );
        if (remote) {
          remote.remote_name = action.payload.remote_name;
        }
      }
    },
    deleteRemote: (
      state,
      action: PayloadAction<{ receiverID: string; remote_id: string }>
    ) => {
      const receiver = state.receivers.find(
        (r) => r.receiverID === action.payload.receiverID
      );
      if (receiver) {
        receiver.remotes = receiver.remotes.filter(
          (r) => r.remote_id !== action.payload.remote_id
        );
      }
    },
    resetReceivers: (state) => {
      state.receivers = [];
      state.currentReceiver = "";
      // state.device = {};
    },
    safeSetCurrentReceiver: (state, action: PayloadAction<string>) => {
      const receiverExists = state.receivers.some(
        (r) => r.receiverID === action.payload
      );
      if (receiverExists || action.payload === "") {
        state.currentReceiver = action.payload;
      }
    },
    // addDevice: (state, action: PayloadAction<any>) => {
    //   state.device = { ...action.payload }; // Shallow clone

    //   console.log(state.device);
    //   console.log(action.payload);
    // },
  },
});

export const {
  addReceiver,
  addRemote,
  updateReceiverName,
  updateRemoteName,
  deleteRemote,
  resetReceivers,
  safeSetCurrentReceiver,
  // addDevice,
} = remoteSlice.actions;
export default remoteSlice.reducer;
