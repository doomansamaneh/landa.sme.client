<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <unit-lookup
            label="واحد سازمانی"
            v-model:selectedId="
              formStore.editBatchModel.value.unit.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="formStore.editBatchModel.value.unit.isModified"
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <job-lookup
            label="شغل"
            v-model:selectedId="
              formStore.editBatchModel.value.job.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="formStore.editBatchModel.value.job.isModified"
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-select
            label="نوع"
            v-model="formStore.editBatchModel.value.type.fieldValue"
            :options="
              helper.getEnumOptions(customerType, 'customerType')
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="formStore.editBatchModel.value.type.isModified"
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { customerType } from "src/constants";
  import { helper } from "src/helpers";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { customerBatchModel } from "src/models/areas/crm/customerModel";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import UnitLookup from "src/components/shared/lookups/UnitLookup.vue";
  import JobLookup from "src/components/shared/lookups/JobLookup.vue";

  const props = defineProps({
    selectedIds: Array,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "crm/customer",
    batchModel: customerBatchModel,
  });

  async function submitForm() {
    try {
      const isValid = await form.value.validate();

      if (isValid) {
        await formStore.crudStore.editBatch(
          props.selectedIds,
          formStore.editBatchModel.value
        );
        return true;
      } else {
        // alert("Validation error");
        return false;
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      return false;
    }
  }

  defineExpose({
    submitForm,
  });
</script>
