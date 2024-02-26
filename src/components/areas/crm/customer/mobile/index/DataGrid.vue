<template>
  <tool-bar
    buttons
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="/crm/customer"
    activation
  >
    <template #buttons-custom>
      <q-separator class="q-my-sm" />
      <q-item clickable v-close-popup tabindex="0" @click="editBatch">
        <div class="q-py-sm">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark" size="32px">
              <q-icon size="16px" name="o_edit"
            /></q-avatar>
          </q-item-section>
        </div>
        <q-item-section>
          <div class="text-caption">
            {{ $t("shared.labels.editBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </tool-bar>

  <div style="margin-top: 56px">
    <data-grid
      ref="dataGrid"
      dataSource="crm/customer/getGridData"
      createUrl="/crm/customer/create"
      :grid-store="gridStore"
      multiSelect
      numbered
    >
      <template #row-header="{ item }">
        <q-card-section>
          <div class="row items-center justify-center">
            <q-btn
              v-if="!item.selected"
              round
              unelevated
              class="no-pointer-events"
            >
              <q-avatar
                size="56px"
                text-color="white"
                :style="{
                  backgroundColor: helper.generateDarkAvatarColor(item.title),
                }"
              >
                <div class="char text-body1 text-bold">
                  {{ helper.getFirstChar(item.title) }}
                </div>
              </q-avatar>
            </q-btn>
            <q-btn round unelevated class="no-pointer-events" v-else>
              <q-avatar size="50px" color="primary" text-color="white">
                <q-icon name="o_done" size="md" />
              </q-avatar>
            </q-btn>
          </div>

          <div class="row justify-between items-center">
            <div class="col row items-center">
              <span class="text-caption text-on-dark">{{
                item.productGroupTitle
              }}</span>
            </div>

            <div class="col row justify-end items-center q-gutter-xs">
              <span class="text-caption text-on-dark">{{ item.code }}</span>
            </div>
          </div>
        </q-card-section>

        <q-separator />
      </template>

      <template #row-body="{ item }">
        <q-card-section class="q-px-none">
          <div class="column q-gutter-sm">
            <div class="row items-center">
              <div class="col-4">
                <span class="text-caption text-on-dark">عنوان</span>
              </div>
              <div class="col">
                <span class="q-mr-sm">
                  <q-btn
                    v-if="item.isActive"
                    round
                    unelevated
                    dense
                    class="green-shadow no-pointer-events"
                    size="7px"
                    color="green-8"
                    icon="o_done"
                  />
                  <q-btn
                    v-else
                    round
                    unelevated
                    dense
                    class="red-shadow no-pointer-events"
                    size="7px"
                    color="negative"
                    icon="o_close"
                  />
                </span>
                <span
                  class="ellipsis-2-lines_ text-caption text-bold text-on-dark"
                  >{{ item.title }}</span
                >
                <div class="text-on-dark text-body2">
                  {{ item.comment }}
                </div>
              </div>
            </div>

            <div class="row items-center" v-if="item.barcode">
              <div class="col-4">
                <span class="text-caption text-on-dark">بارکد</span>
              </div>
              <div class="col">
                {{ item.barcode }}
              </div>
            </div>

            <div class="row items-center" v-if="item.taxCode">
              <div class="col-4">
                <span class="text-caption text-on-dark">شناسه مالیاتی</span>
              </div>
              <div class="col">
                {{ item.taxCode }}
              </div>
            </div>

            <div class="row items-center" v-if="item.price">
              <div class="col-4">
                <span class="text-caption text-on-dark">قیمت فروش</span>
              </div>
              <div class="col">
                {{ item.price.toLocaleString() }}
              </div>
            </div>

            <div class="row items-center" v-if="item.purchasePrice">
              <div class="col-4">
                <span class="text-caption text-on-dark">قیمت خرید</span>
              </div>
              <div class="col">
                {{ item.purchasePrice.toLocaleString() }}
              </div>
            </div>
          </div>
        </q-card-section>
      </template>

      <template #row-actions="{ item }">
        <q-btn unelevated class="text-on-dark">
          <span class="text-body3 text-bold">مشاهده جزئیات</span>
        </q-btn>

        <q-btn
          round
          unelevated
          dense
          icon="o_more_vert"
          @click="onBottomSheetShow(item)"
        />
      </template>
    </data-grid>
  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ bottomSheetItem.code }} / {{ bottomSheetItem.title }}
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :to="`/crm/customer/edit/${bottomSheetItem.id}`"
        >
          <q-item-section avatar>
            <q-avatar size="32px" class="bg-on-dark text-on-dark">
              <q-icon size="16px" name="o_edit" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body3 no-letter-spacing">
            {{ $t("shared.labels.edit") }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :to="`/crm/customer/copy/${bottomSheetItem.id}`"
        >
          <q-item-section avatar>
            <q-avatar size="32px" class="bg-on-dark text-on-dark">
              <q-icon size="16px" name="o_copy" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body3 no-letter-spacing">
            {{ $t("shared.labels.copy") }}
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item
          clickable
          v-ripple
          @click="crudStore.deleteById(bottomSheetItem.id, reloadData)"
        >
          <q-item-section avatar>
            <q-avatar
              size="32px"
              class="delete-avatar bg-on-dark red-shadow text-on-dark"
            >
              <q-icon size="16px" name="o_delete" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body3 no-letter-spacing">
            {{ $t("shared.labels.delete") }}
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";

import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
import BottomSheet from "src/components/shared/BottomSheet.vue";
import ToolBar from "src/components/shared/ToolBarMobile.vue";
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue";

const props = defineProps({
  gridStore: Object,
  title: String,
});

const $q = useQuasar();
const crudStore = useFormActions("crm/customer");
const dataGrid = ref(null);
const bottomSheetStatus = ref(false);
const bottomSheetItem = ref(null);

const tableStore = computed(() => dataGrid.value?.tableStore);
const selectedIds = computed(() =>
  tableStore.value?.selectedRows?.value.map((item) => item.id)
);

const onBottomSheetShow = (row) => {
  bottomSheetItem.value = row;
  bottomSheetStatus.value = true;
};

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
};

async function reloadData() {
  await tableStore.value.reloadData();
}

function editBatch() {
  $q.dialog({
    component: EditBatchDialog,
    componentProps: {
      selectedIds: selectedIds?.value,
    },
  }).onOk(async () => {
    await reloadData();
  });
}
</script>
