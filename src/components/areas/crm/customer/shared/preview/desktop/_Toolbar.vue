<template>
  <tool-bar :title="title" :inside="inside">
    <template #buttons>
      <menu-button-edit
        :to="`/crm/customer/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const route = useRoute();

  const id = computed(() => route.params.id);
</script>
