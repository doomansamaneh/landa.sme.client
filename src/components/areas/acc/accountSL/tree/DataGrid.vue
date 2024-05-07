<template>
  <tool-bar margin title="سرفصل حسابها" />

  <q-card class="form-container">
    <q-card-section>
      <q-tree
        :nodes="nodes"
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

    <!-- <q-card-section v-if="!clStore.showLoader.value && clStore.rows.value.length == 0">
      <no-data-found />
    </q-card-section> -->

    <q-inner-loading color="primary" :showing="clStore.showLoader.value" />
  </q-card>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from "vue";
import ToolBar from "src/components/shared/ToolBarDesktop.vue";
import NoDataFound from "components/shared/dataTables/NoDataFound.vue";

import { useDataTable } from "src/composables/useDataTable";
import { useAccountCLGrid } from "src/components/areas/acc/_composables/useAccountCLGrid";
import { useAccountGLGrid } from "src/components/areas/acc/_composables/useAccountGLGrid";
import { useAccountSLGrid } from "src/components/areas/acc/_composables/useAccountSLGrid";
import {
  accountCLColumns,
  accountGLColumns,
  accountSLColumns,
} from "src/components/areas/acc/_composables/constants";
import { sqlOperator } from "src/constants";
import NoDataFoundVue from "src/components/shared/dataTables/NoDataFound.vue";

const clDataSource = "acc/AccountCL/getGridData";
const glDataSource = "acc/AccountGL/getGridData";
const slDataSource = "acc/AccountSL/getGridData";

const clGridStore = useAccountCLGrid({
  columns: accountCLColumns,
  sortColumn: "code",
});

const glGridStore = useAccountGLGrid({
  columns: accountGLColumns,
  sortColumn: "code",
});

const slGridStore = useAccountSLGrid({
  columns: accountSLColumns,
  sortColumn: "code",
});

const nodes = ref([]);
const menu = ref(false);

const clStore = useDataTable(clDataSource, null, clGridStore);
const glStore = useDataTable(glDataSource, null, glGridStore);
const slStore = useDataTable(slDataSource, null, slGridStore);

onMounted(() => {
  loadClData();
});

async function loadClData() {
  clStore.pagination.value.pageSize = -1;
  await clStore.loadData();
  clStore.rows.value.forEach((element) => {
    element.header = "cl";
    element.level = "cl";
    element.filterExpression = [
      {
        fieldName: "clId",
        operator: sqlOperator.equal,
        value: element.id,
      },
    ];
    element.lazy = true;
  });
  nodes.value = clStore.rows.value;
}

async function loadGlData(node) {
  glStore.pagination.value.pageSize = -1;
  glStore.state.value.filterExpression = node.filterExpression;
  await glStore.reloadData();
  glStore.rows.value.forEach((element) => {
    element.header = "gl";
    element.level = "gl";
    element.filterExpression = [
      {
        fieldName: "glId",
        operator: sqlOperator.equal,
        value: element.id,
      },
    ];
    element.lazy = true;
  });
}

async function loadSlData(node) {
  slStore.pagination.value.pageSize = -1;
  slStore.state.value.filterExpression = node.filterExpression;
  await slStore.reloadData();
  slStore.rows.value.forEach((element) => {
    element.header = "sl";
    element.level = "sl";
  });
}

const onLazyLoad = async ({ node, key, done, fail }) => {
  if (node.level === "cl") {
    await loadGlData(node);
    done(glStore.rows.value);
  } else if (node.level === "gl") {
    await loadSlData(node);
    done(slStore.rows.value);
  } else {
    done([]);
  }
};
</script>
