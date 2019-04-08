import {
  viewOrders,
  createOrderFailure,
  createOrderSuccess,
  viewOrder,
  updateParcel,
  cancelOrder,
  updateLocation,
  updateParcelStatus
} from "../../types/types";

import parcelReducer from "../parcelReducer";

const initState = {
  parcels: {},
  parcelStatus: false,
  parcelErrors: [],
  parcel: [],
  user: {}
};

describe("Test for Parcel Reducer", () => {
  it("should return initial state for unknown action", () => {
    const reducerResult = parcelReducer(undefined, {
      type: "unexpected"
    });
    expect(reducerResult).toEqual(initState);
  });

  it("should return parcels for action type of viewOrders", () => {
    const reducerResult = parcelReducer(initState, {
      type: viewOrders,
      payload: ["Joshua"]
    });
    expect(reducerResult.parcels).toEqual(["Joshua"]);
  });

  it("should return parcel status of success for action type of createOrderSuccess", () => {
    const reducerResult = parcelReducer(initState, {
      type: createOrderSuccess
    });
    expect(reducerResult.parcelStatus).toEqual(true);
    expect(reducerResult.parcelErrors).toEqual([]);
  });

  it("should return parcel errors for createOrder Failure", () => {
    const reducerResult = parcelReducer(initState, {
      type: createOrderFailure,
      payload: "There is error"
    });
    expect(reducerResult.parcels).toEqual({});
    expect(reducerResult.parcelErrors).toEqual("There is error");
  });

  it("should return parcel and empty parcel Errors for action type of view order", () => {
    const reducerResult = parcelReducer(initState, {
      type: viewOrder,
      payload: ["Joshua"]
    });

    expect(reducerResult.parcelErrors).toEqual([]);
    expect(reducerResult.parcel).toEqual(["Joshua"]);
  });

  it("should return parcel status of true for update parcel Status", () => {
    const reducerResult = parcelReducer(initState, {
      type: updateParcel
    });

    expect(reducerResult.parcelStatus).toEqual(true);
    expect(reducerResult.parcelErrors).toEqual([]);
  });

  it("should return parcel status of true for action type of cancel order", () => {
    const reducerResult = parcelReducer(initState, {
      type: cancelOrder
    });

    expect(reducerResult.parcelStatus).toEqual(true);
    expect(reducerResult.parcelErrors).toEqual([]);
  });

  it("should return parcel status of true for action type of update parcel location", () => {
    const reducerResult = parcelReducer(initState, {
      type: updateLocation
    });

    expect(reducerResult.parcelStatus).toEqual(true);
    expect(reducerResult.parcelErrors).toEqual([]);
  });

  it("should return parcel status of true for action type of update parcel status", () => {
    const reducerResult = parcelReducer(initState, {
      type: updateParcelStatus
    });

    expect(reducerResult.parcelStatus).toEqual(true);
    expect(reducerResult.parcelErrors).toEqual([]);
  });
});
