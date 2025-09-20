<template>
  <q-tabs
    no-caps
    v-model="tab"
    class="text-h6_ text-weight-700_ primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      class="q-mx-xs"
      name="personal-info"
      v-if="model.value.typeId !== customerType.legal"
      :label="$t('shared.labels.personalInfo')"
      icon="o_accessibility"
    />
    <q-tab
      class="q-mx-xs"
      name="business-info"
      :label="$t('shared.labels.businessInfo')"
      icon="o_business"
    />
    <q-tab
      class="q-mx-xs"
      name="address-info"
      :label="$t('shared.columns.address')"
      icon="o_my_location"
    />
    <q-tab
      class="q-mx-xs"
      name="contact-info"
      :label="$t('shared.labels.contact')"
      icon="o_headset_mic"
    />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    class="no-border no-shadow border-radius-lg"
    v-model="tab"
    keep-alive
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

    <q-tab-panel name="address-info">
      <address-info :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel name="contact-info">
      <contact-info :form-store="formStore" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { customerType } from "src/constants";

  import PersonalInfo from "./_DetailPersonal.vue";
  import BusinessInfo from "./_DetailBusiness.vue";
  import AddressInfo from "./_DetailAddress.vue";
  import ContactInfo from "./_DetailContact.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const tab = ref("business-info");
  const model = computed(() => props.formStore.model);
</script>
