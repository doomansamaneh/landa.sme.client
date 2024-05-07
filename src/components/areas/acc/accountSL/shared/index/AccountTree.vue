<template>
  <tool-bar margin title="سرفصل حسابها" />

  <q-card class="form-container">
    <q-card-section>
      <q-tree
        v-if="!accountStores.cl.showLoader.value"
        :nodes="accountStores.cl.rows.value"
        @lazy-load="onLazyLoad"
        node-key="id"
        node-icon="search"
        accordion
        selected-color="primary"
        icon="o_arrow_forward_ios"
      >
        <template #header-cl="prop">
          <div class="row items-center text-body2 no-letter-spacing q-pa-sm">
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.code }} - {{ prop.node.title}}
            </div>
          </div>
          <q-space />
          <div class="row items-center q-gutter-md">
            <q-btn @click.stop="menu = true" dense round unelevated icon="o_more_horiz">
              <q-menu v-show="menu" class="border-radius-lg" fit :offset="[0, 10]">
                <q-list dense padding style="width: 200px">
                  <q-item clickable v-close-popup tabindex="0">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_add" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">ایجاد حساب کل</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </template>
        <template #header-gl="prop">
          <div class="row items-center q-gutter-md no-letter-spacing q-pa-sm">
            <q-btn size="8px" round unelevated class="no-pointer-events" color="green">
              <q-icon color="white" name="o_check" size="16px" />
            </q-btn>
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.code }} - {{ prop.node.title}}
            </div>
          </div>
          <q-space />
          <div class="row items-center">
            <q-btn @click.stop="menu = true" dense round unelevated icon="o_more_horiz">
              <q-menu v-show="menu" class="border-radius-lg" fit :offset="[0, 10]">
                <q-list dense padding style="width: 200px">
                  <q-item clickable v-close-popup tabindex="0">
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
                  <q-item clickable v-close-popup tabindex="0">
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
          <div class="row items-center q-gutter-md no-letter-spacing q-pa-sm">
            <q-btn size="8px" round unelevated class="no-pointer-events" color="green">
              <q-icon color="white" name="o_check" size="16px" />
            </q-btn>
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.code }} - {{ prop.node.title}}
            </div>
          </div>
          <q-space />
          <div class="row items-center">
            <q-btn @click.stop="menu = true" dense round unelevated icon="o_more_horiz">
              <q-menu v-show="menu" class="border-radius-lg" fit :offset="[0, 10]">
                <q-list dense padding style="width: 200px">
                  <q-item clickable v-close-popup tabindex="0">
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
                  <q-item clickable v-close-popup tabindex="0">
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
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sqlOperator } from "src/constants";

import { useDataTable } from "src/composables/useDataTable";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

import ToolBar from "src/components/shared/ToolBarDesktop.vue";

const menu = ref(false);

function creatAccountStore(dataSource) {
  const gridStore = useBaseInfoGrid({ sortColumn: "code" });
  const dataTableStore = useDataTable({ dataSource, store: gridStore });
  return dataTableStore;
}

const accountLevel = {
  cl: "cl",
  gl: "gl",
  sl: "sl"
}

const accountStores = {
  cl: creatAccountStore("acc/AccountCL/getGridData"),
  gl: creatAccountStore("acc/AccountGL/getGridData"),
  sl: creatAccountStore("acc/AccountSL/getGridData"),
};

onMounted(() => {
  loadClData();
});

async function loadAccountData({level, lazy, node}) {
  const accountStore = accountStores[level];
  accountStore.pagination.value.pageSize = -1;
  if (node) accountStore.state.value.filterExpression = node.filterExpression;
  await accountStore.loadData();
  accountStore.rows.value.forEach((element) => {
    element.header = level;
    element.level = level;
    element.filterExpression = [
      {
        fieldName: `${level}Id`,
        operator: sqlOperator.equal,
        value: element.id,
      },
    ];
    element.lazy = lazy;
  });
  return accountStore;
}

async function loadClData() {
  return await loadAccountData({level: accountLevel.cl, lazy: true});
}

async function loadGlData(node) {
  return await loadAccountData({level: accountLevel.gl, lazy: true, node: node});
}

async function loadSlData(node) {
  return await loadAccountData({level: accountLevel.sl, lazy: false, node: node});
}

const loadFunctions = {
  cl: loadGlData,
  gl: loadSlData
}

const onLazyLoad = async ({ node, key, done, fail }) => {
  const loadFunction = loadFunctions[node.level];
  if (loadFunction) {
    const accountStore = await loadFunction(node);
    done(accountStore.rows.value);
  } else {
    done([]);
  } 
};
</script>
