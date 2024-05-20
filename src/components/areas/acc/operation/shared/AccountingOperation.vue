<template>
  <div class="q-my-lg">
    <h4>عملیات حسابداری</h4>
  </div>
  <div class="row q-gutter-md">
    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.openBook") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.openBook(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.openBook") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.reorder") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.reorder(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.reorder") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.calculateCogs") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.calculateCogs(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.calculateCogs") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.closeAccount") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.closeAccount(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.closeAccount") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.closeBook") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.closeBook(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.closeBook") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-2">
      <q-card>
        <q-card-section>
          {{ $t("shared.labels.deleteClosingBook") }}
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="operationStore.deleteClosingBook(reloadData)"
          >
            <q-item-section avatar class="q-py-sm">
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_cached" size="20px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.deleteClosingBook") }}
              </div>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
  import { useAccountingOperations } from "../../_composables/useAccountingOperations";

  const operationStore = useAccountingOperations();

  const reloadData = () => {
    alert("operation finished");
  };
</script>
