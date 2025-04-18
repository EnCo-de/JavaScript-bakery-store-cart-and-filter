import { qs } from "./utils.js"

const handleSearchFilter = function () {
  const searchForm = qs(".search-form")
  const filterButtons = qs(".filter-buttons")
  const searchFilterInput = qs(".search-field")

  const filter = () => {
    const storeItems = qs(".store-item", true)
    const formData = new FormData(searchForm)
    const searchFilter = formData.get("searchFilter").toLocaleLowerCase().trim()
    const varieties = formData.getAll("variety")

    if (!searchFilter && varieties.length === 0) {
      storeItems.forEach((storeItem) => {
        storeItem.classList.remove("hide")
      })
      return
    }

    let len = storeItems.length
    storeItems.forEach((storeItem) => {
      storeItem.classList.remove("hide")

      // Filter store by variety buttons
      if (
        varieties.length > 0 &&
        !varieties.includes(storeItem.dataset.variety.toLowerCase())
      ) {
        storeItem.classList.add("hide")
        len -= 1
        return
      }

      // Filter store with text search
      if (
        searchFilter &&
        !storeItem.textContent.toLowerCase().includes(searchFilter) &&
        storeItem.dataset.name !== undefined &&
        !storeItem.dataset.name.toLowerCase().includes(searchFilter)
      ) {
        storeItem.classList.add("hide")
        len -= 1
      }
    })
    if (len > 0) {
      qs(".no-found").classList.add("hide")
    } else {
      alert(len)
      qs(".no-found").classList.remove("hide") 
    }
    window.scrollTo(0, filterButtons.offsetTop)
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    filter()
  })

  searchFilterInput.addEventListener("input", filter)

  filterButtons.addEventListener("click", (event) => {
    if (!event.target.matches(".filter-btn")) {
      return
    }
    if (event.target?.value?.toLowerCase() === "all") {
      // Deselect all filters by setting the 'checked' property to false
      const filters = filterButtons.querySelectorAll(".variety")
      filters.forEach((filter) => {
        filter.checked = false
      })
    }
    filter()
  })
}

export { qs, handleSearchFilter }
