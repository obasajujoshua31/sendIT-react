import organiseOrders from "../organise";

const mock = {
  data: [
    {
      status: "CANCELLED"
    },
    {
      status: "DELIVERED"
    },
    {
      status: "PLACED"
    },
    {
      status: "TRANSITING"
    }
  ]
};

describe("Organise Order Test", () => {
  it("should return placed to be 1", () => {
    const organiseResult = organiseOrders(mock);
    expect(organiseResult.cancelled).toEqual(1);
    expect(organiseResult.delivered).toEqual(1);
    expect(organiseResult.placed).toEqual(1);
    expect(organiseResult.transiting).toEqual(1);
  });
});
