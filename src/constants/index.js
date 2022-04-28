export const STATUS_LOGIN = {
  SUCCESS: "success",
  FALL: "fail",
  Error: "error",
  PENDING: "pending",
};

export const OPTION_PRODUCT_TYPE = [
  { key: -1, name: "All" },
  { key: "used", name: "Used" },
  { key: "new", name: "New" },
];

export const OPTION_PRODUCT_STATUS = {
  ing: "On Selling",
  "in review": "In Review",
  blocked: "Blocked",
  done: "Sold",
  delete: "Deleted",
  pending: "In Transaction",
  locked: "Locked",
};

export const PATHNAME = {
  LOGIN: "/",
  PRODUCT: "/products",
  DASHBOARD: "/dashboard",
  PRODUCT_DETAIL: (id) => {
    if (id === false) return "products/:id";
    if (isNaN(id)) return "products/";
    return `products/${id}`;
  },
};
