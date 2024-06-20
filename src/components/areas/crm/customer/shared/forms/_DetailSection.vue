<template>
  <q-tabs
    v-model="tab"
    class="text-h6 text-weight-700 primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      name="personal-info"
      v-if="model.value.typeId !== customerType.legal"
      label="اطلاعات شخصی"
      icon="o_accessibility"
    />
    <q-tab
      name="business-info"
      label="اطلاعات کسب و کار"
      icon="o_business"
    />
    <q-tab name="location-info" label="نشانی" icon="o_my_location" />
    <q-tab name="contact-info" label="تماس" icon="o_headset_mic" />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    class="no-border no-shadow border-radius-lg q-mt-lg"
    v-model="tab"
    animated
  >
    <q-tab-panel
      name="personal-info"
      v-if="model.value.typeId !== customerType.legal"
    >
      <personal-info :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel name="business-info">
      <business-info :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel name="location-info">
      <location-info :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel name="contact-info">
      <contact-info :form-store="formStore" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { customerType } from "src/constants";

  import PersonalInfo from "./detail/PersonalInfo.vue";
  import BusinessInfo from "./detail/BusinessInfo.vue";
  import LocationInfo from "./detail/LocationInfo.vue";
  import ContactInfo from "./detail/ContactInfo.vue";

  const props = defineProps({
    formStore: Object,
  });

  const tab = ref("business-info");
  const model = computed(() => props.formStore.model);
</script>
