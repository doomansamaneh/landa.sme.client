<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div
      v-for="(widget, index) in widgets"
      :key="widget.id"
      :class="widget.class"
      draggable="true"
      @dragstart="onDragStart(index)"
      @dragover.prevent
      @drop="onDrop(index)"
    >
      <component :is="widget.component" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import InvoicesWidgetV2 from "src/components/areas/dashboard/widgets/InvoiceSummary.vue";
  import SomeInfo from "src/components/areas/dashboard/widgets/NetIncome.vue";
  import RevenueExpenseByMonth from "src/components/areas/dashboard/widgets/RevenueExpenseByMonth.vue";
  import IncomeStatement from "src/components/areas/dashboard/widgets/IncomeStatement.vue";
  import RatiosWidget from "src/components/areas/dashboard/widgets/RatiosWidget.vue";
  import TopProducts from "src/components/areas/dashboard/widgets/TopProducts.vue";
  import SalesWidget from "src/components/areas/dashboard/widgets/sales/IndexView.vue";
  import CashBalance from "src/components/areas/dashboard/widgets/CashBalance.vue";
  import BankBalance from "src/components/areas/dashboard/widgets/BankBalance.vue";
  import ExpensesWidget from "src/components/areas/dashboard/widgets/expenses/IndexView.vue";

  const widgets = ref([
    {
      id: 1,
      component: SomeInfo,
      class: "col-md-4 col-sm-12 col-xs-12",
    },
    {
      id: 2,
      component: InvoicesWidgetV2,
      class: "col-md-8 col-sm-12 col-xs-12",
    },
    {
      id: 3,
      component: RevenueExpenseByMonth,
      class: "col-md-12 col-sm-12 col-xs-12",
    },
    {
      id: 4,
      component: IncomeStatement,
      class: "col-md-6 col-sm-12 col-xs-12",
    },
    {
      id: 5,
      component: RatiosWidget,
      class: "col-md-6 col-sm-12 col-xs-12",
    },
    {
      id: 6,
      component: SalesWidget,
      class: "col-md-8 col-sm-12 col-xs-12",
    },
    {
      id: 7,
      component: TopProducts,
      class: "col-md-4 col-sm-12 col-xs-12",
    },
    {
      id: 8,
      component: CashBalance,
      class: "col-md-4 col-sm-6 col-xs-12",
    },
    {
      id: 9,
      component: ExpensesWidget,
      class: "col-md-4 col-sm-12 col-xs-12",
    },
    {
      id: 10,
      component: BankBalance,
      class: "col-md-4 col-sm-6 col-xs-12",
    },
  ]);

  const draggedIndex = ref(null);

  const onDragStart = (index) => {
    draggedIndex.value = index;
  };

  const onDrop = (index) => {
    if (draggedIndex.value !== null) {
      const draggedItem = widgets.value[draggedIndex.value];
      widgets.value.splice(draggedIndex.value, 1);
      widgets.value.splice(index, 0, draggedItem);
      draggedIndex.value = null;
    }
  };
</script>
