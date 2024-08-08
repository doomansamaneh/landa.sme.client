<template>
  <q-card flat class="fit bordered">
    <q-card-section class="q-pa-lg">
      <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar
            rounded
            text-color="white"
            icon="o_balance"
            size="md"
            class="primary-gradient primary-shadow"
          />
        </q-item-section>
        <q-item-section class="q-pl-xs">
          <q-item-label class="text-h6 text-weight-700 q-mb-xs">
            صورت سود و زیان
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-card-section class="q-pt-none_ q-pb-md_ q-px-none">
      <q-scroll-area
        style="height: 650px"
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
      >
        <q-list bordered_ _padding class="rounded-borders">
          <template
            v-for="item in dataStore.accountClCodes.value"
            :key="item.clTypeId"
          >
            <q-item-label header class="q-py-xs">
              <span class="text-h6 text-weight-600">
                {{ item.clCode }} - {{ item.clTitle }}
              </span>
            </q-item-label>

            <q-item
              class="q-px-md"
              clickable
              v-ripple
              v-for="glItem in dataStore.getFilteredItems(
                item.clCode
              )"
              :key="glItem.glCode"
            >
              <q-item-section avatar top>
                <q-avatar color="accent" text-color="white">
                  {{ glItem.glCode }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ glItem.glTitle }}
                </q-item-label>
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
      </q-scroll-area>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <q-item>
        <q-item-section avatar top>
          <q-avatar
            icon="attach_money"
            color="primary"
            text-color="white"
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

    <div class="q-px-lg" v-if="false">
      <q-tree
        :nodes="nodes"
        node-key="label"
        node-icon="search"
        accordion
        selected-color="primary"
        no-connectors
        icon="o_arrow_forward_ios"
      >
        <template #default-header="prop">
          <div class="q-pa-sm">{{ prop.node.label }}</div>
        </template>
        <template #header-root="prop">
          <div class="q-pa-sm">
            {{ prop.node.label }}
          </div>
          <q-space />
          <span>5,922,779</span>
        </template>
        <!-- <template #default-body="prop">

          {{ prop.node.label }}

        </template> -->
      </q-tree>
    </div>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useIncomeStatement } from "../../acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";

  const dataStore = useIncomeStatement();
  const nodes = [
    {
      label: "6- فروش و درآمد",
      // header: 'root',
      children: [
        {
          label: "601- فروش",
          header: "root",
          children: [
            {
              label: "60101- فروش کالا",
              children: [
                { label: "گردش بدهکار: 0" },
                { label: "گردش بستانکار: 21,360,000" },
              ],
            },
            {
              label: "60103- برگشت از فروش و تخفیفها",
              children: [
                { label: "گردش بدهکار: 5,734,000" },
                { label: "گردش بستانکار: 0" },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "7- بهای تمام شده کالای فروش رفته و خدمات ارائه شده",
      // header: 'root',
      children: [
        {
          label: "701- بهای تمام شده کالای فروش رفته",
          header: "root",
          children: [
            {
              label: "70103- بهای تمام شده کالای فروش رفته",
              children: [
                { label: "گردش بدهکار: 46,400,000" },
                { label: "گردش بستانکار: 0" },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "8- هزینه‌ها",
      // header: 'root',
      children: [
        {
          label: "805- هزینه‌های توزیع و فروش",
          header: "root",
          children: [
            {
              label: "80502- هزینه های بازاریابی و پورسانت",
              children: [
                { label: "گردش بدهکار: 757,500" },
                { label: "گردش بستانکار: 0" },
              ],
            },
            {
              label: "80599- هزینه متفرقه توزیع و فروش",
              children: [
                { label: "گردش بدهکار: 5,734,000" },
                { label: "گردش بستانکار: 21,350,000" },
              ],
            },
          ],
        },
        {
          label: "807- هزینه‌های مالی",
          header: "root",
          children: [
            {
              label: "80703- هزینه کارمزد وامها و خدمات بانکی",
              children: [
                { label: "گردش بدهکار: 11,000" },
                { label: "گردش بستانکار: 0" },
              ],
            },
          ],
        },
        {
          label: "809- سایر هزینه‌های عملیاتی",
          header: "root",
          children: [
            {
              label: "80920- هزینه کسری کالا",
              children: [
                { label: "گردش بدهکار: 5,000,000,000" },
                { label: "گردش بستانکار: 0" },
              ],
            },
          ],
        },
      ],
    },
  ];
</script>
