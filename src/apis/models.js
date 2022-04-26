import { HTTP } from "./../services/https";
const getModel = async (brandId) => {
  if (!brandId) return;
  try {
    const res = await HTTP.get(`/api/brands/${brandId}/models`);
    if (res.result_code) {
      return res;
    } else {
      throw new Error("Call API failed");
    }
  } catch (error) {
    console.log("🚀 ~ file: models.js ~ line 12 ~ getModel ~ error", error);
  }
};
const getModelDetail = async (modelId) => {
  if (!modelId) return;
  try {
    const res = await HTTP.get(`/api/model-details?model_id=${modelId}
    `);
    if (res.result_code) {
      return res;
    } else {
      throw new Error("Call API failed");
    }
  } catch (error) {
    console.log("🚀 ~ file: models.js ~ line 12 ~ getModel ~ error", error);
  }
};

export const ModelAPI = {
  getModel,
  getModelDetail,
};
