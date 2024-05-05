<template>
  <tool-bar margin title="سرفصل حسابها" />

  <q-card class="form-container">
    <q-card-section class="q-pa-lg">
      <q-tree
        :nodes="nodes"
        node-key="label"
        node-icon="search"
        accordion
        selected-color="primary"
        icon="o_arrow_forward_ios"
      >
        <template #header-first="prop">
          <div class="row items-center text-body2 no-letter-spacing q-pa-sm">
            <!-- <q-icon color="blue-10" size="24px" name="o_groups" class="q-mr-sm" /> -->
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.label }}
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
        <template #header-second="prop">
          <div class="row items-center q-gutter-md no-letter-spacing q-pa-sm">
            <!-- <q-icon color="red-8" size="24px" name="o_subject" /> -->
            <q-btn size="8px" round unelevated class="no-pointer-events" color="green">
              <q-icon color="white" name="o_check" size="16px" />
            </q-btn>
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.label }}
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
        <template #header-third="prop">
          <div class="row items-center q-gutter-md no-letter-spacing q-pa-sm">
            <!-- <q-icon size="24px" name="o_menu" /> -->
            <q-btn size="8px" round unelevated class="no-pointer-events" color="green">
              <q-icon color="white" name="o_check" size="16px" />
            </q-btn>
            <div class="text-body2 no-letter-spacing">
              {{ prop.node.label }}
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

    <q-card-section
      v-if="!firstLevelStore.showLoader.value && firstLevelStore.rows.value.length == 0"
    >
      <no-data-found />
    </q-card-section>

    <q-inner-loading color="primary" :showing="firstLevelStore.showLoader.value" />
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

const firstLevelDataSource = "acc/AccountCL/getGridData";
const secondLevelDataSource = "acc/AccountGL/getGridData";
const thirdLevelDataSource = "acc/AccountSL/getGridData";

// const filterExpersions = computed(() => {
//   if (filterExpersions.value) {
//     return filterExpersions;
//   } else {
//     if (secondLevelRow.id) {
//       return [
//         {
//           fieldName: "clId",
//           operator: sqlOperator.equal,
//           value: secondLevelRow.id,
//         },
//       ];
//     }
//   }

//   return "";
// });

const firstLevelGridStore = useAccountCLGrid({
  columns: accountCLColumns,
  sortColumn: "code",
});

const secondLevelGridStore = useAccountGLGrid({
  columns: accountGLColumns,
  sortColumn: "code",
  // filterExpersions: filterExpersions.value,
});

const thirdLevelGridStore = useAccountSLGrid({
  columns: accountSLColumns,
  sortColumn: "code",
  // filterExpersions: filterExpersions.value,
});

const nodes = ref([]);
const menu = ref(false);

const firstLevelStore = useDataTable(firstLevelDataSource, null, firstLevelGridStore);
const secondLevelStore = useDataTable(secondLevelDataSource, null, secondLevelGridStore);
const thirdLevelStore = useDataTable(thirdLevelDataSource, null, thirdLevelGridStore);

onMounted(() => {
  firstLevelStore.loadData();
  secondLevelStore.loadData();
  thirdLevelStore.loadData();
});

watchEffect(() => {
  nodes.value = firstLevelStore.rows.value.map((firstLevelRow) => ({
    label: firstLevelRow.title,
    header: "first",
    children: secondLevelStore.rows.value.map((secondLevelRow) => ({
      label: secondLevelRow.title,
      header: "second",
      children: thirdLevelStore.rows.value.map((thirdLevelRow) => ({
        label: thirdLevelRow.title,
        header: "third",
      })),
    })),
  }));
});
</script>
