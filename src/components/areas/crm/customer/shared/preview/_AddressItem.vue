<template>
  <div class="row bordered-1 q-pa-sm q-my-md items-center">
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
        <span>{{ item.locationTitle }} - {{ item.address }}</span>
        <copy-clipboard
          :text="`${item.locationTitle} - ${item.address}`"
        />
        <span v-if="item.postalCode">
          / {{ $t("shared.labels.postalCode") }}:
          <strong>{{ item.postalCode }}</strong>
          <copy-clipboard :text="item.postalCode" />
        </span>
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
  import { useDialog } from "src/composables/useDialog";
  import { useFormActions } from "src/composables/useFormActions";
  import { formAction } from "src/constants";

  import CopyClipboard from "src/components/shared/buttons/CopyClipboard.vue";
  import CreateForm from "../../../customerAddress/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
    tableStore: Object,
  });

  const dialogStore = useDialog();
  const model = ref(props.item);

  const formStore = useFormActions("crm/customerAddress");

  const edit = () => {
    dialogStore.openDialog({
      title: "shared.contactType.address",
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
