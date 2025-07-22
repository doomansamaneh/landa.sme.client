<template>
  <q-card-section>
    <div class="row">
      <div class="col-6" style="padding: 0 5px">
        <h6 class="q-my-md">حقوق و دستمزد</h6>
        <table
          style="
            width: 100%;
            border: 1px solid #2d2d2d;
            border-collapse: collapse;
            font-size: 12px;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 150px;
                  padding: 5px;
                  border-bottom: 1px solid #2d2d2d;
                "
              >
                کارکرد روزانه:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ model?.day }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                دستمزد روزانه:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.salary) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                پایه سنوات:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.baseYear) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                حقوق پایه:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
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
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                حق مسکن:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
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
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                بن خواروبار:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
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
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                حق تاهل:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.spouse) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                حق اولاد:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.child) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                فوق العاده ماموریت:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.mission) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                اضافه کار:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.overtime) }}
              </td>
            </tr>
            <tr v-if="model?.reward">
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                پاداش بهره‌وری:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.reward) }}
              </td>
            </tr>
            <tr v-if="model?.bonus">
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                عیدی و پاداش:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.bonus) }}
              </td>
            </tr>
            <tr v-if="model?.serviceBenefit">
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                بازخرید سنوات:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.serviceBenefit) }}
              </td>
            </tr>
            <tr v-if="model?.leave">
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                بازخرید مرخصی:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.leave) }}
              </td>
            </tr>
            <tr v-if="model?.addition">
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                دیگر مزایا:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.addition) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                جمع حقوق و دستمزد:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
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
        <h6 class="q-my-md">کسورات</h6>
        <table
          style="
            width: 100%;
            border: 1px solid #2d2d2d;
            border-collapse: collapse;
            font-size: 12px;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 150px;
                  padding: 5px;
                  border-bottom: 1px solid #2d2d2d;
                "
              >
                بیمه سهم پرسنل:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.insurranceEmp) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                مالیات حقوق:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                {{ helper.formatNumber(model?.taxAmount) }}
              </td>
            </tr>
            <tr>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
              >
                دیگر کسورات:
              </td>
              <td
                style="padding: 5px; border-bottom: 1px solid #2d2d2d"
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
            border-collapse: collapse;
            font-size: 12px;
          "
        >
          <tbody>
            <tr>
              <td style="width: 150px; padding: 5px">
                خالص دریافتی:
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
