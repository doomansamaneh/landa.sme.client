<template>
  <q-markup-table bordered flat dense separator="horizontal">
    <thead>
      <tr>
        <th colspan="100%">
          <div class="row q-gutter-sm text-body1 no-letter-spacing text-weight-700">
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
        <th>سرفصل هزینه</th>
        <th style="width: 240px">مبلغ</th>
        <th style="width: 1px"></th>
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
            class="first"
            autofocus
            placeholder="سرفصل هزینه"
            v-model:selectedId="row.slId"
            v-model:selectedText="row.slTitle"
            :filterExpression="slFilter"
          />
        </td>
        <td>
          <custom-input-number
            v-model="row.amount"
            placeholder="مبلغ"
          />
        </td>
        <td class="text-center q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewCost(index, row)"
          />
          <q-btn
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteCost(index)"
          />
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
