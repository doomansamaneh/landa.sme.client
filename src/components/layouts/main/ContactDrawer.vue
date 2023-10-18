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
          v-close-popup
          class="q-py-sm text-on-dark"
        >
          <div class="row q-gutter-x-md items-center q-my-md q-pl-sm">
            <q-item-section
              avatar
              @click="goToCustomer"
            >
              <q-btn
                round
                v-if="item.avatar"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              >
                <q-avatar size="52px">
                  <img :src="item.avatar">
                </q-avatar>
              </q-btn>
              <q-btn
                round
                v-else
              >
                <q-avatar
                  size="52px"
                  color="primary"
                  text-color="white"
                  class="my-img"
                >
                  <div class="text-body1 text-bold my-text">
                    {{ getFirstChar(item.fullName) }}
                  </div>
                </q-avatar>
              </q-btn>
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
                @click="telephoneToMobile"
                v-if="item.phoneNumber || item.mobile"
                caption
              >
                <q-icon
                  :name="icon"
                  class="icon-hover q-mr-xs"
                  color="primary"
                  size="13px"
                />{{ togglePhoneNumber(item) }}
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
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  contactBar: Boolean
})

const togglePhone = ref(true)

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
  { fullName: "نمایندگی شورای بین المللی شهرداری", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", mobile: "09338603196", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "https://cdn.quasar.dev/img/avatar1.jpg", phoneNumber: "02144300023", mobile: "09126627149", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", avatar: "https://cdn.quasar.dev/img/avatar3.jpg" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "02155511102", mobile: "09127718846", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", phoneNumber: "09127718846" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg", phoneNumber: "09123456789", address: "تهران، خیابان شهید رجایی، شهرک سیزده آبان، خیابان شهید رحیمی، خیابان شهید عنایتی، کوچه مهر 2" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "", phoneNumber: "09351234567", address: "اصفهان، خیابان چهارباغ بالا" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد", avatar: "https://cdn.quasar.dev/img/avatar1.jpg", phoneNumber: "09127718846", address: "شیراز، خیابان زند" },
]

function getFirstChar(str) {
  return str.charAt(0)
}

const telephoneToMobile = () => {
  togglePhone.value = !togglePhone.value
}

const icon = computed(() => (togglePhone.value ? 'o_call_end' : 'o_phone_android'));
// const togglePhoneNumber = (item) => (togglePhone.value ? item.phoneNumber : item.mobile);
const togglePhoneNumber = (item) => {
  if (togglePhone.value) {
    return item.phoneNumber || "تلفن ندارد";
  } else {
    return item.mobile || "موبایل ندارد";
  }
};

const goToCustomer = () => {
  router.push("/crm/customer")
}
</script>

<style lang="scss">

.my-img .my-text {
  opacity: 0.7;
  transition: .3s;
}

.my-img:hover .my-text {
  visibility: visible;
  opacity: 1;
  transition: .3s;
}

</style>
