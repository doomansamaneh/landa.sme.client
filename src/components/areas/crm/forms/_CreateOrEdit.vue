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
        محل جغرافیایی
      </q-item-label>
      <location-lookup
        v-model:selectedId="model.locationId"
        v-model:selectedText="model.locationTitle"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        نشانی
      </q-item-label>
      <custom-input
        v-model="model.address"
        type="textarea"
        autogrow
      />
    </div>
  </div>

  <!-- <div class="row q-gutter-lg q-mb-md">
      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
        >
          طبقه
        </q-item-label>
        <custom-input v-model="model.floor" />
      </div>
      <div class="col-md col-sm col-xs-12">
        <q-item-label
          class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
        >
          اتاق
        </q-item-label>
        <custom-input v-model="model.room" />
      </div>
    </div> -->

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        کد پستی
      </q-item-label>
      <custom-input v-model="model.postalCode" />
    </div>
    <div class="col-md col-sm col-xs-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        صندوق پستی
      </q-item-label>
      <custom-input v-model="model.postBox" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { contactType, sqlOperator } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";
  import ContactTypeLookup from "src/components/shared/lookups/ContactTypeLookup.vue";

  const props = defineProps({
    item: Object,
  });

  const model = computed(() => props.item);
  const contactTypeFilter = [
    {
      fieldName: "TypeId",
      operator: sqlOperator.equal,
      value: contactType.address,
    },
  ];
</script>
