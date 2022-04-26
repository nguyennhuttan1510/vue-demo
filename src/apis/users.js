import { HTTP } from "./../services/https";
const getUsers = async () => {
  try {
    const res = await HTTP.get(`/api/users`);
    if (res.result_code) {
      return res;
    } else {
      throw new Error("Call API failed");
    }
  } catch (error) {
    console.log("🚀 ~ file: models.js ~ line 12 ~ getModel ~ error", error);
  }
};

export const UsersAPI = {
  getUsers,
};
