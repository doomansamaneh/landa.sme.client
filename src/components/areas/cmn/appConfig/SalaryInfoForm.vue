<template>
  <div class="row q-col-gutter-md">
    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          :label="$t('shared.labels.workshopCode')"
          v-model="configStore.model.value.companySetting.insuranceNo"
        />
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          :label="$t('shared.labels.socialSecurityBranch')"
          v-model="
            configStore.model.value.companySetting.insuranceBranchName
          "
        />
      </div>
    </div>
  </div>

  <div class="q-mt-lg">
    <div>
      <custom-input
        :label="$t('shared.labels.comment')"
        type="textarea"
        v-model="
          configStore.model.value.companySetting.insuranceComment
        "
      />
    </div>
  </div>

  <q-markup-table class="q-mt-lg" flat bordered separator="cell">
    <thead class="bg-on-dark">
      <tr>
        <th class="text-left" style="width: 40%">
          <span class="text-body1 text-bold">
            {{ $t("shared.labels.salaryAndWageItems") }}
          </span>
        </th>
        <th class="text-left" style="width: 30%">
          <span class="text-body1 text-bold">
            {{ $t("shared.labels.taxable") }}
          </span>
        </th>
        <th class="text-left" style="width: 30%">
          <span class="text-body1 text-bold">
            {{ $t("shared.labels.insurable") }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-left">{{ $t("shared.columns.housing") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .housing
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.housing
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.food") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .food
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.food
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.spouse") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .spouse
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.spouse
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.child") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .child
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.child
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.mission") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .mission
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.mission
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.overtime") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .overtime
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.overtime
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.addition") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .addition
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.addition
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.leaveBuyback") }}
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .leave
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.leave
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.reward") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .reward
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.reward
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">{{ $t("shared.columns.bonus") }}</td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .bonus
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.bonus
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.serviceBenefitBuyback") }}
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .serviceBenefit
            "
          />
        </td>
        <td class="text-left">
          <q-checkbox
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.serviceBenefit
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.insuranceExemptionCoefficient") }}
        </td>
        <td class="text-left">
          <custom-input
            type="number"
            v-model="
              configStore.model.value.companySetting.payrollTaxSetting
                .insurranceEmpRatio
            "
          />
        </td>
        <td class="text-left"></td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.insurancePercentage") }}
        </td>
        <td class="text-left"></td>
        <td class="text-left">
          <custom-input
            type="number"
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.percent
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.employerInsuranceShare") }}
        </td>
        <td class="text-left"></td>
        <td class="text-left">
          <custom-input
            type="number"
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.companyPercent
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.employeeInsuranceShare") }}
        </td>
        <td class="text-left"></td>
        <td class="text-left">
          <custom-input
            type="number"
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.empPercent
            "
          />
        </td>
      </tr>
      <tr>
        <td class="text-left">
          {{ $t("shared.labels.unemploymentInsurance") }}
        </td>
        <td class="text-left"></td>
        <td class="text-left">
          <custom-input
            type="number"
            v-model="
              configStore.model.value.companySetting
                .payrollInsurranceSetting.unemploymentPercent
            "
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const configStore = useAppConfigModel();
</script>
