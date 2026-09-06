'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const SITE_EMAIL = 'info@tm360.uk';
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbgjadnq';

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    const current = link.getAttribute('href') || '';
    const query = current.includes('?') ? current.slice(current.indexOf('?')) : '';
    link.setAttribute('href', 'mailto:' + SITE_EMAIL + query);
    const visible = (link.textContent || '').trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visible)) link.textContent = SITE_EMAIL;
  });

  document.querySelectorAll('form[action^="mailto:"]').forEach(function (form) {
    form.setAttribute('action', FORMSPREE_ENDPOINT);
    form.setAttribute('method', 'POST');
    form.removeAttribute('enctype');
    form.setAttribute('data-formspree-form', '');
  });

  const emailPattern = /(?:hello|contact|info|stevie|steve)@(?:tm360\.uk|tm360\.co\.uk|tourmanagement360\.uk|soswifi\.uk)/gi;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(function (node) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, textarea, input, option, code, pre')) return;
    node.nodeValue = node.nodeValue.replace(emailPattern, SITE_EMAIL);
  });

  document.querySelectorAll('[data-formspree-form]').forEach(function (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      let status = form.querySelector('[data-form-status]');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status';
        status.setAttribute('data-form-status', '');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        form.appendChild(status);
      }
      const originalText = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      status.textContent = 'Sending your enquiry…';
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.textContent = 'Thanks. Your enquiry has been sent to TM360°.';
      } catch (error) {
        status.textContent = 'Sorry, your enquiry could not be sent. Please email ' + SITE_EMAIL + '.';
      } finally {
        if (button) { button.disabled = false; button.textContent = originalText; }
      }
    });
  });

  const relatedStyles = document.createElement('link');
  relatedStyles.rel = 'stylesheet';
  relatedStyles.href = 'related-guides.css';
  document.head.appendChild(relatedStyles);
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.links');
  window.addEventListener('scroll', function () { if (header) header.classList.toggle('scrolled', window.scrollY > 30); });
  if (menu && nav) {
    menu.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { nav.classList.remove('open'); }); });
  }
  document.querySelectorAll('[data-year]').forEach(function (year) { year.textContent = new Date().getFullYear(); });

  const guides = {
    independent: ['Tour management for independent bands', 'What professional support looks like when a band has outgrown running everything from the stage.', 'tour-management-independent-bands.html', 'Tour Management'],
    unsigned: ['Tour management for unsigned artists', 'Professional touring does not need to wait for a record deal.', 'tour-management-unsigned-artists.html', 'Tour Management'],
    grassroots: ['Grassroots tour management', 'Practical support for small crews, tight budgets and original artists.', 'grassroots-tour-management.html', 'Tour Management'],
    advancing: ['How band tour advancing works', 'The venue, timetable, technical, hospitality and payment details to confirm before departure.', 'band-tour-advancing.html', 'Advancing'],
    budgeting: ['UK tour budgeting for independent bands', 'Understand the likely income, costs, cashflow and shortfall before committing to the road.', 'uk-tour-budgeting.html', 'Finance'],
    funding: ['Funding your UK tour', 'Turn the activity, evidence and budget into a credible funding plan.', 'funding-your-uk-tour.html', 'Funding'],
    driver: ['Tour manager and driver package', 'Combined operational control and driving for suitable grassroots touring parties.', 'tour-manager-driver-package.html', 'Packages'],
    transport: ['Band van and trailer package', 'Dedicated transport for the touring party and equipment.', 'band-van-trailer-package.html', 'Transport'],
    wellbeing: ['Artist wellbeing on tour', 'How rest, access, communication and pressure can be included in the actual touring plan.', 'artist-wellbeing-on-tour.html', 'Wellbeing'],
    headline: ['Planning your first UK headline tour', 'A practical step from scattered gigs to a properly planned touring run.', 'first-uk-headline-tour.html', 'Planning'],
    weekend: ['Weekend tour management', 'Professional preparation and road support for a compact run of shows.', 'weekend-tour-management.html', 'Packages'],
    album: ['Planning an album-release tour', 'Connect the live run to the release campaign without losing control of delivery.', 'album-release-tour-planning.html', 'Planning']
  };
  const pathname = window.location.pathname.split('/').pop() || 'index.html';
  const relatedByPage = {
    'index.html': ['budgeting', 'funding', 'grassroots', 'driver'],
    'tour-management.html': ['independent', 'unsigned', 'grassroots', 'advancing'],
    'packages.html': ['weekend', 'driver', 'transport', 'headline'],
    'funding.html': ['funding', 'budgeting', 'headline', 'album'],
    'wellbeing.html': ['wellbeing', 'grassroots', 'weekend', 'headline'],
    'grant-readiness.html': ['funding', 'budgeting', 'album', 'headline']
  };
  function createGuideSection(keys, homepage) {
    const section = document.createElement('section');
    section.className = homepage ? 'related-guides related-guides-home' : 'related-guides';
    const cards = keys.map(function (key) {
      const g = guides[key];
      return '<a class="related-guide-card" href="' + g[2] + '"><span class="related-guide-category">' + g[3] + '</span><h3>' + g[0] + '</h3><p>' + g[1] + '</p><strong>Read guide →</strong></a>';
    }).join('');
    section.innerHTML = '<div class="wrap"><div class="related-guide-heading"><div><p class="eyebrow">' + (homepage ? 'Popular touring guides' : 'Related guides') + '</p><h2>' + (homepage ? 'Useful before the van leaves.' : 'Keep planning the tour.') + '</h2></div><a class="related-guide-all" href="resources.html">View all resources →</a></div><div class="related-guide-grid">' + cards + '</div></div>';
    return section;
  }
  const keys = relatedByPage[pathname];
  if (keys && !document.querySelector('.related-guides')) {
    const section = createGuideSection(keys, pathname === 'index.html');
    const footer = document.querySelector('footer');
    const finalCta = document.querySelector('.final-cta');
    if (pathname === 'index.html' && finalCta) finalCta.parentNode.insertBefore(section, finalCta);
    else if (footer) footer.parentNode.insertBefore(section, footer);
  }
});
