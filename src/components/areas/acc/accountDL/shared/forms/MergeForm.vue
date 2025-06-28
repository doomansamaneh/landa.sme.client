<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
      <dl-lookup
        v-model:selectedId="model.destinationId"
        label="مقصد"
      />
    </div>

    <div class="q-mb-md">
      <q-checkbox
        class="q-mt-lg"
        dense
        size="46px"
        v-model="model.deleteMergedItems"
        label="حذف ادغام شوندگان"
      />
    </div>

    <div class="q-mb-md">
      پس از انجام موفقیت آمیز ادغام، سطرهای انتخاب شده (ادغام شوندگان)
      حذف شده و تاریخچه آنها از بین می‌رود
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { useFormActions } from "src/composables/useFormActions";

  import DlLookup from "src/components/shared/lookups/AccountDLLookup.vue";

  const props = defineProps({
    selectedIds: Array,
  });

  const form = ref(null);
  const model = ref({ deleteMergedItems: false });
  const crudStore = useFormActions("acc/accountDL");

  async function submitForm() {
    const isValid = await form.value.validate();

    if (isValid) {
      await crudStore.merge(props.selectedIds, model.value);
      return true;
    } else {
      return false;
    }
  }

  defineExpose({
    submitForm,
  });
</script>
