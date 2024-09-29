<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="sls/invoice"
    activation
    search-btn
  >
    <template #buttons-custom>
      <q-separator size="0.5px" class="q-my-sm" />
      <q-item clickable v-close-popup tabindex="0" @click="editBatch">
        <div class="q-py-sm">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_edit" />
            </q-avatar>
          </q-item-section>
        </div>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.editBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template #search-btn>
      <q-btn
        round
        class="q-mr-sm"
        unelevated
        dense
        v-if="!tableStore?.activeRow?.value"
        @click="onSortSheetShow"
      >
        <q-icon name="sort" />
      </q-btn>
      <q-btn
        round
        unelevated
        dense
        v-if="!tableStore?.activeRow?.value"
        @click="showSearchModal"
      >
        <q-icon name="o_filter_alt" />
      </q-btn>
    </template>
  </tool-bar>
</template>

<script setup>
  import { ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    title: String,
  });

  const dialog = ref(false);
  const sortSheetStatus = ref(false);

  const showSearchModal = () => {
    dialog.value = true;
  };

  const onSortSheetShow = () => {
    sortSheetStatus.value = true;
  };
</script>
