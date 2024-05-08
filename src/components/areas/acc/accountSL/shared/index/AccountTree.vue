<template>
  <tool-bar margin title="سرفصل حسابها" />

  <q-card class="form-container">
    <q-card-section>
      <q-tree
        v-if="!clStore.showLoader.value"
        :nodes="clStore.rows.value"
        @lazy-load="onLazyLoad"
        node-key="id"
        accordion
        icon="o_arrow_forward_ios"
      >
        <template #header-cl="prop">
          <div class="row items-center text-body2 no-letter-spacing q-pa-sm">
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.code }} - {{ prop.node.title }}
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
              {{ prop.node.code }} - {{ prop.node.title }}
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
              {{ prop.node.code }} - {{ prop.node.title }}
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
import { ref, onMounted, computed } from "vue";
import { sqlOperator } from "src/constants";

import { useDataTable } from "src/composables/useDataTable";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

import ToolBar from "src/components/shared/ToolBarDesktop.vue";

const menu = ref(false);

function creatAccountStore(dataSource) {
  const gridStore = useBaseInfoGrid({ sortColumn: "code" });
  const tableStore = useDataTable({ dataSource, store: gridStore });

  async function loadData(level, node) {
    tableStore.pagination.value.pageSize = -1;
    tableStore.state.value.filterExpression = node?.filterExpression;
    await tableStore.reloadData();

    const childLevel = getNextLevel(level.key);
    tableStore.rows.value.forEach((element) => {
      element.header = level.key;
      element.level = childLevel;
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
  cl: {key: "cl", lazy: true, store: creatAccountStore("acc/AccountCL/getGridData")},
  gl: {key: "gl", lazy: true, store:creatAccountStore("acc/AccountGL/getGridData")},
  sl: {key: "sl", lazy: false, store:creatAccountStore("acc/AccountSL/getGridData")}
}

const clStore = computed(() => accountLevel.cl.store.tableStore);

const onLazyLoad = async ({ node, key, done, fail }) => {
  if (node.level) {
    await node.level.store.loadData(node.level, node)
    done(node.level.store.tableStore.rows);
  }
  else {done ([])}
};

onMounted(() => {
  accountLevel.cl.store.loadData(accountLevel.cl);
});

</script>