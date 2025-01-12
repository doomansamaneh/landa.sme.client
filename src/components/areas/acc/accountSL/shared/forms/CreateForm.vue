<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <gl-lookup
          label="حساب کل"
          v-model:selectedId="model.glId"
          v-model:selectedText="model.glTitle"
          required
          @rowSelected="glChanged"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input label="کد" v-model="model.code" required />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-input label="کد معادل" v-model="model.syncCode" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input label="عنوان" v-model="model.title" required />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <custom-select
          label="ماهیت حساب"
          :options="helper.getEnumOptions(accountType, 'accountType')"
          v-model="model.typeId"
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          تفصیلیهای مرتبط
        </q-item-label>
        <div class="q-pt-xs">
          <q-option-group
            dense
            class="flex q-gutter-md"
            size="46px"
            :options="
              helper.getEnumOptions(accountDLType, 'accountDLType')
            "
            type="checkbox"
            v-model="dlTypes"
          />
        </div>
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
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { accountType, accountDLType } from "src/constants";
  import { accountSLModel } from "src/models/areas/acc/accountSLModel";
  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import GlLookup from "src/components/shared/lookups/AccountGLLookup.vue";

  const props = defineProps({
    action: String,
    disableToolbar: Boolean,
    title: String,
    id: String,
  });

  const form = ref(null);
  const baseRoute = "acc/accountSL";
  const actionStore = useFormActions(baseRoute);
  const model = ref({ ...accountSLModel });

  const formStore = useBaseInfoModel({
    model: model,
    baseRoute: baseRoute,
    id: props.id,
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

  defineExpose({
    submitForm,
  });
</script>
