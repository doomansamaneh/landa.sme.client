<template>
  <!-- <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      buttons
      margin
    >
      <template #buttons>
        <q-btn no-caps
          padding="8px 16px"
          class="text-body2"
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
    </toolbar-mobile>

    <!-- <mobile
      :grid-store="gridStore"
      :data-source="dataSource"
      :title="title"
      :crud-store="crudStore"
      ref="mobileGrid"
    /> -->
  <!-- </template> -->

  <desktop :table-store="tableStore" :title="title" />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  // import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../desktop/AccountReport.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    dataSource: {
      type: String,
      default: () => "acc/report/getCustomerData",
    },
    gridStore: Object,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: props.gridStore,
  });

  const { exportAll } = useDataTableExport(tableStore);
</script>
