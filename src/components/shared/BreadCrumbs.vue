<template>
  <q-breadcrumbs
    v-if="show"
    active-color="primary"
    class="no-padding z-max"
    :class="{ 'text-body3': $q.screen.lt.sm }"
  >
    <q-breadcrumbs-el
      v-for="item in validItems"
      :key="item.path"
      :label="$t(item.name)"
      :icon="item.meta.icon"
      :to="item.path"
    />
    <template #separator>
      <q-icon
        name="arrow_forward_ios"
        class="text-on-dark"
      />
    </template>
  </q-breadcrumbs>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const items = ref([])

watchEffect(() => {
  getRoute()
})


function getRoute() {
  const newItems = router.currentRoute.value.matched.map((match) => {
    return {
      ...match,
      name: match.name ? `pages.${match.name}` : ""
    };
  });

  newItems.forEach((newItem) => {
    const exists = items.value.some((item) => item.path === newItem.path);
    if (!exists) {
      items.value.push(newItem);
    }
  });

  items.value = items.value.filter((item) =>
    newItems.some((newItem) => newItem.path === item.path)
  );
}


const show = computed(() => validItems.value.length > 0)
const validItems = computed(() =>
  items.value.filter((item) => item.name != null && item.name != "")
)
</script>
