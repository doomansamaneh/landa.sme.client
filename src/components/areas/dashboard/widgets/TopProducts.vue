<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="fit shadow border-radius-lg bordered"
  >
    <template v-if="isShakingComputed">
      <q-btn
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
      <q-card-section
        class="q-pb-none q-pt-lg row justify-between items-center"
      >
        <div
          class="row items-center q-gutter-sm justify-between full-width"
        >
          <div class="col-9">
            <q-item class="no-padding">
              <q-item-section avatar>
                <q-avatar
                  rounded
                  text-color="white"
                  icon="o_inventory_2"
                  size="md"
                  class="primary-gradient primary-shadow"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-weight-700">
                  کالا و خدمات پر فروش
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="row justify-end col">
            <q-btn
              round
              icon="refresh"
              unelevated
              @click="grid.loadData()"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-none q-pt-none">
        <loadable-data-grid
          ref="grid"
          data-source="sls/report/getInvoiceByProduct"
          :data-store="gridStore"
          sort-column="quantity"
          first-load
          :show-search="false"
          :scrollArea="false"
          scroll-bar-style="height: 370px;"
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
              <template v-slot:prepend>
                <q-icon name="o_search" color="primary" />
              </template>
            </q-input>
          </template>
          <template #item="{ item }">
            <q-item
              :to="`/cmn/product/Preview/${item.id}`"
              clickable
              class="no-decoration q-pl-lg q-pb-md q-pr-lg border-radius-xs text-on-dark"
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
                    class="inset-shadow-down text-body3 text-bold q-px-sm q-py-sm"
                    floating
                    color="negative"
                  >
                    {{ helper.formatNumberReadable(item.quantity) }}
                  </q-badge>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <div>
                  <span class="text-body3 ellipsis">
                    {{ item.productCode }} - {{ item.productTitle }}
                  </span>
                  <span class="text-body3 ellipsis">
                    قیمت فروش: {{ helper.formatNumber(item.price) }}
                    <span>({{ item.productUnitTitle }})</span>
                  </span>
                  <span class="text-body3 ellipsis">
                    {{ $t("shared.labels.total") }}:
                    <strong class="q-px-xs">
                      {{ helper.formatNumber(item.amount) }}
                    </strong>
                  </span>
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
  import { useInvoiceProductState } from "../../sls/_composables/useInvoiceProductState";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDraggableWidgets } from "src/composables/useDraggableWidgets";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";

  const gridStore = useInvoiceProductState();
  const tableStore = useDataTable({
    dataSource: "sls/report/getInvoiceByProduct",
    store: gridStore,
  });
  const draggable = useDraggableWidgets();

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

  const isShakingComputed = computed(() => draggable.isShaking.value);
</script>
