<template>
  <account-tree-node :node="node" />
  <q-space />
  <div class="row items-center q-gutter-md">
    <q-btn no-caps dense round unelevated icon="o_more_horiz">
      <q-menu
        ref="accountTreeNodeMenu"
        class="border-radius-lg"
        fit
        :offset="[0, 10]"
      >
        <q-list dense padding style="width: 200px">
          <q-item
            @click="createAccountGL"
            clickable
            v-close-popup
            tabindex="0"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon size="20px" name="o_add" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">
                {{ $t("shared.labels.createGeneralLedgerAccount") }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { useI18n } from "vue-i18n";
  import { useDialog } from "src/composables/useDialog";

  import AccountTreeNode from "./AccountTreeNode.vue";
  import GLCreateForm from "../../../accountGL/shared/forms/CreateForm.vue";

  const { t } = useI18n();

  const dialogStore = useDialog();

  const props = defineProps({
    node: Object,
  });

  const createAccountGL = () => {
    dialogStore.openDialog({
      title: $t("shared.labels.createGeneralLedgerAccount"),
      component: GLCreateForm,
      actionBar: true,
      props: {
        action: "create",
        accountCl: props.node,
      },
      okCallback: async () => {},
    });
  };
</script>
