<template>
  <div class="row q-col-gutter-md" v-if="false">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card flat bordered class="info-box_">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            >
              <span class="text-bold text-caption">18</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">
              فاکتورها
            </span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            240,000,000
            <span class="text-body1 text-bold text-on-dark-1">
              ریال
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card flat bordered class="info-box_">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            >
              <span class="text-bold text-caption">0</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">
              مانده حساب
            </span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            0
            <span class="text-body1 text-bold text-on-dark-1">
              ریال
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card flat bordered class="info-box_">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            >
              <span class="text-bold text-caption">4</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">
              بدهکار
            </span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            2,000,000
            <span
              class="text-body1 text-bold text-on-dark-1 q-gutter-xs"
            >
              ریال
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-card flat bordered class="info-box_">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            >
              <span class="text-bold text-caption">4</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">
              بدهکار
            </span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            2,000,000
            <span
              class="text-body1 text-bold text-on-dark-1 q-gutter-xs"
            >
              ریال
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <account-item
    class="border-radius-lg"
    flat
    bordered
    toolbar_
    multi-select
    data-source="acc/report/getItemAllData"
    :columns="accountItemColumns"
    :filter-expression="filterExpression"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    item: Object,
  });

  const accountItemColumns = accountItemDLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: props.item.dlId,
    },
  ]);
</script>
