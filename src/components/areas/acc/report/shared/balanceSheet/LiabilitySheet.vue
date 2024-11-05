<template>
  <q-card flat class="shadow bordered">
    <q-card-section class="q-px-lg">
      <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar
            rounded
            text-color="white"
            icon="o_attach_money"
            size="md"
            class="orange-gradient red-shadow"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            بدهی
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-md_ q-pr-none">
      <q-list class="q-pr-md q-pl-sm rounded-borders">
        <template
          v-for="item in dataStore.accountClCodes"
          :key="item.clTypeId"
        >
          <q-item-label
            header
            class="bg-on-dark border-radius-sm"
            style="padding: 12px"
          >
            <span class="text-body1 text-on-dark text-weight-600">
              {{ item.clTitle }}
            </span>
          </q-item-label>

          <q-item
            class="border-radius-sm q-px-sm q-py-xs q-my-sm"
            clickable
            v-ripple
            v-for="glItem in item.glItems"
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

            <q-item-section side>
              <span>
                {{ helper.formatNumber(glItem.debit) }}
              </span>
            </q-item-section>
          </q-item>

          <q-separator spaced v-if="false" />
        </template>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-h6 text-weight-600">
            جمع بدهی
          </q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(sum) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers/helper";

  import Assets from "src/components/areas/acc/report/shared/balanceSheet/AssetSheet.vue";

  const sum = ref(165937179);

  const dataStore = {
    accountClCodes: [
      {
        clTypeId: 2,
        clTitle: "بدهی های جاری",
        glItems: [
          {
            glCode: "301",
            glTitle: "حسابها و اسناد پرداختنی تجاری",
            debit: 287251000,
          },
          {
            glCode: "302",
            glTitle: "سابها و اسناد پرداختنی غیر تجاری",
            debit: 	131034810,
          },
          {
            glCode: "305",
            glTitle: "مالیاتها و عوارض پرداختنی",
            debit: 	972098,
          },
        ],
      },
    ],
  };
</script>
