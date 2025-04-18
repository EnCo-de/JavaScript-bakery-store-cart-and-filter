import { defaultURL, inStore, showText, qs } from "./utils.js"

const cart = qs(".cart")

const cartCounter = () => {
  let total = 0
  let count = 0
  const items = {}
  const cartTotal = qs(".cart-total")
  const itemCount = qs(".item-count")
  const itemTotal = qs(".item-total")
  const itemsContainer = qs(".cart-items-container")
  const clearCartBtn = qs(".clear-cart-btn")
  const checkoutBtn = qs(".checkout-btn")

  const showCartInfo = function () {
    cartTotal.textContent = total.toFixed(2)
    itemTotal.textContent = cartTotal.textContent
    itemCount.textContent = count
  }

  const clearCart = function () {
    Object.keys(items).forEach((key) => delete items[key])
    itemsContainer.innerHTML = ""
    count = 0
    total = 0
    showCartInfo()
  }

  itemsContainer.addEventListener("click", (event) => {
    const cartItem = event.target.closest(".cart-item")
    const key = cartItem.dataset.key
    const clickedItemCount = items[key]
    const clickedItemPrice = +cartItem.dataset.price

    if (event.target.matches(".cart-item-remove")) {
      count = Math.max(0, count - clickedItemCount)
      total = Math.max(0, total - clickedItemCount * clickedItemPrice)
      delete items[key]
      cartItem.remove()
    } else if (event.target.matches(".cart-item-increase")) {
      count += 1
      total += clickedItemPrice
      items[key] += 1
      cartItem.querySelector(".cart-item-count").textContent = items[key]
    } else if (event.target.matches(".cart-item-decrease")) {
      count = Math.max(0, count - 1)
      total = Math.max(0, total - clickedItemPrice)
      items[key] -= 1
      if (items[key] > 0) {
        cartItem.querySelector(".cart-item-count").textContent = items[key]
      } else {
        delete items[key]
        cartItem.remove()
      }
    }
    showCartInfo()
  })

  clearCartBtn.addEventListener("click", clearCart)

  checkoutBtn.addEventListener("click", () => {
    if (Object.keys(items).length < 1) {
      cart.classList.remove("cart-show")
      showText("Fill your cart!")
      return
    }
    const cartContent = {
      count,
      total,
      items,
      client: "John Doe",
      date: new Date(),
    }
    showText("Check out the console \n" + JSON.stringify(cartContent))
    console.log(JSON.stringify(cartContent))
    clearCart()
  })

  // function adds new item to the cart
  const addToCart = function (
    { itemIndex, itemName, itemUrl, itemPrice, number = 1},
    showInfo = true
  ) {
    /* addToCart({
        itemIndex: 1;
        itemName: "Cake",
        itemPrice: 20,
        itemUrl: "img/cake-1.jpeg",
       })
    */
    const key = itemIndex
    items[key] = (items[key] ?? 0) + number
    count += number
    total += itemPrice * number
    showCartInfo()

    const cartElt = qs(`[data-key="${key}"]`)
    if (cartElt !== null) {
      cartElt.querySelector(".cart-item-count").textContent = items[key]
    } else {
      const template = qs(".cart-item-template")

      const clone = template.content.cloneNode(true)
      clone.querySelector(".cart-item-name").textContent = itemName
      clone.querySelector(".cart-item-price").textContent = itemPrice.toFixed(2)
      clone.querySelector(".cart-item-img").src = itemUrl
      clone.querySelector(".cart-item-img").addEventListener("error", (event) => {
        event.target.src = defaultURL
      })
      clone.querySelector(".cart-item").dataset.price = itemPrice
      clone.querySelector(".cart-item-count").textContent = items[key]
      clone.querySelector("[data-key]").setAttribute("data-key", key)
      itemsContainer.append(clone)
    }
    if (showInfo) {
      showText(`${itemName} is added to your cart!`)
    }
  }

  // Save cart to local storage
  class localCart {
    static #localKey = "cart"

    static stash() {
      localStorage.setItem(this.#localKey, JSON.stringify(items))
    }

    static fill() {
      const locallySavedCart = localStorage.getItem(this.#localKey)
      if (locallySavedCart === null) return
      const savedCartItems = JSON.parse(locallySavedCart)

      Object.entries(savedCartItems).forEach(([index, savedCount]) => {
        index = parseInt(index)
        savedCount = parseInt(savedCount)

        const storedItem = inStore[index]
        const chosenItem = {
          itemIndex: index,
          itemName: storedItem.name,
          itemPrice: +storedItem.price,
          itemUrl: storedItem.url?.trim() || defaultURL,
          number: savedCount
        }
        addToCart(chosenItem, false)
      })
      showCartInfo()
      localStorage.removeItem(this.#localKey)
    }
  }

  window.addEventListener("unload", (e) => {
    if (Object.keys(items).length > 0) {
      localCart.stash()
    }
  })

  localCart.fill()

  return addToCart
}

export { cartCounter, inStore }
