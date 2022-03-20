//v1.0.3
if (typeof WebPush == 'undefined') {
  var WebPush = {
    messaging: null,
    timeout: 100,
    utils: {
      create_cookie: function (name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      },
      read_cookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
      random_str: function (l) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < l; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      },
      create_append_script: function () {
        var script_id = '__trendyol_fb_script';

        var el = document.getElementById(script_id);
          if (el == null) {
              setTimeout(function () {
                  var script = document.createElement("script");
                  script.src = 'https://www.gstatic.com/firebasejs/4.5.0/firebase.js';
                  script.id = script_id;
                  document.getElementsByTagName('body')[0].appendChild(script);
              }, 5000);
          return true;
        }
        return false;
      },
      poll: function () {
        setTimeout(function () {
          WebPush.timeout--;

          // if script is loaded
          if (typeof firebase !== 'undefined') {
            var config = {
              apiKey: "AIzaSyA5rR-3ptI5Z7xRkRXO7ypyTEp9qYrsu64",
              authDomain: "trendyol-web-push.firebaseapp.com",
              messagingSenderId: "36059958807",
            };
            firebase.initializeApp(config);

            // initialize the messaging object
            WebPush.init();
          } else if (WebPush.timeout > 0) {
            WebPush.utils.poll();
          }
        }, 100);
      },
      XmlHttpObj: function () {
        var xhr = null;
        try {
          xhr = new ActiveXObject("MsXml2.XMLHTTP");
        } catch (e) {
          try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
            if (typeof XMLHttpRequest != "undefined") {
              xhr = new XMLHttpRequest();
            }
          }
        }
        return xhr;
      }
    },
    init: function () {
      messaging = firebase.messaging();
    },
    getSubdomain: function () {
      return window.location.host.split('.')[0];
    },
    saveToken: function (pushToken) {
      var pid = WebPush.utils.read_cookie('pid');
      if (pid == null) {
        pid = WebPush.utils.read_cookie('pid_alt');
      }
      if (typeof dataLayerUserId == 'undefined') {
        if (typeof userId == 'undefined') {
          dataLayerUserId = '0';
        } else {
          dataLayerUserId = userId;
        }
      }
      var uid = (dataLayerUserId == '0') ? '' : dataLayerUserId;

      var subdomain = 'm2';
      if (WebPush.getSubdomain() === 'stage') {
        subdomain = 'm2stage';
      }
      if (!WebPush.utils.read_cookie('has_wp_token')) {
        var xmlhttp = WebPush.utils.XmlHttpObj();
        xmlhttp.open("POST", "https://" + subdomain + ".trendyol.com/token");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.send("token=" + pushToken + '&userId=' + uid + '&pid=' + pid);
        WebPush.utils.create_cookie('has_wp_token', true, 1)
      }
    },
    getToken: function () {
      messaging.getToken().then(function (currentToken) {
        if (currentToken) {
          WebPush.saveToken(currentToken);
        }
      }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
      });
    },
    requestPermission: function () {
      if (typeof window.Notification != "undefined" && typeof window.messaging != "undefined") {
        var initialPermission = window.Notification.permission;
        messaging.requestPermission().then(function () {
          var currentPermission = window.Notification.permission;
          if (initialPermission != currentPermission) {
            dataLayer.push({ event: 'webPushApproved' })
          }
          WebPush.getToken();
        }).catch(function (err) {
          var currentPermission = window.Notification.permission;
          if (initialPermission != currentPermission) {
            dataLayer.push({ 'event': 'webPushCanceled' })
          }
          console.log('Unable to get permission to notify.', err);
        });
      }
    }
  }
}

if (typeof firebase == 'undefined') {
  if (WebPush.utils.create_append_script('app')) {
    WebPush.utils.poll();
  }
} else {
  WebPush.init();
}