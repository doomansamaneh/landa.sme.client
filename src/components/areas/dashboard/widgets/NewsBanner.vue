<template>
  <q-carousel
    :autoplay="autoplay"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
    infinite
    animated
    swipeable
    keep-alive
    class="bordered shadow border-radius-lg overflow-hidden"
    :style="$q.screen.gt.xs ? 'height: 142px' : 'height: 200px'"
    v-model="slide"
  >
    <q-carousel-slide class="no-padding" :name="1">
      <q-card
        class="full-height border-radius-lg"
        :class="[isShakingComputed ? 'widget' : '']"
        :style="gradientStyle"
      >
        <template v-if="isShakingComputed">
          <q-btn
            class="off-btn bordered absolute-top-right q-ma-sm z-1"
            round
            dense
            unelevated
            @click="hideWidget"
          >
            <q-icon name="o_visibility_off" />
          </q-btn>
        </template>

        <div
          :class="
            isShakingComputed
              ? 'no-pointer-events'
              : 'pointer-events-all'
          "
        >
          <div :style="$q.screen.gt.sm ? computedStyle : null">
            <div class="row full-height">
              <div
                class="col-md-8 col-sm-12 col-xs-12 q-gutter-sm q-pa-md"
              >
                <div class="text-h6 text-weight-500">
                  راهنمای اتصال حسابداری آنلاین لاندا به سامانه مودیان
                </div>
                <div class="text-body2">
                  روش اتصال به سامانه مودیان و مراحل ارسال صورتحساب و
                  فاکتورهای خود به سامانه مودیان
                </div>
                <q-btn
                  rounded
                  color="primary"
                  unelevated
                  dense
                  padding="4px 16px"
                  label="ادامه مطلب"
                  class="q-mt-md"
                  href="https://landa-sme.ir/LandaKnowledge/b2b39ffb-51cb-4781-8e20-b44ca1e46d0c"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-carousel-slide>

    <q-carousel-slide v-if="false" class="no-padding" :name="2">
      <q-card
        flat
        class="full-height border-radius-lg"
        :class="[isShakingComputed ? 'widget' : '']"
      >
        <template v-if="isShakingComputed">
          <q-btn
            class="off-btn bordered absolute-top-right q-ma-sm z-1"
            round
            dense
            unelevated
            @click="hideWidget"
          >
            <q-icon name="o_visibility_off" />
          </q-btn>
        </template>
        <q-card-section>
          <div class="text-h6">
            آیا یک کاربر می‌تواند بیش از یک کسب و کار داشته باشد؟
          </div>
          <div class="text-body2">
            بله. هر کاربر می‌تواند چندین کسب و کار با اشتراک و طرح
            جداگانه ایجاد کند. کسی که مالک چندین شرکت است با یک نام
            کاربری می‌تواند به همه کسب و کارهای خود دسترسی داشته باشد.
            همچنین مالک کسب و کار امکان دعوت از سایر کاربران را از
            طریق ایمیل دارد. در اینصورت کاربر دعوت شده با ایمیل خودش
            به این کسب و کار دسترسی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/generalTab/useGeneralTab";

  const $q = useQuasar();
  const draggable = useGeneralTab();

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const autoplay = ref(10000);
  const slide = ref(1);
  const computedStyle = computed(() => ({
    backgroundImage: "url(/panjere.png)",
    backgroundSize: "300px",
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",
  }));

  const gradientStyle = computed(() => ({
    background:
      "linear-gradient(to bottom, rgba(0, 123, 255, 0.12), rgba(0, 123, 255, 0.7))",
  }));

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
