<template>
  <tool-bar>
    <template #default>
      <div
        class="ellipsis-2-lines text-weight-700"
        :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
      >
        <slot name="header-title">
          <span class="text-body2">
            {{ title }}
          </span>
        </slot>
      </div>

      <q-space />

      <menu-button-edit
        :to="`/crm/customer/edit/${id}`"
        class="text-body2"
        round
        dense
        unelevated
        no-caps
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";

  const props = defineProps({
    title: String,
  });

  const route = useRoute();

  const id = computed(() => route.params.id);
</script>
