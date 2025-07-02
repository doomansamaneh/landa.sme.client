<template>
  <div class="row bordered-1 q-pa-sm q-my-md items-center">
    <div class="col">
      <div class="text-body2">
        <span class="text-weight-700 q-mr-sm">{{ item.title }}:</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
    <div class="col-4 row justify-end items-center">
      <div class="row items-center">
        <q-btn
          no-caps
          dense
          unelevated
          round
          class="text-on-dark"
          @click="edit"
        >
          <q-icon name="o_edit" size="20px" />
        </q-btn>
        <q-btn
          no-caps
          unelevated
          round
          dense
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
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDialog } from "src/composables/useDialog";
  import { formAction } from "src/constants";

  import CreateForm from "components/areas/cmn/entityProperty/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
    tableStore: Object,
  });

  const dialogStore = useDialog();
  const model = ref(props.item);
  const formStore = useFormActions("cmn/entityProperty");

  const edit = () => {
    dialogStore.openDialog({
      title: `shared.labels.entityProperty`,
      component: CreateForm,
      actionBar: true,
      props: { id: props.item.id, action: formAction.edit },
      okCallback: async (response) => {
        if (response?.model) {
          helper.updateModel(model.value, response.model);
        } else await props.tableStore.reloadData();
      },
    });
  };
</script>
