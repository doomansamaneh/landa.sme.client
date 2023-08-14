<template>
  <!-- <vue3-html2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    filename="landa-sme-invoice"
    :pdf-quality="4"
    :manual-pagination="true"
    pdf-format="a4"
    pdf-orientation="portrait"
    pdf-content-width="800px"
    @hasStartedGeneration="hasStartedGeneration()"
    @hasGenerated="hasGenerated($event)"
    ref="html2Pdf"
  >
    <template #pdf-content>
      <q-card class="card-desktop gt-xs no-shadow">
        <q-item>
          <div
            class="invoice-text-container flex justify-between items-center full-width text-center q-py-xl text-bold text-body2 q-mt-sm"
          >
            <div class="">
              <q-item-label class="">
                <img
                  class="sme-logo"
                  src="../../../../public/landa-sme-logo.png"
                  alt=""
                />
              </q-item-label>
            </div>
            <div class="">
              <span class="text-subtitle1 text-bold"
                >صورتحساب فروش کالا و خدمات</span
              >
            </div>
            <div class="column q-gutter-sm text-right text-caption text-bold">
              <div>
                <span>
                  <span class="text-weight-thin">تاریخ:</span>
                  1401/02/09</span
                >
              </div>
              <div class="">
                <span>
                  <span class="text-weight-thin">شماره فاکتور:</span>
                  20108</span
                >
              </div>
            </div>
          </div>
        </q-item>
        <q-separator class="q-mt-sm q-mx-md" />
        <q-card-section>
          <q-item class="flex justify-between text-caption">
            <div class="">
              <q-item-label class=""
                ><span class="text-weight-bold"
                  >فروشنده:
                  <span class="text-weight-light"
                    >حسابداری آنلاین لاندا</span
                  ></span
                >
                <div class="seller-address">
                  <q-item-label class="q-mt-sm">
                    <span
                      >شهر جدید اندیشه، شهرک صدف، بلوار دکتر قریب، مجتمع اداری
                      زیتون، واحد 105</span
                    >
                  </q-item-label>
                  <q-item-label class="q-pt-xs">
                    <q-icon
                      name="phone"
                      class="dark-2 q-pr-xs"
                    />88944338</q-item-label
                  >
                </div>
              </q-item-label>
            </div>
            <div class="">
              <q-item-label class=""
                ><span class="text-weight-bold"
                  >خریدار:
                  <span class="text-weight-light">خشایار شمالی</span></span
                >
                <div class="seller-address">
                  <q-item-label class="q-mt-sm">
                    <span
                      >شهرری، خیابان شهید رجایی، شهرک سیزده آبان، خیابان رحیمی،
                      خیابان عنایتی، کوچه محمدی، پلاک 22</span
                    >
                  </q-item-label>
                  <q-item-label class="q-pt-xs"
                    ><q-icon
                      name="phone"
                      class="dark-2 q-pr-xs"
                    />021-55511102</q-item-label
                  >
                </div>
              </q-item-label>
            </div>
          </q-item>
          <q-separator class="q-my-sm" />

          <table class="invoice-table text-caption">
            <thead class="text-left">
              <tr>
                <th class="xs-width">
                  <span class="">ردیف</span>
                </th>
                <th class="xl-width"><span class="">طرح</span></th>
                <th class="xs-width"><span class="">مقدار</span></th>
                <th class="xs-width"><span class="">واحد</span></th>
                <th class="lg-width"><span class="">تاریخ</span></th>
                <th class="md-width"><span class="">مبلغ واحد</span></th>
                <th class="md-width"><span class="">مبلغ کل</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class=""><span class="">1</span></td>
                <td>
                  <span class=""
                    >طرح 1: (حسابداری، خرید و فروش، دریافت و پرداخت)</span
                  >
                </td>
                <td><span class="">1000</span></td>
                <td><span class="">دستگاه</span></td>
                <td><span class="">1401/02/09 - 1401-03-09</span></td>
                <td><span class="">490,000</span></td>
                <td><span class="">500,000</span></td>
              </tr>
              <tr>
                <td class="q-py-sm"><span class="">2</span></td>
                <td>
                  <div class="ellipsis-2-lines">
                    <div class="custom-ellipsis">
                      <span
                        >طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
                        دستمزد)</span
                      >
                    </div>
                  </div>
                </td>
                <td><span class="">1.5</span></td>
                <td><span class="">ماه</span></td>
                <td><span class="">1401/02/09 - 1401-03-24</span></td>
                <td><span class="">500,000</span></td>
                <td><span class="">750,000</span></td>
              </tr>
              <tr>
                <td class="text-right" colspan="6">
                  <span class="text-bold">جمع:</span>
                </td>
                <td class="">
                  <span class="text-bold">10,750,000</span>
                </td>
              </tr>
              <tr>
                <td class="text-right" colspan="6">
                  <span class="text-bold">جمع مالیات و عوارض:</span>
                </td>
                <td><span class="text-bold">967,500</span></td>
              </tr>
              <tr>
                <td class="text-right" colspan="6">
                  <span class="text-bold q-pl-xs">جمع کل:</span
                  ><span class="">
                    <span class="text-bold q-pl-xs"
                      ><span class="text-weight-thin q-pr-xs"
                        >یازده میلیون و هفتصد و هفده هزار و پانصد</span
                      >ریال</span
                    >
                  </span>
                </td>
                <td><span class="text-bold">11,717,500</span></td>
              </tr>
              <tr>
                <td class="text-right q-pr-sm" colspan="7">
                  <span class="text-bold q-pr-md"
                    >جمع دریافتی:<span class="text-weight-thin q-pl-xs"
                      >11,717,500</span
                    ></span
                  >
                  <span class="text-bold q-pr-md"
                    >مانده:<span class="q-pl-xs"
                      ><b class="underline">0</b></span
                    ></span
                  >
                  <span class="text-bold q-pr-md"
                    >مانده از قبل:<span class="text-weight-thin q-pl-xs"
                      >(150,000,000)</span
                    ></span
                  >
                  <span class="text-bold q-pr-md q-pl-sm dark-1-bg"
                    >جمع مانده:<span class="text-weight-thin q-pl-xs"
                      ><b class="underline">(150,000,000)</b></span
                    ></span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
      </q-card>
    </template>
  </vue3-html2pdf> -->
  <!-- ------------------------------------------------------------------------- -->
  <!-- ------------------------------------------------------------------------- -->
  <!-- ------------------------------------------------------------------------- -->
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-h6">پرداخت</q-item-label>
        <q-item-label class="dark-2 q-pt-xs text-subtitle2" caption>
          همه هزینه ها به ریال می باشد
        </q-item-label>
      </q-item-section>
      <q-card-actions>
        <div class="flex q-gutter-x-sm q-mr-md">
          <div class="">
            <q-icon class="icon-hover dark-3 cursor-pointer" size="xs" name="o_description"
              @click="$emit('reload-data')">
              <q-tooltip class="custom-tooltip">تبدیل به اکسل</q-tooltip>
            </q-icon>
          </div>
          <div class="">
            <q-icon class="icon-hover dark-3 cursor-pointer" size="xs" name="o_print" @click="print">
              <q-tooltip class="custom-tooltip">پرینت</q-tooltip>
            </q-icon>
          </div>
        </div>
        <div class="flex items-center q-gutter-x-md q-pr-xs">
          <q-icon class="icon-hover dark-3 cursor-pointer" size="xs" name="o_refresh" @click="$emit('reload-data')">
            <q-tooltip class="custom-tooltip">{{
              $t("page.buttons.reload-data")
            }}</q-tooltip>
          </q-icon>
        </div>
        <div class="flex items-center q-gutter-x-md">
          <q-icon class="icon-hover dark-3 cursor-pointer" size="xs" name="arrow_back" @click="$router.go(-1)">
            <q-tooltip class="custom-tooltip">بازگشت</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-item>
      <div
        class="invoice-text-container flex justify-between items-center full-width text-center q-py-xl text-bold text-body2 q-mt-sm">
        <div class="">
          <q-item-label class="">
            <img class="sme-logo" src="../../../../public/landa-sme-logo.png" alt="" />
          </q-item-label>
        </div>
        <div class="">
          <span class="text-subtitle1 text-bold">صورتحساب فروش کالا و خدمات</span>
        </div>
        <div class="column q-gutter-sm text-right text-caption text-bold">
          <div>
            <span>
              <span class="text-weight-thin">تاریخ:</span>
              1401/02/09</span>
          </div>
          <div class="">
            <span>
              <span class="text-weight-thin">شماره فاکتور:</span>
              20108</span>
          </div>
        </div>
      </div>
    </q-item>
    <q-separator class="q-mt-sm q-mx-md" />
    <q-card-section>
      <q-item class="flex justify-between text-caption">
        <div class="">
          <q-item-label class=""><span class="text-weight-bold">فروشنده:
              <span class="text-weight-light">حسابداری آنلاین لاندا</span></span>
            <div class="seller-address">
              <q-item-label class="q-mt-sm">
                <span>شهر جدید اندیشه، شهرک صدف، بلوار دکتر قریب، مجتمع اداری
                  زیتون، واحد 105</span>
              </q-item-label>
              <q-item-label class="q-pt-xs">
                <q-icon name="phone" class="dark-2 q-pr-xs" />88944338</q-item-label>
            </div>
          </q-item-label>
        </div>
        <div class="">
          <q-item-label class=""><span class="text-weight-bold">خریدار: <span class="text-weight-light">خشایار
                شمالی</span></span>
            <div class="seller-address">
              <q-item-label class="q-mt-sm">
                <span>شهرری، خیابان شهید رجایی، شهرک سیزده آبان، خیابان رحیمی،
                  خیابان عنایتی، کوچه محمدی، پلاک 22</span>
              </q-item-label>
              <q-item-label class="q-pt-xs"><q-icon name="phone" class="dark-2 q-pr-xs" />021-55511102</q-item-label>
            </div>
          </q-item-label>
        </div>
      </q-item>
      <q-separator class="q-mt-sm q-mb-md" />

      <table class="invoice-table text-caption">
        <thead class="text-left">
          <tr>
            <th class="xs-width">
              <span class="">ردیف</span>
            </th>
            <th class="xl-width"><span class="">طرح</span></th>
            <th class="xs-width"><span class="">مقدار</span></th>
            <th class="xs-width"><span class="">واحد</span></th>
            <th class="lg-width"><span class="">تاریخ</span></th>
            <th class="md-width"><span class="">مبلغ واحد</span></th>
            <th class="md-width"><span class="">مبلغ کل</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class=""><span class="">1</span></td>
            <td>
              <span class="">طرح 1: (حسابداری، خرید و فروش، دریافت و پرداخت)</span>
            </td>
            <td><span class="">1000</span></td>
            <td><span class="">دستگاه</span></td>
            <td><span class="">1401/02/09 - 1401-03-09</span></td>
            <td><span class="">490,000</span></td>
            <td><span class="">500,000</span></td>
          </tr>
          <tr>
            <td class="q-py-sm"><span class="">2</span></td>
            <td>
              <div class="ellipsis-2-lines">
                <div class="custom-ellipsis">
                  <span>طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
                    دستمزد)</span>
                </div>
              </div>
            </td>
            <td><span class="">1.5</span></td>
            <td><span class="">ماه</span></td>
            <td><span class="">1401/02/09 - 1401-03-24</span></td>
            <td><span class="">500,000</span></td>
            <td><span class="">750,000</span></td>
          </tr>
          <tr>
            <td class="text-right" colspan="6">
              <span class="text-bold">جمع:</span>
            </td>
            <td class="">
              <span class="text-bold">10,750,000</span>
            </td>
          </tr>
          <tr>
            <td class="text-right" colspan="6">
              <span class="text-bold">جمع مالیات و عوارض:</span>
            </td>
            <td><span class="text-bold">967,500</span></td>
          </tr>
          <tr>
            <td class="text-right" colspan="6">
              <span class="text-bold q-pl-xs">جمع کل:</span><span class="">
                <span class="text-bold q-pl-xs"><span class="text-weight-thin q-pr-xs">یازده میلیون و هفتصد و هفده هزار
                    و پانصد</span>ریال</span>
              </span>
            </td>
            <td><span class="text-bold">11,717,500</span></td>
          </tr>
          <tr>
            <td class="text-right q-pr-sm" colspan="7">
              <span class="text-bold q-pr-md">جمع دریافتی:<span
                  class="text-weight-thin q-pl-xs">11,717,500</span></span>
              <span class="text-bold q-pr-md">مانده:<span class="q-pl-xs"><b class="underline">0</b></span></span>
              <span class="text-bold q-pr-md">مانده از قبل:<span
                  class="text-weight-thin q-pl-xs">(150,000,000)</span></span>
              <span class="text-bold q-pr-md q-pl-sm dark-1-bg">جمع مانده:<span class="text-weight-thin q-pl-xs"><b
                    class="underline">(150,000,000)</b></span></span>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="quote-table q-mt-xl text-caption">
        <tr>
          <td colspan="6" class="quote-place">
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
</template>

<script setup>
  import { ref } from "vue"
// import Vue3Html2pdf from "vue3-html2pdf"

// const html2Pdf = ref(null)

// function print() {
//   html2Pdf.value.generatePdf()
// }
</script>

<style scoped>
  .card-desktop {
    width: 795px !important;
  }

  .business-name {
    max-width: 250px;
  }

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

  .invoice-text-container {
    border-radius: 4px;
    padding: 42px 32px;
  }

  .sign-place {
    width: 50%;
    padding: 50px 8px;
  }

  .quote-place {
    padding: 32px 8px;
  }

  .xs-width {
    width: 7%;
  }

  .md-width {
    width: 10%;
  }

  .lg-width {
    width: 25%;
  }

  .xl-width {
    width: 40%;
  }

  .custom-ellipsis {
    width: 100%;
  }

  table,
  td,
  th {
    border: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
  }

  th,
  td {
    padding: 24px 8px;
  }

  .invoice-table {
    padding: 8px;
  }
</style>