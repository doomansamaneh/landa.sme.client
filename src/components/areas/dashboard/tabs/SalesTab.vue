<template>
  <q-toolbar v-if="$q.screen.gt.sm" class="no-padding">
    <div class="row items-center q-py-lg">
      <div class="row items-center q-gutter-sm">
        <q-btn
          no-caps
          dense
          class="bordered_ text-body2"
          size="14px"
          round
          unelevated
          :class="activeButton"
          @click="draggable.toggleShake"
        >
          <q-icon size="24px" name="o_tune" />
        </q-btn>
      </div>
      <div class="q-ml-sm text-h6 text-weight-700 text-on-dark">
        {{ $t("dashboard.salesTab.title") }}
      </div>
    </div>

    <q-space />

    <div class="flex q-gutter-sm items-center">
      <q-btn
        no-caps
        v-if="draggable.state.isTabShaking('sales')"
        class="text-body2 primary-gradient text-white primary-shadow"
        rounded
        unelevated
        @click="draggable.saveLayoutChanges"
      >
        <q-icon class="q-mr-xs" size="20px" name="o_save" />
        <div class="text-body2">
          {{ $t("dashboard.buttons.save") }}
        </div>
      </q-btn>

      <q-btn
        no-caps
        v-if="draggable.state.isTabShaking('sales')"
        class="bordered text-body2"
        rounded
        unelevated
        size="14px"
        @click="draggable.resetToDefault"
      >
        <q-icon class="q-mr-xs" size="20px" name="o_refresh" />
        <div class="text-body2">
          {{ $t("dashboard.buttons.default") }}
        </div>
      </q-btn>
    </div>
  </q-toolbar>

  <div class="row q-col-gutter-md">
    <div
      v-for="(widget, index) in draggable.widgets.value"
      :key="widget.id"
      :class="[
        widget.class,
        {
          shake:
            draggable.state.isTabShaking('sales') &&
            !widget.isHovered,
        },
      ]"
      @mouseover="widget.isHovered = true"
      @mouseleave="widget.isHovered = false"
    >
      <component
        :class="[
          widget.class,
          { grabbable: draggable.state.isTabShaking('sales') },
        ]"
        :is="getComponentById(widget.id)"
        :draggable="draggable.state.isTabShaking('sales')"
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
      draggable.state.isTabShaking('sales')
    "
    class="q-mt-xl"
  >
    <div class="text-h6 text-center q-pb-lg">
      {{ $t("dashboard.salesTab.hiddenWidgets") }}
    </div>
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
  import { useSalesTab } from "src/components/areas/dashboard/_composables/salesTab/useSalesTab";

  import TopProducts from "src/components/areas/dashboard/widgets/TopProducts.vue";
  import SalesWidget from "src/components/areas/dashboard/widgets/sales/SalesWidget.vue";
  import InvoiceByCustomer from "src/components/areas/dashboard/widgets/sales/InvoiceByCustomer.vue";
  import InvoiceByProduct from "src/components/areas/dashboard/widgets/sales/InvoiceByProduct.vue";
  import InvoiceByProductGroup from "src/components/areas/dashboard/widgets/sales/InvoiceByProductGroup.vue";
  import FantasySalesPreview from "src/components/areas/dashboard/widgets/sales/GoToSalesReview.vue";

  const metaData = [
    { id: 1, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 2, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 3, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 4, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 5, class: "col-md-4 col-sm-12 col-xs-12" },
    { id: 6, class: "col-md-4 col-sm-12 col-xs-12" },
  ];

  const draggable = useSalesTab(metaData);

  const widgets = [
    { id: 1, component: SalesWidget },
    { id: 2, component: TopProducts },
    { id: 3, component: InvoiceByCustomer },
    { id: 4, component: InvoiceByProduct },
    { id: 5, component: InvoiceByProductGroup },
    { id: 6, component: FantasySalesPreview },
  ];

  const activeButton = computed(() =>
    draggable.state.isTabShaking("sales") ? "btn-active" : ""
  );

  const getComponentById = (id) =>
    widgets.find((widget) => widget.id === id)?.component;
</script>
