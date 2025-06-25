<template>
  <q-form ref="form" autofocus>
    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <bank-lookup
          label="بانک"
          v-model:selectedId="formStore.model.value.bankId"
          v-model:selectedText="formStore.model.value.bankTitle"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input
          label="کد"
          v-model="formStore.model.value.code"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <custom-input
          label="عنوان"
          v-model="formStore.model.value.title"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <location-lookup
          label="محل جغرافیایی"
          v-model:selectedId="formStore.model.value.locationId"
          v-model:selectedText="formStore.model.value.locationTitle"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          label="شرح"
          v-model="formStore.model.value.comment"
          type="textarea"
        />
      </div>
    </div>

    <div class="row q-mb-md">
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
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

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

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
