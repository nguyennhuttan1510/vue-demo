import { HTTP } from "../services/https";

const getProducts = async (query) => {
  try {
    const res = await HTTP.get(`/api/v2/products?${query}`);
    if (res?.result_code) {
      return res;
    } else {
      throw new Error(res?.messages || "Error");
    }
  } catch (error) {
    console.log("🚀 ~ file: products.js ~ line 5 ~ getProducts ~ error", error);
  }
};

const getBrands = async () => {
  try {
    const res = await HTTP.get("/api/brands");
    if (res?.result_code) {
      return res;
    } else {
      throw new Error(res?.messages || "Error");
    }
  } catch (error) {
    console.log("🚀 ~ file: products.js ~ line 28 ~ getBrands ~ error", error);
  }
};
const modifiedStatus = async (payload) => {
  const { productID, sales_status, blocked_reason } = payload;
  if (!productID || !sales_status) return;
  try {
    const res = await HTTP.put(`/api/v2/products/${productID}`, {
      sales_status: sales_status,
      blocked_reason: blocked_reason,
    });
    if (res?.result_code) {
      return res;
    } else {
      throw new Error(res?.messages || "Error");
    }
  } catch (error) {
    console.log("🚀 ~ file: products.js ~ line 28 ~ getBrands ~ error", error);
  }
};

export const ProductAPI = {
  getProducts,
  getBrands,
  modifiedStatus,
};
