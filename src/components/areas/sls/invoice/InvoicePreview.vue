<template>
  <tool-bar>
    <template #header>
      <span class="text-h6 q-mr-sm">فاکتور #1 برای خشایار شمالی</span>
      <q-btn
        flat
        icon="arrow_back"
      ></q-btn>
    </template>
    <template #buttons>
      <q-btn
        to="/sls/invoice/create"
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon
          name="o_add"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.create") }}
      </q-btn>

      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
      >
        <q-icon
          name="more_horiz"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.more") }}

        <q-menu
          fit
          :offset="[0, 20]"
        >
          <q-list
            dense
            padding
            style="width:200px"
          >
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_refresh"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_close"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">غیر‌فعال‌سازی</div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_check"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">فعال سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_download"
                      size="16px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>
  <div
    class="row q-gutter-x-xl"
    style="margin-top:40px"
  >
    <div class="col">
      <q-card class="bordered no-shadow">
        <q-card-section class="flex items-center justify-between q-pa-lg">
          <img
            style="width: 72px;"
            src="/landa-sme-logo.png"
            alt=""
          />
          <span class="text-subtitle1 text-bold">
            {{ $t("page.payment-detail.invoice-label") }}
          </span>
          <div class="column q-gutter-sm text-right text-caption">
            <div>
              <span>
                <span class="">{{ $t("page.payment-detail.invoice-date") }}</span>
                1401/02/09</span>
            </div>
            <div class="">
              <span>
                <span class="">
                  {{ $t("page.payment-detail.invoice-number") }}
                </span>
                20108</span>
            </div>
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-pb-none">
          <q-item class="flex justify-between text-caption">
            <q-item-label class=""><span class="text-weight-bold">
                {{ $t("page.payment-detail.seller") }}
                <span class="text-weight-thin">حسابداری آنلاین لاندا</span></span>
              <div class="seller-address">
                <q-item-label class="q-mt-sm">
                  <span>شهر جدید اندیشه، شهرک صدف، بلوار دکتر قریب، مجتمع اداری
                    زیتون، واحد 105</span>
                </q-item-label>
                <q-item-label class="q-pt-xs">
                  <q-icon
                    name="phone"
                    class="dark-2 q-pr-xs"
                  />88944338</q-item-label>
              </div>
            </q-item-label>
            <q-item-label class=""><span class="text-weight-bold">
                {{ $t("page.payment-detail.customer") }}
                <span class="text-weight-light">خشایار شمالی</span></span>
              <div class="seller-address">
                <q-item-label class="q-mt-sm">
                  <span>شهرری، خیابان شهید رجایی، شهرک سیزده آبان، خیابان رحیمی،
                    خیابان عنایتی، کوچه محمدی، پلاک 22</span>
                </q-item-label>
                <q-item-label class="q-pt-xs">
                  <q-icon
                    name="phone"
                    class="dark-2 q-pr-xs"
                  />
                  021-55511102
                </q-item-label>
              </div>
            </q-item-label>
          </q-item>
        </q-card-section>
        <q-card-section class="q-pt-none">

          <table class="invoice-preview-table text-caption q-mt-md">
            <thead class="text-left">
              <tr>
                <th style="width:1px">
                  <span class="">{{ $t("page.payment-detail.row") }}</span>
                </th>
                <th>
                  <span class="">کالا/خدمت</span>
                </th>
                <th>
                  <span class="">{{ $t("page.payment-detail.amount") }}</span>
                </th>
                <th>
                  <span class="">{{ $t("page.payment-detail.unit") }}</span>
                </th>
                <th>
                  <span class="">{{ $t("page.payment-detail.unit-price") }}</span>
                </th>
                <th>
                  <span class="">{{ $t("page.payment-detail.total") }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class=""><span class="">1</span></td>
                <td>
                  <span class="">
                    طرح 1: (حسابداری، خرید و فروش، دریافت و پرداخت)
                  </span>
                </td>
                <td><span class="">1000</span></td>
                <td><span class="">دستگاه</span></td>
                <td><span class="">490,000</span></td>
                <td><span class="">500,000</span></td>
              </tr>
              <tr>
                <td class="q-py-sm"><span class="">2</span></td>
                <td>
                  <div class="ellipsis-2-lines">
                    <div class="custom-ellipsis">
                      <span>
                        طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
                        دستمزد)
                      </span>
                    </div>
                  </div>
                </td>
                <td><span class="">1.5</span></td>
                <td><span class="">ماه</span></td>
                <td><span class="">500,000</span></td>
                <td><span class="">750,000</span></td>
              </tr>
              <tr>
                <td
                  class="text-right"
                  colspan="5"
                >
                  <span class="text-bold">{{ $t("page.payment-detail.sub-total") }}</span>
                </td>
                <td class="">
                  <span class="">10,750,000</span>
                </td>
              </tr>
              <tr>
                <td
                  class="text-right"
                  colspan="5"
                >
                  <span class="text-bold">تخفیف:</span>
                </td>
                <td><span class="">967,500</span></td>
              </tr>
              <tr>
                <td
                  class="text-right"
                  colspan="5"
                >
                  <span class="q-pl-xs text-bold">
                    جمع کل:
                  </span>
                  <span class="">
                    <span class="">
                      (یازده میلیون و هفتصد و هفده هزار و پانصد <span class="text-bold">{{ $t("shared.labels.rial")
                      }}</span>)
                    </span>
                  </span>
                </td>
                <td><span class="">11,717,500</span></td>
              </tr>
            </tbody>
          </table>
          <table class="text-caption">
            <tr>
              <td colspan="6">
                <span class="text-bold">توضیحات:</span>
              </td>
            </tr>
            <tr>
              <td class="sign-place">
                <span> مهر و امضای فروشنده</span>
              </td>
              <td class="sign-place">
                <span>مهر و امضای خریدار</span>
              </td>
            </tr>
          </table>

        </q-card-section>
      </q-card>
    </div>
    <div class="col-3">
      <q-card class="bordered no-shadow">

        <q-card-section>
          <div class="column q-gutter-y-sm">

            <div class="column q-gutter-y-xs">
              <span class="text-caption text-bold">خریدار</span>
              <a
                href="#"
                class="text-body3"
              >خشایار شمالی</a>
            </div>

            <div class="column q-gutter-y-xs">
              <span class="text-caption text-bold">قرارداد</span>
              <span class="text-body3">1818 - موز</span>
            </div>

            <div class="column q-gutter-y-xs">
              <span class="text-caption text-bold">بازاریاب</span>
              <span class="text-body3">مهندس ملکی</span>
            </div>

          </div>
        </q-card-section>


        <q-card-section>
          <q-tabs
            v-model="tab"
            inline-label
            outside-arrows
            dense
            indicator-color="primary"
            class="text-on-dark"
          >
            <q-tab
              name="main-info"
              class="q-py-sm"
            >

              <template #default>
                <q-icon
                  name="o_description"
                  size="xs"
                  class="q-mr-sm"
                />
                <div class="text-body3 text-bold">
                  اطلاعات اصلی
                </div>
              </template>
            </q-tab>
            <q-tab
              name="test-1"
              class="q-py-sm"
            >
              <template #default>
                <q-icon
                  name="o_paid"
                  size="xs"
                  class="q-mr-sm"
                />
                <div class="text-body3 text-bold">
                  مالیات
                </div>
              </template>
            </q-tab>
            <q-tab
              name="test-2"
              class="q-py-sm"
            >
              <template #default>
                <q-icon
                  name="o_question_mark"
                  size="xs"
                  class="q-mr-sm"
                />
                <div class="text-body3 text-bold">
                  تست 2
                </div>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels
            v-model="tab"
            animated
            keep-alive
            class="transparent"
          >
            <q-tab-panel
              name="main-info"
              class="no-padding"
            >

              <div class="row q-py-lg q-gutter-sm">
                <q-btn
                  color="primary"
                  padding="4px 12px"
                  unelevated
                >
                  <q-icon
                    name="o_add"
                    size="xs"
                    class="q-mr-xs"
                  />
                  <span>دریافت</span>
                </q-btn>

                <q-btn
                  color="primary"
                  padding="4px 12px"
                  unelevated
                >
                  <q-icon
                    name="o_check"
                    size="xs"
                    class="q-mr-xs"
                  />
                  <span>تسویه حساب</span>
                </q-btn>

                <q-btn
                  color="primary"
                  padding="4px 12px"
                  unelevated
                >
                  <q-icon
                    name="o_description"
                    size="xs"
                    class="q-mr-xs"
                  />
                  <span>سند حسابداری</span>
                </q-btn>

              </div>

            </q-tab-panel>

          </q-tab-panels>

        </q-card-section>

      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
const tab = ref('main-info')
</script>

<style lang="scss" scoped>
.sme-logo {
  width: 72px;
}

.seller-address {
  width: 250px;
}

.seller-address span {
  text-align: left;
  line-height: 1.7rem;
}

.sign-place {
  width: 50%;
  padding-bottom: 150px;
}

table,
td,
th {
  border: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 24px 8px;
}

.invoice-preview-table {
  tbody {
    tr:hover {
      background-color: #{$black}10;
    }
  }

  th {
    border-bottom: 2px solid #{$black}40;
    border-top: 2px solid #{$black}40;
  }

  td {
    border-bottom: 1px solid #{$black}10;
  }
}
</style>
