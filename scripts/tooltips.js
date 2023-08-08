var lcToolTip = function (trigger, options) {
    this.trigger = trigger;
    this.$trigger = $(trigger);
    this.$target = $(this.$trigger.data('tooltip-target'));
    this.autoPosition = this.$trigger.data('tooltip-autoposition') || false;
    this.$closeBtn = this.$target.find('.js-tooltip-close');
    this._init();
};

lcToolTip.prototype = $.extend(lcToolTip.prototype, {
    _init: function () {
        this.closeToolTip();
        this._addListeners();
    },
    _addListeners: function () {
        var _this = this;

        // When trigger is clicked then toggle state
        this.$trigger.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.toggleToolTip();
        });

        // Always close when close button is clicked
        this.$closeBtn.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.closeToolTip();
        });

        // If another tooltip gets opened the close this one
        $(document).on("lc-tooltip-opened", function (e, target) {
            if (target === _this.$target) return;
            _this.closeToolTip();
        });

        // If "esc" is click then close this tooltip
        $(document).keyup(function (e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                _this.closeToolTip();
            }
        });

        $(window).resize(function (e) {
            _this.closeToolTip();
        });
    },
    setToolTipPosition: function () {
        // Note this only works for tooltips positioned "top"
        var offset = this.$trigger.offset();
        var tooltipHeight = this.$target.height();
        var halfTooltipWidth = this.$target.width() / 2;

        var topFudgeFactor = 50;
        var leftFudgeFactor = 5;

        this.$target.css({
            'left': (offset.left - halfTooltipWidth - leftFudgeFactor),
            'top': (offset.top - tooltipHeight - topFudgeFactor),
            'bottom': 'auto',
            'right': 'auto'
        });

    },
    openToolTip: function (e) {
        // Trigger event to ensure any open tooltips are closed
        $(document).trigger('lc-tooltip-opened', this.$target);

        this.$target.removeClass('lc-tooltip--hidden');


        this.$target.addClass('lc-tooltip--visible');
        this.$target.data('state', 'visible');
        // Restore element to tabbing flow
        this.$target.find('.js-tooltip-close').attr('tabindex', '0');

        if (this.autoPosition) {
            this.setToolTipPosition();
        }
    },
    closeToolTip: function (e) {

        this.$target.removeClass('lc-tooltip--visible');
        this.$target.addClass('lc-tooltip--hidden');
        this.$target.data('state', 'hidden');
        // When hidden, remove element from tabbing flow
        this.$target.find('.js-tooltip-close').attr('tabindex', '-1');

    },
    toggleToolTip: function (e) {

        if (this.$target.data('state') === 'hidden') {
            this.openToolTip();
        } else {
            this.closeToolTip();
        }
    }
});

(function () {
    $('.js-tooltip-trigger').each(function () {
        new lcToolTip($(this));
    });
}());