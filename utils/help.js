export const getDiscountPrice = (originalprice, discountPrice) => {
  const discount = originalprice - discountPrice;

  const per = (discount / originalprice) * 100;

  return per.toFixed(2);
};
