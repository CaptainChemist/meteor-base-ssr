import { Meteor } from 'meteor/meteor';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { Routes } from './routes.js';
import Helmet from 'react-helmet';

ReactRouterSSR.Run(
  Routes,
  {
    props: {
      onUpdate() {
        hashLinkScroll();
        // Notify the page has been changed to Google Analytics
        ga('send', 'pageview');
      },
      htmlHook(html) {
        const head = Helmet.rewind();
        html = html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
        return html;      }
    }
  },
  {
    htmlHook(html){
      const head = Helmet.rewind();
      html = html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
      return html;
    },
  }
);

if(Meteor.isClient){
  // Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-xx-1', 'auto', {'allowLinker': true});
  ga('require', 'linker');
  ga('linker:autoLink', ['another-domain.com']);
  ga('send', 'pageview');

  // Facebook tracking
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', 'xxxx');
  fbq('track', "PageView");
  fbq('trackCustom', 'LoggedOutPageView');
}


function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000);
  }, 100);
  }
}
