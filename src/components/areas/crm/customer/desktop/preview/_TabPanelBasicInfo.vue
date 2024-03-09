<template>
  <div class="row">

    <q-card class="col-md-8 col-sm-12 col-xs-12 border-radius-xl bordered">
      <q-list bordered>
        <q-expansion-item expand-separator group="basicInfo" default-opened class="basic-info first">
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_headset_mic" size="xs" />
            </q-item-section>
            <q-item-section class="text-body2 no-letter-spacing"> تماس </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <q-btn unelevated class="bg-primary text-white full-width q-pa-md">
                <q-icon name="o_add" class="q-mr-xs" />
                <span>افزودن آیتم جدید</span>
                <q-menu class="border-radius-xl" touch-position>
                  <q-list dense padding style="width: 200px">
                    <q-item clickable v-close-popup tabindex="0">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_call" size="14px" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-body2 no-letter-spacing">تلفن</div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup tabindex="0">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_mail" size="14px" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">ایمیل</div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup tabindex="0">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_share" size="14px" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">شبکه‌های اجتماعی</div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup tabindex="0">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_phone_android"
                              size="14px" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">موبایل</div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup tabindex="0">
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_public" size="16px" /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">وبسایت</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <div v-for="item in phoneItems" :key="item">
                <div class="row bordered-1 q-pa-md q-my-md items-center">
                  <div class="col">
                    <div class="text-caption">
                      <q-icon v-if="item.original" name="o_check_circle" class="q-mr-xs" size="sm" color="primary" />
                      <span class="text-bold q-mr-sm">
                        {{ item.name }}:
                      </span>
                      <span class="">{{ item.value }}</span>
                    </div>
                  </div>
                  <div class="col-2 row justify-end items-center">
                    <div class="row items-center">
                      <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" @click="editData" />
                      <q-btn @click="deleteAlert" unelevated round class="text-on-dark" size="sm" icon="o_delete" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item expand-separator group="basicInfo" class="normal basic-info">
          <template #header>
            <q-item-section class="q-py-sm" avatar>
              <q-icon name="o_my_location" size="xs" />
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing"> نشانی </q-item-section>
          </template>
          <q-card class="no-border no-shadow">
            <q-card-section>
              <q-btn unelevated class="bg-primary text-white full-width q-pa-md">
                <q-icon name="o_add" class="q-mr-xs" />
                <span>افزودن آیتم جدید</span>
              </q-btn>
              <div v-for="item in addressItems" :key="item">
                <div class="row bordered-1 q-pa-md q-my-md items-center">
                  <div class="col">
                    <div class="text-caption">
                      <q-icon v-if="item.original" name="o_check_circle" class="q-mr-xs" size="sm" color="primary" />
                      <span class="text-bold q-mr-sm">{{
                `${item.name}:`
              }}</span>
                      <span>{{ item.value }}</span>
                    </div>
                  </div>
                  <div class="col-2 row justify-end items-center">
                    <div class="row items-center">
                      <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" />
                      <q-btn @click="deleteAlert" unelevated round class="text-on-dark" size="sm" icon="o_delete" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item expand-separator group="basicInfo" class="normal basic-info">
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
              <q-btn unelevated class="bg-primary text-white full-width q-pa-md">
                <q-icon name="o_add" class="q-mr-xs" />
                <span>افزودن آیتم جدید</span>
              </q-btn>
              <div v-for="item in bankAccountDetail" :key="item" class="row bordered-1 q-pa-md q-my-md">
                <div class="col q-gutter-y-sm">
                  <div class="row text-caption items-center justify-between">
                    <div class="row">
                      <q-icon name="o_account_balance" color="primary" size="xs" />
                      <span class="text-bold q-ml-sm">{{
                item.bankName
              }}</span>
                    </div>
                    <div class="row items-center">
                      <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" />
                      <q-btn @click="deleteAlert" unelevated round class="text-on-dark" size="sm" icon="o_delete" />
                    </div>
                  </div>
                  <div class="text-caption">
                    <span class="text-bold q-mr-sm">شماره حساب:</span>
                    <span>{{ item.accountNumber }}</span>
                  </div>
                  <div class="text-caption">
                    <span class="text-bold q-mr-sm">شماره کارت:</span>
                    <span>{{ item.cardNumber }}</span>
                  </div>
                  <div class="text-caption">
                    <span class="text-bold q-mr-sm">شماره شبا:</span>
                    <span>{{ item.shabaNumber }}</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item expand-separator group="basicInfo" class="normal basic-info">
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
              <div class="q-gutter-md text-caption">
                <div class="row items-center">
                  <div class="col-3 text-bold">شناسه ملی:</div>
                  <div class="col">0481038280</div>
                  <div class="row">
                    <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-bold">شناسه اقتصادی:</div>
                  <div class="col">0481038280</div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-bold">شناسه کارگاه بیمه:</div>
                  <div class="col">0481038280</div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-bold">شماره ثبت:</div>
                  <div class="col">0481038280</div>
                </div>
                <div class="row items-center">
                  <div class="col-3 text-bold">تاریخ ثبت:</div>
                  <div class="col">0481038280</div>
                </div>
                <div class="row">
                  <div class="col-3 text-bold">شرح:</div>
                  <div class="col">
                    این یک متن آزمایشی است که توسط خشایار شمالی برای آزمایش
                    شرح نوشته شده است و معنای خاصی ندارد.
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

        </q-expansion-item>

        <q-expansion-item expand-separator group="basicInfo" class="last basic-info">
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
              <q-btn unelevated @click="addCustomField" class="bg-primary text-white full-width q-pa-md">
                <q-icon name="o_add" class="q-mr-xs" />
                <span>افزودن آیتم جدید</span>
              </q-btn>
              <div class="row bordered-1 q-pa-md q-mt-md items-center">
                <div class="col">
                  <div class="text-caption">
                    <span class="text-body2 no-letter-spacing q-mr-sm">تلفن خانه:</span>
                    <span>02155511102</span>
                  </div>
                </div>
                <div class="col-3 row justify-end items-center">
                  <div class="row items-center">
                    <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" />
                    <q-btn unelevated @click="deleteAlert" round class="text-on-dark" size="sm" icon="o_delete" />
                  </div>
                </div>
              </div>
              <div class="row bordered-1 q-pa-md q-mt-md items-center">
                <div class="col">
                  <div class="text-caption">
                    <span class="text-body2 text-weight-700 no-letter-spacing q-mr-sm">تلفن خانه:</span>
                    <span class="text-body2 no-letter-spacing">02155511102</span>
                  </div>
                </div>
                <div class="col-3 row justify-end items-center">
                  <div class="row items-center">
                    <q-btn unelevated round class="text-on-dark" size="sm" icon="o_edit" />
                    <q-btn unelevated @click="deleteAlert" round class="text-on-dark" size="sm" icon="o_delete" />
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

import AddCustomField from "components/areas/crm/customer/desktop/preview/AddCustomField.vue";
import EditCustomerData from "components/areas/crm/customer/desktop/preview/EditCustomerDataDialog.vue";

const phoneItems = [
  { name: "تلفن خانه", value: "02155511102", original: true },
  { name: "موبایل", value: "09338603196" },
  { name: "تلفن محل کار", value: "02144990022" },
];

const addressItems = [
  { name: "آدرس کارخانه", value: "شابدل عظیم - نزدیکا حرم", original: true },
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
