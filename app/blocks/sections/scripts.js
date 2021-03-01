const $sectionMobileBalance = $('.section-balance-mobile');
const $sectionMobileSelect = $sectionMobileBalance.find('select');
const $sectionMobileLabelAmount = $sectionMobileBalance.find('[data-amount]');

function handleSelectValue() {
  $sectionMobileSelect.on('change', function () {
    const sum = ($(this).prop('value'));
    setLabelAmount(sum)
  })
}

function setLabelAmount(value) {
  $sectionMobileLabelAmount.text(value)
}


$(() => {
  handleSelectValue()
});
