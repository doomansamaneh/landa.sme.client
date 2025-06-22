<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white"
        @click="printStore.handlePrint()"
      />
    </template>
  </tool-bar>

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

  import ToolBar from "src/components/shared/toolbars/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import BodySection from "./_BodySection.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

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

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
