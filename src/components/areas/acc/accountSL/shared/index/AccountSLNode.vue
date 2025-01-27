<template>
  <account-tree-node :node="node" />
  <q-space />
  <div class="row items-center">
    <q-btn dense round unelevated icon="o_more_horiz">
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
              <div class="text-body2 no-letter-spacing">ویرایش</div>
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
              <div class="text-body2 no-letter-spacing">حذف</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useDialog } from "src/composables/useDialog";

  import ConfirmDialog from "components/shared/ConfirmDialog.vue";
  import AccountTreeNode from "./AccountTreeNode.vue";
  import SLCreateForm from "../forms/CreateForm.vue";

  const $q = useQuasar();
  const { t } = useI18n();
  const dialogStore = useDialog();

  const props = defineProps({
    node: Object,
  });

  const editAccountSL = (gl) => {
    dialogStore.openDialog({
      title: "ویرایش حساب معین",
      component: SLCreateForm,
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

  const deleteAccountSL = (gl) => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.deleteConfirm"),
        message: `${t("shared.labels.deleteMessage")}.`,
        ok: t("shared.labels.delete"),
        okColor: "deep-orange-7",
        props: {
          id: gl.id,
          action: "delete",
        },
      },
    }).onOk(async () => {
      console.log(gl.glId);
    });
  };
</script>
