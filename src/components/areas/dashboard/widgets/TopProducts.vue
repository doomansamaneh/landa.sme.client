<template>
  <q-card class="shadow bordered">
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
        first-load
        :show-search="false"
        :scrollArea="false"
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
            class="text-body2 no-letter-spacing q-mx-sm"
          >
            <template v-slot:prepend>
              <q-icon name="o_search" color="primary" />
            </template>
          </q-input>
        </template>
        <template #item="{ item }">
          <q-item
            class="q-pl-lg q-pb-md q-pr-lg border-radius-xs text-on-dark"
          >
            <div class="row q-gutter-x-sm items-center">
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
                  class="inset-shadow-down text-body3 text-bold no-letter-spacing q-px-sm q-py-sm"
                  floating
                  color="negative"
                >
                  {{ helper.formatNumberReadable(item.quantity) }}
                </q-badge>
              </q-avatar>
            </div>

            <div class="row items-center justify-between full-width">
              <div class="col-9 q-pl-lg column">
                <span class="text-body3 no-letter-spacing">
                  {{ item.productCode }} - {{ item.productTitle }}
                </span>
                <span class="text-body3 no-letter-spacing">
                  قیمت فروش: {{ helper.formatNumber(item.price) }}
                </span>
                <span class="text-body3 no-letter-spacing">
                  {{ $t("shared.labels.total") }}:
                  <strong class="q-px-xs">
                    {{ helper.formatNumber(item.amount) }}
                  </strong>
                  <span>({{ item.productUnitTitle }})</span>
                </span>
              </div>
              <div class="col row justify-end items-center">
                <goto-detail
                  :to="`/cmn/product/Preview/${item.id}`"
                />
              </div>
            </div>
          </q-item>
        </template>
      </loadable-data-grid>
      <!-- <q-scroll-area
        style="height: 350px"
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
      </q-scroll-area> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { useInvoiceProductState } from "../../sls/_composables/useInvoiceProductState";
  import { useDataTable } from "src/composables/useDataTable";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";
  import GotoDetail from "src/components/shared/buttons/GotoDetail.vue";

  const tableStore = useDataTable({
    dataSource: "sls/report/getInvoiceByProduct",
  });
  const gridStore = useInvoiceProductState();
  const grid = ref(null);

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
</script>
