import moment from "moment";

export const formatCurrency = (currency) => {
  if (!currency) return;
  currency = currency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return currency;
};

export const formatFullDate = (date) => {
  if (!date) return;
  return (date = moment(date).format("DD-MM-YYYY hh:mm:ss"));
};
