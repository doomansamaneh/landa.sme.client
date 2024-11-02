<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <q-btn
        @click="showItemSheet"
        class="text-caption q-mr-sm"
        round
        dense
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_more_vert" />
      </q-btn>
    </template>
  </tool-bar>

  <data-grid-item-sheet
    v-if="itemSheetStatus"
    :status="itemSheetStatus"
    :item="model"
    :base-route="baseRoute"
    :delete-call-back="deleteCallBack"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarPreviewMobile.vue";
  import DataGridItemSheet from "../index/DataGridItemSheet.vue";
  import { computed } from "vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    formStore: Object,
  });

  const router = useRouter();
  const invoiceStore = computed(() => props.formStore);
  const itemSheetStatus = ref(false);

  const showItemSheet = () => {
    itemSheetStatus.value = true;
  };

  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };

  function deleteCallBack() {
    if (invoiceStore.value.state?.firstLoad?.value)
      invoiceStore.value.state.firstLoad.value = false;
    router.back();
  }
</script>
