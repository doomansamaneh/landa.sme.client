<template>
  <div>
    <custom-label v-if="label" class="q-mb-sm" :label="label" />
    <q-input
      ref="search"
      v-model="selectedText"
      hide-bottom-space
      outlined
      color="primary"
      class="first input lookup"
      :input-class="inputClass"
      dense
      :autogrow="autogrow"
      :no-error-icon="noErrorIcon"
      debounce="1000"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disable="disable"
      :readonly="readonly"
      :rules="rules"
      @update:model-value="searchInLookup"
      @keydown="handleKeyDown"
    >
      <template #loading>
        <q-spinner size="18px" color="primary" />
      </template>

      <template #append>
        <template v-if="clearable || !required">
          <q-icon
            name="o_close"
            v-if="!isSearchEmpty"
            class="cursor-pointer q-field__focusable-action"
            @click.stop="clearSearch"
          />
        </template>
        <q-icon
          @click.stop="handlePopup"
          name="o_expand_more"
          class="show-lookup-icon cursor-pointer"
          :class="isPopupOpen ? 'expand-open' : 'expand-close'"
          size="sm"
        />
      </template>

      <template v-if="innerLoading" #prepend>
        <q-spinner size="18px" color="primary" />
      </template>

      <template #prepend>
        <q-icon name="o_account_tree" size="20px" />
      </template>

      <validation-alert
        v-if="validationMessage"
        :message="validationMessage"
      />

      <q-menu
        v-if="$q.screen.gt.xs"
        ref="popup"
        v-model="isPopupOpen"
        no-parent-event
        no-focus
        no-refocus
        fit
        transition-show="jump-down"
        transition-hide="jump-up"
        @before-show="onBeforeShow"
        @show="onMenuShow"
        @hide="onMenuHide"
        class="no-scroll"
      >
        <div
          class="q-pa-sm"
          style="max-height: 400px; min-height: 100px; overflow: auto"
        >
          <div class="dynamic-tree-wrapper relative-position">
            <q-tree
              v-if="!isFetchingRoot"
              v-show="hasVisibleNodes"
              :nodes="rootNodes"
              :node-key="nodeKey"
              accordion
              icon="o_arrow_forward_ios"
              :selected-color="
                $q.dark.isActive ? 'yellow' : 'primary'
              "
              v-model:selected="selectedNode"
              v-model:expanded="expanded"
              @lazy-load="onLazyLoad"
              @update:selected="onNodeSelected"
              :filter="localSearchTerm"
              :filter-method="nodeMatches"
            >
              <template
                v-for="(_, slotName) in $slots"
                v-slot:[slotName]="prop"
              >
                <slot :name="slotName" v-bind="prop"></slot>
              </template>

              <template #default-header="prop">
                <div
                  class="row items-center full-width cursor-pointer"
                >
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
              v-if="
                !isFetchingRoot && !isSearching && !hasVisibleNodes
              "
              class="q-pa-md flex flex-center"
            >
              <slot name="no-data">
                <no-data-found />
              </slot>
            </div>
          </div>
        </div>
      </q-menu>
    </q-input>

    <q-dialog
      ref="lookupDialog"
      maximized
      transition-duration="600"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="no-border hide-scrollbar column no-wrap">
        <q-card-section>
          <div class="row items-center q-col-gutter-md">
            <div class="col text-body2 text-bold">
              <slot name="title">انتخاب</slot>
            </div>
            <div class="flex flex-center">
              <q-btn
                no-caps
                round
                unelevated
                text-color="white"
                class="red-gradient red-shadow col-1"
                padding="5px"
                v-close-popup
              >
                <q-icon size="16px" name="o_close" />
              </q-btn>
            </div>
          </div>

          <q-input
            ref="dialogSearch"
            v-model="selectedText"
            hide-bottom-space
            outlined
            :rules="rules"
            color="primary"
            class="q-mt-md first input lookup"
            input-class="text-body2"
            dense
            debounce="300"
            :clearable="clearable"
            :placeholder="placeholder"
            @update:model-value="searchInLookup"
            @keydown="handleKeyDown"
          >
            <template #append>
              <q-icon
                name="o_close"
                v-if="!isSearchEmpty"
                class="cursor-pointer q-field__focusable-action"
                @click.stop="clearSearch"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="q-py-none q-px-sm col overflow-auto">
          <div class="dynamic-tree-wrapper relative-position">
            <q-tree
              v-if="!isFetchingRoot"
              v-show="hasVisibleNodes"
              :nodes="rootNodes"
              :node-key="nodeKey"
              accordion
              icon="o_arrow_forward_ios"
              :selected-color="
                $q.dark.isActive ? 'yellow' : 'primary'
              "
              v-model:selected="selectedNode"
              v-model:expanded="expanded"
              @lazy-load="onLazyLoad"
              @update:selected="onNodeSelected"
              :filter="localSearchTerm"
              :filter-method="nodeMatches"
            >
              <template
                v-for="(_, slotName) in $slots"
                v-slot:[slotName]="prop"
              >
                <slot :name="slotName" v-bind="prop"></slot>
              </template>

              <template #default-header="prop">
                <div
                  class="row items-center full-width cursor-pointer"
                  @click.stop="selectRow(prop.node)"
                >
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
              v-if="
                !isFetchingRoot && !isSearching && !hasVisibleNodes
              "
              class="q-pa-md flex flex-center"
            >
              <slot name="no-data">
                <no-data-found />
              </slot>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
  import { ref, computed, nextTick, watch } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useDataTable } from "src/composables/useDataTable";
  import { sqlOperator } from "src/constants";

  import CustomLabel from "../forms/CustomLabel.vue";
  import ValidationAlert from "src/components/shared/forms/ValidationAlert.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const props = defineProps({
    levels: { type: Array, required: true },
    nodeKey: { type: String, default: "id" },
    labelKey: { type: String, default: "title" },
    accordion: { type: Boolean, default: true },
    textTemplate: String,
    required: Boolean,
    rules: Array,
    placeholder: String,
    autofocus: Boolean,
    disable: Boolean,
    readonly: Boolean,
    label: String,
    autogrow: Boolean,
    noErrorIcon: Boolean,
    clearable: Boolean,
    loading: Boolean,
    inputClass: {
      type: String,
      default: "text-body2",
    },
  });

  const selectedId = defineModel("selectedId");
  const selectedText = defineModel("selectedText");
  const selectedNode = ref(null);

  const { t } = useI18n();
  const $q = useQuasar();

  const emit = defineEmits([
    "row-selected",
    "clear",
    "update:loading",
  ]);

  const search = ref(null);
  const dialogSearch = ref(null);
  const popup = ref(null);
  const isPopupOpen = ref(false);
  const lookupDialog = ref(null);
  const validationMessage = ref("");
  const menuWidth = ref("");
  const localSearchTerm = ref("");

  const rootNodes = ref([]);
  const expanded = ref([]);
  const isFetchingRoot = ref(false);
  const isSearching = ref(false);
  const isLazyLoading = ref(false);

  const isDataLoaded = ref(false);

  const innerLoading = computed(
    () =>
      isFetchingRoot.value ||
      isSearching.value ||
      isLazyLoading.value,
  );

  function setLoading(status) {
    isFetchingRoot.value = status;
    emit("update:loading", status);
  }

  const loadRootData = async () => {
    if (
      !props.levels ||
      props.levels.length === 0 ||
      isFetchingRoot.value
    )
      return;

    setLoading(true);
    try {
      rootNodes.value = await fetchLevelData(0, null);
      isDataLoaded.value = true;
      return rootNodes.value;
    } catch (error) {
      console.error("Failed to load root tree nodes:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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

    const localStore = {
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

    const tableStore = useDataTable({
      dataSource: levelConfig.dataSource,
      store: localStore,
    });

    await tableStore.reloadData();

    return tableStore.rows.value.map((row) => ({
      ...row,
      header: levelConfig.key,
      _levelIndex: levelIndex,
      lazy:
        levelConfig.lazy !== undefined
          ? levelConfig.lazy
          : levelIndex < props.levels.length - 1,
      children: [],
    }));
  }

  const onLazyLoad = async ({ node, done, fail }) => {
    try {
      isLazyLoading.value = true;
      const nextLevelIndex =
        (node._levelIndex !== undefined ? node._levelIndex : 0) + 1;

      if (nextLevelIndex < props.levels.length) {
        const children = await fetchLevelData(nextLevelIndex, node);

        node.children = children;

        if (!children || children.length === 0) {
          node.lazy = false;
        }

        done(children);
      } else {
        node.lazy = false;
        done([]);
      }
    } catch (error) {
      console.error("Lazy load failed:", error);
      fail(error);
    } finally {
      isLazyLoading.value = false;
    }
  };

  function findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node[props.nodeKey] === id) return node;

      if (node.children && node.children.length > 0) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const nodeMatches = (node, filter) => {
    if (!filter) return true;

    const filt = filter.toLowerCase();

    const labelText = node[props.labelKey]
      ? String(node[props.labelKey]).toLowerCase()
      : "";

    const codeText = node.code ? String(node.code).toLowerCase() : "";

    if (labelText.includes(filt) || codeText.includes(filt)) {
      return true;
    }

    if (node.children && node.children.length > 0) {
      return node.children.some((child) =>
        nodeMatches(child, filter),
      );
    }

    return false;
  };

  const hasVisibleNodes = computed(() => {
    if (!rootNodes.value || rootNodes.value.length === 0)
      return false;
    if (!localSearchTerm.value) return true;

    return rootNodes.value.some((node) =>
      nodeMatches(node, localSearchTerm.value),
    );
  });

  const expandAndSearchNodes = async (nodes, filter) => {
    if (!filter) return;

    const filt = filter.toLowerCase();

    const promises = nodes.map(async (node) => {
      const labelText = node[props.labelKey]
        ? String(node[props.labelKey]).toLowerCase()
        : "";

      const codeText = node.code
        ? String(node.code).toLowerCase()
        : "";

      const selfMatch =
        labelText.includes(filt) || codeText.includes(filt);

      const needsLoading =
        node.lazy && (!node.children || node.children.length === 0);

      if (needsLoading) {
        const nextLevelIndex =
          (node._levelIndex !== undefined ? node._levelIndex : 0) + 1;

        if (nextLevelIndex < props.levels.length) {
          const children = await fetchLevelData(nextLevelIndex, node);
          node.children = children;

          if (!children || children.length === 0) {
            node.lazy = false;
          }
        } else {
          node.lazy = false;
        }
      }

      if (node.children && node.children.length > 0) {
        await expandAndSearchNodes(node.children, filter);

        const childMatch = node.children.some((child) =>
          nodeMatches(child, filter),
        );

        if (childMatch || selfMatch) {
          if (!expanded.value.includes(node[props.nodeKey])) {
            expanded.value.push(node[props.nodeKey]);
          }
        }
      }

      if (selfMatch) {
        if (!expanded.value.includes(node[props.nodeKey])) {
          expanded.value.push(node[props.nodeKey]);
        }
      }
    });

    await Promise.all(promises);
  };

  watch(localSearchTerm, async (newVal) => {
    if (!newVal) {
      expanded.value = [];
      return;
    }

    isSearching.value = true;
    await expandAndSearchNodes(rootNodes.value, newVal);
    isSearching.value = false;
  });

  function onNodeSelected(nodeId) {
    if (!nodeId) {
      clearSearch();
      return;
    }

    const node = findNodeById(rootNodes.value, nodeId);

    if (!node) return;

    setIdText(node);
    emitSelectRow(node);

    hidePopup();
    hideDialog();
  }

  function handleKeyDown(event) {
    if (event.key === "Delete") {
      clearSearch();
    }
  }

  async function clearSearch() {
    localSearchTerm.value = "";
    setIdText(null);
    emitSelectRow(null);
    emit("clear");
    onMenuHide();
  }

  async function setIdText(row) {
    selectedId.value = row ? row[props.nodeKey] : null;
    selectedNode.value = selectedId.value;
    setText(row);
  }

  function setText(row) {
    if (row == null) {
      selectedText.value = null;
    } else {
      if (props.textTemplate) {
        selectedText.value = props.textTemplate.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? "",
        );
      } else {
        selectedText.value = row[props.labelKey] || row.label || "";
      }
    }
  }

  function setCustomText(displayText) {
    selectedText.value = displayText;
  }

  async function handlePopup() {
    if (!isDataLoaded.value) {
      await loadRootData();
    }

    if ($q.screen.gt.xs) {
      if (isPopupOpen.value) {
        hidePopup();
      } else {
        localSearchTerm.value = "";
        showPopup();
      }
    } else {
      localSearchTerm.value = "";
      showDialog();
    }
  }

  function selectRow(row) {
    if (row) {
      setIdText(row);
      localSearchTerm.value = "";
      hidePopup();
      hideDialog();
      emitSelectRow(row);
    }
  }

  function emitSelectRow(row) {
    emit("row-selected", row);
  }

  async function searchInLookup(val) {
    if (!isDataLoaded.value) {
      await loadRootData();
    }

    localSearchTerm.value = val || "";
    selectedId.value = null;

    if ($q.screen.gt.xs) {
      await showPopup();
    } else {
      await showDialog();
    }
  }

  function onMenuHide() {
    isPopupOpen.value = false;
    search.value?.focus();
  }

  async function showPopup() {
    await nextTick();
    popup.value?.show();
  }

  async function showDialog() {
    lookupDialog.value?.show();
  }

  function onBeforeShow() {
    if ($q.screen.gt.xs) {
      const inputWidth = search.value?.$el?.offsetWidth;
      menuWidth.value = inputWidth ? `${inputWidth}px` : "";
      updatePosition();
    }
  }

  function onMenuShow() {
    isPopupOpen.value = true;
    if ($q.screen.gt.xs) {
      search.value?.focus();
    }
  }

  function focus() {
    search.value?.focus();
  }

  function hidePopup() {
    popup.value?.hide();
  }

  function hideDialog() {
    lookupDialog.value?.hide();
  }

  const isSearchEmpty = computed(() => !selectedId.value);

  const updatePosition = async () => {
    popup.value?.updatePosition();
  };

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid =
              val !== null &&
              val !== undefined &&
              val !== "" &&
              selectedId.value !== null;
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });

  defineExpose({
    setIdText,
    setCustomText,
    focus,
    selectedId,
    selectedText,
    loadRootData,
  });
</script>

<style scoped>
  .expand-open {
    transform: rotate(-180deg);
    transition-duration: 300ms;
  }

  .expand-close {
    transform: rotate(0);
    transition-duration: 300ms;
  }
</style>
