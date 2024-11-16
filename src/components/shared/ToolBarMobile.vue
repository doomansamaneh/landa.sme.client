<template>
  <tool-bar-observer ref="observer">
    <q-toolbar>
      <template v-if="selectedIds?.length == 0">
        <div class="row items-center">
          <q-btn
            dense
            round
            class="text-caption q-mr-sm"
            unelevated
            @click="onBottomSheetShow"
          >
            <q-icon name="more_vert" />
          </q-btn>

          <div class="row items-center">
            <div
              class="title-width ellipsis-2-lines text-weight-700 no-letter-spacing"
              :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
            >
              <slot name="header-title">
                <span class="text-body2 no-letter-spacing">
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
          <template v-if="sortBtn">
            <slot name="sort-btn">
              <q-btn
                round
                class="text-caption q-mr-sm"
                unelevated
                dense
                v-if="!tableStore?.activeRow?.value"
                @click="showSortSheet"
              >
                <q-icon name="sort" />
              </q-btn>
            </slot>
          </template>

          <template v-if="searchBtn">
            <slot name="search-btn">
              <q-btn
                round
                unelevated
                dense
                class="text-caption"
                v-if="!tableStore?.activeRow?.value"
                @click="showSearchDialog"
              >
                <slot name="search-btn-icon">
                  <q-icon name="o_filter_alt" />
                </slot>
              </q-btn>
            </slot>
          </template>
        </div>
      </template>

      <template v-if="selectedIds?.length > 0">
        <div class="row items-center q-gutter-sm">
          <q-btn
            round
            class="text-caption"
            unelevated
            dense
            @click="onBottomSheetShow"
          >
            <q-icon name="more_vert" />
          </q-btn>
          <q-btn
            class="text-caption"
            round
            unelevated
            no-caps
            @click="
              crudStore.deleteBatch(
                selectedIds,
                tableStore.reloadData
              )
            "
          >
            <q-icon name="o_delete" />
          </q-btn>
          <q-btn class="text-caption" round unelevated no-caps>
            <q-icon name="o_edit" />
          </q-btn>
        </div>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-btn
            padding="0 9px"
            rounded
            outline
            class="text-body2 text-on-dark no-letter-spacing q-ml-sm bg-dark no-pointer-events"
          >
            {{ selectedIds?.length }}
          </q-btn>
          <q-btn
            round
            unelevated
            class="text-caption text-on-dark"
            icon="close"
            @click="deselect"
          />
        </div>
      </template>
    </q-toolbar>
  </tool-bar-observer>

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
          :title="$t('shared.labels.create')"
          icon="o_add"
          :to="`/${baseRoute}/create`"
        />
        <q-separator size="0.5px" class="q-my-sm" />

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
          @click="tableStore.exportAll()"
        />

        <menu-item
          :title="$t('shared.labels.exportExcelCurrentPage')"
          icon="o_download"
          @click="tableStore.exportCurrentPage()"
        />
      </q-list>
    </template>
  </bottom-sheet>

  <mobile-sort-sheet
    :status="sortSheetStatus"
    :table-store="tableStore"
    @hide="sortSheetStatus = false"
  />

  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    maximized
    v-model="serachDialog"
  >
    <slot name="advanced-search" />
  </q-dialog>
</template>

<script setup>
  import { ref, computed } from "vue";

  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import MobileSortSheet from "./MobileSortSheet.vue";
  import MenuItem from "./buttons/MenuItem.vue";
  import ToolBarObserver from "./ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    crudStore: Object,
    activation: Boolean,
    backButton: Boolean,
    buttons: Boolean,
    searchBtn: Boolean,
    sortBtn: Boolean,
  });

  const bottomSheetStatus = ref(false);
  const serachDialog = ref(false);
  const observer = ref(null);

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
</script>

<style lang="scss">
  @media (min-width: 320px) and (max-width: 360px) {
    .title-width {
      max-width: 160px !important;
    }
  }

  @media (min-width: 376px) and (max-width: 599px) {
    .title-width {
      max-width: auto !important;
    }
  }
</style>
