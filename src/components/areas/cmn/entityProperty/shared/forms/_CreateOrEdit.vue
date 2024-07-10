<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        عنوان
      </q-item-label>
      <custom-input v-model="model.title" />
    </div>
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        مقدار
      </q-item-label>
      <custom-input v-model="model.value" />
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
