<template>
  <create-form
    has-code
    :title="title"
    :action="action"
    :form-store="formStore"
  />
</template>

<script setup>
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

import CreateForm from "src/components/areas/_shared/baseInfo/shared/forms/CreateForm.vue";

const props = defineProps({
  action: String,
  title: String,
});

const formStore = useBaseInfoModel({
  baseRoute: "cmn/productGroup",
});
</script>
