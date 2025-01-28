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
            @click="createAccountSL(node)"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon size="20px" name="o_add" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                ایجاد حساب معین
              </div>
            </q-item-section>
          </q-item>
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
              <div class="text-body2 no-letter-spacing">ویرایش</div>
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

  const dialogStore = useDialog();

  const props = defineProps({
    node: Object,
  });

  const createAccountSL = (cl) => {
    dialogStore.openDialog({
      title: "ایجاد حساب معین",
      component: SLCreateForm,
      actionBar: true,
      props: {
        action: "create",
      },
      okCallback: async () => {},
    });
  };

  const editAccountSL = (gl) => {
    dialogStore.openDialog({
      title: "ویرایش حساب کل",
      component: GLCreateForm,
      actionBar: true,
      props: {
        id: gl.id,
        action: "edit",
      },
      okCallback: async () => {
        alert("edit successfully");
      },
    });
  };
</script>
