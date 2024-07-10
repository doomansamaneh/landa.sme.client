<template>
  <div class="row bordered-1 q-pa-md q-my-md items-center">
    <div class="col">
      <div class="text-body2 no-letter-spacing">
        <span class="text-weight-700 q-mr-sm">{{ item.title }}:</span>
        <span>{{ item.value }}/span>
      </div>
    </div>
    <div class="col-4 row justify-end items-center">
      <div class="row items-center">
        <q-btn unelevated round class="text-on-dark" @click="edit">
          <q-icon name="o_edit" size="20px" />
        </q-btn>
        <q-btn
          unelevated
          round
          class="text-on-dark"
          @click="
            formStore.deleteById(item.id, tableStore.reloadData)
          "
        >
          <q-icon name="o_delete" size="20px" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { formAction } from "src/constants";

  import CreateFormDialog from "components/areas/cmn/entityProperty/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
    tableStore: Object,
  });

  const $q = useQuasar();
  const model = ref(props.item);

  const formStore = useFormActions("cmn/entityProperty");

  const edit = () => {
    $q.dialog({
      component: CreateFormDialog,
      componentProps: {
        id: props.item.id,
        action: formAction.edit,
      },
    }).onOk(async (response) => {
      if (response?.model) {
        helper.updateModel(model.value, response.model);
      } else await props.tableStore.reloadData();
    });
  };
</script>
