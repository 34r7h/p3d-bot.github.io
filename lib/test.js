$(function() {
    $('wager-amount').on('change blur', function() {
        !this.value || $(this).attr('placeholder', this.value);
    });
});
