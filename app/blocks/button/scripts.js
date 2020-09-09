const button = $('.Button[type=submit]');
const input = $('.input-text').find('input')
button.on('click',function () {
   input.each(function () {
      let inputMain = $(this);
      if (inputMain.attr('required') === 'required') {
          button.attr('error-submit','Заполните обязательные поля')
      }
   })
})

