<template>
  <tool-bar :inside="inside" buttons>
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        اصلاح موجودی
      </q-btn>

      <q-btn
        padding="6px 12px"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
      >
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="tableStore.exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>

  <q-card>
    <q-card-section class="text-center">
      <span class="text-weight-700 text-h6 no-letter-spacing">
        کاردکس کالا
      </span>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-y-md">
      <div class="row">
        <div class="col-1">
          <span class="text-body3 no-letter-spacing">کالا:</span>
        </div>
        <div class="text-body2 text-bold no-letter-spacing">
          {{ item?.code }} / {{ item?.title }}
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <span class="text-body3 no-letter-spacing">گروه:</span>
        </div>
        <div class="text-body3 no-letter-spacing">
          {{ item?.productGroupTitle }}
        </div>
      </div>

      <div class="row">
        <div class="col-1">
          <span class="text-body3 no-letter-spacing">
            موجودی اول دوره:
          </span>
        </div>
        <div class="text-body2 text-bold no-letter-spacing">
          {{ item?.openomgStock?.toLocaleString() }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-px-none">
      <product-stock-item
        ref="dataGrid"
        :data-source="dataSource"
        :grid-store="gridStore"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import { sqlOperator } from "src/constants";
  import { useProductStockItemGrid } from "src/components/areas/inv/_composables/useProductStockItemGrid";

  import ProductStockItem from "./ProductStockItem.vue";
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const route = useRoute();
  const dataGrid = ref(null);
  const filterExpersions = computed(() => {
    const productId = route.params.productId;
    const itemId = props.item?.id ?? productId;
    if (itemId) {
      return [
        {
          fieldName: "ii.productId",
          operator: sqlOperator.equal,
          value: itemId,
        },
      ];
    }

    return null;
  });
  const dataSource = "sls/report/getProductStockItems";
  const gridStore = useProductStockItemGrid(filterExpersions?.value);

  const tableStore = computed(() => dataGrid?.value?.tableStore);
</script>
