<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <q-card class="bordered">
    <div id="invoicePreview">
      <header-section :model="model" />
      <q-separator></q-separator>
      <q-card-section class="q-px-none">
        <wage-item-data-grid :wage-id="id" toolbar />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "./ToolBar.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import WageItemDataGrid from "../../desktop/index/WageItemDataGrid.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "prl/wage";
  const crudStore = useFormActions(baseRoute, model);

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }

  onMounted(() => {
    crudStore.getById(id.value, `${baseRoute}/getPreviewById`);
  });
</script>
