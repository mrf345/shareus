# shareus
basic animated overlay for sharing on social media

#### Setup :

```html
    <script type="text/javascript">
        function shareIt (link) {
            shareus({
                buttonLink: link,
                shareLink: 'https://github.com/mrf345/shareus'
            }).__init__()
        }
    </script>
    <button onclick="shareIt('https://Link_to_download')"> Download </button>
    <button onclick="shareIt('https://Link_to_download_2')"> Download 2 </button>
```

#### Options :

```JavaScript
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
    facebookLink: options.facebookLink || "#", // your facebook sharing link
    twitter: options.twitter || "true", // display twitter link
    twitterLink: options.twitterLink || "#", // your twitter sharing link
    googleP: options.googleP || "true", // display google plus
    googlePLink: options.googlePLink || "#", // your google-plus sharing link
    linkedin: options.linkedin || "true", // display linkedin link
    linkedinLink: options.linkedinLink || '#', // you linked sharing link
    iconStyle: options.iconStyle || {}, // social media icon .css() style
    effect_duration: options.effect_duration * 1000 || 1000 // overlay effect duration
}
```