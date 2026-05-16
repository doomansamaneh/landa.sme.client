<template>
  <div class="q-mt-lg">
    <q-checkbox
      class="text-body2"
      dense
      size="46px"
      :label="$t('shared.labels.showTrackingNumberInVoucher')"
      v-model="
        configStore.model.value.companySetting.showDocNoInVoucher
      "
    />
  </div>

  <q-markup-table class="q-mt-lg" flat bordered separator="cell">
    <thead class="bg-on-dark">
      <tr>
        <th class="text-left" style="width: 40%">
          <span class="text-body1 text-bold">
            {{ $t("shared.labels.relatedDetailAccounts") }}
          </span>
        </th>
        <th class="text-left" style="width: 20%">
          <span class="text-body1 text-bold">
            {{ $t("shared.columns.dl1Title") }}
          </span>
        </th>
        <th class="text-left" style="width: 20%">
          <span class="text-body1 text-bold">
            {{ $t("shared.columns.dl2Title") }}
          </span>
        </th>
        <th class="text-left" style="width: 20%">
          <span class="text-body1 text-bold">
            {{ $t("shared.columns.dl3Title") }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="option in helper.getEnumOptions(
          accountDLType,
          'accountDLType',
        )"
        :key="option.value"
      >
        <td class="text-left">{{ option.label }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.accounting
                .dl1Types
            "
            :val="option.value"
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.accounting
                .dl2Types
            "
            :val="option.value"
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.accounting
                .dl3Types
            "
            :val="option.value"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { accountDLType } from "src/constants";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  const configStore = useAppConfigModel();
</script>
