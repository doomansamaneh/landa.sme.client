<template>
  <nav>
    <q-header bordered class="bg-white q-px-sm">
      <q-toolbar class="text-dark row justify-between">
        <div class="menu-button q-gutter-xs">
          <q-btn
            flat
            @click="drawerRight = !drawerRight"
            round
            dense
            icon="menu"
            class="text-grey-9"
          />
          <q-btn
            flat
            round
            dense
            color="grey-8"
            icon="search"
            class="text-dark xs"
          />
        </div>
        <div class="search-for-mobile xs"></div>
        <q-toolbar-title
          class="text-subtitle2 text-bold col-6 flex justify-start"
        >
          {{ title }}
        </q-toolbar-title>

        <div class="search-bar col-4 q-mr-xl gt-sm">
          <q-input
            color="grey-5"
            outlined
            v-model="text"
            dense
            class="q-py-sm text-caption"
            placeholder="جستوجوی پیشرفته"
            rounded
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
            <template v-slot:append>
              <q-btn
                flat
                round
                dense
                size="12px"
                color=""
                icon="tune"
                class="text-dark"
              />
            </template>
          </q-input>
        </div>
        <div class="round-icons q-gutter-sm">
          <q-btn
            flat
            dense
            round
            color=""
            icon="o_person_search"
            class="text-dark gt-xs"
            size="14px"
          />
          <q-btn
            flat
            dense
            round
            color=""
            icon="o_account_circle"
            size="14px"
            class="text-dark"
          />

          <q-btn
            flat
            dense
            round
            color=""
            icon="o_settings"
            class="text-dark"
            size="14px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      side="left"
      v-model="drawerRight"
      show-if-above
      :width="300"
      :breakpoint="500"
      class="drawer bg-white"
    >
      <div class="searchbar-sidebar q-mb-md q-px-md">
        <q-input
          color="grey-5"
          outlined
          v-model="text"
          placeholder="جستوجو"
          dense
          rounded
          class="text-caption"
        >
          <template v-slot:prepend>
            <q-icon name="o_search" color="primary" />
          </template>
        </q-input>
      </div>

      <q-list class="q-ml-sm q-mr-xs">
        <q-item class="flex items-center" to="/home/bueinessId">
          <q-icon name="o_dashboard" class="dashboard" color="blue" size="sm" />
          <span class="custom-lg-mr text-grey-8">پیشخوان</span>
        </q-item>
        <q-expansion-item
          icon="o_shop_2"
          label="بازرگانی، خرید و فروش"
          class="text-grey-8"
        >
          <q-item to="/home/proformas" clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="content_paste" />
            </q-item-section>
            <q-item-section>پیش‌فاکتور‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="o_receipt_long" />
            </q-item-section>
            <q-item-section>فاکتورهای فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="o_shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>فاکتور‌های خرید</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="turn_left"></q-icon>
            </q-item-section>
            <q-item-section>برگشت از فروش‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="o_subject"></q-icon>
            </q-item-section>
            <q-item-section>انواع فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>انواع خرید</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="credit_card"
          label="دریافت و پرداخت"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="arrow_downward" />
            </q-item-section>
            <q-item-section>دریافت‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="arrow_upward"></q-icon>
            </q-item-section>
            <q-item-section>پرداخت‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="attach_money"></q-icon>
            </q-item-section>
            <q-item-section>هزینه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="swap_horiz"></q-icon>
            </q-item-section>
            <q-item-section>انتقال وجه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های بانکی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="inbox"></q-icon>
            </q-item-section>
            <q-item-section>صندوق</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="receipt_long"
          label="حسابداری"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>سند حسابداری</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="build"></q-icon>
            </q-item-section>
            <q-item-section>عملیات حسابداری</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="analytics"></q-icon>
            </q-item-section>
            <q-item-section>سرفصل حساب‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="category"></q-icon>
            </q-item-section>
            <q-item-section>گروه حساب‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های کل</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های معین</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="view_module"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های تفضیلی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="browse_gallery"></q-icon>
            </q-item-section>
            <q-item-section>سال مالی</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="o_account_box"
          label="حقوق و دستمزد"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="o_account_box"></q-icon>
            </q-item-section>
            <q-item-section>حقوق و دستمزد ماهانه</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_home"
          label="انبارداری"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="swap_vert"></q-icon>
            </q-item-section>
            <q-item-section>گزارش موجودی کالا</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>موجودی اول دوره</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>اصلاح موجودی</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_group"
          label="سازمان، مخاطب، کاربر"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>واحد سازمانی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>نوع واحد سازمانی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="person"></q-icon>
            </q-item-section>
            <q-item-section>مخاطب، شخص</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_info"
          label="اطلاعات پایه"
          class="sub-item text-grey-8"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="credit_card"></q-icon>
            </q-item-section>
            <q-item-section>نوع حساب بانکی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="account_balance"></q-icon>
            </q-item-section>
            <q-item-section>بانک</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="apps"></q-icon>
            </q-item-section>
            <q-item-section>شعبه بانک</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="monetization_on"></q-icon>
            </q-item-section>
            <q-item-section>ارز</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="location_on"></q-icon>
            </q-item-section>
            <q-item-section>محل جغرافیایی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="view_comfy"></q-icon>
            </q-item-section>
            <q-item-section>گروه کالا و خدمات</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="monitor"></q-icon>
            </q-item-section>
            <q-item-section>کالا/خدمت</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="format_list_numbered_rtl"></q-icon>
            </q-item-section>
            <q-item-section>واحدهای سنجش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="format_list_numbered_rtl"></q-icon>
            </q-item-section>
            <q-item-section>تبدیل واحد سنجش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="monetization_on"></q-icon>
            </q-item-section>
            <q-item-section>انواع مالیات بر ارزش افزوده</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>نوع تماس</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>شغل</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="bar_chart"
          label="گزارش‌ها"
          class="sub-item text-grey-8"
          id="reports"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="pie_chart"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور حساب</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="text_fields"></q-icon>
            </q-item-section>
            <q-item-section>تراز آزمایشی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="title"></q-icon>
            </q-item-section>
            <q-item-section>ترازنامه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>صورت سود و زیان</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>گزارش دفاتر</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش حساب شخص</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش بدهکاران</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش بستانکاران</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>گزارش خرید و فروش فصلی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور خرید</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="swap_vert"></q-icon>
            </q-item-section>
            <q-item-section>گزارش موجودی کالا</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="grey-8" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>گزارش چک</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-separator inset />
        <div class="settings" style="cursor: pointer; margin-bottom: 32px">
          <q-item class="flex items-center q-mt-xs">
            <q-icon
              name="o_settings"
              class="settings q-mr-md"
              color="orange"
              size="sm"
            ></q-icon>
            <span class="text-grey-8">پیکربندی سامانه</span>
          </q-item>
        </div>
      </q-list>
    </q-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"

const route = useRoute()

const title = ref("")
const drawerRight = ref(false)

async function loadData() {
  const businessId = route.params.businessId
  await fetchWrapper
    .get(`business/GetBusiness/${businessId}`)
    .then((response) => {
      handleBusinessData(response.data.data)
    })
}

function handleBusinessData(data) {
  console.log(data)
  title.value = data.title
}

onMounted(() => {
  loadData()
})
</script>

<style>
.searchbar-sidebar {
  margin-top: 19px;
}

.drawer {
  border-right: 1px solid rgb(219, 219, 219);
  border-left: none;
}

.q-focus-helper {
  display: none;
}

.custom-lg-mr {
  margin-left: 32px;
}
</style>
