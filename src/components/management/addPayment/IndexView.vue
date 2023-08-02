<template>
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-bold text-subtitle1">{{
          $t("page.renew-subscription.title")
        }}</q-item-label>
        <q-item-label class="dark-2 q-pt-xs" caption>
          {{ $t("page.renew-subscription.caption") }}
        </q-item-label>
      </q-item-section>
      <q-card-actions>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip class="custom-tooltip">{{
              $t("page.buttons.back")
            }}</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-item class="q-px-lg column q-mb-md">
      <q-form @submit="onSubmit">
        <div class="row items-center">
          <div class="col-2 q-my-lg">
            <q-item-label>{{
              $t("page.renew-subscription.business-name-label")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="text-bold q-pl-xs"
              >دومان سامانه برای تست و انجام کارهای دمو</span
            >
          </div>
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.current-plan")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs"
              >طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
              دستمزد)</span
            >
          </div>
          <div class="col-2 q-my-lg">
            <q-item-label>{{
              $t("page.renew-subscription.to-date")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">1403/03/23</span>
          </div>
          <div class="col-2">
            <q-item-label class="required-label"
              ><span>{{
                $t("page.renew-subscription.plan")
              }}</span></q-item-label
            >
          </div>
          <div class="row col-10">
            <lookup-view
              dataSource="business/getBusinessGridData"
              orderByField="title"
              searchField="b.title"
              ref="lookup"
            >
              <template #th>
                <th class="" style="width: 5%">
                  <span>#</span>
                </th>
                <th class="" style="width: 50%">
                  <q-icon
                    v-if="pagination.sortBy === 'title'"
                    :name="
                      pagination.descending
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'
                    "
                    size="20px"
                    color="primary"
                  />
                  <span @click="sortColumn('title')" class="cursor-pointer"
                    >عنوان</span
                  >
                </th>
                <th class="" style="width: 30%">
                  <q-icon
                    v-if="pagination.sortBy === 'payedAmount'"
                    :name="
                      pagination.descending
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'
                    "
                    size="20px"
                    color="primary"
                  />
                  <span
                    class="cursor-pointer"
                    @click="sortColumn('payedAmount')"
                    >هزینه ماهانه</span
                  >
                </th>
              </template>
              <template #td="{ item }">
                <td>{{ item.statusId }}</td>
                <td>
                  <span>{{ item.title }}</span>
                </td>
                <td>{{ item.payedAmount }}</td>
              </template>
            </lookup-view>
            <contact-lookup class="bg-grey-2"> </contact-lookup>
          </div>
          <div class="col-2 required-label">
            <q-item-label>{{
              $t("page.renew-subscription.extension-period")
            }}</q-item-label>
          </div>
          <div class="row col-10">
            <q-select
              hide-dropdown-icon
              v-model="selectedPeriod"
              :options="period"
              dense
              required
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'پر کردن این فیلد الزامی است'
              ]"
              outlined
              auto-close
              class="period-select"
              use-chips
            >
              <template #append>
                <!-- <q-icon
                ref="clearSearch"
                name="clear"
                size="16px"
                color="primary"
                v-if="selectedPeriod && selectedPeriod.length > 0"
                class="cursor-pointer"
                @click="clearSelection"
              /> -->
                <q-icon
                  name="o_expand_more"
                  class="show-lookup-icon cursor-pointer"
                  size="sm"
                />
              </template>
            </q-select>
          </div>
          <div
            class="total glass row q-mt-lg q-mb-md full-width justify-between items-center q-px-xl"
          >
            <div class="row col-6 q-gutter-y-lg">
              <div class="col-7">
                <span>{{
                  $t("page.renew-subscription.loyalty-discount")
                }}</span>
              </div>
              <div class="col-4"><span>36,000</span></div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.total") }}</span>
              </div>
              <div class="col-4"><span>149,000</span></div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.discount") }}</span>
              </div>
              <div class="col-4"><span>0</span></div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.sum-total") }}</span>
              </div>
              <div class="col-4"><span class="text-bold">149,000</span></div>
            </div>
            <div class="sadad col-6 row justify-center items-center">
              <div class="row justify-center q-gutter-x-md">
                <q-radio
                  v-model="shape"
                  checked-icon="task_alt"
                  val="line"
                  color=""
                  size="md"
                >
                  <q-tooltip class="custom-tooltip text-body1">
                    <span class="sadad-tooltip"
                      >پرداخت تنها از طریق درگاه پرداخت الکترونیکی سداد امکان
                      پذیر است</span
                    >
                  </q-tooltip>
                </q-radio>
                <div class="">
                  <img
                    src="../../../../public/sadad-new.png"
                    alt="درگاه پرداخت الکترونیک سداد"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center q-mt-sm">
          <q-btn
            type="submit"
            unelevated
            rounded
            color="positive"
            no-caps
            padding="8px 16px"
            class=""
            ><q-icon name="o_monetization_on" class="q-pr-xs" size="xs" />
            {{ $t("page.renew-subscription.buttons.payment") }}
          </q-btn>
          <span class="text-caption q-pl-md"
            >پرداخت از همه کارتهای شتاب امکان پذیر است. برای پرداخت باید رمز دوم
            کارت خود را فعال کرده باشید.</span
          >
        </div>
      </q-form>
    </q-item>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useQuasar } from "quasar"
import DataView from "src/components/shared/DataView.vue"
import LookupView from "src/components/shared/LookupView.vue"
import ContactLookup from "src/components/shared/ContactLookup.vue"

const $q = useQuasar()
const lookup = ref(null)
const pagination = ref(null)
const period = [
  "1 ماه",
  "3 ماه",
  "6 ماه (6 درصد تخفیف)",
  "12 ماه (15 درصد تخفیف)"
]

const shape = ref("line")
const selectedPeriod = ref(period[0])

function selectPeriod(item) {
  selectedPeriod.value = item
}

function clearSelection() {
  selectedPeriod.value = ""
}

const onSubmit = () => {
  $q.notify({
    type: "positive",
    message: "عملیات با موفقیت انجام شد",
    timeout: 1500
  })
}

function sortColumn(columnName) {
  lookup.value.sortSelectedColumn(columnName)
}

onMounted(() => {
  pagination.value = lookup.value.pagination
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 720px !important;
}

.period-select {
  width: 400px;
}

.total {
  border-radius: 4px;
  height: 300px;
}

th,
td {
  padding: 16px 16px;
}

table {
  border-collapse: collapse;
  border: none;
}

.input {
  width: 400px;
}

.selected-row {
  background-color: #f4fcd1 !important;
}

tbody tr:hover {
  background-color: #f3f3f3;
}

.sadad {
  border-radius: 4px;
}

.glass {
  background: #ffffff33;
  border-radius: 4px;
  box-shadow: 0 2px 20px #0000001a;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #ffffff4d;
}

.required-label {
  margin-bottom: 20px;
}
</style>
