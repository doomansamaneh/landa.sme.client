<template>
  <q-card-section>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <h5 class="q-my-md">حقوق و دستمزد</h5>
        <table
          style="
            width: 100%;
            border: 1px solid #2d2d2d;
            border-collapse: collapse;
            font-size: 12px;
          "
        >
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
              {{ model?.salary.toLocaleString() }}
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
                model?.calculatedModel?.monthSalary.toLocaleString()
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
                model?.calculatedModel?.monthHousing.toLocaleString()
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
              {{ model?.calculatedModel?.monthFodd.toLocaleString() }}
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
              {{ model?.child.toLocaleString() }}
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
              {{ model?.mission.toLocaleString() }}
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
              {{ model?.overtime.toLocaleString() }}
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
              {{ model?.reward.toLocaleString() }}
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
              {{ model?.bonus.toLocaleString() }}
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
              {{ model?.serviceBenefit.toLocaleString() }}
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
              {{ model?.leave.toLocaleString() }}
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
              {{ model?.addition.toLocaleString() }}
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
                {{ model?.amount.toLocaleString() }}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <h5 class="q-my-md">کسورات</h5>
        <table
          style="
            width: 100%;
            border: 1px solid #2d2d2d;
            border-collapse: collapse;
            font-size: 12px;
          "
        >
          <tr>
            <td
              style="
                width: 150px;
                padding: 5px;
                border-bottom: 1px solid #2d2d2d;
              "
            >
              بیم سهم پرسنل:
            </td>
            <td
              style="padding: 5px; border-bottom: 1px solid #2d2d2d"
            >
              {{ model?.insurranceEmp.toLocaleString() }}
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
              {{ model?.taxAmount.toLocaleString() }}
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
              {{ model?.deduction.toLocaleString() }}
            </td>
          </tr>
        </table>

        <table
          class="q-my-md bg-green text-white text-weight-600"
          style="
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          "
        >
          <tr>
            <td style="width: 150px; padding: 5px">خالص دریافتی:</td>
            <td style="padding: 5px">
              {{ model?.payable.toLocaleString() }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
