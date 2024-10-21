<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time v-model="model.date" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">انبار</q-item-label>
      <inventory-lookup
        v-model:selectedId="model.inventoryId"
        v-model:selectedText="model.inventoryTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">حساب معین</q-item-label>
      <inventory-lookup
        v-model:selectedId="model.slId"
        v-model:selectedText="model.slTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input
        v-model="model.summary"
        hide-bottom-space
        type="textarea"
      />
    </div>
  </div>

  <div class="q-py-md q-gutter-md">
    <q-btn
      class="primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.addAllProducts()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن همه کالاها
    </q-btn>

    <q-btn
      v-if="model?.repositionItems?.length"
      color="red"
      class="text-on-dark"
      rounded
      unelevated
      @click="formStore.deleteAllProducts()"
    >
      <q-icon name="o_delete" size="20px" class="q-mr-xs" />
      حذف همه
    </q-btn>
    <q-btn
      v-else
      class="primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.pushNewRow()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن ردیف
    </q-btn>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);
</script>
