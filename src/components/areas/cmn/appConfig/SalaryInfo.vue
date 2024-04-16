<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
    class="form-container"
  >
    <q-card-section>
      <q-markup-table
        flat
        bordered
        :style="$q.screen.xs ? 'width: 540px' : ''"
        class="salary-table_border-radius-lg"
        separator="cell"
      >
        <thead class="bg-grey-4">
          <tr>
            <th class="text-left" style="width: 40%">
              <span class="text-h5">اقلام حقوق و دستمزد</span>
            </th>
            <th class="text-left" style="width: 30%">
              <span class="text-h5">مشمول مالیات</span>
            </th>
            <th class="text-left" style="width: 30%">
              <span class="text-h5">مشمول بیمه</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">حق مسکن</td>
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
            <td class="text-left">بن</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting.payrollTaxSetting.food
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
            <td class="text-left">حق اولاد</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting.payrollTaxSetting.child
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
            <td class="text-left">ماموریت</td>
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
            <td class="text-left">اضافه کار</td>
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
            <td class="text-left">سایر مزایا</td>
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
            <td class="text-left">باز خرید مرخصی</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting.payrollTaxSetting.leave
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
            <td class="text-left">پاداش بهره‌وری</td>
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
            <td class="text-left">عیدی و پاداش</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting.payrollTaxSetting.bonus
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
            <td class="text-left">بازخرید سنوات</td>
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
            <td class="text-left">ضریب معافیت حق بیمه (از بیمه بیکاری)</td>
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
            <td class="text-left">درصد حق بیمه</td>
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
            <td class="text-left">بیمه سهم کارفرما</td>
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
            <td class="text-left">بیمه سهم کارگر</td>
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
            <td class="text-left">بیمه بیکاری</td>
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
    </q-card-section>
  </q-card>
</template>

<script setup>
import { helper } from "src/helpers";
import { useAppConfigModel } from "../_composables/useAppConfigModel";

import CustomInput from "src/components/shared/forms/CustomInput.vue";

const configStore = useAppConfigModel();
</script>

<style lang="scss">
.settings-card {
  width: 900px;
}
</style>
