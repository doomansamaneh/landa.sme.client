<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <gl-lookup
          v-model:selectedId="model.glId"
          v-model:selectedText="model.glDisplay"
          :label="$t('shared.labels.gl')"
          required
          @rowSelected="glChanged"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input
          v-model="model.code"
          :label="$t('shared.labels.code')"
          required
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input
          v-model="model.syncCode"
          :label="$t('shared.labels.syncCode')"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="model.title"
          :label="$t('shared.labels.title')"
          required
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-select
          v-model="model.typeId"
          :options="helper.getEnumOptions(accountType, 'accountType')"
          :label="$t('shared.labels.accountNature')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label class="caption-on-dark text-body2 q-mb-sm">
          {{ $t("shared.labels.relatedDetailAccounts") }}
        </q-item-label>
        <div class="q-pt-xs">
          <q-option-group
            v-model="model.dlTypeIds"
            :options="
              helper.getEnumOptions(accountDLType, 'accountDLType')
            "
            type="checkbox"
            dense
            class="flex q-gutter-md"
            size="46px"
          />
        </div>
      </div>
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-checkbox
        v-model="model.isActive"
        dense
        size="48px"
        :label="$t('shared.labels.isActive')"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { accountType, accountDLType } from "src/constants";
  import { accountSLModel } from "src/models/areas/acc/accountSLModel";
  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { useAccountSLGrid } from "../../../_composables/useAccountSLGrid";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import GlLookup from "src/components/shared/lookups/AccountGLLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    disableToolbar: Boolean,
    title: String,
    id: String,
    accountGl: Object,
  });

  const form = ref(null);
  const baseRoute = "acc/accountSL";
  const slGridStore = useAccountSLGrid();
  const actionStore = useFormActions(baseRoute);
  const model = ref({
    ...accountSLModel,
    glId: props.accountGl?.id,
    glCode: props.accountGl?.code,
    glTitle: props.accountGl?.title,
  });

  const formStore = useBaseInfoModel({
    model: model,
    baseRoute: baseRoute,
    id: props.id,
    resetCallback: slGridStore.reset,
  });

  const glChanged = async (gl) => {
    if (gl) {
      var response = await actionStore.customPostAction(
        `getNewCode/${gl.id}`
      );
      model.value.code = response.data;
    }
  };

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  onMounted(async () => {
    await glChanged(props.accountGl);
  });

  defineExpose({
    submitForm,
  });
</script>
