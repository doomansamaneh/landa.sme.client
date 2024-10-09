<template>
  <q-scroll-observer @scroll="onScroll" />
  <div style="margin-bottom: 40px">
    <q-page-sticky
      :class="scroll"
      class="z-1"
      position="top"
      expand
    >
      <q-toolbar style="padding-left: 20px; padding-right: 20px">
        <div
          class="flex items-center"
          :class="tableStore?.activeRow?.value ? 'q-gutter-sm' : ''"
        >
          <slot name="buttons">
            <template v-if="tableStore?.activeRow?.value != null">
              <slot name="buttons-edit">
                <q-btn
                  :to="`/${baseRoute}/edit/${tableStore?.activeRow?.value.id}`"
                  class="text-caption"
                  round
                  unelevated
                  no-caps
                >
                  <q-icon name="o_edit" />
                  <q-tooltip class="custom-tooltip">
                    {{ $t("shared.labels.edit") }}
                  </q-tooltip>
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <slot name="buttons-batch-action"></slot>
              <slot name="buttons-delete-batch">
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
              </slot>
            </template>

            <template
              v-else-if="tableStore?.activeRow?.value != null"
            >
              <slot name="buttons-delete">
                <q-btn
                  class="text-caption"
                  round
                  unelevated
                  no-caps
                  @click="
                    crudStore.deleteById(
                      tableStore.activeRow.value.id,
                      tableStore.reloadData
                    )
                  "
                >
                  <q-icon name="o_delete" />
                  <q-tooltip class="custom-tooltip">
                    {{ $t("shared.labels.delete") }}
                  </q-tooltip>
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <q-btn
                class="text-caption"
                round
                unelevated
                @click="onBottomSheetShow"
              >
                <q-icon name="more_horiz" />
              </q-btn>
            </template>
          </slot>
        </div>

        <q-space v-if="backButton" />

        <q-space v-if="tableStore?.activeRow?.value != null" />

        <template v-if="selectedIds?.length > 0">
          <q-btn
            padding="2px 10px"
            rounded
            outline
            class="text-body2 no-letter-spaicng q-ml-sm bg-dark no-pointer-events"
          >
            {{ selectedIds?.length }}
          </q-btn>
          <q-btn
            round
            unelevated
            class="q-ml-md text-on-dark"
            icon="close"
            @click="deselect"
          />
        </template>

        <template v-else>
          <div class="row items-center">
            <slot name="header">
              <span
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
                    padding="0px 10px"
                    outline
                    :label="tableStore?.pagination.value.totalItems"
                    class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events"
                  />
                </slot>
              </span>
              <back-button v-if="backButton" class="q-ml-md" />
            </slot>
          </div>
        </template>

        <q-space
          v-if="!backButton && !tableStore?.activeRow?.value"
        />

        <template v-if="sortBtn">
          <slot name="sort-btn">
            <q-btn
              round
              class="q-mr-sm"
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
              v-if="!tableStore?.activeRow?.value"
              @click="showSearchDialog"
            >
              <slot name="search-btn-icon">
                <q-icon name="o_filter_alt" />
              </slot>
            </q-btn>
          </slot>
        </template>
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
  import { useCheckDialogOpen } from "src/composables/useCheckDialogOpen";

  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import MobileSortSheet from "./MobileSortSheet.vue";
  import MenuItem from "./buttons/MenuItem.vue";

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
  const scroll = ref({});

  const checkDialog = useCheckDialogOpen();

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
