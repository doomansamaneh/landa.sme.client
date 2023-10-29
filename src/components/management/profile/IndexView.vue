<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="row justify-between q-py-md q-mx-sm">
      <div class="row items-center q-gutter-md">
        <q-avatar size="48px">
          <img
            class="avatar"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          >
        </q-avatar>
        <div class="column q-mt-md">
          <q-item-label><span class="text-body2">خشایار شمالی</span></q-item-label>
          <q-item-label caption><span class="text-body2">توسعه دهنده وب</span></q-item-label>
        </div>
      </div>
      <div class="row q-gutter-sm text-h6">
        <q-btn
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
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
          @click="editProfile"
        >
          <q-icon
            name="o_edit"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.edit") }}
        </q-btn>
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
        >
          <q-icon
            name="o_delete"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.delete") }}
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
      </div>
    </q-toolbar>
  </q-page-sticky>
  <div class="row q-gutter-md q-mt-xl">
    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            ><span class="text-bold text-caption">18</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">فاکتورها</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">240,000,000<span
              class="text-body1 text-bold text-on-dark-1"
            >ریال</span></div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            ><span class="text-bold text-caption">0</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">مانده حساب</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">0<span
              class="text-body1 text-bold text-on-dark-1">ریال</span></div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            ><span class="text-bold text-caption">4</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">بدهکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">2,000,000<span
              class="text-body1 text-bold text-on-dark-1 q-gutter-xs"
            >ریال</span></div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge
              rounded
              class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
            ><span class="text-bold text-caption">9</span></q-badge><span
              class="text-bold text-caption text-on-dark-1">بستانکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">158,300,020<span
              class="text-body1 text-bold text-on-dark-1"
            >ریال</span></div>
        </q-card-section>
      </q-card>
    </div>

  </div>
  <q-tabs
    v-model="tab"
    class="border-radius-xs bg-primary text-white q-mt-xl"
    indicator-color="white"
    align="justify"
    inline-label
    narrow-indicator
  >
    <q-tab
      name="profile"
      label="نمایه"
      icon="o_person"
    />
    <q-tab
      name="quotes"
      label="پیش‌فاکتورها"
      icon="o_assignment"
    />
    <q-tab
      name="invoices"
      label="فاکتورهای فروش"
      icon="o_receipt"
    />
    <q-tab
      name="accountSummary"
      label="خلاصه حساب"
      icon="o_summarize"
    />
    <q-tab
      name="history"
      label="تاریخچه"
      icon="o_history"
    />
  </q-tabs>

  <q-tab-panels
    class="bordered border-radius-xs q-mt-md"
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
            <div class="column items-center q-mt-md">
              <q-item-label><span class="text-subtitle1">خشایار شمالی</span></q-item-label>
              <q-item-label caption><span class="text-body2">توسعه دهنده وب</span></q-item-label>
            </div>
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
          </div>
          <q-separator class="q-mt-md" />
          <div class="q-py-md">
            <q-list
              bordered
              class="rounded-borders"
            >
              <q-expansion-item
                expand-separator
                group="basicInfo"
                default-opened
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_headset_mic"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle2">
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
                      <q-menu touch-position>
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
                                    name="o_call"
                                    size="14px"
                                  /></q-avatar>
                              </q-item-section>
                            </div>
                            <q-item-section>
                              <div class="text-caption">تلفن</div>
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
                                    name="o_mail"
                                    size="14px"
                                  /></q-avatar>
                              </q-item-section>
                            </div>
                            <q-item-section>
                              <div class="text-caption">ایمیل</div>
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
                                    name="o_share"
                                    size="14px"
                                  /></q-avatar>
                              </q-item-section>
                            </div>
                            <q-item-section>
                              <div class="text-caption">شبکه‌های اجتماعی</div>
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
                                    name="o_phone_android"
                                    size="14px"
                                  /></q-avatar>
                              </q-item-section>
                            </div>
                            <q-item-section>
                              <div class="text-caption">موبایل</div>
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
                                    name="o_public"
                                    size="16px"
                                  /></q-avatar>
                              </q-item-section>
                            </div>
                            <q-item-section>
                              <div class="text-caption">وبسایت</div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                    <div
                      v-for="item in phoneItems"
                      :key="item"
                    >
                      <div class="row bordered-1 q-pa-md q-my-md items-center">
                        <div class="col">
                          <div class="text-caption">
                            <q-icon
                              v-if="item.original"
                              name="o_check_circle"
                              class="q-mr-xs"
                              size="sm"
                              color="primary"
                            />
                            <span class="text-bold q-mr-sm">{{ `${item.name}:` }}</span>
                            <span class="">{{ item.value }}</span>
                          </div>
                        </div>
                        <div class="col-2 row justify-end items-center">
                          <div class="row items-center">
                            <q-btn
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_edit"
                              @click="editData"
                            />
                            <q-btn
                              @click="deleteAlert"
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_delete"
                            />
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
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_my_location"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle2">
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
                    <div
                      v-for="item in addressItems"
                      :key="item"
                    >
                      <div class="row bordered-1 q-pa-md q-my-md items-center">
                        <div class="col">
                          <div class="text-caption">
                            <q-icon
                              v-if="item.original"
                              name="o_check_circle"
                              class="q-mr-xs"
                              size="sm"
                              color="primary"
                            />
                            <span class="text-bold q-mr-sm">{{ `${item.name}:` }}</span>
                            <span>{{ item.value }}</span>
                          </div>
                        </div>
                        <div class="col-2 row justify-end items-center">
                          <div class="row items-center">
                            <q-btn
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_edit"
                            />
                            <q-btn
                              @click="deleteAlert"
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_delete"
                            />
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
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_credit_card"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle2">
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
                    <div
                      v-for="item in bankAccountDetail"
                      :key="item"
                      class="row bordered-1 q-pa-md q-my-md"
                    >
                      <div class="col q-gutter-y-sm">
                        <div class="row text-caption items-center justify-between">
                          <div class="row">
                            <q-icon
                              name="o_account_balance"
                              color="primary"
                              size="xs"
                            />
                            <span class="text-bold q-ml-sm">{{ item.bankName }}</span>
                          </div>
                          <div class="row items-center">
                            <q-btn
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_edit"
                            />
                            <q-btn
                              @click="deleteAlert"
                              unelevated
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_delete"
                            />
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
              <q-expansion-item
                expand-separator
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_business"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle2">
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
                          <q-btn
                            unelevated
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
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
                        <div class="col">این یک متن آزمایشی است که توسط خشایار شمالی برای آزمایش شرح نوشته شده است و معنای
                          خاصی ندارد.</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                expand-separator
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_star"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle2">
                    فیلدهای سفارشی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      @click="addCustomField"
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-md items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">تلفن خانه:</span>
                          <span>02155511102</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row items-center">
                          <q-btn
                            unelevated
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            unelevated
                            @click="deleteAlert"
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row bordered-1 q-pa-md q-mt-md items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">تلفن خانه:</span>
                          <span>02155511102</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row items-center">
                          <q-btn
                            unelevated
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            unelevated
                            @click="deleteAlert"
                            round
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
      <div class="q-pa-md">
        <invoice />
      </div>
    </q-tab-panel>

    <q-tab-panel name="invoices">
      <div class="q-pa-md">
        <invoice :grid-store="invoiceStore" />
      </div>
    </q-tab-panel>

    <q-tab-panel name="accountSummary">
      <div class="q-pa-md">
        <div class="row q-gutter-md q-mb-xl">

          <div class="col">
            <q-card class="info-box no-shadow bordered-1">
              <q-card-section class="q-gutter-md">
                <div class="">
                  <q-badge
                    rounded
                    class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                  ><span class="text-bold text-caption">18</span></q-badge><span
                    class="text-bold text-caption text-on-dark-1"
                  >فاکتورها</span>
                </div>
                <div class="text-h6 text-bold text-on-dark q-gutter-xs">240,000,000<span
                    class="text-body1 text-bold text-on-dark-1"
                  >ریال</span></div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col">
            <q-card class="info-box no-shadow bordered-1">
              <q-card-section class="q-gutter-md">
                <div class="">
                  <q-badge
                    rounded
                    class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                  ><span class="text-bold text-caption">0</span></q-badge><span
                    class="text-bold text-caption text-on-dark-1"
                  >مانده حساب</span>
                </div>
                <div class="text-h6 text-bold text-on-dark q-gutter-xs">0<span
                    class="text-body1 text-bold text-on-dark-1">ریال</span></div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col">
            <q-card class="info-box no-shadow bordered-1">
              <q-card-section class="q-gutter-md">
                <div class="">
                  <q-badge
                    rounded
                    class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                  ><span class="text-bold text-caption">4</span></q-badge><span
                    class="text-bold text-caption text-on-dark-1"
                  >بدهکار</span>
                </div>
                <div class="text-h6 text-bold text-on-dark q-gutter-xs">2,000,000<span
                    class="text-body1 text-bold text-on-dark-1 q-gutter-xs"
                  >ریال</span></div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col">
            <q-card class="info-box no-shadow bordered-1">
              <q-card-section class="q-gutter-md">
                <div class="">
                  <q-badge
                    rounded
                    class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                  ><span class="text-bold text-caption">9</span></q-badge><span
                    class="text-bold text-caption text-on-dark-1"
                  >بستانکار</span>
                </div>
                <div class="text-h6 text-bold text-on-dark q-gutter-xs">158,300,020<span
                    class="text-body1 text-bold text-on-dark-1"
                  >ریال</span></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <invoice />
      </div>
    </q-tab-panel>

    <q-tab-panel name="history">
      <div
        style="margin: 24px 56px 0 56px;"
        class="q-gutter-y-md"
      >
        <div class="text-body1"><q-icon
            name="o_comment"
            size="sm"
            class="icon q-pr-sm"
          />یادداشت</div>
        <q-editor
          v-model="editor"
          placeholder="در اینجا می‌توانید یادداشت بگذارید..."
        />
        <q-btn
          @click="saveComment"
          flat
          rounded
          class="bg-primary text-white"
        >
          <q-icon
            name="o_comment"
            size="xs"
            class="q-mr-sm"
          />
          <span>ذخیره</span>
        </q-btn>
      </div>
      <div class="q-my-xl q-mx-md">
        <div
          class="q-pb-md text-body1"
          style="margin: 0 38px;"
        ><q-icon
            name="o_history"
            size="sm"
            class="icon q-pr-sm"
          />تاریخچه</div>
        <q-timeline color="accent">
          <q-timeline-entry
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            v-for="item in items"
            :key="item"
          >
            <template #default>
              <q-card class="bordered-1 no-shadow q-mx-xl q-pa-md">
                <q-card-section class="row justify-between items-center">
                  <div class="row items-center q-gutter-sm">
                    <q-icon
                      :name="item.icon"
                      size="sm"
                      color="accent"
                      class="q-mr-sm"
                    />
                    <div class="text-caption text-bold">{{ item.name }}</div>
                    <div class="row items-center">
                      <span class="text-caption">چند دقیقه پیش</span>
                      <q-tooltip
                        transition-show="scale"
                        transition-hide="scale"
                        anchor="center left"
                        self="center right"
                        :offset="[10, 10]"
                        :delay="700"
                        class="glass text-on-dark text-caption"
                      >
                        {{ item.date }}
                      </q-tooltip>
                    </div>
                  </div>
                  <div class="row text-caption">
                    {{ item.systemInfo }}
                  </div>
                </q-card-section>
                <q-card-section v-if="item.commentValue">
                  <p
                    class="line-height-sm"
                    contenteditable="true"
                    v-show="!editCommentBtn"
                  >
                    {{ item.comment }}
                  </p>
                  <div
                    class="q-gutter-y-md"
                    v-show="editCommentBtn"
                  >
                    <q-editor v-model="editCommentValue" />
                    <div class="q-gutter-x-sm">
                      <q-btn
                        @click="editCommentBtn = false"
                        flat
                        rounded
                        class="bg-primary text-white"
                      >
                        <q-icon
                          name="o_comment"
                          size="xs"
                          class="q-mr-sm"
                        />
                        <span>ذخیره</span>
                      </q-btn>
                      <q-btn
                        @click="editCommentBtn = false"
                        unelevated
                        rounded
                        class="text-on-dark"
                      >
                        <q-icon
                          name="o_close"
                          size="xs"
                          class="q-mr-xs"
                        />
                        <span>انصراف</span>
                      </q-btn>
                    </div>
                  </div>
                  <div
                    v-if="!editCommentBtn"
                    class="row justify-end"
                  >
                    <q-btn
                      @click="editComment"
                      unelevated
                      rounded
                      class="text-on-dark"
                    >
                      <q-icon
                        name="o_edit"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>ویرایش</span>
                    </q-btn>
                    <q-btn
                      @click="deleteAlert"
                      unelevated
                      rounded
                      class="text-on-dark"
                    >
                      <q-icon
                        name="o_delete"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>حذف</span>
                    </q-btn>
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
import { ref, onMounted, computed } from "vue"
import DeleteAlert from "/src/components/management/profile/DeleteAlert.vue"
import EditProfile from "src/components/management/profile/editProfileDialog.vue"
import { useQuasar } from "quasar"
import "src/helpers/extensions";
import Invoice from "src/components/areas/crm/customer/_InvoiceDataTable.vue"
import EditCustomerData from "src/components/management/profile/EditCustomerDataDialog.vue"
import AddCustomField from "src/components/management/profile/AddCustomField.vue"

