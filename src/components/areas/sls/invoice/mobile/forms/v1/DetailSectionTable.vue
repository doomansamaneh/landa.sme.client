<template>
  <div class="q-my-md">
    <q-btn
      class="primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="addItem"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن ردیف
    </q-btn>
  </div>

  <q-card
    class="bordered"
    v-if="formStore.model.value.invoiceItems.length === 0"
  >
    <q-card-section>
      <no-product-selected />
    </q-card-section>
  </q-card>

  <q-card
    v-for="(row, index) in formStore.model.value.invoiceItems"
    :key="index"
    class="q-mb-md"
  >
    <q-card-section v-if="false">
      <div class="row items-center justify-center">
        <q-btn round unelevated class="no-pointer-events">
          <q-avatar
            size="56px"
            text-color="white"
            :style="helper.generateAvatarStyle(row.id)"
          >
            <div class="char text-body1 text-bold">
              {{ helper.getFirstChar(row.productTitle) }}
            </div>
          </q-avatar>
        </q-btn>
      </div>

      <div class="row justify-between items-center">
        <div class="col row items-center">
          <div class="text-caption no-letter-spacing">شماره:</div>
          <div class="text-caption text-on-dark">{{ index + 1 }}</div>
        </div>

        <div class="col row justify-end items-center q-gutter-xs">
          <span class="text-caption text-on-dark">
            {{ row.productCode }}
          </span>
        </div>
      </div>
    </q-card-section>

    <q-separator v-if="false" />

    <q-card-section>
      <div class="column q-px-md q-py-md">
        <div class="row items-center">
          <div class="col-4">
            <span class="text-caption text-on-dark">کالا/خدمت</span>
          </div>
          <div class="col">
            <span class="text-caption text-bold text-on-dark">
              {{ row.productCode }} -
              {{ row.productTitle }}
            </span>
          </div>
        </div>

        <div class="row items-center" v-if="row.comment">
          <div class="col-4">
            <span class="text-caption text-on-dark">شرح</span>
          </div>
          <div class="col text-caption">
            {{ row.comment }}
          </div>
        </div>

        <div class="row items-center" v-if="row.discountComment">
          <div class="col-4">
            <span class="text-caption text-on-dark">شرح تخفیف</span>
          </div>
          <div class="col text-caption">
            {{ row.discountComment }}
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <span class="text-caption text-on-dark">مقدار</span>
          </div>
          <div class="col">
            <span class="text-h6 text-bold no-letter-spacing">
              {{ row.quantity.toLocaleString() }}
            </span>
            <span class="q-px-md">({{ row.productUnitTitle }})</span>
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <span class="text-caption text-on-dark">قیمت واحد</span>
          </div>
          <div class="col text-caption">
            {{ row.price.toLocaleString() }}
          </div>
        </div>

        <div class="row items-center" v-if="row.discount">
          <div class="col-4">
            <span class="text-caption text-on-dark">تخفیف</span>
          </div>
          <div class="col text-caption">
            {{ row.discount.toLocaleString() }}
          </div>
        </div>

        <div class="row items-center" v-if="row.vatAmount">
          <div class="col-4">
            <span class="text-caption text-on-dark">
              مالیات بر ارزش افزوده
            </span>
          </div>
          <div class="col text-caption">
            {{ row.vatAmount.toLocaleString() }}
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <span class="text-caption text-on-dark">جمع کل</span>
          </div>
          <div class="col text-caption text-bold">
            {{ row.totalPrice.toLocaleString() }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="q-pa-md" align="between">
      <q-btn
        label="ویرایش"
        class="text-body2 no-letter-spacing"
        flat
        dense
        rounded
        @click="editItem(index, row)"
      />
      <q-btn
        size="12px"
        flat
        dense
        round
        icon="o_delete"
        @click="formStore.deleteRow(index)"
      />
    </q-card-actions>
  </q-card>

  <!-- <q-separator spaced /> -->

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="showDialog"
  >
    <q-card>
      <q-card-section
        class="row items-center justify-between_ q-pb-none q-pr-sm"
      >
        <span class="text-bold text-body1 no-letter-spacing">
          افزودن/ویرایش کالا
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
          class="text-body2 no-letter-spacing primary-shadow"
          v-close-popup
        >
          <q-icon name="o_save" size="20px" class="q-mr-sm" />
          {{ $t("shared.labels.save") }}
        </q-btn>
        <q-btn
          flat
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
  import { helper } from "src/helpers";

  import NoProductSelected from "src/components/areas/sls/_shared/invoice/desktop/forms/NoProductSelected.vue";
  import FooterSection from "src/components/areas/sls/_shared/invoice/desktop/forms/v1/FooterSection.vue";
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
      props.formStore.editRow(
        selectedIndex.value,
        addItemElement.value.model
      );
    }
  }

  function cancelClicked() {}
</script>
