<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <cl-lookup
          label="گروه حساب"
          v-model:selectedId="formStore.model.value.clId"
          v-model:selectedText="formStore.model.value.clTitle"
          required
          @rowSelected="clChanged"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input
          label="کد"
          hide-bottom-space
          v-model="formStore.model.value.code"
          required
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-select
          label="ماهیت حساب"
          :options="helper.getEnumOptions(accountType, 'accountType')"
          v-model="formStore.model.value.typeId"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
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
  import { accountType } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import ClLookup from "src/components/shared/lookups/AccountCLLookup.vue";

  const props = defineProps({
    id: String,
    action: String,
    title: String,
    disableToolbar: Boolean,
  });

  const form = ref(null);
  const baseRoute = "acc/accountGL";
  const actionStore = useFormActions(baseRoute);

  const formStore = useBaseInfoModel({
    baseRoute: baseRoute,
    id: props.id,
  });

  const clChanged = async (cl) => {
    if (cl) {
      var response = await actionStore.customPostAction(
        `getNewCode/${cl.id}`
      );
      formStore.model.value.code = response.data;
    }
  };

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
