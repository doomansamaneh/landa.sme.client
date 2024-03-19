<template>
  <q-card flat class="border-radius-sm">
    <q-list bordered class="rounded-borders">
      <q-item>
        <q-item-section>
          <q-item-label lines="1">
            <q-btn color="primary" icon="add" @click="addItem">
              افزودن ردیف
            </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-if="formStore.model.value.invoiceItems.length === 0">
        <q-item-section> یک سطر اضافه کنید </q-item-section>
      </q-item>

      <template
        v-for="(row, index) in formStore.model.value.invoiceItems"
        :key="index"
      >
        <q-item clickable_ v-ripple_>
          <q-item-section avatar>
            <q-avatar class="bg-primary text-white">
              <span>{{ index + 1 }}</span>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ row.productCode }}</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">{{ row.productTitle }}</span>
            </q-item-label>
            <q-item-label caption lines="2">
              {{ row.comment }}
              <span v-if="row.discountComment">
                - {{ row.discountComment }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label>
              مقدار: {{ row.quantity.toLocaleString() }}
            </q-item-label>
            <q-item-label>
              قیمت واحد: {{ row.price.toLocaleString() }}
            </q-item-label>
            <q-item-label v-if="row.disocunt">
              تخفیف:
              {{ row.discount.toLocaleString() }}
            </q-item-label>
            <q-item-label v-if="row.vatAmount">
              مالیات بر ارزش افزوده:
              {{ row.vatAmount.toLocaleString() }}
            </q-item-label>
            <q-item-label lines="1">
              جمع کل:
              <span class="text-weight-700">
                {{ row.totalPrice.toLocaleString() }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="edit"
                @click="editItem(index, row)"
              />
              <q-btn
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
      </template>
    </q-list>
  </q-card>

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
        <add-row ref="addItemElement" :item="selectedItem" />
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
const add = ref(true);
const selectedItem = ref(null);
const selectedIndex = ref(0);
const addItemElement = ref(null);

function addItem() {
  add.value = true;
  selectedItem.value = null;
  showDialog.value = true;
}

function editItem(index, row) {
  add.value = false;
  selectedItem.value = row;
  selectedIndex.value = index;
  showDialog.value = true;
}

function okClicked() {
  if (add.value) {
    props.formStore.pushNewRow(addItemElement.value.model);
  } else {
    props.formStore.editRow(selectedIndex.value, addItemElement.value.model);
  }
}

function cancelClicked() {}
</script>
