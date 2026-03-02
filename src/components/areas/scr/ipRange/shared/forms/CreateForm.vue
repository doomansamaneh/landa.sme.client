<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <user-lookup
          v-model:selectedId="model.userId"
          v-model:selectedText="model.userName"
          :label="$t('shared.columns.loginName')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.fromIpString"
          :label="$t('shared.columns.fromIp')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.toIpString"
          :label="$t('shared.columns.toIp')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
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
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { baseInfoModel } from "src/models/shared/baseInfoModel";
  import { useFormActions } from "src/composables/useFormActions";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import UserLookup from "src/components/shared/lookups/UserLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const baseRoute = "scr/IpRange";
  const actionStore = useFormActions(baseRoute);
  const model = ref({ ...baseInfoModel });

  const formStore = useBaseInfoModel({
    baseRoute: baseRoute,
    model: model,
  });

  async function submitForm(callBack) {
    return await formStore.submitForm(
      form.value,
      props.action,
      callBack,
    );
  }

  async function submitFormAndNew() {
    await submitForm(() => {
      model.value = { ...productModel };
    });
  }

  defineExpose({
    submitForm,
    submitFormAndNew,
  });
</script>
