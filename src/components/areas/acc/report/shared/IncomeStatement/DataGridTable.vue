<template>
  <q-card class="shadow bordered" style="min-height: 400px" flat>
    <card-title :title="title" icon="o_reorder" />

    <q-inner-loading
      :showing="dataStore.showLoader.value"
      class="transparent"
    >
      <q-spinner size="52px" color="primary" />
    </q-inner-loading>

    <q-card-section
      v-if="!dataStore.showLoader.value"
      :class="$q.screen.gt.xs ? 'q-pa-md' : 'q-pa-md'"
    >
      <q-list class="statement-bar">
        <div
          v-for="item in dataStore.accountClCodes.value"
          :key="item.clTypeId"
        >
          <q-item-label
            header
            class="bg-on-dark border-radius-sm"
            style="padding: 12px"
          >
            <span class="text-body1 text-on-dark text-weight-600">
              {{ item.clCode }} - {{ item.clTitle }}
            </span>
          </q-item-label>

          <template
            v-for="glItem in dataStore.getFilteredItems(item.clCode)"
            :key="glItem.glCode"
          >
            <q-expansion-item
              class="income-statement-expansion-item"
              header-class="border-radius-sm q-my-sm"
              switch-toggle-side
              :group="glItem.glCode"
              @show="expandGL(glItem)"
            >
              <template #header>
                <q-item-section class="q-pr-sm" avatar>
                  <div
                    class="bordered border-radius-sm text-body2 q-py-xs q-px-sm"
                  >
                    {{ glItem.glCode }}
                  </div>
                </q-item-section>

                <q-item-section>
                  {{ glItem.glTitle }}
                </q-item-section>

                <q-item-section
                  v-if="item.clTypeId === accountCLTypeIds.revenue"
                  side
                >
                  <span v-if="glItem.credit">
                    {{ helper.formatNumber(glItem.credit) }}
                  </span>
                  <span v-if="glItem.debit" class="text-red">
                    ({{ helper.formatNumber(glItem.debit) }})
                  </span>
                </q-item-section>
                <q-item-section
                  v-else-if="
                    item.clTypeId === accountCLTypeIds.expense
                  "
                  side
                >
                  <span v-if="glItem.debit">
                    {{ helper.formatNumber(glItem.debit) }}
                  </span>
                  <span v-if="glItem.credit" class="text-red">
                    ({{ helper.formatNumber(glItem.credit) }})
                  </span>
                </q-item-section>
              </template>

              <div class="border-right q-ml-lg">
                <q-item
                  v-for="slItem in glItem.items"
                  :key="slItem.slId"
                  class="q-my-sm q-ml-xs border-radius-sm"
                  clickable
                  :group="`${glItem.glCode}-child`"
                >
                  <q-item-section class="q-pr-sm" avatar>
                    <div
                      class="bordered border-radius-sm text-body2 q-py-xs q-px-sm"
                    >
                      {{ slItem.slCode }}
                    </div>
                  </q-item-section>

                  <q-item-section>
                    {{ slItem.slTitle }}
                  </q-item-section>

                  <q-item-section
                    v-if="item.clTypeId === accountCLTypeIds.revenue"
                    side
                  >
                    <span v-if="slItem.credit">
                      {{ helper.formatNumber(slItem.credit) }}
                    </span>
                    <span v-if="slItem.debit" class="text-red">
                      ({{ helper.formatNumber(slItem.debit) }})
                    </span>
                  </q-item-section>
                  <q-item-section
                    v-else-if="
                      item.clTypeId === accountCLTypeIds.expense
                    "
                    side
                  >
                    <span v-if="slItem.debit">
                      {{ helper.formatNumber(slItem.debit) }}
                    </span>
                    <span v-if="slItem.credit" class="text-red">
                      ({{ helper.formatNumber(slItem.credit) }})
                    </span>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </template>

          <q-separator spaced v-if="false" />
        </div>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="!dataStore.showLoader.value">
      <q-item :class="$q.screen.gt.xs ? '' : 'no-padding'">
        <q-item-section avatar top>
          <q-avatar
            icon="attach_money"
            text-color="white"
            class="green-gradient"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-h6 text-weight-600">
            {{ $t("shared.labels.netIncome") }}
          </q-item-label>
          <q-item-label lines="1">
            {{ $t("shared.labels.profitBeforeTax") }}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(dataStore.totalIcome.value) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import CardTitle from "src/components/shared/CardTitle.vue";

  import { helper } from "src/helpers";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";

  const props = defineProps({
    title: String,
  });
  const dataStore = useIncomeStatement();

  const expandGL = async (item) => {
    await dataStore.loadSLData(item);
  };
</script>
