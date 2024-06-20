<template>
  <div class="row">
    <q-card
      class="col-md col-sm-12 col-xs-12 border-radius-lg bordered"
    >
      <q-list bordered>
        <q-expansion-item
          expand-separator
          group="basicInfo"
          default-opened
          class="basic-info first"
        >
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_headset_mic" size="xs" />
            </q-item-section>
            <q-item-section class="text-body2 no-letter-spacing">
              تماس
            </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <div
                class="row q-gutter-sm items-center justify-between q-py-sm"
              >
                <div
                  class="text-body1 caption-on-dark no-letter-spacing"
                >
                  لطفا اطلاعات تماس خود را وارد یا اصلاح کنید
                </div>
                <q-btn
                  unelevated
                  :rounded="$q.screen.gt.xs"
                  :round="$q.screen.xs"
                  class="text-body2 no-letter-spacing primary-shadow primary-gradient"
                  :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
                  text-color="white"
                >
                  <q-icon
                    size="20px"
                    name="o_add"
                    :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
                  />
                  <span v-if="$q.screen.gt.xs">افزودن آیتم جدید</span>
                  <q-menu class="border-radius-lg" cover>
                    <q-list dense padding style="width: 200px">
                      <q-item clickable v-close-popup tabindex="0">
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_call" size="16px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-body2 no-letter-spacing">
                            تلفن
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup tabindex="0">
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_mail" size="16px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-body2 no-letter-spacing">
                            ایمیل
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup tabindex="0">
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_share" size="16px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-body2 no-letter-spacing">
                            شبکه‌های اجتماعی
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup tabindex="0">
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon
                                name="o_phone_android"
                                size="16px"
                              />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-body2 no-letter-spacing">
                            موبایل
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup tabindex="0">
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_public" size="16px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-body2 no-letter-spacing">
                            وبسایت
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div v-for="item in phoneItems" :key="item">
                <div
                  class="row bordered-1 q-pa-md q-my-md items-center"
                >
                  <div class="col">
                    <div class="text-caption">
                      <q-icon
                        v-if="item.original"
                        name="o_check_circle"
                        class="q-mr-xs"
                        size="sm"
                        color="primary"
                      />
                      <span
                        class="text-weight-700 text-body2 no-letter-spacing q-mr-sm"
                      >
                        {{ item.name }}:
                      </span>
                      <span class="text-body2 no-letter-spacing">
                        {{ item.value }}
                      </span>
                    </div>
                  </div>
                  <div class="col-4 row justify-end items-center">
                    <div class="row items-center">
                      <q-btn
                        unelevated
                        round
                        class="text-on-dark"
                        @click="editData"
                      >
                        <q-icon name="o_edit" size="20px" />
                      </q-btn>
                      <q-btn
                        unelevated
                        @click="deleteAlert"
                        round
                        class="text-on-dark"
                      >
                        <q-icon name="o_delete" size="20px" />
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="basicInfo"
          class="normal basic-info"
        >
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_my_location" size="xs" />
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing">
              نشانی
            </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <div
                class="row q-gutter-sm items-center justify-between q-py-sm"
              >
                <div
                  class="text-body1 caption-on-dark no-letter-spacing"
                >
                  لطفا اطلاعات نشانی خود را وارد یا اصلاح کنید
                </div>
                <q-btn
                  unelevated
                  :rounded="$q.screen.gt.xs"
                  :round="$q.screen.xs"
                  class="text-body2 no-letter-spacing primary-shadow primary-gradient"
                  :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
                  text-color="white"
                >
                  <q-icon
                    size="20px"
                    name="o_add"
                    :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
                  />
                  <span v-if="$q.screen.gt.xs">افزودن آیتم جدید</span>
                </q-btn>
              </div>
              <div v-for="item in addressItems" :key="item">
                <div
                  class="row bordered-1 q-pa-md q-my-md items-center"
                >
                  <div class="col">
                    <div class="text-body2 no-letter-spacing">
                      <q-icon
                        v-if="item.original"
                        name="o_check_circle"
                        class="q-mr-xs"
                        size="sm"
                        color="primary"
                      />
                      <span class="text-weight-700 q-mr-sm">
                        {{ `${item.name}:` }}
                      </span>
                      <span>{{ item.value }}</span>
                    </div>
                  </div>
                  <div class="col-4 row justify-end items-center">
                    <div class="row items-center">
                      <q-btn
                        unelevated
                        round
                        class="text-on-dark"
                        @click="editData"
                      >
                        <q-icon name="o_edit" size="20px" />
                      </q-btn>
                      <q-btn
                        unelevated
                        @click="deleteAlert"
                        round
                        class="text-on-dark"
                      >
                        <q-icon name="o_delete" size="20px" />
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="basicInfo"
          class="normal basic-info"
        >
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_credit_card" size="xs" />
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing">
              حساب بانکی
            </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <div
                class="row q-gutter-sm items-center justify-between q-py-sm"
              >
                <div
                  class="text-body1 caption-on-dark no-letter-spacing"
                >
                  لطفا اطلاعات حساب بانکی خود را وارد یا اصلاح کنید
                </div>
                <q-btn
                  unelevated
                  :rounded="$q.screen.gt.xs"
                  :round="$q.screen.xs"
                  class="text-body2 no-letter-spacing primary-shadow primary-gradient"
                  :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
                  text-color="white"
                >
                  <q-icon
                    name="o_add"
                    size="20px"
                    :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
                  />
                  <span v-if="$q.screen.gt.xs">افزودن آیتم جدید</span>
                </q-btn>
              </div>
              <div
                v-for="item in bankAccountDetail"
                :key="item"
                class="row bordered-1 q-pa-md q-my-md"
              >
                <div class="col q-gutter-y-sm">
                  <div
                    class="row text-body2 text-weight-700 no-letter-spacing items-center justify-between"
                  >
                    <div class="row">
                      <q-icon
                        name="o_account_balance"
                        color="primary"
                        size="xs"
                      />
                      <span class="text-bold q-ml-sm">
                        {{ item.bankName }}
                      </span>
                    </div>
                    <div class="row items-center">
                      <q-btn unelevated round class="text-on-dark">
                        <q-icon name="o_edit" size="20px" />
                      </q-btn>
                      <q-btn
                        unelevated
                        @click="deleteAlert"
                        round
                        class="text-on-dark"
                      >
                        <q-icon name="o_delete" size="20px" />
                      </q-btn>
                    </div>
                  </div>
                  <div>
                    <span
                      class="text-body2 no-letter-spacing text-weight-700 q-mr-sm"
                    >
                      شماره حساب:
                    </span>
                    <span class="text-body2 no-letter-spacing">
                      {{ item.accountNumber }}
                    </span>
                  </div>
                  <div class="text-body2 no-letter-spacing">
                    <span
                      class="text-body2 no-letter-spacing text-weight-700 q-mr-sm"
                    >
                      شماره کارت:
                    </span>
                    <span class="text-body2 no-letter-spacing">
                      {{ item.cardNumber }}
                    </span>
                  </div>
                  <div class="text-body2 no-letter-spacing">
                    <span
                      class="text-body2 no-letter-spacing text-weight-700 q-mr-sm"
                    >
                      شماره شبا:
                    </span>
                    <span class="text-body2 no-letter-spacing">
                      {{ item.shabaNumber }}
                    </span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="basicInfo"
          class="normal basic-info"
        >
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_business" size="xs" />
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing">
              کسب و کار
            </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <div class="q-col-gutter-md">
                <div class="row items-center">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    شناسه ملی:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    0481038280
                  </div>
                  <div class="row">
                    <q-btn unelevated round class="text-on-dark">
                      <q-icon name="o_edit" size="20px" />
                    </q-btn>
                  </div>
                </div>
                <div class="row items-center">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    شناسه اقتصادی:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    0481038280
                  </div>
                </div>
                <div class="row items-center">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    شناسه کارگاه بیمه:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    0481038280
                  </div>
                </div>
                <div class="row items-center">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    شماره ثبت:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    0481038280
                  </div>
                </div>
                <div class="row items-center">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    تاریخ ثبت:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    0481038280
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-5 text-body2 no-letter-spacing text-weight-700"
                  >
                    شرح:
                  </div>
                  <div class="col text-body2 no-letter-spacing">
                    این یک متن آزمایشی است که توسط خشایار شمالی برای
                    آزمایش شرح نوشته شده است و معنای خاصی ندارد.
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="basicInfo"
          class="last basic-info"
        >
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_star" size="xs" />
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing">
              فیلدهای سفارشی
            </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <div
                class="row q-gutter-sm items-center justify-between q-py-sm"
              >
                <div
                  class="text-body1 caption-on-dark no-letter-spacing"
                >
                  فیلدهای سفارشی برای شخصی سازی بیشتر
                </div>
                <q-btn
                  unelevated
                  :rounded="$q.screen.gt.xs"
                  :round="$q.screen.xs"
                  class="text-body2 no-letter-spacing primary-shadow primary-gradient"
                  :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
                  text-color="white"
                >
                  <q-icon
                    name="o_add"
                    size="20px"
                    :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
                  />
                  <span v-if="$q.screen.gt.xs">افزودن آیتم جدید</span>
                </q-btn>
              </div>
              <div
                class="row bordered-1 q-pa-md q-mt-md items-center"
              >
                <div class="col">
                  <div class="text-caption">
                    <span
                      class="text-body2 text-weight-700 no-letter-spacing q-mr-sm"
                    >
                      تلفن خانه:
                    </span>
                    <span class="text-body2 no-letter-spacing">
                      02155511102
                    </span>
                  </div>
                </div>
                <div class="col-4 row justify-end items-center">
                  <div class="row items-center">
                    <q-btn unelevated round class="text-on-dark">
                      <q-icon name="o_edit" size="20px" />
                    </q-btn>
                    <q-btn
                      unelevated
                      @click="deleteAlert"
                      round
                      class="text-on-dark"
                    >
                      <q-icon name="o_delete" size="20px" />
                    </q-btn>
                  </div>
                </div>
              </div>
              <div
                class="row bordered-1 q-pa-md q-mt-md items-center"
              >
                <div class="col">
                  <div class="text-caption">
                    <span
                      class="text-body2 text-weight-700 no-letter-spacing q-mr-sm"
                    >
                      تلفن خانه:
                    </span>
                    <span class="text-body2 no-letter-spacing">
                      02155511102
                    </span>
                  </div>
                </div>
                <div class="col-4 row justify-end items-center">
                  <div class="row items-center">
                    <q-btn unelevated round class="text-on-dark">
                      <q-icon name="o_edit" size="20px" />
                    </q-btn>
                    <q-btn
                      unelevated
                      @click="deleteAlert"
                      round
                      class="text-on-dark"
                    >
                      <q-icon name="o_delete" size="20px" />
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import AddCustomField from "./AddCustomField.vue";
  import EditCustomerData from "./EditCustomerDataDialog.vue";

  const phoneItems = [
    { name: "تلفن خانه", value: "02155511102", original: true },
    { name: "موبایل", value: "09338603196" },
    { name: "تلفن محل کار", value: "02144990022" },
  ];

  const addressItems = [
    {
      name: "آدرس کارخانه",
      value: "شابدل عظیم - نزدیکا حرم",
      original: true,
    },
    { name: "آدرس اداره", value: "پارک دانشجو - تیاتر شهر" },
    {
      name: "آدرس خانه",
      value:
        "خیابان شهید رجایی - شهرک سیزده آبان - خیابان شهید رحیمی - خیابان شهید عنایتی - کوچه مهر 2 - پلاک 22",
    },
  ];

  const bankAccountDetail = [
    {
      bankName: "تجارت",
      accountNumber: "0481038280",
      cardNumber: "5859831129809389",
      shabaNumber: "0000128550232209",
    },
    {
      bankName: "تجارت",
      accountNumber: "0481038280",
      cardNumber: "5859831129809389",
      shabaNumber: "0000128550232209",
    },
    {
      bankName: "تجارت",
      accountNumber: "0481038280",
      cardNumber: "5859831129809389",
      shabaNumber: "0000128550232209",
    },
  ];

  const addCustomField = () => {
    $q.dialog({
      component: AddCustomField,
    });
  };

  const editData = () => {
    $q.dialog({
      component: EditCustomerData,
    });
  };
</script>
