<template>
  <div class="row bordered-1 q-pa-md q-my-md">
    <div class="col q-gutter-y-sm">
      <div class="row items-center justify-between">
        <div>
          <q-icon
            v-if="item.isPrimary"
            name="o_check_circle"
            class="q-mx-xs"
            size="sm"
            color="primary"
          />

          <q-icon
            name="o_account_balance"
            color="primary"
            size="sm"
          />

          <span class="text-bold q-ml-sm">
            {{ item.bankTitle }}
          </span>
        </div>
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
      <div class="row items-center">
        <span class="text-body2 q-mr-sm">شماره حساب:</span>
        <span class="text-body1 long-number">
          {{ item.accountNo }}
        </span>
      </div>

      <div class="row items-center">
        <span class="text-body2 q-mr-sm">شماره کارت:</span>
        <span class="text-body1 long-number">
          {{ item.cardNo }}
        </span>
      </div>

      <div class="row items-center">
        <span class="text-body2 q-mr-sm">شماره شبا:</span>
        <span
          class="text-body1 text-weight-700 long-number"
          style="display: inline-block"
        >
          {{ item.shaba }}
        </span>
        <copy-clipboard v-if="item.shaba" :text="item.shaba" />
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

  import CopyClipboard from "src/components/shared/buttons/CopyClipboard.vue";
  import CreateFormDialog from "../../../customerBankAccount/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
    tableStore: Object,
  });

  const $q = useQuasar();
  const model = ref(props.item);

  const formStore = useFormActions("crm/customerBankAccount");

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
<style lang="scss" scoped>
  .long-number {
    letter-spacing: 2px;
    display: inline-block;
  }
</style>
