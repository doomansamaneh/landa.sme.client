<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <custom-input label="عنوان" v-model="model.title" />
    </div>
    <div class="col-md col-sm col-xs-12">
      <custom-input label="مقدار" v-model="model.value" />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    item: Object,
  });

  const model = computed(() => props.item);
</script>
