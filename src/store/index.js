import { createStore } from "vuex";
import { ProductAPI } from "./../apis/products";
import queryString from "query-string";
import { ModelAPI } from "./../apis/models";
import { UsersAPI } from "./../apis/users";
import { LocationAPI } from "./../apis/location";

const initState = {
  account: {},
  products: {
    totalPage: 0,
    productList: [],
  },
  brands: [],
  model: {},
  trim: [],
  users: [],
  cities: [],
};

export default createStore({
  state: initState,
  getters: {
    getListModel(state) {
      return state.model?.model?.length > 0 ? state.model?.model : [];
    },
  },
  mutations: {
    setBrands(state, payload) {
      if (!payload?.length) return;
      state.brands = [...payload];
    },
    setModels(state, payload) {
      if (!payload) return;
      state.model = payload;
    },

    setProducts(state, payload) {
      if (!payload?.data.length) return;
      state.products.productList = [...payload.data];
      state.products.totalPage = payload?.total || 0;
    },
    setTrim(state, payload) {
      if (!payload) return;
      state.trim = payload;
    },
    setInitTrim(state, payload) {
      state.trim = payload;
    },
    setUsers(state, payload) {
      if (!payload) return;
      state.users = payload;
    },
    setCities(state, payload) {
      if (!payload) return;
      state.cities = payload;
    },
    modifyStatusProduct(state, productItem) {
      const cloneProduct = [...state.products.productList];
      const indexProduct = cloneProduct
        .map((e) => e.id)
        .indexOf(productItem.id);
      cloneProduct.splice(indexProduct, 1, productItem);
      state.products.productList = cloneProduct;
    },
    setAccount(state, accountInfo) {
      state.account = accountInfo;
    },
  },
  actions: {
    async getBrands({ commit }) {
      const res = await ProductAPI.getBrands();
      if (!res?.result_code) return;
      commit("setBrands", res.data);
    },
    async getModels({ commit }, brandID) {
      const res = await ModelAPI.getModel(brandID);
      if (!res?.result_code) return;
      commit("setModels", res.data);
    },
    async getProducts({ commit }, params) {
      let newParams = {};
      for (const param in params) {
        if (params[param] && params[param] !== -1) {
          newParams[param] = params[param];
        }
      }
      const query = {
        ...newParams,
        sort_by: "updated_at",
        order_by: "desc",
        count: 20,
      };
      const stringified = queryString.stringify(query);
      const res = await ProductAPI.getProducts(stringified);
      if (!res?.result_code) return;
      commit("setProducts", res);
    },
    async getModelDetail({ commit }, modelID) {
      const res = await ModelAPI.getModelDetail(modelID);
      if (!res?.result_code) return;
      commit("setTrim", res.data);
    },
    async getUsers({ commit }) {
      const res = await UsersAPI.getUsers();
      if (!res?.result_code) return;
      commit("setUsers", res.data);
    },
    async getCities({ commit }) {
      const res = await LocationAPI.getCity();
      if (!res?.result_code) return;
      commit("setCities", res.data);
    },
    async updateStatusProduct({ commit }, params) {
      const payload = {
        productID: params.productID,
        sales_status: params.sales_status,
        blocked_reason: "",
      };
      const res = await ProductAPI.modifiedStatus(payload);
      if (res.result_code) {
        commit("modifyStatusProduct", res.data);
      }
    },
  },
  modules: {},
});
