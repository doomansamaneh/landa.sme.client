<template>
  <!-- <div class="q-mb-lg">
    <most-used-operations />
  </div> -->
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-8 col-md-8 col-sm-12 col-xs-12">
      <invoices-widget-v2 />
    </div>
    <div class="col col-md col-xs-12">
      <some-info />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <revenue-expense-by-month />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-7 col-sm-12 col-xs-12">
      <income-statement />
    </div>

    <div class="col-md-5 col-sm-12 col-xs-12">
      <ratios-widget class="q-mb-md" />
      <top-products data-source="sls/report/getInvoiceByProduct" />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <cash-balance />
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12">
      <bank-balance />
    </div>
  </div>
</template>

<script setup>
  import InvoicesWidgetV2 from "src/components/areas/dashboard/widgets/InvoiceSummary.vue";
  import RatiosWidget from "src/components/areas/dashboard/widgets/RatiosWidget.vue";
  import RevenueExpenseByMonth from "src/components/areas/dashboard/widgets/RevenueExpenseByMonth.vue";
  import IncomeStatement from "src/components/areas/dashboard/widgets/IncomeStatement.vue";
  import TopProducts from "src/components/areas/dashboard/widgets/TopProducts.vue";
  import SomeInfo from "src/components/areas/dashboard/widgets/NetIncome.vue";
  import BankBalance from "src/components/areas/dashboard/widgets/BankBalance.vue";
  import CashBalance from "src/components/areas/dashboard/widgets/CashBalance.vue";
  // import MostUsedOperations from "src/components/areas/dashboard/widgets/MostUsedOperations.vue";
</script>

<style lang="scss">
  .margin-lg_ {
    margin-top: 24px;
    -webkit-transition: padding 0.25s ease-in-out;
    transition: padding 0.25s ease-in-out;
  }

  .darkBGImg {
    background: $dark url("src/assets/images/triangle-light.png")
      repeat-y left top;
  }
</style>
