<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <product-group-lookup
          v-model:selectedId="formStore.model.value.productGroupId"
          v-model:selectedText="
            formStore.model.value.productGroupTitle
          "
          label="گروه کالا"
          required
        />
      </div>
    </div>

    <div
      class="row q-col-gutter-md"
      :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
    >
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input
          v-model="formStore.model.value.code"
          lazy-rules
          label="کد"
          required
        />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input
          v-model="formStore.model.value.barcode"
          label="بارکد"
        />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input
          v-model="formStore.model.value.taxCode"
          label="شناسه مالیاتی"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="formStore.model.value.title"
          lazy-rules
          label="عنوان"
          required
        />
      </div>
    </div>

    <div
      class="row q-col-gutter-md"
      :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
    >
      <div class="col-md-3 col-sm col-xs-12">
        <custom-select
          v-model="formStore.model.value.typeId"
          :options="helper.getEnumOptions(productType, 'productType')"
          label="نوع"
          required
        />
      </div>

      <div class="col-md-3 col-sm col-xs-12">
        <product-unit-lookup
          v-model:selectedId="formStore.model.value.productUnitId"
          v-model:selectedText="
            formStore.model.value.productUnitTitle
          "
          label="واحد سنجش"
          required
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          hide-bottom-space
          v-model="formStore.model.value.purchasePrice"
          lazy-rules
          label="قیمت خرید"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="formStore.model.value.isForPurchase"
          label="برای خرید"
        />
      </div>
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          hide-bottom-space
          v-model="formStore.model.value.price"
          lazy-rules
          label="قیمت فروش"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="formStore.model.value.isForSale"
          label="برای فروش"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          hide-bottom-space
          v-model="formStore.model.value.comment"
          type="textarea"
          label="شرح"
        />
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        dense
        size="48px"
        v-model="formStore.model.value.isActive"
        label="فعال"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { productType } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { productModel } from "src/models/areas/cmn/productModel";
  import { useProductGrid } from "../../../_composables/useProductGrid";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const productGridStore = useProductGrid();
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/product",
    model: productModel,
    resetCallback: productGridStore.reset,
  });

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
