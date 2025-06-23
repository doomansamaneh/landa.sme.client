<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <product-unit-lookup
              label="واحد سنجش اصلی"
              v-model:selectedId="formStore.model.value.masterUnitId"
              v-model:selectedText="
                formStore.model.value.masterUnitTitle
              "
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <product-unit-lookup
              label="واحد سنجش فرعی"
              v-model:selectedId="formStore.model.value.detailUnitId"
              v-model:selectedText="
                formStore.model.value.detailUnitTitle
              "
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <custom-input-number
              label="نرخ"
              v-model="formStore.model.value.rate"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/productUnitRelation",
  });
</script>
