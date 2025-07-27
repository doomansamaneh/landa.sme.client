<template>
  <template v-if="$q.screen.xs">
    <!-- <toolbar-mobile
      v-if="toolbar"
      :table-store="tableStore"
      :title="title"
      buttons
      margin
    >
      <template #buttons>
        <q-btn no-caps
          padding="6px 12px"
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
    </toolbar-mobile> -->

    <desktop :table-store="tableStore" :title="title" />
  </template>

  <template v-else>
    <!-- <toolbar-desktop
      v-if="toolbar"
      :table-store="tableStore"
      :title_="title"
      buttons
      margin
    >
      <template #buttons>
        <q-btn no-caps
          padding="6px 12px"
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
    </toolbar-desktop> -->

    <desktop :table-store="tableStore" :title="title" />
  </template>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useDataTableExport } from "src/composables/useDataTableExport";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useProductFlowState } from "../../_composables/useProductFlowState";

  // import ToolbarDesktop from "components/shared/toolbars/DynamicToolbarDesktop.vue";
  // import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../desktop/ProductStock.vue";
  import Mobile from "../mobile/ProductStock.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
  });

  const dataSource = "inv/report/getProductFlow";
  const stockStore = useProductFlowState();
  const gridStore = useBaseInfoGrid(stockStore);
  const tableStore = useDataTable({
    dataSource: dataSource,
    store: gridStore,
  });
  const { exportAll } = useDataTableExport(tableStore);
</script>
