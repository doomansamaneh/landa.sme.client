<template>
  <custom-input v-model="modelValue" :type="type">
    <template #append>
      <q-btn
        no-caps
        color="primary"
        unelevated
        round
        size="xs"
        class="primary-gradient primary-shadow text-white"
        @click="showMenu = true"
      >
        <q-icon size="16px" name="o_add" />
      </q-btn>
    </template>
  </custom-input>
  <q-menu
    v-model="showMenu"
    no-parent-event
    transition-show="jump-down"
    transition-hide="jump-up"
    fit
  >
    <div class="bg-on-dark q-pa-md">
      <div class="text-body2">انتخاب شرح</div>
    </div>
    <div class="q-pa-md">
      <lookup-view
        ref="lookupRef"
        v-model:selectedId="selectedCommentId"
        v-model:selectedText="selectedCommentText"
        data-source="cmn/commonKeyword/getGridData"
        columns="title"
        @row-selected="onCommentSelected"
      />
    </div>
  </q-menu>
</template>

<script setup>
  import { ref } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const props = defineProps({
    type: String,
  });

  const modelValue = defineModel("modelValue");
  const lookupRef = ref(null);
  const showMenu = ref(false);
  const selectedCommentId = ref(null);
  const selectedCommentText = ref("");

  function onCommentSelected(row) {
    modelValue.value = row.title;
    showMenu.value = false;
  }
</script>
