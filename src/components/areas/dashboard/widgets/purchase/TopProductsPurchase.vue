<template>
  <q-card
    v-access="`sls.purchase.view`"
    :class="[isShakingComputed ? 'widget' : '']"
    class="fit shadow border-radius-lg bordered"
  >
    <template v-if="isShakingComputed">
      <q-btn
        no-caps
        class="off-btn bordered absolute-top-right q-ma-sm z-1"
        round
        dense
        unelevated
        @click="hideWidget"
      >
        <q-icon name="o_visibility_off" />
      </q-btn>
    </template>

    <div
      :class="
        isShakingComputed ? 'no-pointer-events' : 'pointer-events-all'
      "
    >
      <q-card-section class="q-pb-none">
        <div class="row items-center justify-between">
          <widget-title
            :label="$t('shared.labels.topPurchasedProducts')"
            icon="o_inventory_2"
          />

          <q-btn
            no-caps
            round
            size="10px"
            unelevated
            @click="grid.loadData()"
          >
            <q-icon name="refresh" size="24px" />
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="q-px-none" style="min-height: 300px">
        <loadable-data-grid
          ref="grid"
          data-source="sls/report/getPurchaseByProduct"
          :data-store="gridStore"
          sort-column="quantity"
          first-load
          :show-search="false"
          :scrollArea="false"
          scroll-bar-style="height: 300px;"
        >
          <template #search>
            <q-input
              ref="searchInput"
              inputmode="search"
              color="grey-5"
              outlined
              v-model="tableStore.pagination.value.searchTerm"
              :placeholder="$t('shared.labels.search')"
              dense
              clearable
              clear-icon="o_clear"
              rounded
              @keydown.enter="grid.loadData()"
              class="text-body2 q-mx-sm"
            >
              <template #prepend>
                <q-icon name="o_search" color="primary" />
              </template>
            </q-input>
          </template>
          <template #item="{ item }">
            <q-item
              :to="`/cmn/product/Preview/${item.id}`"
              clickable
              class="no-decoration q-pl-md q-pb-md q-pr-md border-radius-xs text-on-dark"
            >
              <q-item-section avatar>
                <q-avatar
                  class="primary-gradient primary-shadow border-radius-xs"
                  square
                  v-if="item.picture"
                  text-color="white"
                  size="72px"
                >
                  <img :src="item.picture" />
                  <q-badge floating color="negative">
                    {{ helper.formatNumberReadable(item.quantity) }}
                  </q-badge>
                </q-avatar>

                <q-avatar
                  class="border-radius-xs"
                  square
                  size="72px"
                  text-color="white"
                  :style="helper.generateAvatarStyle(item.id)"
                  v-else
                >
                  <div class="char text-body1 text-bold">
                    {{ helper.getFirstChar(item.productTitle) }}
                  </div>
                  <q-badge
                    class="inset-shadow-down text-caption line-height-xs"
                    floating
                  >
                    {{ helper.formatNumberReadable(item.quantity) }}
                  </q-badge>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <span class="text-body3">
                  {{ item.productCode }} - {{ item.productTitle }}
                </span>
                <div class="text-body3">
                  {{ $t("shared.priceAdjustmentTarget.purchase") }}:
                  {{ helper.formatNumber(item.price) }}
                  <span>({{ item.productUnitTitle }})</span>
                </div>
                <div class="text-body3">
                  {{ $t("shared.labels.total") }}:
                  <strong class="q-px-xs">
                    {{ helper.formatNumber(item.amount) }}
                  </strong>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </loadable-data-grid>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { usePurchaseProductState } from "../../_composables/purchaseTab/usePurchaseProductState";
  import { useDataTable } from "src/composables/useDataTable";
  import { usePurchaseTab } from "src/components/areas/dashboard/_composables/purchaseTab/usePurchaseTab";

  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";
  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";

  const gridStore = usePurchaseProductState();
  const tableStore = useDataTable({
    dataSource: "sls/report/getPurchaseByProduct",
    store: gridStore,
  });
  const draggable = usePurchaseTab();

  const grid = ref(null);
  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  async function loadData() {
    tableStore.pagination.value.currentPage = 1;
    await tableStore.reloadData();
    gridStore.value.rows.value = tableStore.rows.value;
  }

  async function reloadData() {
    await tableStore.reloadData();
    gridStore.value.rows.value = [
      ...gridStore.value.rows.value,
      ...tableStore.rows.value,
    ];
  }

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
