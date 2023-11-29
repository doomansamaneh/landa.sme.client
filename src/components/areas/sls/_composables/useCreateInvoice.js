import { ref, computed } from "vue"

const rows = ref([])

export function useCreateInvoice() {

  const incrementQuantity = (product) => {
    const selectedRows = rows.value.find(r => r.productId === product.id)
    if (selectedRows) selectedRows.quantity += 1
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
    const selectedRows = rows.value.find(r => r.productId === product.id)
    if (selectedRows) removeItem(selectedRows)
  }

  const getProductQuantity = (productId) => {
    const selectedRows = rows.value.find(r => r.productId === productId)
    if (selectedRows) return selectedRows.quantity
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
