<template>
  <div class="text-h6 text-weight-600 q-py-lg">
    {{ $t("shared.labels.vatDeductionItems") }}
  </div>
  <q-card
    class="q-my-sm"
    flat
    bordered
    v-for="(row, index) in model.value.vatDeductionItems"
    :key="index"
  >
    <div class="row q-pa-md q-col-gutter-sm">
      <div class="col-md-3 col-sm-12 col-xs-12">
        <custom-input
          placeholder="$t('shared.labels.title')"
          v-model="row.title"
        />
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <sl-lookup
          :placeholder="$t('shared.labels.slTitle')"
          v-model:selectedId="row.slId"
          v-model:selectedText="row.slTitle"
          :filter-expression="slFilter"
        />
      </div>
      <div class="col-md-2 col-sm-12 col-xs-12">
        <custom-input
          type="number"
          hide-bottom-space
          v-model="row.rate"
          required
        >
          <template #append>
            <q-icon name="percent" />
          </template>
        </custom-input>
      </div>
      <div class="col-md-2 col-sm-12 col-xs-12">
        <div class="q-pt-xs q-gutter-md">
          <q-btn
            no-caps
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
          />
          <q-btn
            no-caps
            color="red"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
            @click="formStore.deleteRow(index)"
          />
        </div>
      </div>
    </div>
  </q-card>

  <q-card
    class="q-my-md"
    flat
    bordered
    v-if="model.value.vatDeductionItems.length === 0"
  >
    <q-card-section class="text-center">
      <no-item-selected />
      <q-btn
        no-caps
        class="primary-shadow q-mb-lg"
        rounded
        unelevated
        color="primary"
        @click="formStore.pushNewRow()"
      >
        <q-icon name="o_add" size="20px" />
        {{ $t("shared.labels.addRow") }}
      </q-btn>
    </q-card-section>
  </q-card>

  <!--
  <q-card class="warning q-my-md">
    <q-card-section>
      <div>
        <div class="title">{{$t('shared.labels.warning')}}</div>
        <div class="q-mt-md">
          <p>
            <strong>{{$t('shared.labels.title')}}: </strong>
            {{$t('vatDetailSection.warningTitle')}}
          </p>
          <p>
            <strong>{{$t('shared.labels.slTitle')}}: </strong>
            {{$t('vatDetailSection.warningSl')}}
          </p>
          <p>
            <strong>{{$t('shared.labels.rate')}}: </strong>
            {{$t('vatDetailSection.warningRate')}}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-card class="danger q-my-md">
    <q-card-section>
      <div>
        <div class="title">{{$t('shared.labels.danger')}}</div>
        <div class="q-mt-md">
          <p>
            <strong>{{$t('shared.labels.title')}}: </strong>
            {{$t('vatDetailSection.dangerTitle')}}
          </p>
          <p>
            <strong>{{$t('shared.labels.slTitle')}}: </strong>
            {{$t('vatDetailSection.dangerSl')}}
          </p>
          <p>
            <strong>{{$t('shared.labels.rate')}}: </strong>
            {{$t('vatDetailSection.dangerRate')}}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
  -->

  <!-- Tips -->
  <q-card class="tips q-my-md">
    <q-card-section>
      <div>
        <div class="title">{{ $t("shared.labels.guide") }}</div>
        <div class="q-mt-md">
          <p>
            <strong>{{ $t("shared.labels.title") }}:</strong>
            {{ $t("vatDetailSection.tipsTitle") }}
          </p>
          <p>
            <strong>{{ $t("shared.labels.slTitle") }}:</strong>
            {{ $t("vatDetailSection.tipsSl") }}
          </p>
          <p>
            <strong>{{ $t("shared.labels.rate") }}:</strong>
            {{ $t("vatDetailSection.tipsRate") }}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { accountCLType, sqlOperator } from "src/constants";

  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import NoItemSelected from "src/components/shared/dataTables/NoItemSelected.vue";

  const props = defineProps({
    formStore: Object,
  });

  const { t: $t } = useI18n();

  const slFilter = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.currentLiability,
    },
  ];
  const model = computed(() => props.formStore.model);
</script>
