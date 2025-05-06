<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
    @submit-and-new-call-back="
      formStore.submitForm(form, action, clearModel)
    "
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div v-if="hasCode" class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input
              v-model="formStore.model.value.code"
              :label="$t('shared.labels.code')"
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
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import ToolBar from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    action: String,
    title: String,
    formStore: useBaseInfoModel,
    hasCode: Boolean,
  });

  const form = ref(null);
  const clearModel = () => {
    props.formStore.crudStore.getCreateModel();
  };

  //const localFormStore = computed(() => props.formStore);
</script>
