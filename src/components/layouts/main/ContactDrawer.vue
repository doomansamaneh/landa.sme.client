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
      <div>
        <q-list
          dense
          padding
        >
          <q-item
            v-for="item in rows"
            :key="item"
            clickable
            v-close-popup
            tabindex="0"
            class="q-py-sm text-on-dark"
            @click="changePasswordDialog"
          >
            <div class="row q-gutter-x-md items-center q-py-sm">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="item.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-on-dark">{{ item.fullName }}</q-item-label>
                <q-item-label caption>
                  {{ item.jobTitle ? item.jobTitle : "بدون سمت" }}
                </q-item-label>
              </q-item-section>
            </div>
          </q-item>
        </q-list>
      </div>
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
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد" },
  { fullName: "مادر ترزا", jobTitle: "", avatar: "https://cdn.quasar.dev/img/avatar2.jpg" },
  { fullName: "خشایار شمالی", jobTitle: "توسعه دهنده وب", avatar: "" },
  { fullName: "محمد ینی ملگی", jobTitle: "استاد" },
]

</script>
