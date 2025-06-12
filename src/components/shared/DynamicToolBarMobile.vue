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
              class="title-width ellipsis-2-lines text-weight-700"
              :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
            >
              <span class="text-body2">
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
            </div>
          </div>
        </div>

        <q-space />

        <div class="row items-center">
          <q-btn
            round
            class="text-caption q-mr-sm"
            unelevated
            dense
            v-if="!tableStore?.activeRow?.value && sortBtn"
            @click="showSortSheet"
          >
            <q-icon name="sort" />
          </q-btn>

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
          <q-btn
            :to="`/${baseRoute}/edit/${selectedIds}`"
            class="text-caption"
            round
            unelevated
            no-caps
          >
            <q-icon name="o_edit" />
          </q-btn>
        </div>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-btn
            padding="0 9px"
            rounded
            outline
            class="text-body2 text-on-dark q-ml-sm bg-dark no-pointer-events"
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
        <template v-for="(item, index) in menuItems" :key="index">
          <template v-if="item.type === menuItemType.item">
            <template v-if="item.visible">
              <menu-item
                v-access="item.permission"
                :title="$t(`shared.labels.${item.label}`)"
                :icon="item.icon"
                :to="item.route"
                :badge-count="item.badgeCount"
                @click="handleMenuItemClick(item)"
              />
              <q-separator
                v-if="item.addSeparator"
                size="0.5px"
                class="q-my-sm"
              />
            </template>
          </template>

          <template v-else-if="item.type === menuItemType.moreItem">
            <template
              v-for="(subItem, subIndex) in item.subItems"
              :key="subIndex"
            >
              <template
                v-if="
                  subItem.visible &&
                  subItem.type === menuItemType.item
                "
              >
                <menu-item
                  v-access="subItem.permission"
                  :title="$t(`shared.labels.${subItem.label}`)"
                  :icon="subItem.icon"
                  :to="subItem.route"
                  :badge-count="subItem.badgeCount"
                  @click="handleMenuItemClick(subItem)"
                />
                <q-separator
                  v-if="subItem.addSeparator"
                  size="0.5px"
                  class="q-my-sm"
                />
              </template>
            </template>
          </template>
        </template>
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
    <template v-if="advancedSearch">
      <slot name="advanced-search" />
    </template>
  </q-dialog>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { menuItemType } from "src/constants";

  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import MobileSortSheet from "./MobileSortSheet.vue";
  import MenuItem from "src/components/shared/Buttons/MenuItem.vue";
  import ToolBarObserver from "./ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    crudStore: Object,
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
  const bottomSheetStatus = ref(false);
  const serachDialog = ref(false);
  const observer = ref(null);
  const sortSheetStatus = ref(false);

  const selectedIds = computed(() =>
    props.tableStore?.selectedRows?.value.map((item) => item.id)
  );

  const emits = defineEmits(["menu-item-click"]);

  const handleMenuItemClick = (item) => {
    item.handler?.();
    emits("menu-item-click", item);
    onBottomSheetHide();
  };

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
