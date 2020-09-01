$(() => {
  const rating = $('.rating');
  rating.find('input').each(function () {
    const radio = $(this);
    radio.on('click', function () {
         const centerBlock = rating.find(`[data-value=${radio.attr('value')}]`);
         console.log(centerBlock.attr('data-value'))
    })
  })
});
