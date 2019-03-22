import {
  viewOrders,
  createOrderFailure,
  createOrderSuccess,
  viewOrder,
  updateParcel,
  cancelOrder,
  updateLocation,
  updateParcelStatus
} from "../types/types";

const initState = {
  parcels: {},
  parcelStatus: false,
  parcelErrors: [],
  parcel: [],
  user: {}
};

const parcelReducer = (state = initState, action) => {
  switch (action.type) {
    case viewOrders:
      return {
        ...state,
        parcels: action.payload
      };
    case createOrderSuccess:
      return {
        ...state,
        parcelStatus: true,
        parcelErrors: []
      };
    case createOrderFailure:
      return {
        ...state,
        parcelErrors: action.payload,
        parcels: {}
      };
    case viewOrder:
      return {
        ...state,
        parcelErrors: [],
        parcel: action.payload
      };
    case updateParcel:
      return {
        ...state,
        parcelErrors: [],
        parcelStatus: true
      };

    case cancelOrder:
      return {
        ...state,
        parcelErrors: [],
        parcelStatus: true
      };

    case updateLocation:
      return {
        ...state,
        parcelErrors: [],
        parcelStatus: true
      };
    case updateParcelStatus:
      return {
        ...state,
        parcelErrors: [],
        parcelStatus: true
      };
    default:
      return state;
  }
};

export default parcelReducer;
