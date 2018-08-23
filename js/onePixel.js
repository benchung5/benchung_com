;(function ( $, window, document, undefined ) {
    
    $.fn.onePixel = function ( options ) {
        
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend( {
            'location'         : 'top',
            'background-color' : 'blue'
        }, options);
         
        //fadein on page load --------------------------------------------------------//
        //to display loading animation before it's ready
        $(document).ready(function() {
            if ($('.loading-container').length) {
                
                //to show loading animation
                $imgloader = $('.loading-container');
                $loadingimg = $('<div id="canvasloader-container" class="onepix-imgloader"></div>');


//          $loadingimg.attr("src","images/flexslider/loading.gif");
                $imgloader.prepend($loadingimg);

//          canvasloader code
                var cl = new CanvasLoader('canvasloader-container');
                cl.setColor('#fb9e05'); // default is '#000000'
                cl.setDiameter(45); // default is 40
                cl.setDensity(75); // default is 40
                cl.setRange(0.7); // default is 1.3
                cl.setSpeed(3); // default is 2
                cl.setFPS(22); // default is 24
                cl.show(); // Hidden by default

                $(window).load(function () {
                    $('.onepix-imgloader').fadeOut();
                    // fade in content (using opacity instead of fadein() so it retains it's height.
                    //if home slider doesn't exist (else the slider callback handles this)...
                    if (!$('.homeslider').length || !$('homeslider').children().length) {
                        fade_in_page();
                    }

                });
                
            }

        });
        
//        used to bind loading for the page and flexslider ()
        function fade_in_page() {
            $('.loading-container > *:not(.onepix-imgloader)').fadeTo(8000, 100);
        }

        // mobile menu------------------------------------------------------------//

        $(document).ready(function() {

            // non dropdown select version mobile menu
            $('#mobile-menu-container .menu').custom_mobileMenu();


            // for submenu...
            // the stop is to make smooth animatins without the common problem of multiple queued animations 
            $('#nav-secondary ul.sub-menu > li > a, #nav-primary ul.sub-menu > li > a').hover(function() {
                $(this).find('.sub-menu').fadeIn();
            },
            function() {
                $(this).find('.sub-menu').fadeOut();
            });
            
        });

        // dropdown menu ------------------------------------------------------------//

        $(document).ready(function($) {

            // the stop is to make smooth animatins without the common problem of multiple queued animations 
            
            // for inheader and belowheader style submenu--------------//
            
            $('#nav-primary > .nav-wrapper > nav > div > ul > li, #nav-primary-b > .nav-wrapper > nav > div > ul > li').hover(function() {
                $(this).children('ul.sub-menu').stop(true, true).fadeIn(100);
            },
            function() {
                $(this).children('ul.sub-menu').stop(true, true).fadeOut(100);

            });
            
//           for submenu (2nd level)
            $('#nav-primary nav ul.sub-menu > li.menu-item-has-children, #nav-primary-b > .nav-wrapper > nav > div > ul > li > ul.sub-menu').hover(function() {
                //alert('got me');
                var position = $(this).position();
                //$(this).children('ul.sub-menu').css( "top", position.top );
                $(this).children('ul.sub-menu').stop(true, true).show();
//                alert(position.top);
            },
            function() {
                $(this).children('ul.sub-menu').stop(true, true).hide();

            });
            
        });

        // "stellar" parallax --------------------------------------------------//

        $(document).ready(function() {
            $.stellar({
                horizontalScrolling: false
            });
        })

        //sticky menu ----------------------------------------------------//
 
        $(document).ready(function () {

            $("#nav-primary").sticky({topSpacing: 0});
            $('#nav-primary').on('sticky-start', function () {
                $(this).hide();
                $(this).fadeIn('slow');
            });
            $('#nav-primary').on('sticky-end', function () {
            });

            $("#mobile-menu-container").sticky({topSpacing: 0});
            
        });

        //button hover ----------------------------------------------------//

        //must do this since css won't allow it while controlling the shortcode
        $(function () {
            //copy the colour and hover color of the element (set by the shortcode) and apply it to the hover bg
            $('a.btn.outline, .load-more-link').hover(
                    function () {
                        var that = $(this);
                        var color = that.data("color");
                        that.css("background", color);
                        if (that.data("color_hover")) {
                            var color_hover =  that.data("color_hover");
                            that.css("color", color_hover);
                            that.children( "i" ).css( "color", color_hover );
                        } else {
                            that.css("color", '#fff');
                        }
                    },
                    function () {
                        var that = $(this);
                        var color = that.data("color");
                        that.css("background", "transparent");
                        that.css("color", color);
                    }
            );
        });
        
        //header search form ----------------------------------------------------//

        //must do this since css won't allow it while controlling the shortcode
        $(function () {
            //copy the colour and hover color of the element (set by the shortcode) and apply it to the hover bg
            $('#searchform #searchclose').click(
                    function () {
                       $('#searchform #searchwrap').hide();
                    });
            $('#searchform #searchbtn').click(
                    function () {
                       $('#searchform #searchwrap').show();
                    });
                
        });


        //back to top --------------------------------------------------//

        $(function() {

            $(window).scroll(function() {
                //important -> height: auto must be set or jquery scrollTop() won't work
                if($(this).scrollTop() > 100) {
                    $('#toTop').fadeIn(3000);
                } else {
                    $('#toTop').fadeOut();
                }
            });
            $('#toTop').click(function() {
                $('html, body').animate(
                {
                    scrollTop:0
                },
                800,
                "easeInOutExpo",
                function() {
                    $('#toTop').fadeOut(1200);
                });
            });
        });
        

        //search submit button ---------------------------------------------//

        $(document).ready(function() {
            $("a.search-submit-button").click(function()
            {
                $("form#searchform").submit();
            });
        })

        //tabs ---------------------------------------------------------//

        $(function(){
            if ( $( ".onepix-tabs" ).length ) {
                $('.onepix-tabs').tabs({
                    activate: function( event, ui ) {
                        ui.newPanel.find("div.tabcontent")
                        .css({
                            opacity:0
                        })
                        .animate({
                            opacity:1
                        });  
                
                    }
                });
            }
            //hover states on the static widgets
            $('#dialog_link, ul#icons li').hover(
                function() {
                    $(this).addClass('ui-state-hover');
                },
                function() {
                    $(this).removeClass('ui-state-hover');
                }
                );
        });

        //accordion ----------------------------------------------------//

        $(document).ready(function($) {
            if ( $( ".onepix-accordion" ).length ) {
                $( ".onepix-accordion" ).accordion({
                    collapsible: true,
                    active: false,
                    header: 'div.accordion-section > h3',
                    heightStyle: 'content'
                });
            }

        });

        //lunr search ----------------------------------------------------//

        // $(document).ready(function($) {
        //     // Create a new Index
        //     idx = lunr(function(){
        //         this.field('id')
        //         this.field('title', { boost: 10 })
        //         this.field('summary')
        //     })

        //     // Send a request to get the content json file
        //     $.getJSON('/content.json', function(data){

        //         console.log('data: ', data);

        //         // Put the data into the window global so it can be used later
        //         window.searchData = data;

        //         // Loop through each entry and add it to the index
        //         $.each(data, function(index, entry){
        //             idx.add($.extend({"id": index}, entry));
        //         })
        //     })

        //     // // When search is pressed on the menu toggle the search box
        //     // $('#search').on('click', function(){
        //     //     $('.searchForm').toggleClass('show')
        //     // })

        //     // When the search form is submitted
        //     $('#searchform').on('submit', function(e) {
        //         // Stop the default action
        //         e.preventDefault();

        //         // Find the results from lunr
        //         var results = idx.search($('#searchform #s').val());

        //         console.log('window.searchData: ', window.searchData);
        //         console.log('results: ', results);
        //         console.log('idx: ', idx);

        //         // Empty #content and put a list in for the results
        //         $('#content').html('<h1>Search Results (' + results.length + ')</h1>')
        //         $('#content').append('<ul id="searchResults"></ul>')

        //         // Loop through results
        //         $.each(results, function(index, result){
        //             // Get the entry from the window global
        //             entry = window.searchData[result.ref]

        //             // Append the entry to the list.
        //             $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</li>')
        //         })
        //     })
        // });


        $(document).ready(function($) {
          function displaySearchResults(results, store) {
            var searchResults = document.getElementById('search-results');

            if (results.length) { // Are there any results?
              var appendString = '';

              for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];
                appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
                appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
              }

              searchResults.innerHTML = appendString;
            } else {
              searchResults.innerHTML = '<li>No results found</li>';
            }
          }

          function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');

              if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
              }
            }
          }

          var searchTerm = getQueryVariable('query');

          console.log('searchTerm1: ', searchTerm);

          if (searchTerm) {
            document.querySelector('#s').setAttribute("value", searchTerm);

            // Initalize lunr with the fields it will be searching on. I've given title
            // a boost of 10 to indicate matches on this field are more important.
            var idx = lunr(function () {
              this.field('id');
              this.field('title', { boost: 10 });
              this.field('author');
              this.field('category');
              this.field('content');
              // Add the data to lunr
              for (var key in window.store) { 
                this.add({
                  'id': key,
                  'title': window.store[key].title,
                  'author': window.store[key].author,
                  'category': window.store[key].category,
                  'content': window.store[key].content
                });
              }
            });

            var results = idx.search(searchTerm); // Get lunr to perform a search

            console.log('results: ', results);
            console.log('window.store: ', window.store);
            console.log('searchTerm: ', searchTerm);

            displaySearchResults(results, window.store); // We'll write this in the next section
            
          }
        });

    //end $.fn.onePixel = function ( options )
    }
    
    // call the plugin (must use body since it will only work when an element is called)
    $('body').onePixel();

    
})( jQuery, window, document );