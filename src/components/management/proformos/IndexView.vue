<template>
  <q-toolbar
    position="top"
    expand
    class="toolbar gt-xs bg-white text-white q-py-md q-px-lg"
  >
    <div class="q-gutter-x-md">
      <q-btn
        color="white bg-blue-7"
        icon="add_circle_outline"
        label="ایجاد"
        padding="8px 16px"
        rounded
        flat
        class="text-caption text-bold"
      />
      <q-btn
        color="grey-8"
        icon="o_edit"
        label="ویرایش"
        padding="8px 16px"
        outline
        rounded
        class="text-caption text-bold"
      />
      <q-btn
        color="grey-8"
        icon="o_delete"
        label="حذف"
        padding="8px 16px"
        outline
        rounded
        class="text-caption text-bold"
      />
      <q-btn
        color="grey-8"
        icon="o_more_horiz"
        label="بیشتر"
        padding="8px 16px"
        outline
        rounded
        class="text-caption text-bold"
      />
    </div>
  </q-toolbar>
  <div class="">
    <table class="full-width text-left">
      <thead>
        <tr class="table-head">
          <th>#</th>
          <th>
            <q-checkbox dense v-model="checkbox" color="primary" size="lg" />
          </th>
          <th style="width: 10%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>شماره</span>
          </th>
          <th style="width: 12%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>تاریخ</span>
          </th>
          <th style="width: 20%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>مشتری</span>
          </th>
          <th style="width: 20%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>شرح</span>
          </th>
          <th style="width: 12%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>جمع کل</span>
          </th>
          <th style="width: 8%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>تخفیف</span>
          </th>
          <th class="" style="width: 12%">
            <q-icon
              :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
              color="primary"
            />
            <span>نوع</span>
          </th>
          <th style="width: 15%">
            <span>وضعیت</span>
          </th>
        </tr>
        <tr class="bg-white">
          <th colspan="2">
            <q-icon name="search" size="52px" color="primary"></q-icon>
          </th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-input outlined dense /></th>
          <th colspan=""><q-select outlined dense /></th>
          <th colspan=""><q-select outlined dense /></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, index) in rows" :key="item.id">
          <td>{{ index++ }}</td>
          <td>
            <q-checkbox dense v-model="checkbox" color="primary" size="lg" />
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.customer }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.totalSum }}</td>
          <td>{{ item.discount }}</td>
          <td>{{ item.type }}</td>
          <td>
            <q-badge
              class="text-body2 q-py-sm q-px-md"
              rounded
              color="negative"
              >{{ item.status }}</q-badge
            >
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-blue-grey-2">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>0</th>
          <th>0</th>
          <th></th>
        </tr>
        <tr class="bg-blue-grey-7 text-white">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>42,220,410</th>
          <th>20,447,310</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
    <div class="q-py-lg q-px-lg bg-white row justify-between items-center">
      <!-- <page-bar :pagination="pagination" @page-changed="loadData" /> -->
      <div class="col-4">
        <q-pagination
          direction-links
          max="5"
          v-model="current"
          boundary-links
          icon-first="keyboard_double_arrow_left"
          icon-last="keyboard_double_arrow_right"
          icon-prev="chevron_left"
          icon-next="chevron_right"
          gutter="xs"
          padding="3px 2px 1px 2px"
          round
          color="grey-8"
          active-color="primary"
          size="14px"
          class="pagination"
        />
      </div>
      <div class="col-2">
        <span>۱ - ۱۰ از ۴۵۰</span>
      </div>
      <div class="row justify-end items-center q-gutter-x-md">
        <q-select
          dense
          outlined
          :options="[5, 10, 20]"
          @update:model-value="handlePageChange"
          transition-show="flip-up"
          transition-hide="flip-down"
          popup-content-class="text-caption text-weight-medium text-grey-8"
          class="q-ml-xl select"
        />
        <span>ردیف در هر صفحه</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
// import PageBar from "src/components/shared/PageBar.vue"
const filter = ref("")
const checkbox = ref(false)
const current = ref(1)
const rows = ref([
  {
    id: "1001",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "فروش نقدی و خدمات",
    status: "زندانی",
    date: "1400/08/26"
  },
  {
    id: "1002",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1400/03/05"
  },
  {
    id: "1303",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1401/01/01"
  },
  {
    id: "303",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1402/10/09"
  },
  {
    id: "۵0",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1401/09/01"
  },
  {
    id: "۶9",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1400/01/21"
  },
  {
    id: "۷",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1399/01/01"
  },
  {
    id: "1008",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1398/06/17"
  },
  {
    id: "۹19",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1402/04/19"
  },
  {
    id: "5004",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1401/09/01"
  },
  {
    id: "5009",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1401/09/25"
  },
  {
    id: "5005",
    number: "۰",
    customer: "هلدینگ بابک زنجانی",
    description: "سه هزار میلیارد پول نفت ملت",
    totalSum: "۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰",
    discount: "۰",
    type: "مسروقه",
    status: "زندانی",
    date: "1399/09/01"
  }
])
</script>

<style lang="scss" scoped>
.table-head {
  background-color: #e7f4ff;
}

th span {
  cursor: pointer;
}

th,
td {
  padding: 24px 8px;
}

table {
  border-collapse: collapse;
  border: none;
}

table:focus,
.plan-title-card:focus {
  outline: none;
}
table tbody tr:hover {
  background-color: #f2f2f28a;
}

.q-field--outlined {
  border-radius: 8px;
}

.select {
  width: 72px;
}
</style>
