
!function (win, doc, $, console, undefined) {
    "use strict";

    var $win = $(win),
        $doc = $(doc);

    $.fn.mobileresponsivetab = function (options) {

        // Default options.
        var settings = $.extend({
            // These are the defaults.
            labelText: "",
            activeClass: ".active",
            snapPoint: 720
        }, options);

        var tabMenu = $(this);

        function changeMenu() {

            var winWidth = $win.width();

            if (winWidth < settings.snapPoint) {
                tabMenu.hide();
                $(".select-tabs-inserted").show();
            } else {
                tabMenu.show();
                $(".select-tabs-inserted").hide();
            }
        }

        //For each set of tabs
        this.each(function () {
            var tabs = $(this);
            //create form
            $("<form />").addClass("select-tabs-inserted").insertBefore(tabs);
            $("<fieldset />").appendTo(".select-tabs-inserted");

            var selectMenu = '<select class="select-tabs form-control" ></select>';

            if (settings.labelText !== '') {
                selectMenu = '<label class="control-label">' + settings.labelText + '</label><select></select>';
            }

            $(".select-tabs-inserted fieldset").append(selectMenu);

            var selectedItem;

            //Find each tab
            $(this).find(" li a").each(function () {
                var el = $(this);
                if (el.parent('li').hasClass(settings.activeClass)) {
                    selectedItem = el.text();
                }
                $("<option />", {
                    "data-target": el.attr("href"),
                    "text": el.text()
                }).appendTo(".select-tabs-inserted fieldset select");

            });

            //set selected tab
            $(".select-tabs-inserted fieldset select option").filter(function () {
                return $(this).text() === selectedItem;
            }).prop('selected', true);

        });

        //Bind to resize
        $win.bind("resize", changeMenu);
        //Set wheich menu is used
        changeMenu();
    };



}(window, document, window.jQuery, window.console);

// Usage example:
// $( ".tabs" ).mobileSelectTabs();
