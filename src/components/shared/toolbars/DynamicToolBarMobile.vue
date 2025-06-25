<template>
  <toolbar-observer ref="observer">
    <q-toolbar>
      <div class="row items-center q-gutter-sm">
        <q-btn
          round
          class="text-caption"
          unelevated
          dense
          @click="bottomSheet?.show()"
        >
          <q-icon name="more_vert" />
        </q-btn>

        <div
          class="title-width ellipsis-2-lines text-weight-700"
          :class_="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
        >
          <slot name="header-title">
            <span class="text-body2">
              {{ title }}
            </span>
            <!-- <q-btn
                v-if="tableStore?.pagination.value.totalItems > 0"
                rounded
                unelevated
                dense
                padding="0px 6px"
                outline
                :label="tableStore?.pagination.value.totalItems"
                class="q-ml-sm bg-dark text-on-dark text-body3 no-pointer-events"
              /> -->
          </slot>
        </div>

        <q-btn
          v-if="tableStore?.activeRow?.value"
          v-access="`${permissionPrefix}.edit`"
          :to="`/${baseRoute}/edit/${tableStore?.activeRow?.value?.id}`"
          class="text-caption"
          round
          unelevated
          no-caps
        >
          <q-icon name="o_edit" />
        </q-btn>

        <q-btn
          v-if="tableStore?.selectedIds?.value?.length"
          v-access="`${permissionPrefix}.delete`"
          class="text-caption"
          round
          unelevated
          no-caps
          @click="
            crudStore.deleteBatch(
              tableStore?.selectedIds?.value,
              tableStore.reloadData
            )
          "
        >
          <q-icon name="o_delete" />
        </q-btn>
        <q-btn
          v-else-if="tableStore?.activeRow?.value"
          v-access="`${permissionPrefix}.delete`"
          class="text-caption"
          round
          unelevated
          no-caps
          @click="
            crudStore.deleteById(
              tableStore?.activeRow?.value?.id,
              tableStore.reloadData
            )
          "
        >
          <q-icon name="o_delete" />
        </q-btn>
      </div>

      <q-space />

      <div
        v-if="tableStore?.selectedIds?.value?.length"
        class="row items-center q-gutter-sm"
      >
        <q-btn
          padding="0 9px"
          rounded
          outline
          class="text-body2 text-on-dark q-ml-sm bg-dark no-pointer-events"
        >
          {{ tableStore?.selectedIds?.value?.length }}
        </q-btn>
        <q-btn
          round
          unelevated
          class="text-caption text-on-dark"
          icon="close"
          @click="deselect"
        />
      </div>
      <div v-else class="row items-center">
        <template v-if="sortBtn">
          <slot name="sort-btn">
            <q-btn
              round
              class="text-caption q-mr-sm"
              unelevated
              dense
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
              @click="showSearchDialog"
            >
              <slot name="search-btn-icon">
                <q-icon name="o_filter_alt" />
              </slot>
            </q-btn>
          </slot>
        </template>
      </div>
    </q-toolbar>
  </toolbar-observer>

  <mobile-bottom-sheet ref="bottomSheet" :menu-items="menuItems" />

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
    <template v-if="advancedSearch">
      <slot name="advanced-search" />
    </template>
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useQuasar } from "quasar";

  import { useFormActions } from "src/composables/useFormActions";
  import MobileBottomSheet from "./MobileBottomSheet.vue";
  import MobileSortSheet from "src/components/shared/MobileSortSheet.vue";
  import ToolbarObserver from "src/components/shared/toolbars/ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    menuItems: {
      type: Array,
      default: () => [],
    },
    advancedSearch: {
      type: Boolean,
      default: false,
    },
    searchStore: {
      type: Object,
      default: () => ({ isFiltered: { value: false } }),
    },
    activation: {
      type: Boolean,
      default: false,
    },
    searchBtn: {
      type: Boolean,
      default: false,
    },
    sortBtn: {
      type: Boolean,
      default: false,
    },
  });

  const $q = useQuasar();
  const crudStore = useFormActions(props.baseRoute);
  const bottomSheet = ref(null);
  const serachDialog = ref(false);
  const observer = ref(null);
  const sortSheetStatus = ref(false);

  function deselect() {
    props.tableStore.selectAll(false);
    props.tableStore.setActiveRow(null);
  }

  const showSearchDialog = () => {
    serachDialog.value = true;
  };

  const showSortSheet = () => {
    sortSheetStatus.value = true;
  };

  const permissionPrefix = computed(() =>
    props.baseRoute?.replace("/", ".")
  );
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
