/*
 * Talkbalt website widget. Add one line to any website:
 *
 *   <script src="https://YOUR-TALKBALT-DOMAIN/widget.js" data-business="your-business-slug" async></script>
 *
 * Its look (button text, colour, side, logo) comes from the business's dashboard (Share & embed), so
 * changes there show up without touching the website. Attributes on the tag win over the dashboard:
 * data-label="Talk to us", data-color="#0f766e", data-position="left", data-logo="https://...".
 *
 * The button opens a small panel with the business's call page in an iframe (allowed to use the
 * microphone), so the call itself and all its code stay on Talkbalt: nothing heavy loads on the host
 * page, and closing the panel ends the call. Everything lives in a Shadow DOM, so the host page's
 * CSS can't break it.
 *
 * Inside Instagram, Facebook and similar apps the microphone is blocked, so the button opens the
 * business's call page instead, which takes the visitor to their real browser.
 */
(function () {
  var script = document.currentScript;
  var slug = script && script.getAttribute('data-business');
  if (!slug || window.__talkbaltWidget) return;
  window.__talkbaltWidget = true;

  var origin = new URL(script.src).origin;
  var attr = function (name) {
    return script.getAttribute('data-' + name) || '';
  };
  var inApp = /Instagram|Barcelona|FBAN|FBAV|FB_IAB|FBIOS|FB4A|Messenger|musical_ly|BytedanceWebview|TikTok|Snapchat|LinkedInApp/i
    .test(navigator.userAgent);

  function build(config) {
    var label = attr('label') || config.label || 'Start your call';
    var color = /^#[0-9a-f]{6}$/i.test(attr('color')) ? attr('color') : config.color || '#4b46d6';
    var side = (attr('position') || config.position) === 'left' ? 'left' : 'right';
    var logo = attr('logo') || config.logo_url || '';

    var host = document.createElement('div');
    host.style.cssText = 'position:fixed;' + side + ':20px;bottom:20px;z-index:2147483000;';
    var root = host.attachShadow({ mode: 'open' });
    root.innerHTML =
      '<style>' +
      ':host{all:initial}' +
      '*{box-sizing:border-box;font-family:Inter,ui-sans-serif,system-ui,sans-serif}' +
      '.btn{display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:12px 18px;cursor:pointer;' +
      'background:' + color + ';color:#fff;font-size:15px;font-weight:600;line-height:1}' +
      '.btn.has-logo{padding:6px 18px 6px 6px}' +
      '.btn:focus-visible,.close:focus-visible{outline:3px solid ' + color + '55;outline-offset:2px}' +
      '.logo{width:30px;height:30px;border-radius:999px;object-fit:cover;background:#fff}' +
      '.bars{display:flex;align-items:flex-end;gap:2px;height:14px}' +
      '.bars i{display:block;width:3px;border-radius:2px;background:#fff}' +
      '.panel{position:fixed;' + side + ':20px;bottom:80px;width:380px;height:600px;max-height:calc(100vh - 100px);' +
      'display:flex;flex-direction:column;border:1px solid #dfe3ec;border-radius:20px;overflow:hidden;background:#f8f9fb}' +
      '.panel[hidden]{display:none}' +
      '.head{display:flex;justify-content:flex-end;padding:6px}' +
      '.close{border:0;background:transparent;border-radius:999px;width:32px;height:32px;cursor:pointer;color:#5d6478;font-size:20px;line-height:1}' +
      '.close:hover{background:#eceef3}' +
      'iframe{flex:1;width:100%;border:0;background:#f8f9fb}' +
      '@media (max-width:480px){.panel{inset:0;width:auto;height:auto;max-height:none;border-radius:0}}' +
      '</style>' +
      '<div class="panel" hidden role="dialog" aria-label="Call"><div class="head">' +
      '<button class="close" type="button" aria-label="Close and end the call">×</button></div></div>' +
      '<button class="btn" type="button"><span class="mark" aria-hidden="true"></span><span class="label"></span></button>';
    root.querySelector('.label').textContent = label;

    var mark = root.querySelector('.mark');
    if (logo) {
      var img = document.createElement('img');
      img.className = 'logo';
      img.alt = '';
      img.src = logo;
      mark.appendChild(img);
      root.querySelector('.btn').classList.add('has-logo');
    } else {
      mark.className = 'bars';
      mark.innerHTML = '<i style="height:6px"></i><i style="height:12px"></i><i style="height:14px"></i><i style="height:9px"></i>';
    }

    var panel = root.querySelector('.panel');
    var button = root.querySelector('.btn');

    function open() {
      if (!panel.querySelector('iframe')) {
        var frame = document.createElement('iframe');
        frame.src = origin + '/embed/' + encodeURIComponent(slug);
        frame.title = 'Call';
        frame.allow = 'microphone; autoplay';
        panel.appendChild(frame);
      }
      panel.hidden = false;
    }

    function close() {
      // Removing the iframe ends the call, so nothing keeps listening after the panel closes.
      var frame = panel.querySelector('iframe');
      if (frame) frame.remove();
      panel.hidden = true;
      button.focus();
    }

    button.addEventListener('click', function () {
      if (inApp) {
        window.location.href = origin + '/b/' + encodeURIComponent(slug);
        return;
      }
      if (panel.hidden) open();
      else close();
    });
    root.querySelector('.close').addEventListener('click', close);

    (document.body || document.documentElement).appendChild(host);
  }

  // The dashboard's settings; if they can't be loaded, the widget still appears with its defaults.
  fetch(origin + '/api/widget/' + encodeURIComponent(slug))
    .then(function (res) {
      return res.ok ? res.json() : {};
    })
    .catch(function () {
      return {};
    })
    .then(build);
})();
