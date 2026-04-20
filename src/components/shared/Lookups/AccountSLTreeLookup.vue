<template>
  <tree-lookup
    v-model:selected-id="formData.accountId"
    v-model:selected-text="formData.accountTitle"
    node-key="id"
    label-key="title"
    :clearable="true"
    :levels="accountLevels"
    @row-selected="handleSelection"
  >
    <template #tree-node="{ node }">
      <div class="row items-center q-gutter-x-sm">
        <q-badge color="grey-3" text-color="dark" class="text-bold">
          {{ node.code }}
        </q-badge>
        <span>{{ node.title }}</span>
      </div>
    </template>
  </tree-lookup>
</template>

<script setup>
  import { ref } from "vue";
  import TreeLookup from "src/components/shared/DataTables/TreeLookup.vue";

  const formData = ref({
    accountId: null,
    accountTitle: "",
  });

  function handleSelection(node) {
    console.log("Selected node from lazy tree:", node);
  }

  const accountLevels = [
    {
      dataSource: "acc/AccountCL/getGridData",
    },
    {
      dataSource: "acc/AccountGL/getGridData",
      parentKey: "clId",
    },
    {
      dataSource: "acc/AccountSL/getGridData",
      parentKey: "glId",
    },
  ];
</script>
