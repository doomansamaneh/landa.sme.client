<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-checkbox
        size="46px"
        dense
        v-model="model.isPrimary"
        val="customer"
        label="اصلی"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        نوع
      </q-item-label>
      <contact-type-lookup
        v-model:selectedId="model.contactTypeId"
        v-model:selectedText="model.contactTypeTitle"
        :filter-expression="contactTypeFilter"
      />
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

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شرح
      </q-item-label>
      <custom-input
        v-model="model.comment"
        type="textarea"
        autogrow
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { sqlOperator } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import ContactTypeLookup from "src/components/shared/lookups/ContactTypeLookup.vue";

  const props = defineProps({
    item: Object,
    typeId: Number,
  });

  const model = computed(() => props.item);
  const contactTypeFilter = [
    {
      fieldName: "TypeId",
      operator: sqlOperator.equal,
      value: props.typeId,
    },
  ];
</script>
