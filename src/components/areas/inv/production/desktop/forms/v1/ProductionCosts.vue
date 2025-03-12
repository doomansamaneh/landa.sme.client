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
                round
                unelevated
                dense
                size="5px"
                class="red-gradient"
              />
            </div>
            <div>سربار و هزینه تولید</div>
          </div>
        </th>
      </tr>
      <tr>
        <th style="width: 1px">#</th>
        <th style="width: 65%">سرفصل هزینه</th>
        <th style="width: 25%">مبلغ</th>
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
            placeholder="سرفصل هزینه"
            required
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.amount"
            placeholder="مبلغ"
            required
          />
        </td>
        <td class="text-center">
          <q-btn
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
            class="q-my-xl primary-shadow"
            rounded
            unelevated
            color="primary"
            @click="formStore.pushNewCost()"
          >
            <q-icon name="o_add" size="20px" class="q-mr-xs" />
            افزودن ردیف
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <q-btn
    v-if="model?.costs?.length > 0"
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white q-my-md"
    @click="formStore.addNewCost(index)"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="">افزودن ردیف</div>
  </q-btn>
</template>

<script setup>
  import { computed } from "vue";
  import { sqlOperator, closeAccounts } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

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
