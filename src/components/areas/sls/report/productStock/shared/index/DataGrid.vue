<template>

  <template v-if="$q.screen.xs">
    
    <toolbar-desktop v-if="toolbar" :table-store="mobileGrid?.tableStore" :crud-store="crudStore" :title="title"
      :base-route="baseRoute" buttons margin>

      <template #buttons>

        <q-btn padding="6px 12px" class="text-body2 no-letter-spacing" rounded unelevated>
          <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
          {{ $t("shared.labels.more") }}

          <q-menu class="border-radius-lg" fit :offset="[0, 10]">
            <q-list>
              <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportAll()">
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_download" size="20px" /></q-avatar>
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

    </toolbar-desktop>

    <mobile :grid-store="gridStore" :crud-store="crudStore" :title="title" data-source="sls/report/getProductStock"
      ref="mobileGrid" />
  </template>

  <template v-else>

    <toolbar-desktop v-if="toolbar" :table-store="desktopGrid?.tableStore" :crud-store="crudStore" :title="title"
      :base-route="baseRoute" buttons margin>

      <template #buttons>

        <q-btn padding="6px 12px" class="text-body2 no-letter-spacing" rounded unelevated>
          <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
          {{ $t("shared.labels.more") }}

          <q-menu class="border-radius-lg" fit :offset="[0, 10]">
            <q-list>
              <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportAll()">
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_download" size="20px" /></q-avatar>
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

    </toolbar-desktop>

    <desktop :grid-store="gridStore" :crud-store="crudStore" :title="title" data-source="sls/report/getProductStock"
      ref="desktopGrid" />

  </template>

</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useProductStockGrid } from "src/components/areas/sls/_composables/useProductStockGrid.js";
import { useFormActions } from "src/composables/useFormActions";

import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
import ToolbarMobile from "components/shared/ToolBarMobile.vue";
import Desktop from "../../desktop/index/DataGrid.vue";
import Mobile from "../../mobile/index/DataGrid.vue";

const props = defineProps({
  toolbar: Boolean,
});

const { t } = useI18n();

const title = t("main-menu-items.Sls_Report_ProductStock");
const baseRoute = "sls/report/productStock";

const $q = useQuasar();
const gridStore = useProductStockGrid();
const crudStore = useFormActions(baseRoute);
const desktopGrid = ref(null);
const mobileGrid = ref(null);
</script>
