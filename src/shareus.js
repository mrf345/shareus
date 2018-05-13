// Dependencies: jQuery, jQuery-UI, Bootstrap

var shareus = function ShareUs (options={}, callback=function () {}) {
    $('.navbar').removeClass('fixed-top')
    self = {} // Object to return instead of this
    self.options = {
        text: options.text || "This is the title, Share with others :", // main title text
        textStyle: options.textStyle || {}, // text .css() style
        overlayColor: options.overlayColor || "rgba(0,0,0,0.85)", // overlay background color
        overlayStyle: options.overlayStyle || {}, // overlay .css() style, don't play with display:
        buttonText: options.buttonText || "I don't care. Just download",
        buttonClass: options.buttonClass || "", // button css classes
        buttonStyle: options.buttonStyle || {}, // button .css() style
        buttonLink: options.buttonLink || "#", // link to go to after button clicked
        shareLink: options.shareLink, // link to share on social media
        facebook: options.facebook || "true", // display facebook link
        facebookLink: options.facebookLink || 'https://www.facebook.com/sharer.php?u=' + options.shareLink || '#', // your facebook sharing link
        twitter: options.twitter || "true", // display twitter link
        twitterLink: options.twitterLink || 'https://twitter.com/share?url=' + options.shareLink || '#', // your twitter sharing link
        googleP: options.googleP || "true", // display google plus
        googlePLink: options.googlePLink || 'https://plus.google.com/share?url=' + options.shareLink || '#', // your google-plus sharing link
        linkedin: options.linkedin || "true", // display linkedin link
        linkedinLink: options.linkedinLink || 'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + options.shareLink || '#', // you linked sharing link
        iconStyle: options.iconStyle || {}, // social media icon .css() style
        effect_duration: options.effect_duration * 1000 || 1000 // overlay effect duration
    }

    links = {
        'facebook': self.options.facebookLink,
        'linkedin': self.options.linkedinLink,
        'google-plus': self.options.googlePLink,
        'twitter': self.options.twitterLink
    }

    defaults = {
        iconClass: 'shareUsIcon', // social media icons common class name (useless)
        overlayClass: 'shareUsOverlay', // overlay div class name 
        effectLoops: {} // storing social media icons effects loops
    }
    // to avoid effect and not effecting not used social media icons
    if (self.options.facebook === 'true') defaults.effectLoops['facebook'] = false
    if (self.options.linkedin === 'true') defaults.effectLoops['linkedin'] = false
    if (self.options.googleP === 'true') defaults.effectLoops['google-plus'] = false
    if (self.options.twitter === 'true') defaults.effectLoops['twitter'] = false

    elements = {
        text: $('<h1>').text(self.options.text).css(Object.assign({
            'color': 'white',
            'font-family': 'Georgia, Times, serif',
            'text-shadow': '0 0 30px rgba(255,255,255,0.5)'
        }, self.options.textStyle)).addClass('text-center'),
        button: $('<button>').addClass('btn btn-lg ' + self.options.buttonClass).text(self.options.buttonText).click(function () {
            self.__exit__()
            window.open(self.options.buttonLink)
            callback()
        }),
        icon: function iconIt (i='') {
            return $('<a>').click(
                function () {
                    self.__exit__()
                    window.open(links[i])
                    window.open(self.options.buttonLink)
                    callback()
                }
            ).css({
                'cursor': 'pointer'
            }).append($('<span>').addClass('fa fa-5x fa-' + i + ' ' + defaults.iconClass).css(Object.assign({
                'color': 'white',
                'text-shadow': '0 0 30px rgba(255,255,255,0.5)',
                'margin-right': '20%',
                'margin-left': '20%',
            }, self.options.iconStyle))
            .attr('id', i).hover(function () { __pauseEffect__(i) }, function () { __pauseEffect__(i, false)}))
        }
    }

    elements.overlay = $('<div>').addClass(defaults.overlayClass).css(Object.assign({
        'display': 'flex',
        'position': 'fixed',
        'opacity': '0',
        'background-color': self.options.overlayColor,
        'width': '100%',
        'height': '100%',
        'top': '0',
        'bottom': '0',
        'left': '0',
        'right': '0',
        'z-index': '2',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'space-around'
    }, self.options.overlayStyle))
    .append(elements.text)

    // To append only allowed social media icons
    elements.row = $('<div>').css({
        'display': 'flex',
        'flex-direction': 'row'
    })
    if (self.options.facebook === 'true') elements.row.append(elements.icon('facebook'))
    if (self.options.linkedin === 'true') elements.row.append(elements.icon('linkedin'))
    if (self.options.googleP === 'true') elements.row.append(elements.icon('google-plus'))
    if (self.options.twitter === 'true') elements.row.append(elements.icon('twitter'))
    // delay button to the end
    elements.overlay.append(elements.row)
    elements.overlay.append(elements.button)

    function __effect__ () {
        Object.keys(defaults.effectLoops).forEach(function (i) {
            $('#' + i).animate({'opacity': '0'}, __randInt__(4, 2000, 500)).animate({'opacity': '1'}, __randInt__(4, 2000, 500))
            defaults.effectLoops[i] = setInterval(function () {
                $('#' + i).animate({'opacity': '0'}, __randInt__(4, 2000, 500)).animate({'opacity': '1'}, __randInt__(4, 2000, 500))
            }, __randInt__(4, 6000, 3000))
        })
    }

    function __pauseEffect__ (id, pause=true) {
        var element = $('#' + id)
        if (pause) {
            clearInterval(defaults.effectLoops[id])
            element.stop(true).animate({'color': 'gray', 'opacity': '1'})
        } else {
            element.animate({'color': 'white'})
            element.animate({'opacity': '0'}, __randInt__(4, 2000, 500)).animate({'opacity': '1'}, __randInt__(4, 2000, 500))
            defaults.effectLoops[id] = setInterval(function () {
                element.animate({'opacity': '0'}, __randInt__(4, 2000, 500)).animate({'opacity': '1'}, __randInt__(4, 2000, 500))
            }, __randInt__(4, 6000, 3000))
        }
    }

    function __randInt__ (range, lt, gt) {
        // to generate floored random integers with limits
        var rNumber
        while (true) {
            rNumber = Math.floor(Math.random() * (10 ** range))
            if (rNumber < lt && rNumber > gt) return rNumber
        }
    }

    self.__init__ = function initIT () {
        $('body').append(elements.overlay)
        $('.' + defaults.overlayClass).animate({
            'opacity': '1'
        }, self.options.effect_duration)
        __effect__()
    }

    self.__exit__ = function exitIt (callback=function () {}) {
        for (var e in defaults.effectLoops) {
            clearInterval(defaults.effectLoops[e])
        }
        $('.' + defaults.overlayClass).animate({
            'opacity': '0'
        }, self.options.effect_duration, function () {
            callback()
            $('.' + defaults.overlayClass).remove()
        })
    }

    return self
}