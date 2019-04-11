const organiseOrders = ( data ) => {
  let placed = 0;
  let delivered = 0;
  let cancelled = 0;
  let transiting = 0;


  data.forEach(parcel => {
    switch (parcel.status) {
      case "TRANSITING":
        transiting = transiting + 1;
        break;
      case "CANCELLED":
        cancelled = cancelled + 1;
        break;

      case "DELIVERED":
        delivered = delivered + 1;
        break;
      case "PLACED":
        placed = placed + 1;
        break;
    }
  });

  return {
    placed,
    delivered,
    cancelled,
    transiting
  };
};

export default organiseOrders;
