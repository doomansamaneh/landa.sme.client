<template>
  <q-btn
    class="gt-xs"
    size="12px"
    color="primary"
    dense
    round
    icon="add"
    @click="addItem"
  />

  <q-list bordered class="rounded-borders">
    <q-item v-if="formStore.model.value.invoiceItems.length === 0">
      یک سطر اضافه کنید
    </q-item>

    <q-item
      v-for="(row, index) in formStore.model.value.invoiceItems"
      :key="index"
    >
      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{ row.productCode }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ row.productTitle }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ row.comment }} - {{ row.discountComment }}
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="edit"
            @click="editItem(row)"
          />
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="formStore.removeRow(index)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>

  <q-dialog
    maximized
    transition-show="scale"
    transition-hide="scale"
    v-model="showDialog"
  >
    <q-card>
      <q-card-section class="row items-center justify-between_ q-pb-none">
        <span class="text-h6 no-letter-spacing">
          ایجاد / ویرایش کالا و خدمات
        </span>
        <q-space />
        <q-btn round unelevated icon="o_close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <add-row :item="item" :form-store="formStore" />
      </q-card-section>

      <q-card-actions class="q-pa-md dark-1">
        <q-btn
          type="submit"
          @click="okClicked"
          color="primary"
          unelevated
          no-caps
          padding="8px 16px"
          rounded
          class="primary-shadow"
          icon="save"
          v-close-popup
        >
          {{ $t("shared.labels.save") }}
        </q-btn>
        <q-btn
          flat
          size="md"
          @click="cancelClicked"
          no-caps
          padding="8px 16px"
          v-close-popup
          rounded
        >
          {{ $t("shared.labels.cancel") }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <footer-section :form-store="formStore" />
</template>

<script setup>
import { ref } from "vue";

import FooterSection from "src/components/areas/sls/invoice/desktop/forms/v1/FooterSection.vue";
import AddRow from "./AddRow.vue";

const props = defineProps({
  formStore: Object,
});

const showDialog = ref(false);
const item = ref(null);

function addItem() {
  item.value = props.formStore.pushNewRow();
  showDialog.value = true;
}

function editItem(row) {
  item.value = row;
  showDialog.value = true;
}

function okClicked() {
  props.formStore.pushNewRow(item);
}

function cancelClicked() {
  alert("cancel-clicked");
}
</script>
