<template>
  <q-drawer
    side="right"
    :model-value="contactBar"
    overlay
    :width="350"
    :breakpoint="500"
    class="text-white"
    bordered
  >
    <q-scroll-area
      class="fit"
      dark
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div class="searchbar-sidebar q-my-md q-px-md">
        <q-input
          color="grey-5"
          outlined
          v-model="searchText"
          :placeholder="$t('shared.labels.contact-search')"
          dense
          rounded
          class="text-caption"
        >
          <template v-slot:prepend>
            <q-icon
              name="o_search"
              color="primary"
            />
          </template>
          <template v-slot:append>
            <q-icon
              name="clear"
              class="cursor-pointer"
              size="16px"
              color="primary"
              @click="clearSearch"
              v-if="!isSearchEmpty"
            />
          </template>
        </q-input>
      </div>
      <q-list
        dense
        padding
      >
        <q-item
          v-for="item in rows"
          :key="item"
          clickable
          to="/crm/customer"
          v-close-popup
          tabindex="0"
          class="q-py-sm text-on-dark"
          @click="changePasswordDialog"
        >
          <div class="row q-gutter-x-md items-center q-my-md q-pl-sm">
            <q-item-section avatar>
              <q-avatar
                size="52px"
                v-if="item.avatar"
              >
                <img :src="item.avatar">
              </q-avatar>
              <q-avatar
                v-else
                size="52px"
                color="primary"
              >
                <q-icon
                  name="o_person"
                  size="sm"
                  color="white"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="ellipsis text-on-dark text-caption text-bold q-py-xs"
                style="width:200px"
              >{{ item.fullName }}
              </q-item-label>
              <q-item-label
                v-if="item.address"
                caption
                class="ellipsis q-mt-xs"
                style="width: 200px;"
              >
                <q-icon
                  name="o_location_on"
                  class="q-mr-xs"
                  size="13px"
                  color="primary"
                />{{ item.address }}
              </q-item-label>
              <q-item-label
                v-if="item.phoneNumber"
                caption
              >
                <q-icon
                  name="o_call"
                  class="q-mr-xs"
                  size="13px"
                  color="primary"
                />{{ item.phoneNumber }}
              </q-item-label>
            </q-item-section>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>

import { ref, computed } from "vue"

const props = defineProps({
  contactBar: Boolean
})

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

const searchText = ref("")

function clearSearch() {
  searchText.value = ""
}

const isSearchEmpty = computed(() =>
  !searchText.value || searchText.value.trim().length === 0
)

const rows = [
  { fullName: "نمایندگی شورای بین المللی شهرداری", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "https://cdn.quasar.dev/img/avatar1.jpg", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", avatar: "https://cdn.quasar.dev/img/avatar3.jpg" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", avatar: "https://cdn.quasar.dev/img/avatar1.jpg", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
]

</script>
