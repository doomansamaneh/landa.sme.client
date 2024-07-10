<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <create-or-edit :item="model" />
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useFormActions } from "src/composables/useFormActions";

  import CreateOrEdit from "./_CreateOrEdit.vue";

  const props = defineProps({
    id: String,
    entityId: String,
    entityName: String,
    action: String,
  });

  const model = ref({
    entityId: props.entityId,
    entityName: props.entityName,
  });

  const formStore = useFormActions("cmn/entityProperty", model);
  const form = ref(null);

  async function submitForm() {
    return await formStore.submitForm(form.value, props.action);
  }

  async function loadData() {
    await formStore.getById(props.id);
  }

  onMounted(() => {
    loadData();
  });
  defineExpose({
    submitForm,
  });
</script>
