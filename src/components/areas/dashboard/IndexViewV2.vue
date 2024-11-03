<template>
  <div v-if="$q.screen.gt.xs" class="q-mb-lg">
    <q-page-sticky
      :style="xPadding"
      class="bg-main q-py-xs"
      position="top"
      expand
    >
      <q-toolbar class="no-padding">
        <div class="row items-center">
          <div
            class="q-mr-sm text-h6 text-weight-700 no-letter-spacing text-on-dark"
          >
            {{ $t("main-menu-items.dashboard") }}
          </div>
          <div class="row items-center q-gutter-sm">
            <q-btn
              dense
              class="bordered text-body2 no-letter-spacing"
              size="14px"
              round
              unelevated
              :class="activeButton"
              no-caps
              @click="draggable.toggleShake"
            >
              <q-icon size="18px" name="o_tune" />
            </q-btn>

            <q-btn
              v-if="draggable.isDefaultChanged.value"
              class="bordered text-body2 no-letter-spacing"
              rounded
              unelevated
              no-caps
              size="14px"
              @click="draggable.resetToDefault"
            >
              <q-icon class="q-mr-xs" size="20px" name="o_refresh" />
              <div class="text-body2 no-letter-spacing">
                حالت پیشفرض
              </div>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>
  <div class="row q-col-gutter-md q-mb-md">
    <div
      v-for="(widget, index) in draggable.widgets.value"
      :key="widget.id"
      :class="[widget.class]"
    >
      <component
        :is="widget.component"
        :draggable="draggable.isShaking.value"
        @dragstart="draggable.onDragStart(index)"
        @dragover.prevent
        @drop="draggable.onDrop(index)"
        @dragend="resetCursor"
        :class="[
          { shake: draggable.isShaking.value },
          { grabbable: draggable.isShaking.value },
        ]"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDraggableWidgets } from "src/composables/useDraggableWidgets";

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

  const initialWidgets = [
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
  ];

  const draggable = useDraggableWidgets(initialWidgets);

  const xPadding = computed(
    () => "z-index: 2; padding-left: 38px; padding-right: 38px;"
  );

  const activeButton = computed(() =>
    draggable.isShaking.value ? "btn-active" : ""
  );
</script>
