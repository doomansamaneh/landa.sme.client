<template>
  <create-form
    has-code
    :title="title"
    :action="action"
    :form-store="formStore"
  />
</template>

<script setup>
  import { ref, onMounted } from "vue";

  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CreateForm from "src/components/areas/_shared/baseInfo/shared/forms/CreateForm.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const baseRoute = "cmn/productGroup";
  const actionStore = useFormActions(baseRoute);
  const model = ref({ isActive: true });

  const formStore = useBaseInfoModel({
    baseRoute: baseRoute,
    model: model,
    afterGetByIdCallback: async () => {
      if (props.action === "create") {
        getNewCode();
      }
    },
  });

  const getNewCode = async () => {
    var response = await actionStore.customPostAction(`getNewCode`);
    model.value.code = response.data;
  };
</script>
