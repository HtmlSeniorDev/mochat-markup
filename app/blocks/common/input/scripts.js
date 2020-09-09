$(() => {
  const inputList = $('.input-text').find('input')
  inputList.each(function () {
    const input = $(this);
    input.on('change',function () {
        if (input.val().length > 0 ) {
          input.closest('.input-text').removeClass('input-text--error')
          input.closest('.input-text').attr('data-error','')
          input.removeAttr('required')
        }
    })
  })
})
