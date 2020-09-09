$(() => {
  const errorInputText = 'Поле обязательно для заполнения'
  const button = $('.Button[type=submit]');
  const input = $('.input-text').find('input')
  button.on('click',function () {
    let requireInput = false;
    input.each(function () {
      let inputMain = $(this);
      if (inputMain.attr('required') === 'required') {
        inputMain.closest('.input-text').addClass('input-text--error')
        inputMain.closest('.input-text').attr('data-error',errorInputText)
        requireInput = true
      }
    })
    if (requireInput) {
      button.attr('error-submit', 'Заполните обязательные поля')
    }
    else {
      button.attr('error-submit', '')
    }
  })



})
