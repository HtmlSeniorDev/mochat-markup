$(() => {
    const rating = $('.rating');
    const lineHidden = 1; // т.к последняя линия скрыта
    rating.find('input').each(function () {
    const radio = $(this);
    radio.on('click', function () {
         const ratingId = $(this).closest('.rating').attr('data-scale')
         const centerBlock = rating.find(`[data-value=${radio.attr('value')}]`);
         let checkedValue = centerBlock.attr('data-value')
         const elementsLineList = $(`[data-scale=${ratingId}]`).children('.rating__line-val')

      if (checkedValue<=2) {
         elementsLineList.each(function () {
           const line = $(this)
           const lineCount = +line.attr('data-value') + lineHidden
           let labelColor = $(`[data-scale=${ratingId}]`).children('.rating__center').find(`[data-color=${lineCount}]`)
           const dataValueElem = elementsColored(checkedValue);
           const isInclude = dataValueElem.includes(lineCount)
           if (isInclude) {
             line.css('background','#EECF43')
             // labelColor.append('<style>label:before{color:#EECF43;}</style>'); //todo изменять цвет лейбла
           }
           else {
             line.css('background','#DBE9C8')
           }
         })
      }
      else if (checkedValue<=4) {
        elementsLineList.each(function () {
          const line = $(this)
          const dataValueElem = elementsColored(checkedValue);
          const isInclude = dataValueElem.includes(+line.attr('data-value') + 1)
          if (isInclude) {
            line.css('background', '#DBCB47')
          }
          else {
            line.css('background','#DBE9C8')
          }
        })
      }
      else if (checkedValue<=6) {
        elementsLineList.each(function () {
          const line = $(this)
          const dataValueElem = elementsColored(checkedValue);
          const isInclude = dataValueElem.includes(+line.attr('data-value') + 1)
          if (isInclude) {
            line.css('background', '#CAC84A')
          }
          else {
            line.css('background','#DBE9C8')
          }
        })
      }
      else if (checkedValue<=8) {
        elementsLineList.each(function () {
          const line = $(this)
          const dataValueElem = elementsColored(checkedValue);
          const isInclude = dataValueElem.includes(+line.attr('data-value') + 1)
          if (isInclude) {
            line.css('background', '#BBC54D')
          }
          else {
            line.css('background','#DBE9C8')
          }
        })
      }
      else  if (checkedValue<=10) {
        elementsLineList.each(function () {
        const line = $(this)
        const dataValueElem = elementsColored(checkedValue);
        const isInclude = dataValueElem.includes(+line.attr('data-value') + 1)
        if (isInclude) {
          line.css('background', '#90BC56')
        }
        else {
          line.css('background','#DBE9C8')
        }
       })
    }

    })
  })
});

function elementsColored(highValue) {
  let list = [];
  for (let i = 1; i <= highValue; i++) {
    list.push(i);
  }
  return list
}
