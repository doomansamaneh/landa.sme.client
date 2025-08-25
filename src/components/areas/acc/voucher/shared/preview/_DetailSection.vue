<template>
  <q-card bordered>
    <q-card-section class="q-gutter-md">
      <div class="q-gutter-sm">
        <span class="text-caption">
          {{ $t("shared.columns.no") }}:
        </span>
        <span class="text-weight-700">{{ model?.no }}</span>
      </div>
      <div v-if="relationModel?.url">
        <q-btn
          no-caps
          :to="`/${relationModel.url}`"
          text-color="white"
          class="primary-gradient primary-shadow"
          rounded
          flat
          unelevated
        >
          <span>{{ $t("shared.labels.viewOriginalDocument") }}</span>
          <q-icon
            :name="$q.lang.rtl ? 'o_arrow_back' : 'o_arrow_forward'"
            size="xs"
            class="q-mx-xs"
          />
        </q-btn>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="model?.id">
      <preview-log
        :entity-id="model.id"
        entity-name="Acc.[Voucher]"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { useVoucherModel } from "../../../_composables/useVoucherModel";

  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";

  const props = defineProps({
    model: Object,
  });

  const relationModel = ref(null);
  const formStore = useVoucherModel({ baseRoute: "acc/voucher" });

  const fetchRelation = async (id) => {
    const responseData = await formStore.getRelation(id);
    relationModel.value = responseData;
  };

  watch(
    () => props.model?.id,
    (newId) => {
      if (newId) {
        fetchRelation(newId);
      }
    },
    { immediate: true }
  );
</script>
