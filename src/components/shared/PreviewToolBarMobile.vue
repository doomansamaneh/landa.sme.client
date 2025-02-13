<template>
  <q-scroll-observer @scroll="onScroll" />
  <div style="margin-bottom: 36px">
    <q-page-sticky :class="scroll" class="z-1" position="top" expand>
      <q-toolbar style="padding-left: 16px; padding-right: 16px">
        <div class="row items-center">
          <slot name="buttons">
            <q-btn
              dense
              round
              class="text-caption q-mr-sm"
              unelevated
              @click="onBottomSheetShow"
            >
              <q-icon name="more_vert" />
            </q-btn>
          </slot>

          <div class="row items-center">
            <div
              class="ellipsis text-weight-700"
              :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
            >
              <slot name="header-title">
                <span class="text-body2 text-weight-700">
                  {{ title }}
                </span>
                <q-btn
                  v-if="tableStore?.pagination.value.totalItems > 0"
                  rounded
                  unelevated
                  dense
                  padding="0px 6px"
                  outline
                  :label="tableStore?.pagination.value.totalItems"
                  class="q-ml-sm bg-dark text-on-dark text-body3 no-pointer-events"
                />
              </slot>
            </div>
          </div>
        </div>

        <q-space />

        <div class="row items-center">
          <back-button />
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ $t("shared.labels.more") }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item
          :title="$t('shared.labels.refresh')"
          icon="o_refresh"
          @click="tableStore.reloadData"
        />

        <template v-if="activation && selectedIds?.length > 0">
          <q-separator size="0.5px" class="q-my-sm" />

          <menu-item
            :title="$t('shared.labels.activate')"
            icon="o_check"
            @click="
              crudStore.activate(selectedIds, tableStore.reloadData)
            "
          />

          <menu-item
            :title="$t('shared.labels.deactivate')"
            icon="o_close"
            @click="
              crudStore.deactivate(selectedIds, tableStore.reloadData)
            "
          />
        </template>

        <slot name="buttons-custom" />

        <q-separator size="0.5px" class="q-my-sm" />

        <menu-item
          :title="$t('shared.labels.eportToExcel')"
          icon="o_download"
          @click="exportAll()"
        />

        <menu-item
          :title="$t('shared.labels.exportExcelCurrentPage')"
          icon="o_download"
          @click="exportCurrentPage()"
        />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useCheckDialogOpen } from "src/composables/useCheckDialogOpen";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import MenuItem from "./buttons/MenuItem.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    crudStore: Object,
    activation: Boolean,
    backButton: Boolean,
    buttons: Boolean,
  });

  const bottomSheetStatus = ref(false);
  const serachDialog = ref(false);
  const scroll = ref({});

  const checkDialog = useCheckDialogOpen();
  const { exportAll, exportCurrentPage } = useDataTableExport(
    props.tableStore
  );

  const sortSheetStatus = ref(false);

  const selectedIds = computed(() =>
    props.tableStore?.selectedRows?.value.map((item) => item.id)
  );

  function deselect() {
    props.tableStore.selectAll(false);
    props.tableStore.setActiveRow(null);
  }

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  const showSearchDialog = () => {
    serachDialog.value = true;
  };

  const showSortSheet = () => {
    sortSheetStatus.value = true;
  };

  const onScroll = (details) => {
    scroll.value =
      details.position.top || checkDialog.hasScrollbarClass.value
        ? "toolbar-glass-effect"
        : "bg-main";
  };
</script>
