$(() => {
  const errorInputText = 'Поле обязательно для заполнения'
  const rating = $('.rating').children('.rating__rating-wrapper');
  const lineHidden = 1; // т.к последняя линия скрыта
  rating.find('input').each(function () {
    const radio = $(this);
    radio.on('click', function () {
      const ratingId = $(this).closest('.rating').attr('data-scale') // текущая шкала с рейтингом
      const centerBlock = rating.find(`[data-value=${radio.attr('checked-value')}]`);
      const scaleRating = $(`[data-scale=${ratingId}]`);
      const checkedValue = centerBlock.attr('data-value') // значение выбранной радиокнопки
      const dataRequired = scaleRating.attr('data-required');
      const elementsLineList = scaleRating.children('.rating__rating-wrapper').children('.rating__line-val') // cписок линий для раскраски
      const LabelList = scaleRating.children('.rating__rating-wrapper').children('.rating__center').children(`label`)  // список лейблов
      const textValueInput = $('.js-for-scale');
      console.log(scaleRating.closest('.engagement-survey__align-items-wrapper').find('.input-text'))
      // очищаем все не выбранные лейблы
      LabelList.each(function () {
        const label = $(this)
        if (radio.attr('checked-value') !== label.attr('data-color')) {
          label.removeClass('rating__extra-after rating__extra-after--color-1')
        }
      })
      scaleColoring(checkedValue)
      function scaleColoring(checkedValue) {
        let inputIsNotEmpty = textValueInput.val().length <= 0 //  инпут пустой?
        let checkedLessRequire = +checkedValue <= +dataRequired //  checked <= значения из аттрибута data-required?
        if (checkedLessRequire && inputIsNotEmpty) {
          scaleRating.closest('.align-center').find('.input-text').children('input').attr('required', 'required')
          scaleRating.closest('.align-center').find('.input-text').attr('data-error', errorInputText)
          scaleRating.closest('.align-center').find('.input-text').addClass('input-text--error')
        }
        else {
          scaleRating.closest('.align-center').find('.input-text').removeAttr('required')
          scaleRating.closest('.align-center').find('.input-text').attr('data-error','')
          scaleRating.closest('.align-center').find('.input-text').removeClass('input-text--error')
        }
        let compareObject = colorComparator(+checkedValue)
        let color = compareObject.line // цвет линии
        let labelClass = compareObject.label // класс с цветом для лейбла
        let labelColor = scaleRating.children('.rating__rating-wrapper').children('.rating__center').find(`[data-color=${checkedValue}]`)
        labelColor.addClass(`rating__extra-after rating__extra-after--color-${labelClass}`)
        elementsLineList.each(function () {
          const line = $(this)
          const lineCount = +line.attr('data-value') + lineHidden
          const dataValueElem = Array.from(Array(+checkedValue),(_, i) => i + 1); //генерация массива от 1 до N
          const isInclude = dataValueElem.includes(lineCount)
          if (isInclude) {
            let labelColor = scaleRating.children('.rating__rating-wrapper').children('.rating__center').find(`[data-color=${lineCount - lineHidden}]`)
            labelColor.addClass("rating__label-color")
            line.css('background', color)
          } else {
            let labelColor = scaleRating.children('.rating__rating-wrapper').children('.rating__center').find(`[data-color=${lineCount}]`)
            labelColor.removeClass("rating__label-color")
            line.css('background', '#DBE9C8')
          }
        })
      }
    })
  })
});

function colorComparator(value) {
  if (value <= 2) {
    return {line: '#EECF43', label: 1}
  } else if (value <= 4) {
    return {line: '#DBCB47', label: 2}
  } else if (value <= 6) {
    return {line: '#CAC84A', label: 3}
  } else if (value <= 8) {
    return {line: '#BBC54D', label: 4}
  } else if (value <= 10) {
    return {line: '#90BC56', label: 5}
  }
}
