// Language toggle: switches <html lang> + dir, persists per session.
(function(){
  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('.lang-toggle').forEach(function(btn){
      btn.textContent = lang === 'ar' ? 'EN' : 'عربي';
    });
    try{ sessionStorage.setItem('gf_lang', lang); }catch(e){}
  }

  function currentLang(){
    var saved = null;
    try{ saved = sessionStorage.getItem('gf_lang'); }catch(e){}
    return saved || document.documentElement.getAttribute('lang') || 'ar';
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyLang(currentLang());
    document.querySelectorAll('.lang-toggle').forEach(function(btn){
      btn.addEventListener('click', function(){
        var next = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
        applyLang(next);
      });
    });

    // Highlight active nav link
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a').forEach(function(a){
      if(a.getAttribute('href') === path) a.classList.add('active');
    });

    // Mobile burger toggle
    var burger = document.querySelector('.nav-burger');
    var links = document.querySelector('.nav__links');
    if(burger && links){
      burger.addEventListener('click', function(){ links.classList.toggle('open'); });
    }

    // Mobile-friendly dropdown toggle (click instead of hover on small screens)
    document.querySelectorAll('.dd-trigger').forEach(function(btn){
      btn.addEventListener('click', function(e){
        if(window.innerWidth <= 900){
          e.preventDefault();
          btn.closest('.dropdown').classList.toggle('open');
        }
      });
    });
  });
})();
