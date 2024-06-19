<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/prl/wage/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
      <q-btn
        :to="`/prl/wage/copy/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
      <q-btn
        @click="crudStore.deleteById(id, deleteCallBack)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn>
    </template>
  </tool-bar>

  <q-card class="bordered">
    <div id="invoicePreview">
      <header-section :model="model" />

      <q-card-section class="q-gutter-y-sm_">
        <div class="row">
          <div class="col-md-12">
            <wage-item-data-grid :wage-id="id" />
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
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
