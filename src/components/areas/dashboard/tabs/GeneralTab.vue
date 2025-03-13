<template>
  <q-toolbar v-if="$q.screen.gt.sm" class="no-padding">
    <div class="row items-center q-py-lg">
      <div class="q-mr-sm text-h6 text-weight-700 text-on-dark">
        {{ $t("shared.labels.settings") }}
      </div>
      <div class="row items-center q-gutter-sm">
        <q-btn
          dense
          class="bordered_ text-body2"
          size="14px"
          round
          unelevated
          :class="activeButton"
          no-caps
          @click="draggable.toggleShake"
        >
          <q-icon size="24px" name="o_tune" />
        </q-btn>
      </div>
    </div>

    <q-space />

    <div class="flex q-gutter-sm items-center">
      <q-btn
        v-if="draggable.isShaking.value"
        class="text-body2 primary-gradient text-white primary-shadow"
        rounded
        unelevated
        no-caps
        @click="draggable.saveLayoutChanges"
      >
        <q-icon class="q-mr-xs" size="20px" name="o_save" />
        <div class="text-body2">ذخیره</div>
      </q-btn>

      <q-btn
        v-if="draggable.isShaking.value"
        class="bordered text-body2"
        rounded
        unelevated
        no-caps
        size="14px"
        @click="draggable.resetToDefault"
      >
        <q-icon class="q-mr-xs" size="20px" name="o_refresh" />
        <div class="text-body2">حالت پیشفرض</div>
      </q-btn>
    </div>
  </q-toolbar>

  <div class="row q-col-gutter-md">
    <div
      v-for="(widget, index) in draggable.widgets.value"
      :key="widget.id"
      :class="[
        widget.class,
        { shake: draggable.isShaking.value && !widget.isHovered },
      ]"
      @mouseover="widget.isHovered = true"
      @mouseleave="widget.isHovered = false"
    >
      <component
        :class="[
          widget.class,
          { grabbable: draggable.isShaking.value },
        ]"
        :is="getComponentById(widget.id)"
        :draggable="draggable.isShaking.value"
        @dragstart="draggable.onDragStart(index)"
        @dragover.prevent
        @drop="draggable.onDrop(index)"
        @dragend="draggable.resetCursor"
        @hideWidget="draggable.hideWidget(widget.id)"
      />
    </div>
  </div>

  <div
    v-if="
      draggable.hiddenWidgets.value.length > 0 &&
      draggable.isShaking.value
    "
    class="q-mt-xl"
  >
    <div class="text-h6 text-center q-pb-lg">ابزارک‌های مخفی شده</div>
    <div class="row q-col-gutter-md">
      <div
        v-for="widget in draggable.hiddenWidgets.value"
        :key="'hidden-' + widget.id"
        :class="widget.class"
      >
        <component
          class="overflow-hidden no-pointer-events disabled non-selectable"
          :is="getComponentById(widget.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/useGeneralTab";

  import InvoicesWidgetV2 from "src/components/areas/dashboard/widgets/InvoiceSummary.vue";
  import SomeInfo from "src/components/areas/dashboard/widgets/NetIncome.vue";
  import RevenueExpenseByMonth from "src/components/areas/dashboard/widgets/RevenueExpenseByMonth.vue";
  import IncomeStatement from "src/components/areas/dashboard/widgets/IncomeStatement.vue";
  import RatiosWidget from "src/components/areas/dashboard/widgets/RatiosWidget.vue";
  import TopProducts from "src/components/areas/dashboard/widgets/TopProducts.vue";
  import SalesWidget from "src/components/areas/dashboard/widgets/sales/SalesWidget.vue";
  import CashBalance from "src/components/areas/dashboard/widgets/CashBalance.vue";
  import BankBalance from "src/components/areas/dashboard/widgets/BankBalance.vue";
  import ExpensesWidget from "src/components/areas/dashboard/widgets/expenses/ExpenseWidget.vue";
  import RevenueExpense from "src/components/areas/dashboard/widgets/expenses/RevenueExpense.vue";
  import NewsCarousel from "src/components/areas/dashboard/widgets/NewsBanner.vue";

  const metaData = [
    { id: 1, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 2, class: "col-md-8 col-sm-12 col-xs-12" },
    { id: 3, class: "col-md-12 col-sm-12 col-xs-12" },
    { id: 4, class: "col-md-12 col-sm-12 col-xs-12" },
    { id: 5, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 6, class: "col-md-8 col-sm-12 col-xs-12" },
    { id: 7, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 8, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 9, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 10, class: "col-md-4 col-sm-6 col-xs-12" },
    { id: 11, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 12, class: "col-md-4 col-sm-6 col-xs-12" },
  ];

  const draggable = useGeneralTab(metaData);

  const widgets = [
    { id: 1, component: SomeInfo },
    { id: 2, component: InvoicesWidgetV2 },
    { id: 3, component: NewsCarousel },
    { id: 4, component: RevenueExpenseByMonth },
    { id: 5, component: RatiosWidget },
    { id: 6, component: RevenueExpense },
    { id: 7, component: IncomeStatement },
    { id: 8, component: SalesWidget },
    { id: 9, component: ExpensesWidget },
    { id: 10, component: TopProducts },
    { id: 11, component: CashBalance },
    { id: 12, component: BankBalance },
  ];

  const activeButton = computed(() =>
    draggable.isShaking.value ? "btn-active" : ""
  );

  const getComponentById = (id) =>
    widgets.find((widget) => widget.id === id)?.component;
</script>
