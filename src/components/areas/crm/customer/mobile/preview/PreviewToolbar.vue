<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :selected-ids="selectedIds"
    buttons
    margin
  >
    <template #default>
      <div
        class="ellipsis-2-lines text-weight-700"
        :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
      >
        <slot name="header-title">
          <span class="text-body2">
            {{ title }}
          </span>
        </slot>
      </div>

      <q-space />

      <menu-button-edit
        :to="`/crm/customer/edit/${id}`"
        class="text-body2"
        round
        dense
        unelevated
        no-caps
      />
    </template>

    <template #buttons-batch-action>
      <q-btn
        class="text-caption"
        round
        unelevated
        no-caps
        @click="editBatch"
      >
        <q-icon name="o_edit" />
        <q-badge floating>{{ selectedIds?.length }}</q-badge>
      </q-btn>
    </template>
  </tool-bar>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    title: String,
    tableStore: Object,
    crudStore: Object,
    baseRoute: String,
    selectedIds: Array,
  });

  const route = useRoute();
  const id = computed(() => route.params.id);

  const emits = defineEmits(["edit-batch"]);

  function editBatch() {
    emits("edit-batch");
  }
</script>
