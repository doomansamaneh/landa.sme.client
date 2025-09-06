<template>
  <q-btn
    no-caps
    unelevated
    rounded
    padding="8px 16px"
    class="primary-gradient primary-shadow text-white text-on-dark"
    @click="formStore.addAddress()"
  >
    <q-icon name="o_add" size="xs" class="q-mr-xs text-body2" />
    {{ $t("shared.labels.addAddress") }}
  </q-btn>

  <div class="q-pt-md q-col-gutter-md">
    <div
      v-for="(item, index) in formStore.model.value.customerAddresses"
      :key="index"
    >
      <address-item
        :index="index"
        :item="item"
        @item-deleted="formStore.deleteAddress(index)"
        @item-added="formStore.addAddress(index)"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import AddressItem from "./_DetailAddressItem.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const route = useRoute();
  onMounted(() => {
    props.formStore.getAddresses(route.params.id);
  });
</script>
