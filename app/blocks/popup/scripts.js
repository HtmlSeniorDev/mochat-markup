
/**
 * popupBindingOpen {func} - открывает popup по заданному id
 */

function popupBindingOpen() {
  $('[data-toggle-popup]').on('click', (event) => {
    const { target } = event
    const popupTriggerId = $(target).data('toggle-popup') || $(target).closest('.portal-menu__item').data('toggle-popup')
    const priceItem = $(target).data('price-service') || $(target).closest('.portal-menu__item').data('price-service')
    console.log(priceItem)
    const popup = $(`#${popupTriggerId}`)
    if (priceItem) {
      popup.attr('data-price-ajax',priceItem)
    }
    popup.css('display','block')
  })
}

/**
 * Закрыть popup
 * @param $popup {JQUERY}
 */
function closePopup($popup) {
 $popup.css('display','none')
}

function popupBindingConfirmation() {
  $('.b-popup').find('.b-popup__button').on('click', (event) => {
    const { target } = event
    const isConfirm = $(target).data('confirm') || $(target).closest('.b-popup__button').data('confirm')
    const $popup = $(target).closest('.b-popup')
    switch (isConfirm) {
      case false:
        closePopup($popup)
        break
      case true:
        closePopup($popup)
        break
      default:
        closePopup($popup)
    }
  })
}

$(() => {
  popupBindingOpen()
  popupBindingConfirmation()
})
