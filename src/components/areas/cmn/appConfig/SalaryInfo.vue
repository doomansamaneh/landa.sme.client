<template>
  <div :class="styles()" style="margin-top: 0">
    <q-card-section :class="padding()">
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <custom-input
              label="کد کارگاه"
              v-model="
                configStore.model.value.companySetting.insuranceNo
              "
            />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <custom-input
              label="شعبه تامین اجتماعی"
              v-model="
                configStore.model.value.companySetting
                  .insuranceBranchName
              "
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div>
          <custom-input
            label="شرح"
            type="textarea"
            v-model="
              configStore.model.value.companySetting.insuranceComment
            "
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section :class="padding()">
      <q-markup-table flat bordered separator="cell">
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.housing
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.food
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
            <td class="text-left">حق تاهل</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting
                    .payrollTaxSetting.spouse
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
            <td class="text-left">حق اولاد</td>
            <td class="text-left">
              <q-checkbox
                v-model="
                  configStore.model.value.companySetting
                    .payrollTaxSetting.child
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.mission
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.overtime
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.addition
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.leave
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.reward
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.bonus
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
                  configStore.model.value.companySetting
                    .payrollTaxSetting.serviceBenefit
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
              ضریب معافیت حق بیمه (از بیمه بیکاری)
            </td>
            <td class="text-left">
              <custom-input
                type="number"
                v-model="
                  configStore.model.value.companySetting
                    .payrollTaxSetting.insurranceEmpRatio
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

    <q-card-actions class="q-pb-lg q-px-lg q-mx-sm" align="right">
      <save-button />
    </q-card-actions>
  </div>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import SaveButton from "./_SaveSettingButton.vue";

  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();
  const configStore = useAppConfigModel();

  const styles = () => {
    if (!props.inside && $q.screen.gt.sm) {
      return "q-card form-container settings-card";
    } else if (!props.inside) {
      return "q-card form-container";
    } else {
      return "";
    }
  };

  const padding = () => {
    if (props.inside) {
      return "no-padding";
    }
  };
</script>

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
