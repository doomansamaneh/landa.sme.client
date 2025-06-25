<template>
  <tool-bar inside buttons title="کاردکس کالا">
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        اصلاح موجودی
      </q-btn>

      <q-btn padding="6px 12px" class="text-body2" rounded unelevated>
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>

  <div class="q-pb-lg row q-col-gutter-md">
    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 q-mb-sm">کد</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3">
            {{ item.code }}
          </div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 q-mb-sm">عنوان</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3">
            {{ item.title }}
          </div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 q-mb-sm">گروه</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3">گروه لوازم اداری و مصرفی</div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 q-mb-sm">موجودی اول دوره</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3">
            {{ item.salesQuantity }}
          </div>
        </template>
      </q-field>
    </div>
  </div>

  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    multiSelect_
    numbered
    bordered
    wrapCells_
    dense_
    :expandable="true"
    class="q-mb-md"
  >
    <template #filter-isActive="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.isActiveOptions(isActiveOptions, 'isActiveOptions')
        "
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template
      v-for="(slot, name) in $slots"
      :key="slot"
      #[name]="{ item }"
    >
      <slot :name="name" :item="item"></slot>
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        :base-route="baseRoute"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { isActiveOptions } from "src/constants";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  import RowToolBar from "src/components/shared/toolbars/DesktopRowToolbar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ToolBar from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import IsActive from "src/components/shared/IsActive.vue";

  const props = defineProps({
    filterExpersions: Array,
    item: Array,
  });

  const dataGrid = ref(null);
  const dataSource = "sls/report/getProductStockItems";

  const gridStore = useProductStockItemGrid(props.filterExpersions);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);
  const { exportAll } = useDataTableExport(tableStore.value);

  defineExpose({
    tableStore,
  });
</script>
