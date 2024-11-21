<template>
  <toolbar-container :title="title" :table-store="tableStore" />

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

      <div class="title">
        <strong>دارایی = بدهی + سرمایه</strong>
      </div>
      <div class="q-mt-md text-body1 no-letter-spacing">
        وضعیت مالی هر کسب و کار، کوچک یا بزرگ، بر اساس دو جزء اصلی
        ترازنامه ارزیابی می شود: دارایی ها و بدهی ها. حقوق صاحبان
        سهام، بخش سوم ترازنامه است. معادله حسابداری نمایانگر نحوه
        ارتباط این سه جزء مهم با یکدیگر است. معادله حسابداری معادله
        اساسی حسابداری یا معادله ترازنامه نیز نامیده می شود.
      </div>
    </q-card-section>
  </q-card>

  <div class="row q-col-gutter-md q-mt-xs_">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <asset :model="dataStore.model.value" />
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <liability :model="dataStore.model.value" />
        </div>
        <div class="col-12">
          <equity :model="dataStore.model.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useBalanceSheet } from "../../../_composables/useBalanceSheet";

  import Asset from "../balanceSheet/AssetSheet.vue";
  import Liability from "../balanceSheet/LiabilitySheet.vue";
  import Equity from "../balanceSheet/EquitySheet.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    title: String,
  });

  const guideStatus = ref(true);

  const toggleGuide = () => {
    guideStatus.value = !guideStatus.value;
  };

  const dataStore = useBalanceSheet();
</script>
