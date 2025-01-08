<template>
  <toolbar-container :title="title" :table-store="tableStore" />

  <tip-banner closeable :title="tip.title" :tip="tip.message" />

  <div class="top-border q-mt-lg" />

  <div class="row q-col-gutter-md q-py-md">
    <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md left-border">
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
