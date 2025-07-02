<template>
  <q-card
    v-access="`sls.report.salesReview`"
    bordered
    class="cursor-pointer primary-gradient-1 relative q-radius-lg q-hoverable"
    @click="goToSalesReview"
  >
    <span class="q-focus-helper" />
    <q-card-section class="q-pa-lg">
      <q-btn
        no-caps
        size="12px"
        unelevated
        round
        dense
        icon="o_open_in_new"
        class="absolute-top-left q-ma-sm"
        to="/sls/report/salesReview"
        @click.stop
      >
        <q-tooltip class="custom-tooltip">مشاهده گزارش</q-tooltip>
      </q-btn>
      <div class="row justify-center q-pt-lg">
        <div class="col-12 text-center q-mb-md">
          <div
            class="text-weight-bold animated fadeIn faster text-h3"
          >
            <span class="primary-text">گزارش مرور فروش</span>
            <q-icon
              name="o_analytics"
              size="3rem"
              color="red"
              class="q-ml-sm animated bounce"
            />
          </div>
          <div class="fancy-underline"></div>
          <div
            class="caption-on-dark q-mt-sm animated fadeIn text-h6"
          >
            بررسی و تحلیل جامع اطلاعات فروش
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  const goToSalesReview = () => {
    router.push("/sls/report/salesReview");
  };
</script>

<style lang="scss" scoped>
  .animated {
    animation-duration: 0.8s;
    animation-fill-mode: both;
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  .bounce {
    animation: bounce 2s infinite;
  }

  .fancy-underline {
    height: 3px;
    width: 180px;
    margin: 8px auto;
    background: linear-gradient(
      90deg,
      transparent,
      var(--q-primary),
      transparent
    );
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.8),
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    to {
      left: 100%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
</style>
