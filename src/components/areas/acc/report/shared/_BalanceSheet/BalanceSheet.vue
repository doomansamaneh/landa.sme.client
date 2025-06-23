<template>
  <toolbar-container />

  <tip-banner
    closeable
    :title="tip.title"
    :tip="tip.message"
    class="q-mb-md"
  />

  <div
    :class="{
      'top-border q-mt-lg': $q.screen.gt.sm,
    }"
  />

  <div
    class="row q-col-gutter-md"
    :class="{
      'q-py-md': $q.screen.gt.sm,
    }"
  >
    <div
      class="col-md-6 col-sm-12 col-xs-12"
      :class="{
        'left-border q-pr-md': $q.screen.gt.sm,
      }"
    >
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
  import { useBalanceSheet } from "../../../_composables/useBalanceSheet";

  import Asset from "../balanceSheet/AssetSheet.vue";
  import Liability from "../balanceSheet/LiabilitySheet.vue";
  import Equity from "../balanceSheet/EquitySheet.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const props = defineProps({
    title: String,
  });

  const dataStore = useBalanceSheet();

  const tip = {
    title: "دارایی = بدهی + سرمایه",
    message:
      "وضعیت مالی هر کسب و کار، کوچک یا بزرگ، بر اساس دو جزء اصلی  ترازنامه ارزیابی می شود: دارایی ها و بدهی ها. حقوق صاحبان  سهام، بخش سوم ترازنامه است. معادله حسابداری نمایانگر نحوه  ارتباط این سه جزء مهم با یکدیگر است. معادله حسابداری معادله اساسی حسابداری یا معادله ترازنامه نیز نامیده می شود.",
  };
</script>
