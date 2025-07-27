<template>
  <q-card bordered class="border-radius-xl">
    <div>
      <add-by-code :form-store="formStore" />
    </div>
    <div class="q-px-sm">
      <q-tabs
        v-model="tab"
        class="text-h6 text-weight-700 primary-tabs"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        @update:model-value="tabChanged"
      >
        <q-tab name="mostSold" class="q-mr-xs">
          <template #default>
            <q-icon name="o_inventory_2" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">
              {{ $t("shared.labels.mostSold") }}
            </div>
          </template>
        </q-tab>
        <q-tab name="latest" class="q-mr-xs">
          <template #default>
            <q-icon
              name="o_question_mark"
              size="xs"
              class="q-mr-sm"
            />
            <div class="text-body3 text-bold">
              {{ $t("shared.labels.latestSales") }}
            </div>
          </template>
        </q-tab>
        <q-tab name="default" class="q-mr-xs">
          <template #default>
            <q-icon
              name="o_question_mark"
              size="xs"
              class="q-mr-sm"
            />
            <div class="text-body3 text-bold">
              {{ $t("shared.labels.byCodeOrder") }}
            </div>
          </template>
        </q-tab>
      </q-tabs>
    </div>
    <q-separator />

    <loadable-data-grid
      ref="grid"
      data-source="cmn/product/getLookupData"
      sort-column="quantity"
      :sort-column-order="sortOrder.descending"
      first-load
      :show-search="true"
      :scroll-area="false"
      scroll-bar-style="height: calc(100vh);"
    >
      <template #item="{ item }">
        <q-item
          clickable
          class="text-on-dark"
          @click.stop="formStore.addProduct(item, formType)"
        >
          <div class="row q-gutter-x-sm items-center">
            <q-avatar
              v-if="item.picture"
              class="primary-gradient primary-shadow border-radius-xs"
              square
              text-color="white"
              size="58px"
            >
              <img :src="item.picture" />
            </q-avatar>

            <q-avatar
              class="border-radius-xs"
              square
              size="58px"
              text-color="white"
              :style="helper.generateAvatarStyle(item.id)"
              v-else
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(item.title) }}
              </div>
              <q-badge
                v-if="formStore.getProductQuantity(item.id)"
                class="inset-shadow-down text-body3 text-bold q-px-sm q-py-sm"
                floating
                color="negative"
              >
                {{
                  helper.formatNumber(
                    formStore.getProductQuantity(item.id)
                  )
                }}
              </q-badge>
            </q-avatar>
          </div>

          <div class="row items-center justify-between full-width">
            <div class="col-10 q-pl-lg column">
              <span class="text-body3 text-weight-600">
                {{ item.code }} - {{ item.title }}
              </span>
              <span v-if="item.purchasePrice" class="text-body3">
                {{ $t("shared.columns.purchasePrice") }}:
                {{ helper.formatNumber(item.purchasePrice) }}
              </span>
              <span class="text-body3">
                {{ $t("shared.columns.price") }}:
                {{ helper.formatNumber(item.price) }}
              </span>
              <span v-if="item.maxPrice" class="text-body3">
                {{ $t("shared.labels.maxSalePrice") }}:
                {{ helper.formatNumber(item.maxPrice) }}
              </span>
              <span
                v-if="item.typeId !== productType.service"
                class="text-body3"
              >
                {{ $t("shared.columns.stock") }}:
                <q-icon
                  v-if="item.stock <= 0"
                  class="text-warning"
                  name="warning"
                ></q-icon>
                {{ helper.formatNumber(item.stock) }}
              </span>
            </div>
            <div
              v-if="formStore.getProductQuantity(item.id)"
              class="absolute-top-right q-pa-sm"
            >
              <q-btn
                no-caps
                flat
                unelevated
                round
                color="red"
                size="sm"
                @click.stop="formStore.removeProduct(item)"
              >
                <q-icon name="o_close" color="red" size="20px" />
              </q-btn>
            </div>
          </div>
        </q-item>
      </template>
    </loadable-data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import {
    invoiceFormType,
    productType,
    sortOrder,
  } from "src/constants";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";
  import AddByCode from "../AddByCode.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    model: invoiceModel,
    formType: invoiceFormType,
  });

  const grid = ref(null);
  const tab = ref("mostSold");
  const pulseProduct = computed(
    () => ""
    //props.model.invoiceItems.length < 1 ? "pulse" : ""
  );

  async function tabChanged(e) {
    if (e === "mostSold") {
      grid.value.tableStore.pagination.value.sortColumn = "quantity";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.descending;
    } else if (e === "latest") {
      grid.value.tableStore.pagination.value.sortColumn = "lastDate";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.descending;
    } else {
      grid.value.tableStore.pagination.value.sortColumn = "code";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.ascending;
    }
    await grid.value.loadData();
  }
</script>

<style lang="scss" scoped>
  .pulse {
    animation: pulse 3s infinite;
  }
  .custom-toggle {
    border: 1px solid var(--q-primary);
  }
</style>
