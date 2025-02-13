<template>
  <account-tree-node :node="node" />
  <q-space />
  <div class="row items-center">
    <q-btn dense round unelevated icon="o_more_horiz">
      <q-menu class="border-radius-lg" fit :offset="[0, 10]">
        <q-list dense padding style="width: 200px">
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="createAccountSL"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon size="20px" name="o_add" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">ایجاد حساب معین</div>
            </q-item-section>
          </q-item>
          <q-item
            @click="editAccountGL"
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
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { useDialog } from "src/composables/useDialog";

  import AccountTreeNode from "./AccountTreeNode.vue";
  import GLCreateForm from "../../../accountGL/shared/forms/CreateForm.vue";
  import SLCreateForm from "../../../accountSL/shared/forms/CreateForm.vue";

  const props = defineProps({
    node: Object,
  });

  const dialogStore = useDialog();

  const createAccountSL = () => {
    dialogStore.openDialog({
      title: "ایجاد حساب معین",
      component: SLCreateForm,
      actionBar: true,
      props: {
        action: "create",
        accountGl: props.node,
      },
      okCallback: async (responseData) => {
        if (responseData?.model) {
          props.node.children.push({
            code: responseData.model.code,
            title: responseData.model.title,
            isActive: responseData.model.isActive,
            typeId: responseData.model.typeId,
            checkBalance: responseData.model.checkBalance,
            hasDL: responseData.model.hasDL,
            isBySystem: responseData.model.isBySystem,
          });
        }

        console.log(responseData);
      },
    });
  };

  const editAccountGL = () => {
    dialogStore.openDialog({
      title: "ویرایش حساب کل",
      component: GLCreateForm,
      actionBar: true,
      props: {
        id: props.node.id,
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
</script>
