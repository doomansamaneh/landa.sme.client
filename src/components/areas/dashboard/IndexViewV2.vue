<template>
  <div>
    <div class="row gap-24">
      <div class="col-8 col-md-8 col-sm-12 col-xs-12">
        <invoices-widget-v2 />
      </div>
      <div class="col col-md col-xs-12">
        <some-info />
      </div>
    </div>

    <div class="row gap-24 q-mt-lg">
      <div class="col-md col-xs-12">
        <ratios-widget />
      </div>
      <div class="col-md-7 col-sm-12 col-xs-12">
        <revenue-expense-by-month />
      </div>
    </div>

    <div class="row q-mt-lg gap-24">
      <div
        class="col-8 col-md-8 col-sm-12 col-xs-12 column q-gutter-y-lg"
      >
        <income-widget />
      </div>

      <div class="col col-md col-sm-12 col-xs-12 gap-24">
        <top-products />
      </div>
    </div>

    <div class="row q-mt-lg gap-24">
      <div class="col col-md col-sm-12 col-xs-12">
        <fund-balance />
      </div>

      <div class="col-8 col-md-8 col-sm-12 col-xs-12">
        <bank-balance />
      </div>
    </div>
  </div>
</template>

<script setup>
  import InvoicesWidgetV2 from "src/components/areas/dashboard/widgets/InvoiceSummary.vue";
  import RatiosWidget from "src/components/areas/dashboard/widgets/RatiosWidget.vue";
  import RevenueExpenseByMonth from "src/components/areas/dashboard/widgets/RevenueExpenseByMonth.vue";
  import IncomeWidget from "src/components/areas/dashboard/widgets/_IncomeWidget.vue";
  import TopProducts from "src/components/areas/dashboard/widgets/TopProducts.vue";
  import SomeInfo from "src/components/areas/dashboard/widgets/NetIncome.vue";
  import BankBalance from "src/components/areas/dashboard/widgets/BankBalance.vue";
  import FundBalance from "src/components/areas/dashboard/widgets/FundBalance.vue";
</script>

<style lang="scss">
  .margin-lg {
    margin-top: 24px;
    -webkit-transition: padding 0.25s ease-in-out;
    transition: padding 0.25s ease-in-out;
  }

  .gap-24 {
    gap: 24px;
  }

  .darkBGImg {
    background: $dark url("src/assets/images/triangle-light.png")
      repeat-y left top;
  }
</style>
