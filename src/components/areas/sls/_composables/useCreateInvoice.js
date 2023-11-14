import { ref } from "vue"

const rows = ref([])


const productId = ref('')
const productTitle = ref('')
const productPrice = ref('')
const productUnitTitle = ref('')

export function useCreateInvoice() {

  const incrementQuantity = (product) => {
    rows.value.push(product);

    const selectedProductId = product.id;
    const selectedProductTitle = product.title;
    const selectedProductPrice = product.price;
    const selectedProductUnitTitle = product.productUnitTitle;

    productId.value = selectedProductId
    productTitle.value = selectedProductTitle
    productPrice.value = selectedProductPrice
    productUnitTitle.value = selectedProductUnitTitle

  }

  const isSelected = (product) => {
    return rows.value.includes(product)
  }

  const getSelectedProductQuantity = (product) => {
    return rows.value.filter((p) => p === product).length
  }

  const removeProduct = (product) => {
    rows.value = rows.value.filter((p) => p !== product);
  }

  return {
    rows,
    productId,
    productTitle,
    productPrice,
    productUnitTitle,
    incrementQuantity,
    isSelected,
    getSelectedProductQuantity,
    removeProduct
  }

}
