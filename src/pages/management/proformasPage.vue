<template>
  <q-page class="">
    <div class="">
      <div class="q-pt-md q-px-sm row justify-center items-center xs">
        <q-card class="my-card bg-blue text-dark" flat>
          <q-card-section class="my-card-section">
            <div class="selected-rows">
              <q-badge
                rounded
                color="bg-blue"
                :label="selectedRows"
                class="q-py-md q-px-md"
                style="
                  font-size: 22px;
                  background-color: white;
                  color: #2196f3;
                  font-weight: bolder;
                "
              />
            </div>
            <div
              class="total-offers-selected"
              style="font-size: 11px; font-weight: bold; color: white"
            >
              <div class="title" style="opacity: 0.5">
                <p>جمع تخفیف‌ها</p>
              </div>
              <div class="data" style="font-size: 14px"><p>۲۱۱,۰۵۲</p></div>
            </div>
            <div
              class="total-proformas-selected"
              style="font-size: 11px; font-weight: bold; color: white"
            >
              <div class="title" style="opacity: 0.5">
                <p>جمع پیش فاکتورها</p>
              </div>
              <div class="data" style="font-size: 14px">
                <p>۳,۵۱۶,۴۶۳,۲۴۹</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pt-md q-px-sm row justify-center items-center xs">
        <q-card class="my-card bg-grey-5 text-dark" flat>
          <q-card-section class="my-card-section">
            <div class="selected-rows">
              <q-badge
                rounded
                color="bg-dark"
                class="q-px-md q-py-sm"
                style="
                  font-size: 22px;
                  background-color: white;
                  color: #494949;
                  font-weight: bolder;
                "
              >
                <q-icon name="check_circle" size="md" />
              </q-badge>
            </div>
            <div
              class="total-offers-selected"
              style="font-size: 11px; font-weight: bold; color: black"
            >
              <div class="title" style="opacity: 0.3">
                <p>جمع تخفیف‌ها</p>
              </div>
              <div class="data" style="font-size: 14px"><p>۲۰۰,۰۰۰</p></div>
            </div>
            <div
              class="total-proformas-selected"
              style="font-size: 11px; font-weight: bold; color: black"
            >
              <div class="title" style="opacity: 0.3">
                <p>جمع پیش فاکتورها</p>
              </div>
              <div class="data" style="font-size: 14px">
                <p>۱۴,۸۰۰,۰۰۰</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-table
        :rows="usersData"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
        flat
        no-data-label="اطلاعاتی جهت نمایش وجود ندارد"
        no-results-label="نتیجه ای یافت نشد"
        :filter="filter"
        class="q-pt-xl gt-xs"
      >
        <template v-slot:bottom-row>
          <q-tr class="">
            <q-td colspan="100%" class="bg-grey-4">۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰,۰۰۰</q-td>
          </q-tr>
          <q-tr>
            <q-td colspan="100%" class="bg-blue">۳,۰۰۰,۰۰۰,۰۰۰,۰۰۰,۰۰۰</q-td>
          </q-tr>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div
            class="full-width row flex-center text-grey-7 q-gutter-sm q-mt-xl"
          >
            <q-icon size="3em" name="error" />
            <span class="text-h6"> متاسفانه {{ message }} </span>
            <q-icon size="3em" :name="filter ? 'error' : icon" />
          </div>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="top" expand class="toolbar q-mb-md gt-xs">
      <q-toolbar class="bg-white text-white q-ml-xs">
        <div
          class="toolbar-container flex justify-end q-gutter-md q-py-sm bg-white"
        >
          <div class="">
            <q-btn
              color="white bg-blue-7"
              icon="add_circle"
              label="ایجاد"
              rounded
              flat
              class="add-button q-px-md q-py-sm"
              style="font-size: 12px; font-weight: 600"
            />
          </div>
          <div class="">
            <q-btn
              color="grey-8"
              icon="edit"
              label="ویرایش"
              outline
              rounded
              class="add-button q-px-md q-py-sm"
              style="font-size: 12px; font-weight: 600"
            />
          </div>
          <div class="">
            <q-btn
              color="grey-8"
              icon="delete"
              label="حذف"
              outline
              rounded
              class="add-button q-px-md q-py-sm"
              style="font-size: 12px; font-weight: 600"
            />
          </div>
          <div class="">
            <q-btn
              color="grey-8"
              icon="more_horiz"
              label="بیشتر"
              outline
              rounded
              class="add-button q-px-md q-py-sm"
              style="font-size: 12px; font-weight: 600"
            />
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue"
import { api } from "boot/axios"
import { useQuasar } from "quasar"
import { onMounted, onBeforeMount, onBeforeUnmount, onUnmounted } from "vue"

const selected = ref([])
const selectedRows = ref("۴۹")

const getSelectedString = () => {
  selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.length}`
}

const columns = [
  {
    name: "#",
    required: true,
    label: "#",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`
  },
  {
    name: "number",
    align: "left",
    label: "شماره",
    field: "number",
    sortable: true,
    align: "left"
  },
  {
    name: "customer",
    label: "مشتری",
    field: "customer",
    sortable: true,
    align: "left"
  },
  { name: "description", label: "شرح", field: "description", align: "left" },
  { name: "totalSum", label: "جمع کل", field: "totalSum", align: "left" },
  { name: "discount", label: "تخفیف", field: "discount", align: "left" },
  {
    name: "type",
    label: "نوع",
    field: "type",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    align: "left"
  },
  {
    name: "status",
    label: "وضعیت",
    field: "status",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    align: "left"
  }
]

const usersData = ref([])
const filter = ref("")
</script>
