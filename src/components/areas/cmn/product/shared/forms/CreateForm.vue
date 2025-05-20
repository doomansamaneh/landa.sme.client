<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <product-group-lookup
          v-model:selectedId="model.productGroupId"
          v-model:selectedText="model.productGroupTitle"
          label="گروه کالا"
          required
          @rowSelected="pgChanged"
        />
      </div>
    </div>

    <div
      class="row q-col-gutter-md"
      :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
    >
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input v-model="model.code" label="کد" required />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input v-model="model.barcode" label="بارکد" />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input v-model="model.taxCode" label="شناسه مالیاتی" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input v-model="model.title" label="عنوان" required />
      </div>
    </div>

    <div
      class="row q-col-gutter-md"
      :class="$q.screen.gt.xs ? 'q-mb-xl' : 'q-mb-md'"
    >
      <div class="col-md-3 col-sm col-xs-12">
        <custom-select
          v-model="model.typeId"
          :options="helper.getEnumOptions(productType, 'productType')"
          label="نوع"
          required
        />
      </div>

      <div class="col-md-3 col-sm col-xs-12">
        <product-unit-lookup
          v-model:selectedId="model.productUnitId"
          v-model:selectedText="model.productUnitTitle"
          label="واحد سنجش"
          required
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          v-model="model.purchasePrice"
          label="قیمت خرید"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="model.isForPurchase"
          label="برای خرید"
        />
      </div>
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          v-model="model.price"
          label="قیمت فروش"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="model.isForSale"
          label="برای فروش"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.comment"
          type="textarea"
          label="شرح"
        />
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        dense
        size="48px"
        v-model="model.isActive"
        label="فعال"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { productType } from "src/constants";
  import { useProductModel } from "../../../_composables/useProductModel";
  import { productModel } from "src/models/areas/cmn/productModel";
  import { useProductGrid } from "../../../_composables/useProductGrid";
  import { useFormActions } from "src/composables/useFormActions";

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
  const baseRoute = "cmn/product";
  const productGridStore = useProductGrid();
  const actionStore = useFormActions(baseRoute);
  const model = ref({ ...productModel });

  const formStore = useProductModel({
    baseRoute: baseRoute,
    model: model,
    resetCallback: productGridStore.reset,
  });

  const pgChanged = async (pg) => {
    if (pg) {
      var response = await actionStore.customPostAction(
        `getNewCode/${pg.id}`
      );
      model.value.code = response.data;
    }
  };

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
