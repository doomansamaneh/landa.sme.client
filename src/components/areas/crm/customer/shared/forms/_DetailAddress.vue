<template>
  <q-btn
    filled
    unelevated
    rounded
    padding="6px 12px"
    class="primary-gradient text-white text-on-dark"
    @click="formStore.addAddress()"
  >
    <q-icon
      name="o_add"
      size="xs"
      class="q-mr-xs text-body2 no-letter-spacing"
    />
    افزودن نشانی
  </q-btn>

  <div
    v-for="(item, index) in formStore.model.value.customerAddresses"
    :key="index"
    class="q-my-md"
  >
    <address-item
      :index="index"
      :item="item"
      @item-deleted="formStore.deleteAddress(index)"
      @item-added="formStore.addAddress(index)"
    />
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";
  import AddressItem from "./_DetailAddressItem.vue";

  const props = defineProps({
    formStore: Object,
  });

  const route = useRoute();
  onMounted(() => {
    props.formStore.getAddresses(route.params.id);
  });
</script>
