<template>
  <toolbar buttons back-button title="کاردکس کالا" />

  <q-card :class="card">
    <q-card-section :class="cardSection">
      <div class="row q-col-gutter-md">
        <div class="col-md-2 col-sm-2 col-xs-12">
          <q-item-label class="text-body2 caption-on-dark q-mb-sm">
            کد
          </q-item-label>
          <q-field dense outlined>
            <template v-slot:control>
              <div>0310c</div>
            </template>
          </q-field>
        </div>
        <div class="col-md-3 col-sm-4 col-xs-12">
          <q-item-label class="text-body2 caption-on-dark q-mb-sm">
            عنوان
          </q-item-label>
          <q-field dense outlined>
            <template v-slot:control>
              <div>نرم افزار حسابداری</div>
            </template>
          </q-field>
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <q-item-label class="text-body2 caption-on-dark q-mb-sm">
            گروه
          </q-item-label>
          <q-field dense outlined>
            <template v-slot:control>
              <div>برق و کامپیوتر</div>
            </template>
          </q-field>
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <q-item-label class="text-body2 caption-on-dark q-mb-sm">
            موجودی اول دوره
          </q-item-label>
          <q-field dense outlined>
            <template v-slot:control>
              <div>10.00</div>
            </template>
          </q-field>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <q-tabs
    v-model="tab"
    class="text-h6 text-weight-700 primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      name="turnover-detail"
      label="ریز گردش"
      icon="o_manage_search"
    />
    <q-tab name="sales" label="آمار فروش" icon="o_assignment" />
    <q-tab name="history" label="تاریخچه" icon="o_history" />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    class="border-radius-lg q-mt-md"
    :class="salesPanel"
    v-model="tab"
    animated
  >
    <q-tab-panel class="no-padding" name="turnover-detail">
      <desktop-data-grid
        v-if="$q.screen.gt.xs"
        :grid-store="gridStore"
      />
      <mobile-data-grid
        v-if="$q.screen.xs"
        toolbar
        :grid-store="gridStore"
      />
    </q-tab-panel>

    <q-tab-panel class="no-padding" name="sales">
      <div class="row q-col-gutter-md">
        <div class="col-md-8 col-sm-12 col-xs-12">
          <mini-widget class="q-mb-md" />
          <line-chart height="300" :legend="true" />
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <most-sales />
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="history" class="no-padding">
      <mobile-comments v-if="$q.screen.xs" />
      <desktop-comments v-else />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid";

  import Toolbar from "src/components/shared/ToolBar.vue";
  import DesktopDataGrid from "src/components/areas/cmn/product/desktop/index/DataGrid.vue";
  import MobileDataGrid from "src/components/areas/cmn/product/mobile/index/DataGrid.vue";
  import DesktopComments from "src/components/areas/cmn/product/desktop/comments/IndexView.vue";
  import MobileComments from "src/components/areas/cmn/product/mobile/comments/IndexView.vue";
  import LineChart from "src/components/areas/cmn/product/desktop/widgets/lineChart/IndexView.vue";
  import MostSales from "src/components/areas/cmn/product/desktop/widgets/mostSales/IndexView.vue";
  import MiniWidget from "src/components/areas/cmn/product/desktop/widgets/miniWidget/IndexView.vue";

  const gridStore = useProductGrid();
  const $q = useQuasar();

  const tab = ref("turnover-detail");

  const salesPanel = computed(() => {
    return $q.screen.xs
      ? "no-border no-shadow"
      : tab.value === "sales"
      ? $q.screen.gt.xs
        ? "no-border bg-main"
        : ""
      : tab.value === "turnover-detail"
      ? "no-border shadow"
      : "bordered";
  });

  const card = computed(() => {
    return $q.screen.gt.xs ? "bordered" : "no-border no-shadow";
  });

  const cardSection = computed(() => {
    return {
      "q-pa-lg": $q.screen.gt.xs,
      "no-padding": $q.screen.lt.sm,
    };
  });
</script>
