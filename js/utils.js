const qs = (selector, all) => {
  if (all) {
    return document.querySelectorAll(selector)
  }
  return document.querySelector(selector)
}

const showText = function (text) {
  const dialog = qs("dialog")
  const closeBtn = qs(".close")

  let timeout

  if (!dialog.open) {
    dialog.classList.remove("dialog-close")
    dialog.show()
    dialog.querySelector(".dialog-text").textContent = text
  }

  const handleClose = () => {
    if (!dialog.open) return
    clearTimeout(timeout)
    dialog.classList.add("dialog-close")
    setTimeout(() => {
      dialog.close()
    }, 750)
  }

  timeout = setTimeout(handleClose, 2000)
  closeBtn.addEventListener("click", handleClose)
}

const defaultURL = "./img/fallback-default.svg"

const inStore = [
  {
    variety: "sweets",
    name: "sweet item",
    price: 5,
    url: "img/sweets-1.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 5,
    url: "img/cupcake-1.jpeg",
  },
  {
    variety: "cakes",
    name: "cake item",
    price: 5,
    url: "img/cake-1.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 5,
    url: "img/doughnut-1.jpeg",
  },
  {
    variety: "sweets",
    name: "sweet item",
    price: 10,
    url: "img/sweets-2.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 10,
    url: "img/cupcake-2.jpeg",
  },
  {
    variety: "cakes",
    name: "cake item",
    price: 10,
    url: "img/cake-2.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 10,
    url: "img/doughnut-2.jpeg",
  },
  {
    variety: "sweets",
    name: "sweet item",
    price: 15,
    url: "img/sweets-3.jpeg",
  },
  {
    variety: "cupcakes",
    name: "cupcake item",
    price: 15,
    url: "img/cupcake-3.jpeg",
  },
  {
    variety: "cakes",
    name: "cake item",
    price: 15,
    url: "img/cake-3.jpeg",
  },
  {
    variety: "doughnuts",
    name: "doughnut item",
    price: 15,
    url: "img/doughnut-3.jpeg",
  },
]

export { qs, showText, defaultURL, inStore }
