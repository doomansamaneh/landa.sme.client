<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-gutter-md">
      <div class="text-h4 text-center">
        {{ model.productCode }} -
        {{ model.productTitle }}
      </div>

      <div>
        <q-option-group
          inline
          :options="
            helper.getEnumOptions(modifyStockType, 'modifyStockType')
          "
          type="radio"
          v-model="model.modifyType"
        />
      </div>

      <div class="">
        <custom-input-number
          label="تعداد/مقدار"
          v-model="model.quantity"
        />
      </div>

      <div>
        <custom-input-number
          label="مبلغ واحد"
          v-model="model.price"
        />
      </div>

      <div>
        <date-time label="تاریخ" v-model="model.date" />
      </div>

      <div>
        <inventory-lookup
          label="انبار"
          v-model:selectedId="model.inventoryId"
          v-model:selectedText="model.inventoryTitle"
        />
      </div>

      <div>
        <custom-input
          label="شرح"
          v-model="model.summary"
          hide-bottom-space
          type="textarea"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { modifyStockType } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";

  const props = defineProps({
    id: String,
  });

  const baseRoute = "inv/modifyStock";
  const model = ref({});
  const formStore = useFormActions(baseRoute, model);
  const form = ref(null);
  const route = useRoute();

  async function loadData() {
    await formStore.getById(
      props.id || route.params.id,
      `${baseRoute}/GetModifyStockModel`
    );
  }

  async function submitForm() {
    return await formStore.submitForm(form.value, "ModifyStockSave");
  }

  onMounted(() => {
    loadData();
  });

  defineExpose({
    submitForm,
  });
</script>
