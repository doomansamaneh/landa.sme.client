<template>
  <q-card
    flat
    class="col-md col-sm-12 col-xs-12 border-radius-lg bordered overflow-hidden"
  >
    <q-list bordered>
      <q-expansion-item
        expand-separator
        default-opened
        group="basicInfo"
        class="basic-info"
      >
        <template #header>
          <q-item-section class="q-py-sm" avatar>
            <q-icon name="o_business" size="xs" />
          </q-item-section>

          <q-item-section class="text-body2">
            {{ $t("shared.labels.business") }}
          </q-item-section>
        </template>

        <business-info :item="item" />
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="basicInfo"
        class="basic-info normal"
      >
        <template #header>
          <q-item-section class="q-py-sm" avatar>
            <q-icon name="o_headset_mic" size="xs" />
          </q-item-section>
          <q-item-section class="text-body2">
            {{ $t("shared.labels.contact") }}
          </q-item-section>
        </template>
        <contact-info :item="item" />
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="basicInfo"
        class="basic-info normal"
      >
        <template #header>
          <q-item-section class="q-py-sm" avatar>
            <q-icon name="o_my_location" size="xs" />
          </q-item-section>

          <q-item-section class="text-body2">
            {{ $t("shared.contactType.address") }}
          </q-item-section>
        </template>
        <address-info :item="item" />
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="basicInfo"
        class="basic-info normal"
      >
        <template #header>
          <q-item-section class="q-py-sm" avatar>
            <q-icon name="o_credit_card" size="xs" />
          </q-item-section>

          <q-item-section class="text-body2">
            {{ $t("shared.accountDLType.bankAccount") }}
          </q-item-section>
        </template>
        <bank-account-info :item="item" />
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="basicInfo"
        class="basic-info"
      >
        <template #header>
          <q-item-section class="q-py-sm" avatar>
            <q-icon name="o_star" size="xs" />
          </q-item-section>

          <q-item-section class="text-body2">
            {{ $t("shared.labels.entityProperty") }}
          </q-item-section>
        </template>
        <property-info :item="item" />
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script setup>
  import BusinessInfo from "./_TabPanelBaseInfoBusiness.vue";
  import AddressInfo from "./_TabPanelBaseInfoAddress.vue";
  import ContactInfo from "./_TabPanelBaseInfoContact.vue";
  import BankAccountInfo from "./_TabPanelBaseInfoBankAccount.vue";
  import PropertyInfo from "./_TabPanelBaseInfoProperty.vue";

  const props = defineProps({
    item: Object,
  });
</script>
