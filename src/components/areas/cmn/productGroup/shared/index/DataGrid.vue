<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      buttons
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      activation
    />
    <mobile
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      v-if="toolbar"
      :table-store="desktpGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      activation
      buttons
    />

    <desktop
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      ref="desktpGrid"
    />
  </template>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useProductGroupGrid } from "src/components/areas/cmn/_composables/useProductGroupGrid";
import { useFormActions } from "src/composables/useFormActions";

import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
import ToolbarMobile from "components/shared/ToolBarMobile.vue";
import Desktop from "src/components/areas/cmn/productGroup/desktop/index/DataGrid.vue";
import Mobile from "src/components/areas/cmn/productGroup/mobile/index/DataGrid.vue";

const props = defineProps({
  toolbar: Boolean,
});

const { t } = useI18n();

const title = t("main-menu-items.Cmn_ProductGroup_View");
const baseRoute = "cmn/productGroup";

const $q = useQuasar();
const gridStore = useProductGroupGrid();
const crudStore = useFormActions(baseRoute);
const desktpGrid = ref(null);
const mobileGrid = ref(null);
</script>
