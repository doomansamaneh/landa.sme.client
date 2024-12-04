<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          icon="o_account_box"
          class="primary-gradient primary-shadow"
        />
        <card-title :title="$t('main-menu-items.Prl_Wage_View')" />
      </div>
    </div>

    <q-separator size="1px" />

    <div id="invoicePreview">
      <header-section :model="model" />
      <q-separator />
      <q-card-section class="q-px-none">
        <wage-item-data-grid :wage-id="id" toolbar_ />
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
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

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
