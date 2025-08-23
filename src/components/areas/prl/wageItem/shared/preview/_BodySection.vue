<template>
  <q-card-section>
    <div class="row">
      <div class="col-6" style="padding: 0 5px">
        <h6 class="q-my-md">
          {{ $t("shared.labels.payrollSlip") }}
        </h6>
        <table
          style="
            width: 100%;
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            border-collapse: collapse;
            font-size: 12.4px;
          "
          class="print-preview-table"
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 150px;
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.dailyWork") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ model?.day }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.dailyWage") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.salary) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.seniorityBase") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.baseYear) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.baseSalary") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{
                  helper.formatNumber(
                    model?.calculatedModel?.monthSalary
                  )
                }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.housingAllowance") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{
                  helper.formatNumber(
                    model?.calculatedModel?.monthHousing
                  )
                }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.foodAllowance") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{
                  helper.formatNumber(
                    model?.calculatedModel?.monthFood
                  )
                }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.marriageAllowance") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.spouse) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.childAllowance") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.child) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.missionPremium") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.mission) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.overtime") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.overtime) }}
              </td>
            </tr>
            <tr v-if="model?.reward">
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.productivityBonus") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.reward) }}
              </td>
            </tr>
            <tr v-if="model?.bonus">
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.newYearAndBonus") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.bonus) }}
              </td>
            </tr>
            <tr v-if="model?.serviceBenefit">
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.seniorityBuyback") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.serviceBenefit) }}
              </td>
            </tr>
            <tr v-if="model?.leave">
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.leaveBuyback") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.leave) }}
              </td>
            </tr>
            <tr v-if="model?.addition">
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.otherBenefits") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.addition) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.totalSalaryAndWages") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                <span class="text-weight-800">
                  {{ helper.formatNumber(model?.amount) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6" style="padding: 0 5px">
        <h6 class="q-my-md">{{ $t("shared.labels.deductions") }}</h6>
        <table
          style="
            width: 100%;
            border-width: 1px;
            border-style: solid;
            border-image: initial;
            border-collapse: collapse;
            font-size: 12.4px;
          "
          class="print-preview-table"
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 150px;
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.employeeInsuranceShare") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.insurranceEmp) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.salaryTax") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.taxAmount) }}
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ $t("shared.labels.otherDeductions") }}:
              </td>
              <td
                style="
                  padding: 5px;
                  border-width: 1px;
                  border-style: solid;
                  border-image: initial;
                "
              >
                {{ helper.formatNumber(model?.deduction) }}
              </td>
            </tr>
          </tbody>
        </table>
        <table
          class="q-my-md bg-green text-white text-weight-600"
          style="
            width: 100%;
            border-image: initial;
            border-collapse: collapse;
            font-size: 12.4px;
          "
        >
          <tbody>
            <tr>
              <td style="width: 150px; padding: 5px">
                {{ $t("shared.labels.netPayable") }}:
              </td>
              <td style="padding: 5px">
                {{ helper.formatNumber(model?.payable) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-card-section>
</template>
<script setup>
  import { helper } from "src/helpers";
  const props = defineProps({
    model: Object,
  });
</script>
