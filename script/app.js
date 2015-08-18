$( ".nav-tabs" ).mobileresponsivetab();


$('select.select-tabs').on('change', function () {
    $(':selected', this).tab('show');
});
