(function($) {

    var hashElem = $(window.location.hash);

    if (hashElem.length) {
        hashElem.attr("open", true);
        handleScrollTo(hashElem, false);
    }

    // Accordion / Quick Link event handlers

    $(".menu li a.open-accordion").on("click",
        function () {
            var selectedAccordionId = $(this).attr("href");
            $("details[open]").removeAttr("open");
            $(selectedAccordionId).attr("open", true);

            handleScrollTo(selectedAccordionId);
        });

    $("details summary").on("click",
        function (e) {
            e.preventDefault();

            var selectedAccordion = $(this).parent("details");
            var isOpen = selectedAccordion.attr("open");
            selectedAccordion.attr("open", !isOpen);

            $("details[open]").not(selectedAccordion).removeAttr("open");

            handleScrollTo(selectedAccordion);
        }
    );

    $("a[href=#returning-customers]").on("click",
        function(e) {
            e.preventDefault();

            $("details[open]").removeAttr("open");
            $("#new-mortgage-enquiries").attr("open", true);

            handleScrollTo($("#returning-customers"));
        }
    );

    function handleScrollTo(element, stopVideo = true) {

        if (stopVideo) { reloadVideoSrc(); }
        $("body").scrollTo($(element).offset().top - 10, 200);
    }

    function reloadVideoSrc() {
        var elem = $(".video-wrapper iframe");
        var src = elem.attr("src");
        elem.attr("src", "");
        elem.attr("src", src);
    }

})(jQuery);