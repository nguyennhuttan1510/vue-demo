<template lang="html">
  <div class="login_page w-96">
    <div class="form_login p-8 w-full min-w-fit">
      <!--
      <div key="register" v-if="register">
        <img
          alt="Vue logo"
          src="../assets/images/logo0.png"
          class="logo mb-3"
        />
        <div class="form_title text-2xl font-bold mb-6">Register</div>
        <div class="wrap_input mb-7">
          <input
            type="text"
            class="form-control"
            name="username"
            placeholder="Username"
            :value="username"
            @input="handleValidateForm"
          />
          <small
            id="helpId"
            class="form-text text-muted block text-red-600"
            v-if="error.username"
            >{{ error.username }}</small
          >
        </div>
        <div class="wrap_input mb-7">
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
          />
          <small
            id="helpId"
            class="form-text text-muted block text-red-600"
            v-if="error.password"
            >{{ error.password }}</small
          >
        </div>
        <div class="wrap_input mb-7">
          <input
            type="password"
            class="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <small
            id="helpId"
            class="form-text text-muted block text-red-600"
            v-if="error.confirmPassword"
            >{{ error.confirmPassword }}</small
          >
        </div>
        <div class="button hovered my-6" @click="handleSignUp">Sign up</div>
        <div
          class="register text-sm text-gray-500 cursor-pointer underline"
          @click="handleRegister"
        >
          I have registered the account!
        </div>
      </div>
      -->
      <img alt="Vue logo" src="../assets/images/logo0.png" class="logo mb-3" />
      <div class="form_title text-2xl font-bold mb-6">Login</div>
      <div class="wrap_input mb-7">
        <label for="username"></label>
        <input
          id="username"
          type="text"
          class="form-control w-full"
          name="username"
          placeholder="Username"
          :value="username"
          @input="handleValidateForm"
        />
        <span
          class="form-text text-muted block text-red-600"
          v-show="error.username"
          >{{ error.username }}</span
        >
      </div>
      <div class="wrap_input mb-7">
        <label for="password"></label>
        <input
          id="password"
          type="password"
          class="form-control w-full"
          name="password"
          placeholder="Password"
          @keypress.enter.prevent="handleSignin"
          :value="password"
          @input="handleValidateForm"
        />
        <span
          class="form-text text-muted block text-red-600"
          v-if="error.password"
          >{{ error.password }}</span
        >
      </div>
      <button
        class="button hovered my-6 flex justify-center"
        @click="handleSignin"
        :disabled="!this.username || !this.password"
      >
        Sign in
      </button>
      <!--
        <div
          class="register text-sm text-gray-500 cursor-pointer underline"
          @click="handleRegister"
        >
          I don't have account!
        </div>
        -->
    </div>
  </div>
</template>
<script>
import { STATUS_LOGIN } from "../constants";
import { Auth } from "../apis/auth.js";
export default {
  name: "Login-page",
  data() {
    return {
      status: STATUS_LOGIN.PENDING,
      register: false,
      username: "",
      password: "",
      confirmPassword: "",
      error: {},
    };
  },
  methods: {
    handleValidateForm(e) {
      const value = e.target.value;
      const key = e.target.name;
      this[key] = e.target.value;

      if (!value || value.length === 0) {
        this.error[key] = `${key} is required.`;
        return;
      }
      if (key === "username") {
        if (value.length > 50) {
          this.error[key] = "username is invalided.";
          return;
        }
      }
      if (key === "password") {
        if (value.length < 8 || value.length > 15) {
          this.error[key] =
            "password must be more than 8 characters and less than 15 characters.";
          return;
        }
      }
      if (key === "confirmPassword") {
        if (this.password !== this.confirmPassword) {
          this.error[key] = "Confirm password not match the password.";
          return;
        }
      }
      delete this.error[key];
    },
    handleRegister() {
      this.register = !this.register;
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.error = {};
    },
    async handleSignin() {
      console.log("this is handle func");
      if (Object.keys(this.error).length > 0) {
        return;
      }
      const payload = {
        email: this.username,
        password: this.password,
      };
      const res = await Auth.loginAPI(payload);
      console.log("🚀 ~ file: Login.vue ~ line 183 ~ handleSignin ~ res", res);
      if (res) {
        localStorage.setItem(
          "token",
          `${res?.data.token_type} ${res?.data.access_token}`
        );
        this.$router.push("/admin");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.login_page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: auto;

  .form_login {
    box-shadow: 4px 10px 20px -8px #0000004d;
    background-color: var(--secondary-background);
    border-radius: 8px;
    transition: all 0.4s;
    .logo {
      width: 150px;
      margin: auto;
      object-fit: cover;
    }
    .form_title {
      text-align: center;
      margin-bottom: 1rem;
    }

    .wrap_input {
      margin-bottom: 1rem;

      input {
        border-radius: 8px;
        border: none !important;
        padding: 0.5rem 1rem;

        &:focus-visible {
          outline: none;
        }
      }
    }
  }
}
</style>
