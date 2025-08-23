<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <product-group-lookup
          v-model:selectedId="model.productGroupId"
          v-model:selectedText="model.productGroupTitle"
          :label="$t('shared.columns.productGroupTitle')"
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
        <custom-input
          v-model="model.code"
          :label="$t('shared.columns.code')"
          required
        />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input
          v-model="model.barcode"
          :label="$t('shared.labels.barcode')"
        />
      </div>
      <div class="col-md-2 col-sm col-xs-12">
        <custom-input
          v-model="model.taxCode"
          :label="$t('shared.labels.taxCode')"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.title"
          :label="$t('shared.columns.title')"
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
          v-model="model.typeId"
          :options="helper.getEnumOptions(productType, 'productType')"
          :label="$t('shared.columns.typeId')"
          required
        />
      </div>

      <div class="col-md-3 col-sm col-xs-12">
        <product-unit-lookup
          v-model:selectedId="model.productUnitId"
          v-model:selectedText="model.productUnitTitle"
          :label="$t('shared.columns.productUnitTitle')"
          required
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          v-model="model.purchasePrice"
          :label="$t('shared.labels.purchasePrice')"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="model.isForPurchase"
          :label="$t('shared.labels.forPurchase')"
        />
      </div>
      <div class="col-md-3 col-sm col-xs-12">
        <custom-input-number
          v-model="model.price"
          :label="$t('shared.labels.price')"
          required
        />
        <q-checkbox
          class="q-mt-sm"
          dense
          size="48px"
          v-model="model.isForSale"
          :label="$t('shared.labels.forSale')"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.comment"
          type="textarea"
          :label="$t('shared.columns.comment')"
        />
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        dense
        size="48px"
        v-model="model.isActive"
        :label="$t('shared.labels.isActive')"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { productType } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
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

  const formStore = useBaseInfoModel({
    baseRoute: baseRoute,
    model: model,
    resetCallback: productGridStore.reset,
    afterGetByIdCallback: async (product) => {
      if (props.action === "create" && product?.productGroupId) {
        getNewCode(product.productGroupId);
      }
    },
  });

  const pgChanged = async (pg) => {
    await getNewCode(pg?.id);
  };

  const getNewCode = async (pgId) => {
    if (pgId) {
      var response = await actionStore.customPostAction(
        `getNewCode/${pgId}`
      );
      model.value.code = response.data;
    }
  };

  async function submitForm(callBack) {
    return await formStore.submitForm(
      form.value,
      props.action,
      callBack
    );
  }

  async function submitFormAndNew() {
    await submitForm(() => {
      model.value = { ...productModel };
    });
  }

  onMounted(async () => {});

  defineExpose({
    submitForm,
    submitFormAndNew,
  });
</script>
