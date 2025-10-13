<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <cl-lookup
          v-model:selectedId="formStore.model.value.clId"
          v-model:selectedText="formStore.model.value.clDisplay"
          :label="$t('shared.labels.cl')"
          required
          @rowSelected="clChanged"
          autofocus
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input
          v-model="formStore.model.value.code"
          :label="$t('shared.labels.code')"
          required
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-select
          v-model="formStore.model.value.typeId"
          :options="helper.getEnumOptions(accountType, 'accountType')"
          :label="$t('shared.labels.accountNature')"
          required
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="formStore.model.value.title"
          :label="$t('shared.labels.title')"
          required
        />
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        v-model="formStore.model.value.isActive"
        dense
        size="48px"
        :label="$t('shared.labels.isActive')"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { accountType } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { baseInfoModel } from "src/models/shared/baseInfoModel";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import ClLookup from "src/components/shared/lookups/AccountCLLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    id: String,
    action: String,
    title: String,
    accountCl: Object,
    disableToolbar: Boolean,
  });

  const form = ref(null);
  const baseRoute = "acc/accountGL";
  const actionStore = useFormActions(baseRoute);
  const model = ref({
    ...baseInfoModel,
    clId: props.accountCl?.id,
    clCode: props.accountCl?.code,
    clTitle: props.accountCl?.title,
  });

  const formStore = useBaseInfoModel({
    model: model,
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

  onMounted(async () => {
    await clChanged(props.accountCl);
  });

  defineExpose({
    submitForm,
  });
</script>
