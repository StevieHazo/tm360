'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const heroLogoStyles = document.createElement('link');
  heroLogoStyles.rel = 'stylesheet';
  heroLogoStyles.href = 'hero-logo.css';
  document.head.appendChild(heroLogoStyles);
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.links');

  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  });

  if (menu && nav) {
    menu.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const isHomePage = location.pathname === '/' || location.pathname.endsWith('/index.html');
  const heroHeading = document.querySelector('.hero h1');

  if (isHomePage && heroHeading && heroHeading.textContent.includes('TM360°')) {
    const textNodes = [];
    const walker = document.createTreeWalker(heroHeading, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const textNode of textNodes) {
      const matchIndex = textNode.nodeValue.indexOf('TM360°');
      if (matchIndex === -1) continue;

      const before = textNode.nodeValue.slice(0, matchIndex);
      const after = textNode.nodeValue.slice(matchIndex + 6);
      const fragment = document.createDocumentFragment();

      if (before) fragment.appendChild(document.createTextNode(before));

      const logoWrap = document.createElement('span');
      logoWrap.className = 'hero-inline-logo';

      const logo = document.createElement('img');
      logo.src = 'TM360_OFFICIAL_logo.png';
      logo.alt = 'TM360°';
      logoWrap.appendChild(logo);
      fragment.appendChild(logoWrap);

      if (after) fragment.appendChild(document.createTextNode(after));
      textNode.parentNode.replaceChild(fragment, textNode);
      break;
    }
  }
});
