<template>
  <q-markup-table flat>
    <tbody>
      <tr>
        <td style="width: 90px">
          <div class="text-body3 no-letter-spacing q-mb-sm">بانک</div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model.bankTitle }} / {{ model?.bankBranchCode }} -
            {{ model?.bankBranchTitle }}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="text-body3 no-letter-spacing q-mb-sm">
            نوع حساب
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model.bankAccountTypeTitle }}
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="text-body3 no-letter-spacing q-mb-sm">
            شماره حساب
          </div>
        </td>
        <td>
          <div class="text-body3 no-letter-spacing">
            {{ model?.no }}
          </div>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
