<template>
  <q-card class="no-border no-shadow">
    <q-card-section class="no-padding">

      <q-markup-table :style="$q.screen.xs ? 'width: 600px' : ''" class="salary-table q-pa-lg border-radius-lg" :separator="separator" flat bordered>
        <thead>
          <tr>
            <th class="text-left">اقلام حقوق و دستمزد</th>
            <th class="text-left">مشمول مالیات</th>
            <th class="text-left">مشمول بیمه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">حق مسکن</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">بن</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">حق اولاد</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">ماموریت</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">اضافه کار</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">سایر مزایا</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">باز خرید مرخصی</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">پاداش بهره‌وری</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">عیدی و پاداش</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">بازخرید سنوات</td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
            <td class="text-left">
              <q-checkbox dense />
            </td>
          </tr>
          <tr>
            <td class="text-left">ضریب معافیت حق بیمه</td>
            <td class="text-left">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-12">
                  <custom-input input-class="text-body2 no-letter-spacing" suffix="از سهم هر کارگر" />
                </div>
              </div>
            </td>
            <td class="text-left"></td>

          </tr>
          <tr>
            <td class="text-left">درصد حق بیمه</td>
            <td class="text-left">
            </td>
            <td class="text-left">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-12">
                  <custom-input input-class="text-body2 no-letter-spacing" suffix="درصد" />
                </div>
              </div>
            </td>

          </tr>
          <tr>
            <td class="text-left">بیمه سهم کارفرما</td>
            <td class="text-left">
            </td>
            <td class="text-left">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-12">
                  <custom-input input-class="text-body2 no-letter-spacing" suffix="درصد" />
                </div>
              </div>
            </td>

          </tr>
          <tr>
            <td class="text-left">بیمه سهم کارگر</td>
            <td class="text-left">
            </td>
            <td class="text-left">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-12">
                  <custom-input input-class="text-body2 no-letter-spacing" suffix="درصد" />
                </div>
              </div>
            </td>

          </tr>
          <tr>
            <td class="text-left">بیمه بیکاری</td>
            <td class="text-left">
            </td>
            <td class="text-left">
              <div class="row">
                <div class="col-md-4 col-sm-4 col-xs-12">
                  <custom-input input-class="text-body2 no-letter-spacing" suffix="درصد" />
                </div>
              </div>
            </td>

          </tr>
        </tbody>
      </q-markup-table>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { helper } from "src/helpers";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

const separator = ref("cell")
</script>

<style lang="scss">
.salary-table {

  th {
    padding: 7px 16px !important;
    font-weight: 600;
    font-size: 14px;
  }

  td {
    font-size: 14px !important;
  }
}
</style>