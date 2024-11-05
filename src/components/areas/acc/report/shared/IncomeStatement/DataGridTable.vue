<template>
  <q-card flat :class="$q.screen.gt.xs ? 'shadow bordered' : ''">
    <q-card-section
      :class="$q.screen.gt.xs ? 'q-py-none q-pa-lg' : 'no-padding'"
    >
      <q-list class="rounded-borders">
        <template
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

          <q-item
            class="border-radius-sm q-px-sm q-py-xs q-my-sm"
            clickable
            v-ripple
            v-for="glItem in dataStore.getFilteredItems(item.clCode)"
            :key="glItem.glCode"
          >
            <q-item-section class="q-pr-sm" avatar>
              <div
                class="bordered border-radius-sm text-body2 no-letter-spacing q-py-xs q-px-sm"
              >
                {{ glItem.glCode }}
              </div>
            </q-item-section>

            <q-item-section>
              {{ glItem.glTitle }}
            </q-item-section>

            <q-item-section
              side
              v-if="item.clTypeId === accountCLTypeIds.revenue"
            >
              <span v-if="glItem.credit">
                {{ helper.formatNumber(glItem.credit) }}
              </span>
              <span v-if="glItem.debit" class="text-red">
                ({{ helper.formatNumber(glItem.debit) }})
              </span>
            </q-item-section>
            <q-item-section
              side
              v-else-if="item.clTypeId === accountCLTypeIds.expense"
            >
              <span v-if="glItem.debit">
                {{ helper.formatNumber(glItem.debit) }}
              </span>
              <span v-if="glItem.credit" class="text-red">
                ({{ helper.formatNumber(glItem.credit) }})
              </span>
            </q-item-section>
          </q-item>

          <q-separator spaced v-if="false" />
        </template>
      </q-list>
    </q-card-section>

    <q-separator />
    <q-card-section :class="$q.screen.gt.xs ? '' : 'q-px-none'">
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
            درآمد خالص
          </q-item-label>
          <q-item-label lines="1">سود پیش از کسر مالیات</q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(dataStore.totalIcome.value) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";

  const dataStore = useIncomeStatement();
</script>
