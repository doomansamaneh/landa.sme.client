<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <gl-lookup
          v-model:selectedId="model.glId"
          v-model:selectedText="model.glTitle"
          label="حساب کل"
          required
          @rowSelected="glChanged"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input v-model="model.code" label="کد" required />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input v-model="model.syncCode" label="کد معادل" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input v-model="model.title" label="عنوان" required />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-select
          v-model="model.typeId"
          :options="helper.getEnumOptions(accountType, 'accountType')"
          label="ماهیت حساب"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label class="caption-on-dark text-body2 q-mb-sm">
          تفصیلیهای مرتبط
        </q-item-label>
        <div class="q-pt-xs">
          <q-option-group
            v-model="dlTypes"
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
        label="فعال"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { accountType, accountDLType } from "src/constants";
  import { accountSLModel } from "src/models/areas/acc/accountSLModel";
  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { useAccountSLGrid } from "../../../_composables/useAccountSLGrid";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import GlLookup from "src/components/shared/lookups/AccountGLLookup.vue";

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

  //todo: modify backend to return desired array of detail type list
  const dlTypes = computed(() =>
    model.value.dlTypeIdList.map((c) => parseInt(c.id))
  );

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
