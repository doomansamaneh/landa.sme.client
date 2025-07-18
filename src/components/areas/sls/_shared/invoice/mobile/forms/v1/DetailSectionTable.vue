<template>
  <q-card
    class="q-mb-md bordered"
    v-if="formStore.model.value.invoiceItems.length === 0"
  >
    <q-card-section>
      <no-product-selected />
    </q-card-section>
  </q-card>

  <q-card
    v-for="(row, index) in formStore.model.value.invoiceItems"
    :key="index"
    class="bordered q-mb-md"
  >
    <q-card-section v-if="false">
      <div class="row items-center justify-center">
        <q-btn no-caps round unelevated class="no-pointer-events">
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
          <div class="text-caption q-mr-xs">شماره:</div>
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

    <div class="q-pa-lg">
      <div class="row items-center q-mb-md">
        <!-- <div class="col-4">
          <span class="text-caption text-on-dark">کالا/خدمت</span>
        </div> -->
        <div class="col">
          <span class="text-body2 text-bold text-on-dark">
            {{ row.productCode }} -
            {{ row.productTitle }}
          </span>
        </div>
      </div>

      <div class="row items-center q-mb-md" v-if="row.comment">
        <div class="col-4">
          <span class="text-caption text-on-dark">شرح</span>
        </div>
        <div class="col text-caption">
          {{ row.comment }}
        </div>
      </div>

      <div
        class="row items-center q-mb-md"
        v-if="row.discountComment"
      >
        <div class="col-4">
          <span class="text-caption text-on-dark">شرح تخفیف</span>
        </div>
        <div class="col text-caption">
          {{ row.discountComment }}
        </div>
      </div>

      <div class="row items-center q-mb-md">
        <div class="col-4">
          <span class="text-caption text-on-dark">مقدار</span>
        </div>
        <div class="col">
          <span class="text-caption text-bold">
            {{ row.quantity.toLocaleString() }}
          </span>
          <span class="q-pl-xs">({{ row.productUnitTitle }})</span>
        </div>
      </div>

      <div class="row items-center q-mb-md">
        <div class="col-4">
          <span class="text-caption text-on-dark">قیمت واحد</span>
        </div>
        <div class="col text-caption">
          {{ helper.formatNumber(row.price) }}
        </div>
      </div>

      <div class="row items-center q-mb-md" v-if="row.discount">
        <div class="col-4">
          <span class="text-caption text-on-dark">تخفیف</span>
        </div>
        <div class="col text-caption">
          {{ helper.formatNumber(row.discount) }}
        </div>
      </div>

      <div class="row items-center q-mb-md" v-if="row.vatAmount">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            مالیات بر ارزش افزوده
          </span>
        </div>
        <div class="col text-caption">
          {{ helper.formatNumber(row.vatAmount) }}
        </div>
      </div>

      <div class="row items-center">
        <div class="col-4">
          <span class="text-caption text-on-dark">جمع کل</span>
        </div>
        <div class="col text-caption text-bold">
          {{ helper.formatNumber(row.totalPrice) }}
        </div>
      </div>
    </div>

    <q-separator size="1px" />

    <q-card-actions class="q-pa-md" align="between">
      <q-btn
        no-caps
        label="ویرایش"
        class="text-body2"
        flat
        rounded
        @click="editItem(index, row)"
      />
      <q-btn
        no-caps
        size="12px"
        flat
        dense
        round
        icon="o_delete"
        @click="formStore.deleteRow(index)"
      />
    </q-card-actions>
  </q-card>

  <q-btn
    no-caps
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white"
    @click="addItem"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="">افزودن ردیف</div>
  </q-btn>

  <q-dialog
    maximized
    transition-duration="600"
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="showDialog"
  >
    <q-card>
      <q-scroll-area
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
        style="height: calc(100vh - 10%)"
      >
        <q-card-section class="row items-center q-pb-none">
          <span class="text-bold text-body1">افزودن/ویرایش کالا</span>
          <q-space />
          <q-btn
            no-caps
            round
            unelevated
            text-color="white"
            class="red-gradient red-shadow"
            padding="5px"
            v-close-popup
          >
            <q-icon size="16px" name="o_close" />
          </q-btn>
        </q-card-section>

        <q-card-section>
          <add-row ref="addItemElement" :item="selectedItem" />
        </q-card-section>
      </q-scroll-area>

      <q-card-actions class="absolute-bottom q-pa-md dark-1">
        <q-btn
          no-caps
          type="submit"
          @click="okClicked"
          color="primary"
          unelevated
          padding="8px 16px"
          rounded
          class="text-body2 primary-shadow"
          v-close-popup
        >
          <q-icon name="o_save" size="20px" class="q-mr-sm" />
          {{ $t("shared.labels.save") }}
        </q-btn>
        <q-btn
          no-caps
          flat
          @click="cancelClicked"
          padding="8px 16px"
          v-close-popup
          rounded
        >
          {{ $t("shared.labels.cancel") }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <footer-section class="q-pt-md" :form-store="formStore" />
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
