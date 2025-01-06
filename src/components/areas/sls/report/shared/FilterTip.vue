<template>
  <q-card v-if="guideStatus" flat class="tips q-mb-md">
    <q-card-section>
      <q-btn
        dense
        unelevated
        round
        class="absolute-top-right q-ma-sm"
        @click="toggleGuide"
      >
        <q-icon name="o_close" />
      </q-btn>
      <div class="title">راهنما</div>
      <div class="q-mt-md text-body1 no-letter-spacing">
        بر روی سطر مورد نظر دابل کلیک کنید تا گردشهای آن ردیف را در
        تب‌های پس از آن مشاهده کنید
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  
  const guideStatus = ref(true);

  const toggleGuide = () => {
    guideStatus.value = !guideStatus.value;
  };
</script>
