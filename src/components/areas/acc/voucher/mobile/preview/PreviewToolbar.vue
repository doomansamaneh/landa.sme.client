<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <!-- <q-btn
          class="text-caption"
          round
          unelevated
          no-caps
          :to="`/${baseRoute}/edit/${model?.id}`"
        >
          <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        </q-btn> -->

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
  import { useVoucherState } from "../../../_composables/useVoucherState";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarPreviewMobile.vue";
  import DataGridItemSheet from "../index/DataGridItemSheet.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    crudStore: useFormActions,
  });

  const router = useRouter();
  const voucherStore = useVoucherState();
  const itemSheetStatus = ref(false);

  const showItemSheet = () => {
    itemSheetStatus.value = true;
  };

  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };

  const deleteCallBack = () => {
    voucherStore.state.firstLoad.value = false;
    router.back();
  };
</script>
