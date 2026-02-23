<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div :class="$q.dialog ? 'col-12' : 'col-md-4 col-sm-6 col-xs-12'">
        <custom-input
          :label="$t('shared.labels.title')"
          hide-bottom-space
          v-model="formStore.model.value.title"
          required
          type="textarea"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/commonKeyword",
  });

  async function submitForm(callBack) {
    await formStore.submitForm(form.value, props.action, callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
