import { HTTP } from "../services/https";
const loginAPI = async (payload) => {
  try {
    if (!payload.email || !payload.password) {
      throw new Error("Invalid email or password");
    }
    const res = await HTTP.post(
      `/api/auth/login?email=${payload.email}&password=${payload.password}`
    );

    return res;
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 12 ~ loginAPI ~ error", error);
  }
};

export const Auth = {
  loginAPI,
};
