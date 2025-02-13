<template>
  <div class="row bordered-1 q-pa-md q-my-md items-center">
    <div class="col">
      <div class="text-body2">
        <q-icon
          v-if="item.isPrimary"
          name="o_check_circle"
          class="q-mr-xs"
          size="sm"
          color="primary"
        />
        <span class="text-weight-700 q-mr-sm">
          {{ item.contactTypeTitle }}:
        </span>
        <span>{{ item.value }}</span>
        <small v-if="item.comment" class="q-mx-xs">
          ({{ item.comment }})
        </small>
        <copy-clipboard :text="item.value" />
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
  import { useFormActions } from "src/composables/useFormActions";
  import { helper } from "src/helpers";
  import { formAction, contactType } from "src/constants";
  import { useDialog } from "src/composables/useDialog";

  import CopyClipboard from "src/components/shared/buttons/CopyClipboard.vue";
  import CreateForm from "../../../customerContact/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
    tableStore: Object,
    typeId: Number,
  });

  const dialogStore = useDialog();
  const model = ref(props.item);
  const formStore = useFormActions("crm/customerContact");

  const edit = () => {
    const contactTypeTitle = helper.getEnumType(
      props.item.typeId,
      contactType
    );
    dialogStore.openDialog({
      title: `shared.contactType.${contactTypeTitle}`,
      component: CreateForm,
      actionBar: true,
      props: {
        id: props.item.id,
        action: formAction.edit,
        typeId: props.item.typeId,
      },
      okCallback: async (response) => {
        if (response?.model) {
          helper.updateModel(model.value, response.model);
        } else await props.tableStore.reloadData();
      },
    });
  };
</script>
