<template>
  <q-card flat class="bordered shadow">
    <q-inner-loading
      :showing="clStore.showLoader.value"
      color="primary"
    />
    <card-title
      :title="$t('main-menu-items.Acc_AccountSL_Tree')"
      icon="o_line_style"
    />
    <q-card-section>
      <q-tree
        v-if="!clStore.showLoader.value"
        :nodes="clStore.rows.value"
        @lazy-load="onLazyLoad"
        node-key="id"
        accordion
        icon="o_arrow_forward_ios"
        selected-color="black"
        :selected="selected"
        @update:selected="setActiveRow"
      >
        <template #header-cl="prop">
          <Account-CL-Node :node="prop.node" />
        </template>
        <template #header-gl="prop">
          <Account-GL-Node :node="prop.node" />
        </template>
        <template #header-sl="prop">
          <Account-SL-Node :node="prop.node" />
        </template>
      </q-tree>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import AccountCLNode from "./AccountCLNode.vue";
  import AccountGLNode from "./AccountGLNode.vue";
  import AccountSLNode from "./AccountSLNode.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const selected = ref(null);

  function setActiveRow(row) {
    if (row) {
      selected.value = row;
    }
  }

  function createAccountStore(dataSource) {
    const gridStore = useBaseInfoGrid({ sortColumn: "code" });
    const tableStore = useDataTable({ dataSource, store: gridStore });

    async function loadData(level, node) {
      tableStore.pagination.value.pageSize = -1;
      tableStore.state.value.filterExpression =
        node?.filterExpression;
      await tableStore.reloadData();

      tableStore.rows.value.forEach((element) => {
        element.header = level.key;
        element.level = level;
        element.filterExpression = [
          {
            fieldName: `${level.key}Id`,
            operator: sqlOperator.equal,
            value: element.id,
          },
        ];
        element.lazy = level.lazy;
      });
    }

    return { tableStore, loadData };
  }

  function getNextLevel(currentLevel) {
    const levelKeys = Object.keys(accountLevel);
    const currentIndex = levelKeys.indexOf(currentLevel);
    const nextLevelKey = levelKeys[currentIndex + 1];
    return accountLevel[nextLevelKey] || null;
  }

  const accountLevel = {
    cl: {
      key: "cl",
      icon: "",
      lazy: true,
      store: createAccountStore("acc/AccountCL/getGridData"),
    },
    gl: {
      key: "gl",
      icon: "",
      lazy: true,
      store: createAccountStore("acc/AccountGL/getGridData"),
    },
    sl: {
      key: "sl",
      icon: "",
      lazy: false,
      store: createAccountStore("acc/AccountSL/getGridData"),
    },
  };

  const clStore = computed(() => accountLevel.cl.store.tableStore);

  const onLazyLoad = async ({ node, key, done, fail }) => {
    const childLevel = getNextLevel(node.level?.key);
    if (childLevel) {
      await childLevel.store.loadData(childLevel, node);
      done(childLevel.store.tableStore.rows.value);
    } else {
      done([]);
    }
  };

  onMounted(() => {
    accountLevel.cl.store.loadData(accountLevel.cl);
  });
</script>
