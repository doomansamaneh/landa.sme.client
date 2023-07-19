<template>
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-bold">پرداخت</q-item-label>
        <q-item-label class="dark-2 q-pt-xs text-subtitle2" caption>
          همه هزینه ها به ریال می باشد
        </q-item-label>
      </q-item-section>
      <q-card-actions>
        <div class="flex items-center q-mr-xs">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="o_refresh"
            @click="$emit('reload-data')"
          >
            <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
          </q-icon>
        </div>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip>بازگشت</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-card-section>
      <q-item class="flex justify-between items-center text-caption q-mb-xs">
        <div class="q-pr-xl">
          <q-item-label class="">
            <img
              class="sme-logo"
              src="../../../public/landa-sme-logo.png"
              alt=""
            />
          </q-item-label>
        </div>
        <!-- <div class="flex q-gutter-md text-caption text-bold items-center">
          <div>
            <span>
              <span>تاریخ:</span>
              1401/02/09</span
            >
          </div>
          <div class="">
            <span>
              <span>شماره فاکتور:</span>
              20108</span
            >
          </div>
        </div> -->
        <table>
          <thead>
            <tr>
              <th class="text-left">شماره:</th>
              <th class="text-left">تاریخ:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">20810</td>
              <td>1401/05/02</td>
            </tr>
          </tbody>
        </table>
      </q-item>
      <q-item class="flex justify-between text-caption">
        <div class="">
          <q-item-lanel class=""
            ><span class="text-weight-bold"
              >فروشنده:
              <span class="text-weight-light">حسابداری آنلاین لاندا</span></span
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
          </q-item-lanel>
        </div>
        <div class="">
          <q-item-label class=""
            ><span class="text-weight-bold"
              >خریدار: <span class="text-weight-light">خشایار شمالی</span></span
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
      <q-separator class="q-mt-sm q-mx-md" />
      <q-item>
        <div
          class="invoice-text full-width text-center bg-blue-8 q-py-md text-bold text-body2 text-white"
        >
          صورتحساب فروش کالا و خدمات
        </div>
      </q-item>
      <q-item class="column">
        <table class="text-caption rounded-table">
          <thead class="text-left">
            <tr>
              <th class="q-py-sm xs-width">
                <span class="">ردیف</span>
              </th>
              <th class="xl-width"><span class="">کالا / خدمت</span></th>
              <th class="xs-width"><span class="">مقدار</span></th>
              <th class="xs-width"><span class="">واحد</span></th>
              <th><span class="">مبلغ واحد</span></th>
              <th><span class="">مبلغ کل</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="q-py-sm"><span class="">1</span></td>
              <td><span class="">طرح 2 حسابداری</span></td>
              <td><span class="">1.5</span></td>
              <td><span class="">ماه</span></td>
              <td><span class="">500,000</span></td>
              <td><span class="">750,000</span></td>
            </tr>
            <tr>
              <td class="q-py-sm"><span class="">2</span></td>
              <td>
                <div class="ellipsis-2-lines">
                  <div class="custom-ellipsis">
                    <span
                      >طرح دوم حسابداری پیشرفته لاندا کسب و کارهای کوچک و متوسط
                      به وسیله خشایار شمالی</span
                    >
                  </div>
                </div>
              </td>
              <td><span class="q-pl-xs">1.5</span></td>
              <td><span class="q-pl-xs">ماه</span></td>
              <td><span class="q-pl-xs">500,000</span></td>
              <td><span class="q-pl-xs">750,000</span></td>
            </tr>
            <tr>
              <td class="text-right q-py-sm" colspan="5">
                <span class="text-bold">جمع:</span>
              </td>
              <td class="q-py-sm">
                <span class="text-bold">10,750,000</span>
              </td>
            </tr>
            <tr>
              <td class="text-right q-py-sm" colspan="5">
                <span class="text-bold">جمع مالیات و عوارض:</span>
              </td>
              <td><span class="text-bold">967,500</span></td>
            </tr>
            <tr>
              <td class="text-right q-py-sm" colspan="5">
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
              <td class="text-right q-pr-sm q-py-sm" colspan="6">
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
                <span class="text-bold q-pr-md q-pl-sm bg-grey-4"
                  >جمع مانده:<span class="text-weight-thin q-pl-xs"
                    ><b class="underline">(150,000,000)</b></span
                  ></span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <table class="q-my-sm text-caption">
          <tr>
            <td colspan="6" class="q-py-md">
              <span class="text-bold">توضیحات:</span>
            </td>
          </tr>
          <tr>
            <td class="sign-place q-py-xl">
              <span> مهر و امضای فروشنده</span>
            </td>
            <td class="sign-place q-px-xs">
              <span>مهر و امضای خریدار</span>
            </td>
          </tr>
        </table>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.card-desktop {
  width: 900px !important;
}

.business-name {
  max-width: 250px;
}

.sme-logo {
  width: 150px;
}
.seller-address {
  width: 250px;
}
.seller-address span {
  text-align: left;
  line-height: 1.7rem;
}

.invoice-text {
  border-bottom: 5px solid rgb(80, 182, 255);
  border-radius: 4px;
}

table,
td,
th {
  border: 1px solid;
}

th,
td {
  padding: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}
.rounded-table {
  border-radius: 10px;
}
.sign-place {
  width: 50%;
}
.underline {
  border-bottom: 2px solid black;
}

.xs-width {
  width: 5%;
}
.md-width {
  width: 10%;
}
.xl-width {
  width: 55%;
}

.custom-ellipsis {
  width: 100%;
}
</style>
