<template>
  <q-card class="dialog-card no-shadow">
    <q-card-section class="header z-top bg-dark row items-center q-pa-lg">
      <div class="text-h6">
        ویرایش مخاطب
      </div>
      <q-space />
      <q-btn
        icon="close"
        class="icon-hover dark-3"
        flat
        round
        dense
        v-close-popup
      />
    </q-card-section>

    <q-scroll-area
      style="height: 400px;"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <q-card-section>
        <q-form
          ref="form"
          autofocus
          class="q-px-sm"
        >
          <div class="row q-gutter-xl">
            <div class="col-4">
              <div class="row justify-center items-center">
                <q-avatar
                  size="200px"
                  class="q-my-md"
                >
                  <img
                    class="avatar"
                    src="https://cdn.quasar.dev/img/avatar4.jpg"
                  >
                </q-avatar>
              </div>
              <div class="column q-px-xl q-mt-md q-gutter-md">
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
            <div class="col q-pr-lg">
              <div class="q-gutter-md">
                <div>
                  <q-item-label
                    caption
                    class="q-mb-sm"
                  >نام و نام خانوادگی</q-item-label>
                  <q-input
                    outlined
                    dense
                  />
                </div>
                <div class="row">
                  <div class="col-8">
                    <q-item-label
                      caption
                      class="q-mb-sm"
                    >کد</q-item-label>
                    <q-input
                      outlined
                      dense
                    />
                  </div>
                  <div class="col q-ml-lg">
                    <q-item-label
                      caption
                      class="q-mb-sm"
                    >جنسیت</q-item-label>
                    <div class="row q-pt-xs q-gutter-md">
                      <q-radio
                        name="shape"
                        v-model="gender"
                        val="man"
                        label="مرد"
                        dense
                      />
                      <q-radio
                        name="shape"
                        v-model="gender"
                        val="woman"
                        label="زن"
                        dense
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <q-item-label
                    caption
                    class="q-mb-sm"
                  >واحد سازمانی</q-item-label>
                  <!-- <organ-unit-lookup /> -->
                </div>
                <div>
                  <q-item-label
                    caption
                    class="q-mb-sm"
                  >نقش</q-item-label>
                  <div class="q-gutter-sm q-pt-xs">
                    <q-checkbox
                      dense
                      v-model="type"
                      val="customer"
                      label="مشتری"
                    />
                    <q-checkbox
                      dense
                      v-model="type"
                      val="supplier"
                      label="تامین کننده"
                    />
                    <q-checkbox
                      dense
                      v-model="type"
                      val="marketer"
                      label="بازاریاب"
                    />
                    <q-checkbox
                      dense
                      v-model="type"
                      val="shareholder"
                      label="سهامدار"
                    />
                    <q-checkbox
                      dense
                      v-model="type"
                      val="personnel"
                      label="پرسنل"
                    />
                  </div>
                </div>
                <div>
                  <q-item-label
                    caption
                    class="q-mb-sm"
                  >شرح</q-item-label>
                  <q-input
                    v-model="text"
                    outlined
                    type="textarea"
                    autogrow
                  />
                </div>
                <div>
                  <q-item-label
                    caption
                    class="q-mb-sm"
                  >وضعیت</q-item-label>
                  <q-checkbox
                    dense
                    v-model="status"
                    label="فعال"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-tabs
            v-model="tab"
            class="border-radius-xl bg-primary text-white q-mt-xl"
            indicator-color="white"
            align="justify"
            inline-label
            narrow-indicator
          >
            <q-tab
              name="personal-info"
              label="اطلاعات شخصی"
              icon="o_accessibility"
            />
            <q-tab
              name="business-info"
              label="اطلاعات کسب و کار"
              icon="o_business"
            />
            <q-tab
              name="location-info"
              label="نشانی"
              icon="o_my_location"
            />
            <q-tab
              name="contact-info"
              label="تماس"
              icon="o_headset_mic"
            />
          </q-tabs>

          <q-tab-panels
            class="bordered no-shadow border-radius-xs q-mt-md"
            v-model="tab"
            animated
          >
            <q-tab-panel name="personal-info">
              <q-form
                ref="form"
                autofocus
                class="q-pa-md"
              >
                <div class="row q-gutter-lg">
                  <div class="col">
                    <div class="q-gutter-md">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شرکت وابسته</q-item-label>
                        <organ-unit-lookup />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >کد ملی</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره بیمه</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >تاریخ تولد</q-item-label>
                        <date-time />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >تاریخ صدور</q-item-label>
                        <date-time />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >وضعیت نظام وظیفه</q-item-label>
                        <organ-unit-lookup />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >وضعیت تاهل</q-item-label>
                        <organ-unit-lookup />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >تعداد فرزند</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="q-gutter-md">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شغل</q-item-label>
                        <organ-unit-lookup />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره شناسنامه</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >ملیت</q-item-label>
                        <organ-unit-lookup />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >محل تولد</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >محل صدور</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >نام پدر</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >تاریخ ازدواج</q-item-label>
                        <date-time />
                      </div>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-tab-panel>
            <q-tab-panel name="business-info">
              <q-form
                ref="form"
                autofocus
                class="q-pa-md"
              >
                <div class="row q-gutter-lg">
                  <div class="col">
                    <div class="q-gutter-md">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شناسه ملی</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره ثبت</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره کارگاه بیمه</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="q-gutter-md">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شناسه اقتصادی</q-item-label>
                        <q-input
                          outlined
                          dense
                        />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >تاریخ ثبت</q-item-label>
                        <date-time />
                      </div>
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شرح</q-item-label>
                        <q-input
                          v-model="text"
                          outlined
                          type="textarea"
                          autogrow
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-tab-panel>
            <q-tab-panel name="location-info">
              <q-form
                ref="form"
                autofocus
                class="q-pa-md"
              >
                <div class="row q-gutter-lg">
                  <div class="col">
                    <div class="row q-gutter-lg">
                      <div class="col">
                        <div>
                          <q-item-label
                            caption
                            class="q-mb-sm"
                          >نوع تماس</q-item-label>
                          <organ-unit-lookup />
                        </div>
                      </div>
                      <div class="col">
                        <div>
                          <q-item-label
                            caption
                            class="q-mb-sm"
                          >محل جغرافیایی</q-item-label>
                          <organ-unit-lookup />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="q-my-md">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >نشانی</q-item-label>
                      <q-input
                        v-model="text"
                        outlined
                        type="textarea"
                        autogrow
                      />
                    </div>
                  </div>
                </div>
                <div class="row q-gutter-x-lg">
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >طبقه</q-item-label>
                      <q-input
                        outlined
                        dense
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >بخش</q-item-label>
                      <q-input
                        outlined
                        dense
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >اتاق</q-item-label>
                      <q-input
                        outlined
                        dense
                      />
                    </div>
                  </div>
                </div>
                <div class="row q-gutter-x-lg q-mt-md">
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >کد پستی</q-item-label>
                      <q-input
                        outlined
                        dense
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >صندوق پستی</q-item-label>
                      <q-input
                        outlined
                        dense
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >وضعیت</q-item-label>
                      <q-checkbox
                        dense
                        v-model="type"
                        val="customer"
                        label="اصلی"
                      />
                    </div>
                  </div>
                </div>
              </q-form>
            </q-tab-panel>
            <q-tab-panel name="contact-info">
              <div class="row justify-end q-pt-sm q-pr-sm">
                <q-btn
                  filled
                  unelevated
                  rounded
                  padding="4px 12px"
                  class="bg-primary text-white text-on-dark"
                ><q-icon
                    name="o_add"
                    size="xs"
                    class="q-mr-xs"
                  />افزودن فیلد جدید
                  <q-menu class="border-radius-xl"
                    :offset="[0, 20]"
                    fit
                  >
                    <q-list
                      dense
                      padding
                    >
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="bg-on-dark"
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
                              class="bg-on-dark"
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
                              class="bg-on-dark"
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
                              class="bg-on-dark"
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
              </div>
              <div
                v-for="(item, index) in items"
                :key="index"
                class="q-pa-md q-gutter-y-md"
              >
                <div
                  class="row q-gutter-x-lg"
                  v-if="item.telephone"
                >
                  <div class="col-3">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >تلفن</q-item-label>
                      <organ-unit-lookup />
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-center q-gutter-lg">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره</q-item-label>
                        <q-input
                          outlined
                          dense
                          v-model="item.telephone"
                          style="width:250px"
                        />
                      </div>
                      <div class="q-gutter-x-sm q-pt-lg">
                        <!-- <q-btn
                          @click="addNewRow(index)"
                          filled
                          unelevated
                          rounded
                          padding="4px 12px"
                          class="bg-primary text-white text-on-dark"
                        ><q-icon
                            name="o_add"
                            size="xs"
                            class="q-mr-xs"
                          />جدید</q-btn> -->
                        <q-btn
                          round
                          unelevated
                          class="bg-negative text-white"
                          size="sm"
                          icon="o_delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div
                  class="row q-gutter-x-lg"
                  v-else
                >
                  <div class="col-3">
                    <q-btn
                      filled
                      unelevated
                      rounded
                      padding="4px 12px"
                      class="bg-primary text-white text-on-dark"
                    ><q-icon
                        name="o_call"
                        size="xs"
                        class="q-mr-sm"
                      />ایجاد تلفن</q-btn>
                  </div>
                </div> -->
                <div
                  class="row q-gutter-x-lg"
                  v-if="item.mobile"
                >
                  <div class="col-3">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >تلفن همراه</q-item-label>
                      <organ-unit-lookup />
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-center q-gutter-lg">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >شماره</q-item-label>
                        <q-input
                          outlined
                          v-model="item.mobile"
                          dense
                          style="width:250px"
                        />
                      </div>
                      <div class="q-gutter-x-sm q-pt-lg">
                        <!-- <q-btn
                          filled
                          unelevated
                          rounded
                          padding="4px 12px"
                          class="bg-primary text-white text-on-dark"
                        ><q-icon
                            name="o_add"
                            size="xs"
                            class="q-mr-xs"
                          />جدید</q-btn> -->
                        <q-btn
                          round
                          unelevated
                          class="bg-negative text-white"
                          size="sm"
                          icon="o_delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div
                  class="row q-gutter-x-lg"
                  v-else
                >
                  <div class="col-3">
                    <q-btn
                      filled
                      unelevated
                      rounded
                      padding="4px 12px"
                      class="bg-primary text-white text-on-dark"
                    ><q-icon
                        name="o_phone_android"
                        size="xs"
                        class="q-mr-sm"
                      />ایجاد موبایل</q-btn>
                  </div>
                </div> -->
                <div
                  class="row q-gutter-x-lg"
                  v-if="item.email"
                >
                  <div class="col-3">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >ایمیل</q-item-label>
                      <organ-unit-lookup />
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-center q-gutter-lg">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >آدرس</q-item-label>
                        <q-input
                          outlined
                          v-model="item.email"
                          dense
                          style="width:250px"
                        />
                      </div>
                      <div class="q-gutter-x-sm q-pt-lg">
                        <!-- <q-btn
                          filled
                          unelevated
                          rounded
                          padding="4px 12px"
                          class="bg-primary text-white text-on-dark"
                        ><q-icon
                            name="o_add"
                            size="xs"
                            class="q-mr-xs"
                          />جدید</q-btn> -->
                        <q-btn
                          round
                          unelevated
                          class="bg-negative text-white"
                          size="sm"
                          icon="o_delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div
                  class="row q-gutter-x-lg"
                  v-else
                >
                  <div class="col-3">
                    <q-btn
                      filled
                      unelevated
                      rounded
                      padding="4px 12px"
                      class="bg-primary text-white text-on-dark"
                    ><q-icon
                        name="o_mail"
                        size="xs"
                        class="q-mr-sm"
                      />ایجاد ایمیل</q-btn>
                  </div>
                </div> -->
                <div
                  class="row q-gutter-x-lg"
                  v-if="item.website"
                >
                  <div class="col-3">
                    <div>
                      <q-item-label
                        caption
                        class="q-mb-sm"
                      >وبسایت</q-item-label>
                      <organ-unit-lookup />
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-center q-gutter-lg">
                      <div>
                        <q-item-label
                          caption
                          class="q-mb-sm"
                        >آدرس</q-item-label>
                        <q-input
                          outlined
                          v-model="item.website"
                          dense
                          style="width:250px"
                        />
                      </div>
                      <div class="q-gutter-x-sm q-pt-lg">
                        <!-- <q-btn
                          filled
                          unelevated
                          rounded
                          padding="4px 12px"
                          class="bg-primary text-white text-on-dark"
                        ><q-icon
                            name="o_add"
                            size="xs"
                            class="q-mr-xs"
                          />جدید</q-btn> -->
                        <q-btn
                          round
                          unelevated
                          class="bg-negative text-white"
                          size="sm"
                          icon="o_delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div
                  class="row q-gutter-x-lg"
                  v-else
                >
                  <div class="col-3">
                    <q-btn
                      filled
                      unelevated
                      rounded
                      padding="4px 12px"
                      class="bg-primary text-white text-on-dark"
                    ><q-icon
                        name="o_public"
                        size="xs"
                        class="q-mr-sm"
                      />ایجاد وبسایت</q-btn>
                  </div>
                </div> -->
              </div>
              <div
                class="row items-center justify-center"
                v-if="items.length === 0"
              >
                <no-data-found />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-form>
      </q-card-section>
    </q-scroll-area>

    <actions
      @ok-clicked="submitForm"
      class="footer q-px-lg"
    >
      <template #ok-label>ذخیره</template>
    </actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
// import OrganUnitLookup from "src/com/ponents/shared/lookups/ProductGroupLookup.vue"
import Actions from "src/components/shared/forms/FormCardActions.vue"
import dateTime from "src/components/shared/forms/DateTimePicker.vue"
import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue"

const gender = ref(null)
const type = ref([])
const status = ref(false)
const tab = ref('personal-info')
const items = [
  { name: "خشایار شمالی", telephone: "02155511102", mobile: "09338603196", email: "shomalikhashayar@gmail.com", website: "www.landa-sme.ir" },
]

const showAddButton = ref(true);
const addedRows = ref([]);

const thumbStyle = {
  left: '4px',
  borderRadius: '5px',
  width: '6px',
  opacity: 0.75
}

const barStyle = {
  left: '2px',
  width: '8px',
  opacity: 0.2
}

const addNewRow = (index) => {
  const newRow = { telephone: '' };
  items.splice(index + 1, 0, newRow)
  addedRows.value.push(index);
};


</script>

<style scoped>
.dialog-card {
  min-width: 800px;
  border-radius: 8px;
}

.q-item__label--caption {
  font-size: 16px;
  letter-spacing: 0;
  color: #697588;
}

.header {
  position: sticky;
  top: 0;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
