<template>
  <div class="search-bar q-pt-sm">
    <q-input
      outlined
      dense
      class="text-caption q-mb-sm"
      v-model="searchTerm"
      :placeholder="placeholder"
      @keydown.enter="handleSearch"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          class="search-icon cursor-pointer"
          size="sm"
          color="primary"
          @click="handleSearch"
        />
      </template>
      <template v-slot:append>
        <q-icon
          name="cancel"
          class="cursor-pointer"
          size="sm"
          color="grey-5"
          @click="clearSearch"
          v-if="!isSearchEmpty"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, computed, emit } from "vue"

const searchTerm = ref("")
const placeholder = "Enter your search term"

const isSearchEmpty = computed(
  () => !searchTerm.value || searchTerm.value.trim().length === 0
)

function handleSearch() {
  emit("search", searchTerm.value)
}

function clearSearch() {
  searchTerm.value = ""
  emit("search", searchTerm.value)
}
</script>
