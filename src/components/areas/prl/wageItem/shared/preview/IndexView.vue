<template>
  <toolbar-desktop
    v-if="model"
    :inside="inside"
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />

  <q-card bordered>
    <div :ref="printStore.printRef" v-if="model">
      <header-section :model="model" />
      <body-section :model="model" />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { useWageItemPreviewMenu } from "src/components/areas/prl/_menus/useWageItemPreviewMenu.js";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import BodySection from "./_BodySection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "prl/wageItem";
  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  const context = usePreviewMenuContext(crudStore, baseRoute);

  const menuItems = computed(() =>
    useWageItemPreviewMenu(context.value)
  );

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
