<template>
  <div style="margin-bottom: 56px">
    <q-page-sticky class="z-1 bg-main" style="padding-top: 12px; padding-bottom: 12px" position="top" expand>
      <q-toolbar style="padding-left: 20px; padding-right: 20px">
        <div class="flex items-center" :class="tableStore?.activeRow?.value ? 'q-gutter-sm' : ''">
          <slot name="buttons">
            <template v-if="tableStore?.activeRow?.value != null">
              <slot name="buttons-edit">
                <q-btn :to="`${baseRoute}/edit/${tableStore?.activeRow?.value.id}`" class="text-caption" round
                  unelevated no-caps>
                  <q-icon name="o_edit" />
                  <q-tooltip class="custom-tooltip">
                    {{ $t("shared.labels.edit") }}
                  </q-tooltip>
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <slot name="buttons-batch-action"> </slot>
              <slot name="buttons-delete-batch">
                <q-btn class="text-caption" round unelevated no-caps @click="
          crudStore.deleteBatch(selectedIds, tableStore.reloadData)
          ">
                  <q-icon name="o_delete" />
                </q-btn>
              </slot>
            </template>

            <template v-else-if="tableStore?.activeRow?.value != null">
              <slot name="buttons-delete">
                <q-btn class="text-caption" round unelevated no-caps @click="
          crudStore.deleteById(
            tableStore.activeRow.value.id,
            tableStore.reloadData
          )
          ">
                  <q-icon name="o_delete" />
                  <q-tooltip class="custom-tooltip">
                    {{ $t("shared.labels.delete") }}
                  </q-tooltip>
                </q-btn>
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <q-btn class="text-caption" round unelevated @click="onBottomSheetShow">
                <q-icon name="more_horiz" />
              </q-btn>
            </template>
          </slot>
        </div>

        <!-- <div v-if="tableStore?.activeRow?.value != null" class="q-space" /> -->

        <q-space v-if="tableStore?.activeRow?.value != null" />
        <q-space v-if="selectedIds?.length > 0" />

        <template v-if="selectedIds?.length > 0">
          <q-btn padding="2px 10px" rounded outline
            class="text-body2 no-letter-spaicng q-ml-sm bg-dark no-pointer-events">
            {{ selectedIds?.length }}
          </q-btn>
          <q-btn round unelevated class="q-ml-md text-on-dark" icon="close" @click="deselect">
          </q-btn>
        </template>

        <template v-else>
          <div v-if="title">
            <slot name="header">
              <div class="text-weight-700 flex items-center" :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
                <slot name="header-title">
                  <span>{{ title }}</span>
                  <q-btn v-if="tableStore?.pagination.value.totalItems > 0" rounded unelevated dense padding="0px 10px"
                    outline :label="tableStore?.pagination.value.totalItems"
                    class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events" />
                </slot>
                <!-- <q-space></q-space>
                <back-button class="q-ml-md" /> -->
              </div>
            </slot>
          </div>
        </template>

        <template v-if="backButton">
          <q-space></q-space>
          <back-button />
        </template>
      </q-toolbar>
    </q-page-sticky>
  </div>

  <bottom-sheet v-if="bottomSheetStatus" :status="bottomSheetStatus" @hide="onBottomSheetHide">

    <template #header-title>
      {{ $t("shared.labels.more") }}
    </template>

    <template #body>
      <q-list padding>
        <q-item clickable v-close-popup tabindex="0" @click="tableStore.reloadData">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="32px">
              <q-icon size="16px" name="o_refresh" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body3 no-letter-spacing">
              {{ $t("shared.labels.refresh") }}
            </div>
          </q-item-section>
        </q-item>

        <template v-if="activation && selectedIds?.length > 0">
          <q-separator class="q-my-sm" />

          <q-item clickable v-close-popup tabindex="0" @click="crudStore.activate(selectedIds, tableStore.reloadData)">
            <q-item-section avatar>
              <q-avatar class="bg-on-dark text-on-dark" size="32px">
                <q-icon size="16px" name="o_check" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body3 no-letter-spacing">
                {{ $t("shared.labels.activate") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup tabindex="0"
            @click="crudStore.deactivate(selectedIds, tableStore.reloadData)">
            <q-item-section avatar>
              <q-avatar class="bg-on-dark text-on-dark" size="32px">
                <q-icon size="16px" name="o_close" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body3 no-letter-spacing">
                {{ $t("shared.labels.deactivate") }}
              </div>
            </q-item-section>
          </q-item>
        </template>

        <slot name="buttons-custom" />

        <q-separator class="q-my-sm" />

        <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportAll()">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="32px">
              <q-icon size="16px" name="o_download" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body3 no-letter-spacing">
              {{ $t("shared.labels.eportToExcel") }}
            </div>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportCurrentPage()">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="32px">
              <q-icon name="o_download" size="16px" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body3 no-letter-spacing">
              {{ $t("shared.labels.exportExcelCurrentPage") }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
import { ref, computed } from "vue";
import BottomSheet from "src/components/shared/BottomSheet.vue";
import BackButton from "src/components/shared/buttons/GoBackLink.vue";

const bottomSheetStatus = ref(false);

const onBottomSheetShow = () => {
  bottomSheetStatus.value = true;
};

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
};

const props = defineProps({
  title: String,
  baseRoute: String,
  tableStore: Object,
  crudStore: Object,
  activation: Boolean,
  backButton: Boolean,
  buttons: Boolean,
});

const selectedIds = computed(() =>
  props.tableStore?.selectedRows?.value.map((item) => item.id)
);

function deselect() {
  props.tableStore.selectAll(false);
  props.tableStore.setActiveRow(null);
}
</script>
