<template>
  <tool-bar
    v-if="!disableToolbar"
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <gl-lookup
              label="حساب کل"
              v-model:selectedId="formStore.model.value.glId"
              v-model:selectedText="formStore.model.value.glTitle"
              required
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
            <custom-input
              label="کد معادل"
              hide-bottom-space
              v-model="formStore.model.value.syncCode"
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

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-select
              label="ماهیت حساب"
              :options="
                helper.getEnumOptions(accountType, 'accountType')
              "
              v-model="formStore.model.value.typeId"
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
                  helper.getEnumOptions(
                    accountDLType,
                    'accountDLType'
                  )
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
            v-model="formStore.model.value.isActive"
            label="فعال"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { accountType, accountDLType } from "src/constants";
  import { accountSLModel } from "src/models/areas/acc/accountSLModel";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import ToolBar from "src/components/shared/FormToolbarContainer.vue";
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

  const formStore = useBaseInfoModel({
    model: accountSLModel,
    baseRoute: "acc/accountSL",
    id: props.id,
  });

  const submitForm = () => {
    formStore.submitForm();
  };

  //todo: modify backend to return desired array of detail type list
  const dlTypes = computed(() =>
    formStore.model.value.dlTypeIdList.map((c) => parseInt(c.id))
  );

  defineExpose({
    submitForm,
  });
</script>
