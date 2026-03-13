<template>
  <div class="dynamic-tree-wrapper">
    <q-input
      v-if="search"
      v-model="localSearchTerm"
      hide-bottom-space
      outlined
      color="primary"
      dense
      clearable
      clear-icon="close"
      debounce="1000"
      class="q-mb-md"
      :placeholder="$t('shared.labels.search')"
    >
      <template #prepend>
        <q-icon name="search" size="20px" />
      </template>
    </q-input>

    <div
      class="tree-content-container relative-position"
      style="min-height: 100px"
    >
      <q-tree
        v-if="!isFetchingRoot"
        v-show="hasVisibleNodes"
        :nodes="rootNodes"
        :node-key="nodeKey"
        :accordion="accordion"
        icon="o_arrow_forward_ios"
        :selected-color="$q.dark.isActive ? 'yellow' : 'primary'"
        v-model:selected="selectedNode"
        v-model:expanded="expanded"
        :filter="localSearchTerm"
        :filter-method="nodeMatches"
        @update:selected="onNodeSelected"
        @lazy-load="onLazyLoad"
      >
        <template
          v-for="(_, slotName) in $slots"
          v-slot:[slotName]="prop"
        >
          <slot :name="slotName" v-bind="prop"></slot>
        </template>

        <template #default-header="prop">
          <div class="row items-center">
            <slot
              :name="'header-' + prop.node._levelKey"
              :node="prop.node"
            >
              <slot name="tree-node" :node="prop.node">
                <span>{{ prop.node[labelKey] }}</span>
              </slot>
            </slot>
          </div>
        </template>
      </q-tree>

      <div
        v-if="!isFetchingRoot && !isSearching && !hasVisibleNodes"
        class="q-pa-md flex flex-center"
      >
        <slot name="no-data">
          <no-data-found />
        </slot>
      </div>

      <q-inner-loading
        :showing="isFetchingRoot || isSearching"
        color="primary"
        class="bg-transparent z-top"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { sqlOperator } from "src/constants";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const props = defineProps({
    levels: { type: Array, required: true },
    nodeKey: { type: String, default: "id" },
    accordion: { type: Boolean, default: true },
    selectedId: { type: [String, Number, Object], default: null },
    labelKey: { type: String, default: "title" },
    searchTerm: { type: String, default: "" },
    search: Boolean,
  });

  const emit = defineEmits([
    "update:selectedId",
    "row-selected",
    "update:loading",
    "update:searchTerm",
  ]);

  const selectedNode = ref(props.selectedId);
  const localSearchTerm = ref(props.searchTerm);
  const rootNodes = ref([]);
  const expanded = ref([]);

  const isFetchingRoot = ref(false);
  const isSearching = ref(false);
  const isLazyLoading = ref(false);

  const innerLoading = computed(
    () =>
      isFetchingRoot.value ||
      isSearching.value ||
      isLazyLoading.value,
  );

  watch(
    () => props.selectedId,
    (val) => {
      selectedNode.value = val;
    },
  );

  watch(
    () => props.searchTerm,
    (val) => {
      if (val !== localSearchTerm.value) {
        localSearchTerm.value = val;
      }
    },
  );

  function setLoading(val) {
    isFetchingRoot.value = val;
    emit("update:loading", val);
  }

  function nodeMatches(node, filter) {
    if (!filter) return true;

    const f = filter.toLowerCase();
    const label = String(node[props.labelKey] || "").toLowerCase();
    const code = String(node.code || "").toLowerCase();

    if (label.includes(f) || code.includes(f)) return true;

    return node.children?.some((child) => nodeMatches(child, filter));
  }

  const hasVisibleNodes = computed(() => {
    if (!rootNodes.value || rootNodes.value.length === 0)
      return false;
    if (!localSearchTerm.value) return true;

    return rootNodes.value.some((node) =>
      nodeMatches(node, localSearchTerm.value),
    );
  });

  function findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node[props.nodeKey] === id) return node;

      const found = node.children?.length
        ? findNodeById(node.children, id)
        : null;

      if (found) return found;
    }
    return null;
  }

  function onNodeSelected(nodeId) {
    selectedNode.value = nodeId;

    if (!nodeId) {
      emit("update:selectedId", null);
      emit("row-selected", null);
      return;
    }

    emit("update:selectedId", nodeId);

    const fullNode = findNodeById(rootNodes.value, nodeId);

    if (fullNode) {
      emit("row-selected", fullNode);
    }
  }

  function createTableStore(levelConfig, filterExpression) {
    return {
      pagination: ref({
        currentPage: 1,
        pageSize: -1,
        sortColumn: levelConfig.sortColumn || "code",
      }),
      state: {
        filterExpression,
        disableApplySearch: true,
        firstLoad: ref(true),
        rows: ref([]),
        searchField: ref(""),
        activeRow: ref(null),
        allSelectedIds: ref([]),
        summaryData: ref(null),
        searchModel: ref(null),
      },
    };
  }

  async function fetchLevelData(levelIndex, parentNode = null) {
    const levelConfig = props.levels[levelIndex];
    if (!levelConfig) return [];

    const filterExpression =
      parentNode && levelConfig.parentKey
        ? [
            {
              fieldName: levelConfig.parentKey,
              operator: sqlOperator?.equal || 1,
              value: parentNode[props.nodeKey],
            },
          ]
        : [];

    const tableStore = useDataTable({
      dataSource: levelConfig.dataSource,
      store: createTableStore(levelConfig, filterExpression),
    });

    await tableStore.reloadData();

    return tableStore.rows.value.map((row) => ({
      ...row,
      header: levelConfig.key,
      _levelIndex: levelIndex,
      lazy: levelConfig.lazy ?? levelIndex < props.levels.length - 1,
      children: [],
      _childrenLoaded: false,
      _childrenLoadingPromise: null,
    }));
  }

  async function ensureNodeChildrenLoaded(node) {
    const nextLevel = (node._levelIndex ?? 0) + 1;

    if (nextLevel >= props.levels.length) {
      node.lazy = false;
      node._childrenLoaded = true;
      return node.children || [];
    }

    if (node._childrenLoaded) {
      return node.children || [];
    }

    if (node._childrenLoadingPromise) {
      return await node._childrenLoadingPromise;
    }

    node._childrenLoadingPromise = (async () => {
      try {
        const children = await fetchLevelData(nextLevel, node);
        node.children = children;
        node._childrenLoaded = true;

        if (!children.length) {
          node.lazy = false;
        }

        return children;
      } finally {
        node._childrenLoadingPromise = null;
      }
    })();

    return await node._childrenLoadingPromise;
  }

  async function loadRootData() {
    if (!props.levels?.length) return;

    setLoading(true);

    try {
      rootNodes.value = await fetchLevelData(0);
    } catch (err) {
      console.error("Failed to load root nodes:", err);
    } finally {
      setLoading(false);
    }
  }

  const onLazyLoad = async ({ node, done, fail }) => {
    try {
      isLazyLoading.value = true;
      const children = await ensureNodeChildrenLoaded(node);
      done(children);
    } catch (err) {
      console.error("Lazy load failed:", err);
      fail(err);
    } finally {
      isLazyLoading.value = false;
    }
  };

  async function searchNode(node, filter, token) {
    if (token !== searchToken) return false;

    const f = filter.toLowerCase();
    const label = String(node[props.labelKey] || "").toLowerCase();
    const code = String(node.code || "").toLowerCase();
    const selfMatch = label.includes(f) || code.includes(f);

    if (node.lazy && !node._childrenLoaded) {
      if (token !== searchToken) return false;
      await ensureNodeChildrenLoaded(node);
    }

    let childMatch = false;

    if (node.children?.length) {
      for (const child of node.children) {
        if (token !== searchToken) return false;

        const matched = await searchNode(child, filter, token);
        if (matched) {
          childMatch = true;
        }
      }
    }

    const matched = selfMatch || childMatch;

    if (matched) {
      const key = node[props.nodeKey];
      if (!expanded.value.includes(key)) {
        expanded.value.push(key);
      }
    }

    return matched;
  }

  async function expandAndSearchNodes(nodes, filter, token) {
    for (const node of nodes) {
      if (token !== searchToken) return;
      await searchNode(node, filter, token);
    }
  }

  let searchToken = 0;

  watch(localSearchTerm, async (val) => {
    const token = ++searchToken;
    emit("update:searchTerm", val);

    expanded.value = [];

    if (!val) {
      isSearching.value = false;
      return;
    }

    isSearching.value = true;

    try {
      await expandAndSearchNodes(rootNodes.value, val, token);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      if (token === searchToken) {
        isSearching.value = false;
      }
    }
  });

  onMounted(() => {
    loadRootData();
  });

  defineExpose({
    loadRootData,
  });
</script>
