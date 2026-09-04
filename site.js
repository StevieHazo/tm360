'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const overrideStyles = document.createElement('link');
  overrideStyles.rel = 'stylesheet';
  overrideStyles.href = 'brand-overrides.css';
  document.head.appendChild(overrideStyles);

  document.querySelectorAll('.brand').forEach(function (brand) {
    brand.setAttribute('aria-label', 'TM360° home');
    brand.innerHTML = '';

    const logo = document.createElement('img');
    logo.src = 'TM360_OFFICIAL_logo.png';
    logo.alt = '';
    logo.className = 'tm360-logo';

    const wordmark = document.createElement('span');
    wordmark.className = 'tm360-wordmark';
    wordmark.innerHTML = 'TM360<span class="degree">°</span>';

    brand.append(logo, wordmark);
  });

  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.links');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

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

  document.title = document.title.replace(/TM360(?!°)/g, 'TM360°');

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(function (node) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, code, pre, a[href^="mailto:"]')) return;
    node.nodeValue = node.nodeValue.replace(/TM360(?!°)/g, 'TM360°');
  });
});
