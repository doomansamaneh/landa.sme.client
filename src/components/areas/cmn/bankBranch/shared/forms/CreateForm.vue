<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-gutter-md q-mb-md">
          <bank-lookup
            label="بانک"
            hide-bottom-space
            v-model:selectedId="formStore.model.value.bankId"
            v-model:selectedText="formStore.model.value.bankTitle"
            required
          />
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input
              label="کد"
              hide-bottom-space
              v-model="formStore.model.value.code"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              label="عنوان"
              hide-bottom-space
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <location-lookup
              label="محل جغرافیایی"
              hide-bottom-space
              v-model:selectedId="formStore.model.value.locationId"
              v-model:selectedText="
                formStore.model.value.locationTitle
              "
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              label="شرح"
              hide-bottom-space
              v-model="formStore.model.value.comment"
              type="textarea"
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
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import BankLookup from "src/components/shared/lookups/BankLookup.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/bankBranch",
  });
</script>