import { useInvoice } from "src/components/areas/crm/_composables/useInvoice"
const invoiceStore = useInvoice()

const date = new Date()
const $q = useQuasar()

const tab = ref('profile')
const editor = ref('')
const editCommentBtn = ref(false)
const phoneItems = [
  { name: "تلفن خانه", value: "02155511102", original: true },
  { name: "موبایل", value: "09338603196" },
  { name: "تلفن محل کار", value: "02144990022" },
]
const addressItems = [
  { name: "آدرس کارخانه", value: "شابدل عظیم - نزدیکا حرم", original: true },
  { name: "آدرس اداره", value: "پارک دانشجو - تیاتر شهر" },
  { name: "آدرس خانه", value: "خیابان شهید رجایی - شهرک سیزده آبان - خیابان شهید رحیمی - خیابان شهید عنایتی - کوچه مهر 2 - پلاک 22" },

]

const bankAccountDetail = [
  { bankName: 'تجارت', accountNumber: '0481038280', cardNumber: '5859831129809389', shabaNumber: '0000128550232209' },
  { bankName: 'تجارت', accountNumber: '0481038280', cardNumber: '5859831129809389', shabaNumber: '0000128550232209' },
  { bankName: 'تجارت', accountNumber: '0481038280', cardNumber: '5859831129809389', shabaNumber: '0000128550232209' },
]
const items = [
  { name: "خشایار شمالی", icon: "o_add", date: "1402/07/22 - 15:05:30", value: "ایجاد مخاطب", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "o_maps_ugc", date: "1402/07/22 - 15:05:30", value: "ایجاد یادداشت جدید", commentValue: "true", comment: "این یک متن تستی است که توسط خشایار شمالی برای آزمایش کامنت‌ها در تایم لاین سیستم حسابداری آنلاین لاندا ایجاد شده است و فاقد هرگونه اعتباری است.", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/21", value: "ویرایش مخاطب", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/20", value: "ویرایش مخاطب", systemInfo: "MacOS 192.188.70.290" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/18", value: "ویرایش مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/10", value: "ویرایش مخاطب" },
]

const editCommentValue = ref(items[1].comment)

const saveComment = () => {
  if (editor.value.trim() !== "") {
    const newComment = {
      name: "خشایار شمالی",
      icon: "comment",
      date: "1402/07/24",
      commentValue: true,
      comment: editor.value,
      systemInfo: "MacOS 192.188.90.90",
    };

    items.push(newComment);
    editor.value = "";
  }
}

const deleteComment = (comment) => {
  const index = items.indexOf(comment);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

const editComment = () => {

  editCommentBtn.value = !editCommentBtn.value

}

const deleteAlert = () => {
  $q.dialog({
    component: DeleteAlert
  })
}

const editProfile = () => {
  $q.dialog({
    component: EditProfile
  })
}

const editData = () => {
  $q.dialog({
    component: EditCustomerData
  })
}

const addCustomField = () => {
  $q.dialog({
    component: AddCustomField
  })
}
</script>

<style lang="scss">
.profile-section {
  width: 400px;
}

.info-box:hover {
  border: 1px solid var(--q-primary) !important;
  cursor: pointer;
}
</style>

