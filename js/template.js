/*jslint browser:true*/
/*jslint this*/
/*jslint white: true*/
/*global document jQuery window Swiper sequence google*/
jQuery(document).ready(function($) {
    "use strict";
    /*-----------------------------------------------------------------------------------*/
    /* Template Options */
    /*-----------------------------------------------------------------------------------*/
    var TOptions;

    TOptions = {

        // variables
        class_active: "active", // active class
        class_trigger: "trigger", // trigger class
        toggle_btn: $(".site-nav-toggle"), // header navigation toggle button for mobile view
        navigation: $(".site-nav"), // navigation selector
        sticky_wrapper: ".sticky-wrapper", // sticky header wrapper class
        pre_loader: $(".site-preloader"), // pre loader selector
        windows: $(window), // document window
        selector_slider: document.getElementById("sequence"), // header slider javascript selector
        selector_tab: $("#site-tabs-1"), // tabs selector for (tabs section)
        tabs_button: $(".site-tabs-buttons"), // tabs buttons for (tabs section)
        site_tabs: $(".site-tabs"), // tabs for (tabs section)
        tabs_bg: $(".site-tab-bg"), // tabs background image for (tabs section)
        selector_team: $("#team-section-slider"), // team slider selector for (team section)
        selector_testimonial: $("#testimonial-slider"), // testimonial selector for (testimonial section)
        contact_form: $("#contactForm"), // contact form selector

        /*-----------------------------------------------------------------------------------*/
        /* Pre-loader: This is used to show the full page pre-loader.
         * As long as the website does not load completely */
        /*-----------------------------------------------------------------------------------*/
        preloader_show: function(self) {

            // this
            self = this;

            // Check if the pre loader div on html is present
            if (self.pre_loader.length === 1) {

                // Hide the pre loader when page loaded
                self.windows.on("load", function() {
                    // fade out animation
                    self.pre_loader.fadeOut(400);
                });
            }
        },


        /*-----------------------------------------------------------------------------------*/
        /* Internal scroll links changeable option */
        /*-----------------------------------------------------------------------------------*/
        internal_scroll_links: function(self, scroll_speed) {

            // Change the scroll speed. Value is in milliseconds
            scroll_speed = 1000;

            // this
            self = this;

            // click function
            self.navigation.find("a[href^='#']").on("click", function(event, target, $target) {

                // Stop default behaviour
                event.preventDefault();

                // Get the target
                target = this.hash;
                $target = $(target);

                // scroll animate
                $("html, body").stop().animate({
                    "scrollTop": $target.offset().top
                }, scroll_speed);
            });
        },


        /*-----------------------------------------------------------------------------------*/
        /* Tab Section Options
         * Source: http://vdw.github.io/Tabslet/ */
        /*-----------------------------------------------------------------------------------*/
        tab_section: function(self) {

            // this
            self = this;

            // Initialize the plugin
            self.selector_tab.tabslet({
                active: 1, // Active the first tab. 1 is tab number.
                animation: true // Animation used on tabs switch. Options (true or false)
            });

            // Change the Images
            self.tabs_button.on("mouseup", "a", function(attribute, background) {
                // get the data-tab-bg attribute
                attribute = $(this).attr("data-tab-bg");
                // find the attribute class
                background = self.site_tabs.find("." + attribute + "");
                // check if the element not has active class
                if (!background.hasClass(self.class_active)) {
                    // remove the active class
                    self.tabs_bg.removeClass(self.class_active);
                    // add the active class
                    background.addClass(self.class_active);
                }
            });
        },


        /*-----------------------------------------------------------------------------------*/
        /* Ajax Contact form for sending mails without page reload */
        /*-----------------------------------------------------------------------------------*/
        ajax_form_submit: function(formMessages, formIcon) {

            // Get the messages div.
            formMessages = this.contact_form.find("button[type=submit]");
            // Animate icon
            formIcon = formMessages.find("i");

            // Set up an event listener for the contact form.
            this.contact_form.on("submit", function(event, self) {

                // Stop the browser from submitting the form.
                event.preventDefault();

                // this
                self = $(this);

                // show the progress bar
                formIcon.css("display", "inline-block");

                // Submit the form using AJAX.
                $.ajax({
                        type: "POST", // POST method
                        url: self.attr("action"), // font action attribute
                        data: self.serialize() // Serialize the form data
                    })
                    // Mail send success function
                    .done(function(response) {
                        // Set the message text.
                        $(formMessages).text(response);
                        // Clear the form.
                        self.find("input, textarea").val("");
                        // hide the progress bar
                        formIcon.css("display", "none");
                    })

                // Mail fail error function
                .fail(function(data) {
                    // Set the message text.
                    if (data.responseText !== "") {
                        $(formMessages).html("Error");
                    }
                    // hide the progress bar
                    formIcon.css("display", "none");
                });
            });
        },
    };


    /*-----------------------------------------------------------------------------------*/
    /* Call functions */
    /*-----------------------------------------------------------------------------------*/
    TOptions.preloader_show();
    TOptions.internal_scroll_links();
    TOptions.ajax_form_submit();

});