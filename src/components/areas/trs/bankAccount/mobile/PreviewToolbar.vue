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
        class="text-caption"
        round
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_more_vert" />
      </q-btn>
    </template>
  </tool-bar>

  <data-grid-item-sheet
    v-if="itemSheetStatus"
    v-model:status="itemSheetStatus"
    :item="model"
    :base-route="baseRoute"
    :delete-call-back="deleteCallBack"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarPreviewMobile.vue";
  import DataGridItemSheet from "./index/DataGridItemSheet.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    crudStore: useFormActions,
  });

  const router = useRouter();
  const itemSheetStatus = ref(false);

  const showItemSheet = () => {
    itemSheetStatus.value = true;
  };

  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };

  const deleteCallBack = () => {
    router.back();
  };
</script>
