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
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_headset_mic"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    تماس
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon
                      name="o_location_on"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    نشانی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
          <!-- <div class="q-pt-xl row q-gutter-md">
            <div class="col q-gutter-sm">
              <span class="text-bold text-on-dark">نام</span>
              <q-input
                outlined
                dense
              />
            </div>
            <div class="col q-gutter-sm">
              <span class="text-bold text-on-dark">نام و نام‌خانوادگی</span>
              <q-input
                outlined
                dense
              />
            </div>
          </div> -->
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
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue"

const tab = ref('profile')

</script>

<style lang="scss">
.profile-section {
  width: 400px;
}
</style>

