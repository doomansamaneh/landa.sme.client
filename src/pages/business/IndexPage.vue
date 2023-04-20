<template>
  <q-page>
    <div class="row q-py-md">
      <div class="col col-3"></div>
      <div class="col">
        <div class="q-pb-md q-gutter-sm">
          <q-btn color="blue" @click="reloadData()" no-caps icon="refresh" label="load data" />
          <q-btn color="red" @click="gotoBusiness()" no-caps icon="directions" label="Goto Business" />
        </div>
        <div>
          <data-grid ref="gridBusiness" title="my business list" color="bg-primary text-white"
            dataSource="business/getBusinessGridData" :columns="columns" @changeSelected="gridChangeSelected">
          </data-grid>
        </div>
      </div>
      <div class="col col-3"></div>
    </div>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue'
  import DataGrid from "../../components/shared/DataGrid.vue";
  import { fetchWrapper } from "../../helpers"

  const gridBusiness = ref(null);

  const columns = [
    {
      name: 'row-number',
      required: true,
      label: '#',
      align: 'left',
      sortable: false,
      headerStyle: 'width: 5px'
    },
    {
      name: 'name',
      required: true,
      label: 'name',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'toDate',
      required: true,
      label: 'to date',
      align: 'left',
      field: "toDateString",
      sortable: true,
      headerStyle: 'width: 50px'
    },
    {
      name: 'dateCreated',
      required: true,
      label: 'dayes to expire',
      field: row => row.daysToExpire,
      sortable: true,
      headerStyle: 'width: 50px'
    },
  ]

  function reloadData() {
    gridBusiness.value.reloadData();
  }

  async function gotoBusiness() {
    await fetchWrapper
      .post("business/gotoBusiness/41f1c444-8450-40c9-b590-c0807a41a4e5")
      .then((response) => { console.log(response); })
      .finally(() => { })
  }

  const selected = ref([]);
  function gridChangeSelected(s, e) {
    selected.value = s;
  }
</script>