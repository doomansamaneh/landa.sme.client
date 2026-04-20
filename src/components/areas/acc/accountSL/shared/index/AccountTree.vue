<template>
  <q-card flat class="bordered shadow">
    <card-title
      :title="$t('main-menu-items.Acc_AccountSL_Tree')"
      icon="o_line_style"
    >
      <template #header-toolbar>
        <reload-button @click="$refs.myTree.loadRootData()" />
      </template>
    </card-title>

    <q-card-section style="min-height: 300px">
      <tree-view
        ref="myTree"
        accordion
        search_
        :levels="accountLevels"
        @update:loading="isLoading = $event"
        @row-selected="setActiveRow"
      >
        <template #header-cl="prop">
          <account-c-l-node
            :node="prop.node"
            @node-updated="onNodeUpdated"
          />
        </template>
        <template #header-gl="prop">
          <account-g-l-node
            :node="prop.node"
            @node-updated="onNodeUpdated"
          />
        </template>
        <template #header-sl="prop">
          <account-s-l-node
            :node="prop.node"
            @node-updated="onNodeUpdated"
          />
        </template>
      </tree-view>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import TreeView from "src/components/shared/DataTables/TreeView.vue";
  import AccountCLNode from "./AccountCLNode.vue";
  import AccountGLNode from "./AccountGLNode.vue";
  import AccountSLNode from "./AccountSLNode.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import ReloadButton from "src/components/shared/buttons/ReloadButton.vue";

  const isLoading = ref(true);
  const selectedNode = ref(null);

  const accountLevels = [
    {
      key: "cl",
      dataSource: "acc/AccountCL/getGridData",
      lazy: true,
    },
    {
      key: "gl",
      dataSource: "acc/AccountGL/getGridData",
      parentKey: "clId",
      lazy: true,
    },
    {
      key: "sl",
      dataSource: "acc/AccountSL/getGridData",
      parentKey: "glId",
      lazy: false,
    },
  ];

  function setActiveRow(row) {
    selectedNode.value = row;
  }

  function onNodeUpdated() {}
</script>
