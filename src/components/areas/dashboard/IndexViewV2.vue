<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-8 col-md-8 col-sm-12 col-xs-12">
      <invoices-widget-v2 />
    </div>
    <div class="col-md col-xs-12">
      <some-info />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <revenue-expense-by-month />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm-8 col-xs-12">
      <income-statement />
    </div>

    <div class="col-md col-sm col-xs-12">
      <ratios-widget />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm-6 col-xs-12">
      <top-products data-source="sls/report/getInvoiceByProduct" />
    </div>
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card flat class="fit bordered shadow">
        <q-card-section class="q-pt-lg q-px-lg q-pb-none">
          <div class="row justify-between items-center">
            <div>
              <q-item class="no-padding">
                <q-item-section avatar>
                  <q-avatar
                    rounded
                    text-color="white"
                    icon="o_receipt_long"
                    size="md"
                    class="primary-gradient primary-shadow"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-700">
                    فروش
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none q-pb-lg q-px-lg">
          <div class="row q-col-gutter-md">
            <div class="col">
              <bar-chart :height="300" />
            </div>
            <div class="col">
              <bar-chart :height="300" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm-6 col-xs-12">
      <expenses-widget />
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <expenses-widget />
    </div>

    <div class="col-md col-sm-12 col-xs-12">
      <expenses-widget />
    </div>
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-md col-sm-12 col-xs-12">
      <bank-balance />
    </div>
    <div class="col-md col-sm-12 col-xs-12">
      <cash-balance />
    </div>
    <div class="col-md col-sm-12 col-xs-12">
      <cash-balance />
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
  import ChequeReport from "src/components/areas/dashboard/widgets/ChequeReport.vue";
  import ExpensesWidget from "src/components/areas/dashboard/widgets/expenses/IndexView.vue";
  import BarChart from "src/components/shared/charts/BarChart.vue";
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
