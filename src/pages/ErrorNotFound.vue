<template>
  <div class="bg-dark text-center">
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <div></div>
          <div class="warning-text q-pt-sm text-weight-700">404</div>
        </div>
        <div style="width: 330px">
          <div class="text-on-dark text-h4 text-weight-700 q-pt-lg">
            صفحه مورد نظر یافت نشد
          </div>
          <div class="text-on-dark text-body1">
            احتمالا آدرس اشتباهی را جستجو کرده‌اید
          </div>
          <q-btn
            no-caps
            to="/"
            class="primary-gradient primary-shadow text-on-dark q-mt-lg text-body1"
            rounded
            unelevated
            text-color="white"
          >
            بازگشت به داشبورد
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useTheme } from "src/components/layouts/main/_composables/useTheme.js";

  const theme = useTheme();

  onMounted(() => {
    theme.store();
  });
</script>

<style lang="scss" scoped>
  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound .notfound-404 {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0px auto 50px;
  }

  .notfound .notfound-404 > div:first-child {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ffa200;
    box-shadow: 0 0 8px 0 orange, 0 0 24px rgba(255, 166, 0, 0.49);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border: 5px dashed #000;
    border-radius: 5px;
  }

  .notfound .notfound-404 > div:first-child:before {
    content: "";
    position: absolute;
    left: -5px;
    right: -5px;
    bottom: -5px;
    top: -5px;
    -webkit-box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
    border-radius: 5px;
  }

  .notfound .notfound-404 .warning-text {
    color: #2d2d2d;
    font-weight: 700;
    margin: 0;
    font-size: 90px;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
