import { ref, computed } from "vue"

const rows = ref([])

export function useCreateInvoice() {

  const incrementQuantity = (product) => {
    const selectedRows = rows.value.filter(r => r.productId === product.id)
    if (selectedRows.length > 0)
      selectedRows[0].quantity += 1
    else rows.value.push({
      productId: product.id,
      productTitle: `${product.code} ${product.title}`,
      productUnitId: product.productUnitId,
      productUnitTitle: product.productUnitTitle,
      price: product.price,
      quantity: 1
    })
  }

  const removeItem = (item) => {
    let index = rows.value.indexOf(item);
    if (index !== -1) {
      rows.value.splice(index, 1);
    }
    //rows.value.splice(product)
  }


  const removeProduct = (product) => {
    const selectedRows = rows.value.filter(r => r.productId === product.id)
    if (selectedRows.length > 0) {
      removeItem(selectedRows[0])
    }
  }

  const getProductQuantity = (productId) => {
    const selectedRows = rows.value.filter(r => r.productId === productId)
    if (selectedRows.length > 0) return selectedRows[0].quantity
    return 0
  }

  return {
    rows,

    incrementQuantity,
    removeItem,
    removeProduct,
    getProductQuantity
  }
}
