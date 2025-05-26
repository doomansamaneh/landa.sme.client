<template>
  <tool-bar
    :margin="!inside"
    :inside="inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <menu-button-edit
        :to="`/${baseRoute}/edit/${model?.id}`"
        class="primary-gradient primary-shadow text-white text-body2"
      />
      <menu-button-copy :to="`/${baseRoute}/copy/${model?.id}`" />
      <menu-button-delete
        @click="crudStore.deleteById(model?.id, deleteCallBack)"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const router = useRouter();

  function deleteCallBack() {
    router.back();
  }
</script>
