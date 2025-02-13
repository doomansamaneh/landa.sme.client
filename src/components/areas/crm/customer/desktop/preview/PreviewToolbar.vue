<template>
  <tool-bar :title="title" :inside="inside">
    <template #buttons>
      <menu-button-edit
        :to="`/crm/customer/edit/${item?.id}`"
        class="primary-gradient primary-shadow text-white text-body2"
        rounded
        unelevated
        no-caps
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    item: Object,
  });
</script>
