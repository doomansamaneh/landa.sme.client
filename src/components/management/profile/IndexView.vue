<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="q-mx-sm">
      <div class="row items-center q-gutter-x-sm">
        <span class="text-h6">اطلاعات بیشتر</span>
      </div>
    </q-toolbar>
  </q-page-sticky>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey q-mt-md"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab
      name="profile"
      label="نمایه"
    />
    <q-tab
      name="quotes"
      label="پیش‌فاکتورها"
    />
    <q-tab
      name="invoices"
      label="فاکتورهای فروش"
    />
    <q-tab
      name="accountSummary"
      label="خلاصه حساب"
    />
    <q-tab
      name="note"
      label="یادداشت"
    />
    <q-tab
      name="history"
      label="تاریخچه"
    />
  </q-tabs>

  <q-separator />

  <q-tab-panels
    class="bordered border-radius-xs"
    v-model="tab"
    animated
  >
    <q-tab-panel name="profile">
      <div class="row justify-center">
        <div class="col-4 profile-section q-pa-xl">
          <div class="column items-center">
            <q-avatar size="150px">
              <img
                class="avatar"
                src="https://cdn.quasar.dev/img/avatar4.jpg"
              >
            </q-avatar>
            <div class="text-subtitle1 q-mt-md">خشایار شمالی</div>
            <div class="q-item__label--caption text-on-dark">توسعه دهنده وب</div>
            <div class="column q-py-lg q-gutter-md">
              <q-btn
                flat
                class="bg-primary text-white"
              >آپلود تصویر جدید</q-btn>
              <q-btn
                outline
                class="text-on-dark"
              >حذف</q-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <q-separator
            vertical
            inset
            class="q-mx-lg"
          />
        </div>
        <div class="col q-py-lg q-pr-lg q-pl-xl q-pr-xl">
          <div class="row justify-between items-center">
            <div class="text-on-dark text-bold text-body1">اطلاعات پایه</div>
            <div class="q-gutter-md">
              <q-btn
                flat
                class="bg-primary text-white"
              >
                <q-icon
                  name="o_edit"
                  size="xs"
                  class="q-mr-xs"
                />
                <span>ویرایش</span>
              </q-btn>
            </div>
          </div>
          <q-separator class="q-mt-md" />
          <div class="q-pt-md">
            <q-list
              bordered
              class="rounded-borders"
            >
              <q-expansion-item
                group="basicInfo"
                default-opened
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_headset_mic"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle1">
                    تماس
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">تلفن خانه:</span>
                          <span>02155511102</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item group="basicInfo">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_my_location"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    نشانی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">آدرس خانه:</span>
                          <span>تهران - شهرری - خیابان شهید رجایی - شهرک سیزده آبان - خیابان شهید رحیمی - خیابان شهید
                            عنایی - کوچه مهر 2 - پلاک 22</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item group="basicInfo">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_credit_card"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    حساب بانکی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg">
                      <div class="col q-gutter-sm">
                        <div class="row text-caption items-center">
                          <q-icon
                            name="o_account_balance"
                            color="primary"
                            size="xs"
                          />
                          <span class="text-bold q-ml-sm">بانک تجارت</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره حساب:</span>
                          <span>0481038280</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره کارت:</span>
                          <span>5859831129809389</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره شبا:</span>
                          <span>0000128550232209</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item group="basicInfo">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_business"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    کسب و کار
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <div class="q-gutter-md text-caption">
                      <div class="row items-center">
                        <div class="col-3 text-bold">شناسه ملی:</div>
                        <div class="col">0481038280</div>
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
                      <div class="row items-center">
                        <div class="col-3 text-bold">شرح:</div>
                        <div class="col">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
                          to demonstrate the visual form of a document or a typeface without relying on meaningful
                          content. Lorem ipsum may be used as a placeholder before final copy is available.</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item group="basicInfo">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_star"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    فیلدهای سفارشی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">تلفن خانه:</span>
                          <span>02155511102</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="quotes">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="invoices">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="accountSummary">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="note">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="history">
      <div class="q-pa-lg">
        <q-timeline color="accent">
          <q-timeline-entry
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            v-for="item in items"
            :key="item"
          >

            <template #default>
              <q-card class="bordered q-ma-xl">
                <q-card-section class="bg-primary row justify-center items-center">
                  <span class="text-white">{{ item.date }}</span>
                </q-card-section>
                <q-card-section class="row justify-center items-center">
                  <div class="column text-body1 q-gutter-md items-center q-pa-lg">
                    <span>{{ item.name }}</span>
                    <q-badge class="q-px-md q-py-sm"><q-icon
                        :name="item.icon"
                        class="q-mr-xs"
                        size="sm"
                      /><span class="text-body1">{{ item.value }}</span></q-badge>
                  </div>
                </q-card-section>
              </q-card>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue"
import "src/helpers/extensions";
const date = new Date()

const tab = ref('profile')

const items = [
  { name: "خشایار شمالی", icon: "o_add", date: "1402/07/22", value: "ایجاد مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/21", value: "ویرایش مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/20", value: "ویرایش مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/18", value: "ویرایش مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/10", value: "ویرایش مخاطب" },
]

</script>

<style lang="scss">
.profile-section {
  width: 400px;
}
</style>

