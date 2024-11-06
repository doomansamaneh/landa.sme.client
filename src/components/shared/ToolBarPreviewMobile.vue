<template>
  <tool-bar-observer ref="observer">
    <q-toolbar>

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
            <back-button v-if="backButton" class="q-mr-xs" />

            <span
              class="ellipsis text-weight-700 no-letter-spacing"
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
          </slot>
        </div>
      </template>

      <q-space v-if="!backButton && !tableStore?.activeRow?.value" />

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

      <q-space v-if="backButton" />

      <q-space v-if="tableStore?.activeRow?.value != null" />

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

          <template v-else-if="tableStore?.activeRow?.value != null">
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
        <slot name="buttons-custom" />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref } from "vue";

  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import ToolBarObserver from "./ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    crudStore: Object,
    backButton: Boolean,
    buttons: Boolean,
  });

  const bottomSheetStatus = ref(false);
  const observer = ref(null);

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };
</script>
