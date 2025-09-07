<template>
  <q-markup-table
    class="q-markup-table--impacted"
    bordered
    flat
    dense
    separator="horizontal"
  >
    <thead>
      <tr>
        <th colspan="100%">
          <div class="row q-gutter-sm text-body1 text-weight-700">
            <div>
              <q-btn
                no-caps
                round
                unelevated
                dense
                size="5px"
                class="red-gradient"
              />
            </div>
            <div>{{ $t("shared.labels.productionCosts") }}</div>
          </div>
        </th>
      </tr>
      <tr>
        <th style="width: 1px">#</th>
        <th style="width: 65%">{{ $t("shared.columns.slTitle") }}</th>
        <th style="width: 25%">{{ $t("shared.columns.amount") }}</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.costs"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>
          <sl-lookup
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
            :filterExpression="slFilter"
            :placeholder="$t('shared.columns.slTitle')"
            required
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.amount"
            :placeholder="$t('shared.columns.amount')"
            required
          />
        </td>
        <td class="text-center">
          <q-btn
            no-caps
            unelevated
            round
            dense
            class="text-on-dark"
            size="14px"
            @click="formStore.deleteCost(index)"
          >
            <q-icon size="24px" name="o_delete" />
          </q-btn>
        </td>
      </tr>
    </tbody>
    <tbody v-if="model?.costs?.length === 0">
      <tr>
        <td colspan="100%" class="text-center">
          <q-btn
            no-caps
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewCost()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            {{ $t("shared.labels.addRow") }}
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    no-caps
    v-if="model?.costs?.length > 0"
    padding="8px 16px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-my-md"
    @click="formStore.addNewCost(index)"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="">{{ $t("shared.labels.addRow") }}</div>
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { sqlOperator, closeAccounts } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model.value);

  const slFilter = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: closeAccounts.expense,
    },
  ];
</script>
