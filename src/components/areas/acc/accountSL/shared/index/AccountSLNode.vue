<template>
  <account-tree-node :node="node" />
  <q-space />
  <div class="row items-center">
    <q-btn no-caps dense round unelevated icon="o_more_horiz">
      <q-menu class="border-radius-lg" fit :offset="[0, 10]">
        <q-list dense padding style="width: 200px">
          <q-item
            @click="editAccountSL(node)"
            clickable
            v-close-popup
            tabindex="0"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon size="20px" name="o_edit" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">ویرایش</div>
            </q-item-section>
          </q-item>
          <q-item
            @click="deleteAccountSL(node)"
            clickable
            v-close-popup
            tabindex="0"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon size="20px" name="o_delete" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">حذف</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { useDialog } from "src/composables/useDialog";
  import { useFormActions } from "src/composables/useFormActions";

  import AccountTreeNode from "./AccountTreeNode.vue";
  import SLCreateForm from "../forms/CreateForm.vue";

  const props = defineProps({
    node: Object,
  });

  const dialogStore = useDialog();
  const formStore = useFormActions("acc/accountSL");

  const editAccountSL = (node) => {
    dialogStore.openDialog({
      title: "ویرایش حساب معین",
      component: SLCreateForm,
      actionBar: true,
      props: {
        id: node.id,
        action: "edit",
      },
      okCallback: async (responseData) => {
        if (responseData?.model) {
          props.node.code = responseData.model.code;
          props.node.title = responseData.model.title;
          props.node.isActive = responseData.model.isActive;
        }
      },
    });
  };

  const deleteAccountSL = (node) => {
    formStore.deleteById(node.id, () => {});
  };
</script>
