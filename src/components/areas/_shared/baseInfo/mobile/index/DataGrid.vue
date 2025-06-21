<template>
  <data-grid
    ref="dataGrid"
    :data-table-store="tableStore"
    :create-url="createUrl"
    :base-route="baseRoute"
  >
    <template #body="{ item }">
      <q-card
        flat
        bordered
        :class="tableStore.getRowClass(item)"
        v-touch-hold.capture="
          () => tableStore?.selectRow(item, !item.selected)
        "
        @click="previewPage ? goToPreview(item) : setActiveRow(item)"
      >
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <!-- <div class="col-12">
              <span v-if="item.code">{{ item.code }} -</span>
              {{ item.title }}
              <div v-if="item.comment">
                <small class="">{{ item.comment }}</small>
              </div>
            </div> -->
            <div class="col-12">
              <div
                v-for="col in tableStore.columns?.value"
                :key="col.name"
                class="q-py-xs"
              >
                <span v-if="col.field && col.label" class="q-px-sm">
                  <template v-if="col.name === 'isActive'">
                    {{ col.label }}:
                    <q-btn
                      v-if="item[col.field]"
                      round
                      dense
                      size="10px"
                      unelevated
                      icon="o_done"
                      text-color="white"
                      class="green-gradient green-shadow no-pointer-events"
                    />
                    <q-btn
                      v-else
                      round
                      dense
                      size="10px"
                      unelevated
                      icon="o_close"
                      text-color="white"
                      class="red-gradient red-shadow no-pointer-events"
                    />
                  </template>
                  <template v-else>
                    {{ col.label }}:
                    {{ formatValue(col, item[col.field]) }}
                  </template>
                </span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.title}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { dataType } from "src/constants/enums";
  import { helper } from "src/helpers/helper";

  import { usePreviewMenuContext } from "../../../menus/usePreviewMenuContext";
  import { useBaseInfoPreviewMenu } from "../../../_menus/useBaseInfoPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const router = useRouter();

  const props = defineProps({
    tableStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    createUrl: String,
    previewPage: {
      type: Boolean,
      default: false,
    },
  });

  const setActiveRow = (row) => {
    if (props.tableStore) {
      props.tableStore.setActiveRow(row);
    }
  };

  const goToPreview = (row) => {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  };

  const formatValue = (col, value) => {
    if (col.type === dataType.number) {
      return helper.formatNumber(value ?? 0);
    }
    return value;
  };

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, props.baseRoute, {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useBaseInfoPreviewMenu(context.value);
  }
</script>
