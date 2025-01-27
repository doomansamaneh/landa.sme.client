<template>
  <q-card flat class="bordered shadow">
    <card-title :title="$t('main-menu-items.Acc_AccountSL_Tree')" icon="o_line_style" />

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
          <!-- best practice -->
          <!-- <account-cl-node :node="prop.node" /> -->
          <account-tree-node :node="prop.node" />
          <q-space />
          <div class="row items-center q-gutter-md">
            <q-btn dense round unelevated icon="o_more_horiz">
              <q-menu
                ref="accountTreeNodeMenu"
                class="border-radius-lg"
                fit
                :offset="[0, 10]"
              >
                <q-list dense padding style="width: 200px">
                  <q-item
                    @click="createAccountGL(prop.node)"
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_add" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">
                        ایجاد حساب کل
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </template>
        <template #header-gl="prop">
          <account-tree-node :node="prop.node" />
          <q-space />
          <div class="row items-center">
            <q-btn dense round unelevated icon="o_more_horiz">
              <q-menu class="border-radius-lg" fit :offset="[0, 10]">
                <q-list dense padding style="width: 200px">
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                    @click="createAccountGL(prop.node)"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_add" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">ایجاد حساب معین</div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    @click="editAccountGL(prop.node)"
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_edit" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">ویرایش</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </template>
        <template #header-sl="prop">
          <account-tree-node :node="prop.node" />
          <q-space />
          <div class="row items-center">
            <q-btn dense round unelevated icon="o_more_horiz">
              <q-menu class="border-radius-lg" fit :offset="[0, 10]">
                <q-list dense padding style="width: 200px">
                  <q-item
                    @click="createAccountSL(prop.node)"
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_edit" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">ویرایش</div>
                    </q-item-section>
                  </q-item>
                  <q-item @click="deleteDialog" clickable v-close-popup tabindex="0">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_delete" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">حذف</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </template>
      </q-tree>
    </q-card-section>

    <q-inner-loading :showing="clStore.showLoader.value" color="primary" />
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { sqlOperator } from "src/constants";
import { useDataTable } from "src/composables/useDataTable";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
import { useDialog } from "src/composables/useDialog";

import AccountTreeNode from "./AccountTreeNode.vue";
import CardTitle from "src/components/shared/CardTitle.vue";
import GLCreateForm from "../../../accountGL/shared/forms/CreateForm.vue";
import SLCreateForm from "../../../accountSL/shared/forms/CreateForm.vue";

import ConfirmDialog from "components/shared/ConfirmDialog.vue";

const $q = useQuasar();
const { t } = useI18n();
const dialogStore = useDialog();

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
    tableStore.state.value.filterExpression = node?.filterExpression;
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

const tableStore = useDataTable({
  dataSource: "acc/accountSL/tree",
  store: clStore,
});

const onLazyLoad = async ({ node, key, done, fail }) => {
  const childLevel = getNextLevel(node.level?.key);
  if (childLevel) {
    await childLevel.store.loadData(childLevel, node);
    done(childLevel.store.tableStore.rows.value);
  } else {
    done([]);
  }
};

const createAccountGL = (cl) => {
  dialogStore.openDialog({
    title: "ایجاد حساب کل",
    component: GLCreateForm,
    actionBar: true,
    props: {
      action: "create",
    },
    okCallback: async () => {
      alert("create successfully");
    },
  });
};

const editAccountGL = (gl) => {
  dialogStore.openDialog({
    title: "ویرایش حساب کل",
    component: GLCreateForm,
    actionBar: true,
    props: {
      id: gl.id,
      action: "edit",
    },
    okCallback: async () => {
      alert("edit successfully");
    },
  });
};

const createAccountSL = (sl) => {
  dialogStore.openDialog({
    title: "create",
    component: SLCreateForm,
    actionBar: true,
    props: {
      id: sl.id,
    },
    okCallback: async () => {
      await tableStore.reloadData();
    },
  });
};

const deleteDialog = () => {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      title: t("shared.labels.deleteConfirm"),
      message: `${t("shared.labels.deleteMessage")}.`,
      ok: t("shared.labels.delete"),
      okColor: "deep-orange-7",
    },
  }).onOk(async () => {});
};

onMounted(() => {
  accountLevel.cl.store.loadData(accountLevel.cl);
});
</script>
