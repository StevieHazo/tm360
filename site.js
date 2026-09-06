'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const relatedStyles = document.createElement('link');
  relatedStyles.rel = 'stylesheet';
  relatedStyles.href = 'related-guides.css';
  document.head.appendChild(relatedStyles);

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

  document.querySelectorAll('[data-year]').forEach(function (year) {
    year.textContent = new Date().getFullYear();
  });

  const guides = {
    independent: {
      title: 'Tour management for independent bands',
      description: 'What professional support looks like when a band has outgrown running everything from the stage.',
      url: 'tour-management-independent-bands.html',
      category: 'Tour Management'
    },
    unsigned: {
      title: 'Tour management for unsigned artists',
      description: 'Professional touring does not need to wait for a record deal.',
      url: 'tour-management-unsigned-artists.html',
      category: 'Tour Management'
    },
    grassroots: {
      title: 'Grassroots tour management',
      description: 'Practical support for small crews, tight budgets and original artists.',
      url: 'grassroots-tour-management.html',
      category: 'Tour Management'
    },
    advancing: {
      title: 'How band tour advancing works',
      description: 'The venue, timetable, technical, hospitality and payment details to confirm before departure.',
      url: 'band-tour-advancing.html',
      category: 'Advancing'
    },
    budgeting: {
      title: 'UK tour budgeting for independent bands',
      description: 'Understand the likely income, costs, cashflow and shortfall before committing to the road.',
      url: 'uk-tour-budgeting.html',
      category: 'Finance'
    },
    funding: {
      title: 'Funding your UK tour',
      description: 'Turn the activity, evidence and budget into a credible funding plan.',
      url: 'funding-your-uk-tour.html',
      category: 'Funding'
    },
    driver: {
      title: 'Tour manager and driver package',
      description: 'Combined operational control and driving for suitable grassroots touring parties.',
      url: 'tour-manager-driver-package.html',
      category: 'Packages'
    },
    transport: {
      title: 'Band van and trailer package',
      description: 'Dedicated transport for the touring party and equipment.',
      url: 'band-van-trailer-package.html',
      category: 'Transport'
    },
    wellbeing: {
      title: 'Artist wellbeing on tour',
      description: 'How rest, access, communication and pressure can be included in the actual touring plan.',
      url: 'artist-wellbeing-on-tour.html',
      category: 'Wellbeing'
    },
    headline: {
      title: 'Planning your first UK headline tour',
      description: 'A practical step from scattered gigs to a properly planned touring run.',
      url: 'first-uk-headline-tour.html',
      category: 'Planning'
    },
    weekend: {
      title: 'Weekend tour management',
      description: 'Professional preparation and road support for a compact run of shows.',
      url: 'weekend-tour-management.html',
      category: 'Packages'
    },
    album: {
      title: 'Planning an album-release tour',
      description: 'Connect the live run to the release campaign without losing control of delivery.',
      url: 'album-release-tour-planning.html',
      category: 'Planning'
    }
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
      const guide = guides[key];
      return '<a class="related-guide-card" href="' + guide.url + '">' +
        '<span class="related-guide-category">' + guide.category + '</span>' +
        '<h3>' + guide.title + '</h3>' +
        '<p>' + guide.description + '</p>' +
        '<strong>Read guide →</strong>' +
      '</a>';
    }).join('');

    section.innerHTML = '<div class="wrap">' +
      '<div class="related-guide-heading">' +
        '<div><p class="eyebrow">' + (homepage ? 'Popular touring guides' : 'Related guides') + '</p>' +
        '<h2>' + (homepage ? 'Useful before the van leaves.' : 'Keep planning the tour.') + '</h2></div>' +
        '<a class="related-guide-all" href="resources.html">View all resources →</a>' +
      '</div>' +
      '<div class="related-guide-grid">' + cards + '</div>' +
    '</div>';
    return section;
  }

  const keys = relatedByPage[pathname];
  if (keys && !document.querySelector('.related-guides')) {
    const section = createGuideSection(keys, pathname === 'index.html');
    const footer = document.querySelector('footer');
    const finalCta = document.querySelector('.final-cta');

    if (pathname === 'index.html' && finalCta) {
      finalCta.parentNode.insertBefore(section, finalCta);
    } else if (footer) {
      footer.parentNode.insertBefore(section, footer);
    }
  }
});
