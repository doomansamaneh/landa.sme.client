<template>
  <q-card flat :class="$q.screen.gt.xs ? 'shadow bordered' : ''">
    <card-title :title="title" icon="o_reorder" />

    <q-card-section
      :class="$q.screen.gt.xs ? 'q-pa-md' : 'no-padding'"
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

          <q-card-section
            :class="
              $q.screen.gt.xs
                ? 'q-py-md q-pr-none q-pl-md'
                : 'no-padding'
            "
          >
            <q-list class="sub-item-container q-pl-xs">
              <div
                v-for="item in dataStore.accountClCodes.value"
                :key="item.clTypeId"
              >
                <template
                  v-for="glItem in dataStore.getFilteredItems(
                    item.clCode
                  )"
                  :key="glItem.glCode"
                >
                  <q-expansion-item
                    header-class="border-radius-sm"
                    group="statement"
                  >
                    <template #header>
                      <q-item-section avatar style="padding-left: 0">
                        <q-icon
                          class="q-mr-sm"
                          size="20px"
                          name="o_folder"
                        />
                      </q-item-section>

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
                        v-if="
                          item.clTypeId === accountCLTypeIds.revenue
                        "
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
                        v-else-if="
                          item.clTypeId === accountCLTypeIds.expense
                        "
                      >
                        <span v-if="glItem.debit">
                          {{ helper.formatNumber(glItem.debit) }}
                        </span>
                        <span v-if="glItem.credit" class="text-red">
                          ({{ helper.formatNumber(glItem.credit) }})
                        </span>
                      </q-item-section>
                    </template>

                    <q-item>
                      Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Unde accusamus autem rem quae
                      similique, expedita beatae cum excepturi id
                      doloremque dolorum aperiam pariatur dolor culpa
                      officiis officia laborum tempora ipsa.
                    </q-item>
                  </q-expansion-item>
                </template>
              </div>
            </q-list>
          </q-card-section>

          <q-separator spaced v-if="false" />
        </div>
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
  import CardTitle from "src/components/shared/CardTitle.vue";

  import { helper } from "src/helpers";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";

  const props = defineProps({
    title: String,
  });
  const dataStore = useIncomeStatement();
</script>
