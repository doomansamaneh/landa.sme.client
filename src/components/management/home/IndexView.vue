<template>
  <nav>
    <q-header
      bordered
      class="bg-white q-px-sm"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
      <q-toolbar class="text-dark row justify-between">
        <div class="menu-button q-gutter-xs">
          <q-btn
            flat
            @click="drawerRight = !drawerRight"
            round
            dense
            icon="menu"
            class="text"
          />
          <q-btn flat round dense color="text" icon="search" class="text-dark xs" />
        </div>
        <div class="search-for-mobile xs"></div>
        <q-toolbar-title
          class="text-subtitle2 text-bold col-6 flex justify-start"
        >
          <span class="text q-pr-sm">{{ selectedBusiness.title }}</span> -
          <span class="text q-pl-sm text-weight-medium"> سال مالی: 1402</span>
        </q-toolbar-title>

        <div class="search-bar col-4 q-mr-xl gt-sm">
          <q-input
            color="grey-5"
            outlined
            v-model="text"
            dense
            class="home q-py-sm text-caption"
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
            dense-dark
            round
            color="text"
            icon="o_account_circle"
            size="14px"
            class="text-dark"
          >
            <q-menu
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[51, 24]"
            >
              <q-list dense padding class="user-profile">
                <q-item-label class="text-h6" header>
                  <div class="column items-center justify-center q-mt-md">
                    <div class="q-mt-md">
                      <span class="username">{{ username }}</span>
                    </div>
                  </div>
                </q-item-label>
                <q-item clickable v-ripple v-close-popup class="q-mt-md">
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar
                        class="dark-icon"
                        icon="o_date_range"
                        size="md"
                      />
                    </q-item-section>
                  </div>

                  <q-item-section>تغییر سال مالی</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  class="q-py-sm"
                  @click="changePasswordDialog"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="dark-icon" icon="password" size="md" />
                    </q-item-section>
                  </div>
                  <q-item-section>
                    {{ $t("business-layout.buttons.change-password") }}
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  class="q-py-sm"
                  @click="gotoBusiness"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="dark-icon" icon="o_business" size="md" />
                    </q-item-section>
                  </div>
                  <q-item-section>
                    {{ $t("pages.business") }}
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  class="q-py-sm"
                  @click="authStore.logout()"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="dark-icon" icon="o_logout" size="md" />
                    </q-item-section>
                  </div>
                  <q-item-section>{{
                    $t("business-layout.buttons.logout")
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            dense
            round
            color=""
            icon="o_settings"
            class="text-dark"
            size="14px"
          >
            <q-menu
              fit
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[10, 24]"
            >
              <q-list dense padding class="user-setting">
                <q-item-label class="text-h6" header>
                  <div class="column items-center justify-center q-mt-md">
                    <div class="q-mt-md">
                      <span class="username">تنظیمات</span>
                    </div>
                  </div>
                </q-item-label>
                <q-item
                  clickable
                  v-ripple
                  v-close-popup
                  class="q-mt-md row justify-center"
                >
                  <div class="q-py-sm">
                    <switch-theme />
                  </div>
                </q-item>
                <q-item
                  clickable
                  tabindex="0"
                  class="q-py-sm row justify-center"
                >
                  <div class="q-py-sm">
                    <switch-language />
                  </div>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      side="left"
      v-model="drawerRight"
      show-if-above
      :width="300"
      :breakpoint="500"
      class="drawer"
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
          <span class="text custom-lg-mr">پیشخوان</span>
        </q-item>
        <q-expansion-item
          icon="o_shop_2"
          label="بازرگانی، خرید و فروش"
          class=""
        >
          <q-item to="/home/sls/quote" clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="" name="content_paste" />
            </q-item-section>
            <q-item-section>پیش‌فاکتور‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="" name="o_receipt_long" />
            </q-item-section>
            <q-item-section>فاکتورهای فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="o_shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>فاکتور‌های خرید</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="turn_left"></q-icon>
            </q-item-section>
            <q-item-section>برگشت از فروش‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="o_subject"></q-icon>
            </q-item-section>
            <q-item-section>انواع فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>انواع خرید</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="credit_card"
          label="دریافت و پرداخت"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="arrow_downward" />
            </q-item-section>
            <q-item-section>دریافت‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="arrow_upward"></q-icon>
            </q-item-section>
            <q-item-section>پرداخت‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="attach_money"></q-icon>
            </q-item-section>
            <q-item-section>هزینه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="swap_horiz"></q-icon>
            </q-item-section>
            <q-item-section>انتقال وجه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های بانکی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="inbox"></q-icon>
            </q-item-section>
            <q-item-section>صندوق</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="receipt_long"
          label="حسابداری"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>سند حسابداری</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="build"></q-icon>
            </q-item-section>
            <q-item-section>عملیات حسابداری</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="analytics"></q-icon>
            </q-item-section>
            <q-item-section>سرفصل حساب‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="category"></q-icon>
            </q-item-section>
            <q-item-section>گروه حساب‌ها</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های کل</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های معین</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="view_module"></q-icon>
            </q-item-section>
            <q-item-section>حساب‌های تفضیلی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="browse_gallery"></q-icon>
            </q-item-section>
            <q-item-section>سال مالی</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="o_account_box"
          label="حقوق و دستمزد"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="o_account_box"></q-icon>
            </q-item-section>
            <q-item-section>حقوق و دستمزد ماهانه</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_home"
          label="انبارداری"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="swap_vert"></q-icon>
            </q-item-section>
            <q-item-section>گزارش موجودی کالا</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>موجودی اول دوره</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>اصلاح موجودی</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_group"
          label="سازمان، مخاطب، کاربر"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>واحد سازمانی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>نوع واحد سازمانی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="person"></q-icon>
            </q-item-section>
            <q-item-section>مخاطب، شخص</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          icon="o_info"
          label="اطلاعات پایه"
          class="sub-item text-text"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="credit_card"></q-icon>
            </q-item-section>
            <q-item-section>نوع حساب بانکی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="account_balance"></q-icon>
            </q-item-section>
            <q-item-section>بانک</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="apps"></q-icon>
            </q-item-section>
            <q-item-section>شعبه بانک</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="monetization_on"></q-icon>
            </q-item-section>
            <q-item-section>ارز</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="location_on"></q-icon>
            </q-item-section>
            <q-item-section>محل جغرافیایی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="view_comfy"></q-icon>
            </q-item-section>
            <q-item-section>گروه کالا و خدمات</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="monitor"></q-icon>
            </q-item-section>
            <q-item-section>کالا/خدمت</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="format_list_numbered_rtl"></q-icon>
            </q-item-section>
            <q-item-section>واحدهای سنجش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="format_list_numbered_rtl"></q-icon>
            </q-item-section>
            <q-item-section>تبدیل واحد سنجش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="monetization_on"></q-icon>
            </q-item-section>
            <q-item-section>انواع مالیات بر ارزش افزوده</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>نوع تماس</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="subject"></q-icon>
            </q-item-section>
            <q-item-section>شغل</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="bar_chart"
          label="گزارش‌ها"
          class="sub-item text-text"
          id="reports"
        >
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="pie_chart"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور حساب</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="text_fields"></q-icon>
            </q-item-section>
            <q-item-section>تراز آزمایشی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="title"></q-icon>
            </q-item-section>
            <q-item-section>ترازنامه</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>صورت سود و زیان</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="menu"></q-icon>
            </q-item-section>
            <q-item-section>گزارش دفاتر</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش حساب شخص</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش بدهکاران</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="group"></q-icon>
            </q-item-section>
            <q-item-section>گزارش بستانکاران</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>گزارش خرید و فروش فصلی</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="receipt_long"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور فروش</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>گزارش مرور خرید</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="text" name="swap_vert"></q-icon>
            </q-item-section>
            <q-item-section>گزارش موجودی کالا</q-item-section>
          </q-item>
          <q-item clickable class="q-mx-md">
            <q-item-section avatar class="item-section">
              <q-icon color="" name="receipt_long"></q-icon>
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
            <span class="">پیکربندی سامانه</span>
          </q-item>
        </div>
      </q-list>
    </q-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { fetchWrapper } from "src/helpers"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import ChangePasswordDialog from "src/components/users/ChangePasswordDialog.vue"
import { useAuthStore } from "src/stores"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import SwitchLanguage from "src/components/shared/SwitchLanguage.vue"

const selectedBusiness = useSelectedBusinessStore()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const title = ref("")
const drawerRight = ref(false)

async function loadData() {
  const businessId = route.params.businessId
  if (businessId)
    await fetchWrapper
      .get(`business/GetBusiness/${businessId}`)
      .then((response) => {
        handleBusinessData(response.data.data)
      })
}

function handleBusinessData(data) {
  localStorage.setItem("businessTitle", data.title)
  const businessTitle = localStorage.getItem("businessTitle")
  selectedBusiness.title = businessTitle
}

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

function changePasswordDialog() {
  $q.dialog({
    component: ChangePasswordDialog
  })
}

onMounted(() => {
  loadData()
})

const gotoBusiness = () => {
  router.push("/business")
}
</script>

<style lang="scss">
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

.user-profile {
  min-width: 240px;
  border: 1px solid #2d2d2d2d;
  border-radius: inherit;
}

.user-setting {
  min-width: 240px;
  min-height: 400px;
  border: 1px solid #2d2d2d2d;
  border-radius: inherit;
}
</style>
