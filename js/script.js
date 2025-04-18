import { qs, inStore, defaultURL } from "./utils.js"
import { cartCounter } from "./cart.js"
import { handleSearchFilter } from "./filter.js"

const navLinks = qs(".nav-links")
navLinks.addEventListener("click", () => {
  navLinks.classList.add("hide-s")
})

qs(".cart-info").addEventListener("click", () => {
  qs(".cart").classList.toggle("cart-show")
  navLinks.classList.add("collapse")
})

qs(".navbar-toggle").addEventListener("click", () => {
  qs(".cart").classList.remove("cart-show")
  navLinks.classList.toggle("collapse")
})

// Create store cards

const storeShowcase = qs(".store-showcase")
const storeCard = qs(".store-card-template")
inStore.forEach((one, index) => {
  const clone = storeCard.content.cloneNode(true)
  clone.querySelector(".store-item-name").textContent =
    one.name[0].toUpperCase() + one.name.slice(1)
  clone.querySelector(".store-item-price").textContent = one.price
  if (one.url) {
    clone.querySelector(".card-image").src = one.url
  }
  const storeItem = clone.querySelector(".store-item")
  storeItem.dataset.index = index
  storeItem.dataset.variety = one.variety
  storeItem.dataset.name = one.name
  storeItem.dataset.price = one.price

  storeShowcase.append(clone)
})



handleSearchFilter()
const addToCart = cartCounter()

storeShowcase.addEventListener("click", (event) => {
  if (
    !event.target.matches(".icon-btn, .store-cart-icon, .store-cart-icon-btn")
  )
    return

  const storeItem = event.target.closest(".store-item")
  if (storeItem) {
    const getValueOf = (selector) => storeItem.querySelector(selector)
    const chosenItem = {
      itemIndex: storeItem.dataset.index,
      itemName: getValueOf(".store-item-name").textContent,
      itemPrice: parseFloat(getValueOf(".store-item-price").textContent),
      itemUrl: getValueOf(".card-image").src,
    }
    addToCart(chosenItem)
  }
})

qs(".card-image", true).forEach((one) => {
  one.addEventListener("error", (event) => {
    event.target.src = defaultURL
  })
})
