<template>
  <MainLayout>
    <div class="container">
      <div class="flex justify-center items-center h-screen">
        <div class="title w-full lg:w-1/2">
          <div class="mb-4 title_large text-red-600">Welcome to</div>
          <div class="mb-4 font-bold text-cyan-500 title_large">
            OKXE Back Office Administrator
          </div>
          <div class="text-2xl">
            OKXE admin page use to manage Okxe's system like products, stores
            and other features
          </div>
        </div>
        <div class="image w-full lg:w-1/2">
          <img
            :style="{ width: '120%' }"
            src="http://dev.okxe.vn:1112/images/dashboard.png"
            alt="dashboard"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
<script>
import MainLayout from "@/layouts/MainLayout";

export default {
  name: "Dashboard-Page",
  components: {
    MainLayout,
  },
};
</script>
<style scoped lang="scss">
.title_large {
  font-size: 50px;
}
</style>
