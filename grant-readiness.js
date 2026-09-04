'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const programmeData = {
    ukat: {
      name: 'UK Artist Touring Fund',
      guidanceUrl: 'https://thefac.org/ukatfund',
      summary: 'Tour-specific information about dates, guarantees, income, costs and the genuine touring shortfall.',
      questions: [
        ['tourStatus', 'Tour status and format', 'Describe the headline tour and identify confirmed, provisional and promoter-booked dates.'],
        ['touringShortfall', 'Touring shortfall', 'Explain why reasonable projected income does not cover the proposed touring costs.'],
        ['promoterTerms', 'Promoter guarantees and deal terms', 'List guarantees, ticket splits and other expected show income.'],
        ['peoplePaid', 'People being paid', 'Explain how support would help ensure artists, crew and suppliers are paid appropriately.'],
        ['artisticPresentation', 'Artistic presentation', 'Explain how the budget protects the intended live presentation and audience experience.']
      ]
    },
    mcgf: {
      name: 'Music Creators Growth Fund',
      guidanceUrl: 'https://www.artscouncil.org.uk/music-growth-package/who-we-support-music-creators',
      summary: 'Professional track record, ambitious plans, sustainable growth, use of investment and match funding.',
      questions: [
        ['professionalTrackRecord', 'Professional track record', 'Summarise sustained professional creative practice and the strongest supporting evidence.'],
        ['ambitiousPlan', 'Ambitious creative plan', 'Describe the opportunity and the work the investment would unlock.'],
        ['growthSustainability', 'Growth and sustainability', 'Explain how the activity develops skills, capacity, resilience, income or professional opportunities.'],
        ['useOfInvestment', 'Use of investment', 'Explain why the major costs are necessary and proportionate.'],
        ['matchFunding', 'Match funding', 'Identify the source, value and current status of cash match funding.']
      ]
    },
    momentum: {
      name: 'PPL Momentum Music Fund',
      guidanceUrl: 'https://prsfoundation.com/funding-support/funding-music-creators/next-steps/ppl-momentum-music-fund/guidance-and-faqs/',
      summary: 'Career tipping point, media profile, live track record, fan-base evidence and professional team.',
      questions: [
        ['careerTippingPoint', 'Career tipping point', 'Why is the artist at a crucial point of progression?'],
        ['mediaProfile', 'Media profile', 'List relevant press, blogs, radio, playlist and other coverage.'],
        ['liveTrackRecord', 'Live track record', 'Provide evidence of UK shows played, offered or planned.'],
        ['fanBase', 'Fan-base evidence', 'Demonstrate regional and national audience demand.'],
        ['professionalTeam', 'Professional team', 'Identify current professional relationships and explain each role.'],
        ['eligibleActivity', 'Proposed UK activity', 'Separate the proposed touring, recording, writing and marketing activity.']
      ]
    },
    projectgrants: {
      name: 'Arts Council National Lottery Project Grants',
      guidanceUrl: 'https://www.artscouncil.org.uk/ProjectGrants',
      summary: 'Artistic quality, public engagement, partners, feasibility, inclusion, environmental responsibility and evaluation.',
      questions: [
        ['qualityAmbition', 'Quality and ambition', 'Describe the artistic idea, its quality and how the activity develops the work.'],
        ['publicEngagement', 'Public engagement', 'Who will experience or participate in the activity, and how will they be reached?'],
        ['partners', 'Partners and collaborators', 'Who is involved, what will each party do and why are they suitable?'],
        ['feasibility', 'Feasibility and planning', 'Set out planning completed, responsibilities and the delivery timetable.'],
        ['inclusivity', 'Inclusivity and relevance', 'Explain how the activity will be relevant and inclusive for intended audiences.'],
        ['environmental', 'Environmental responsibility', 'Explain the proportionate environmental choices within the project.'],
        ['evaluation', 'Evaluation', 'State the intended outcomes, measures, evidence and learning process.']
      ]
    },
    isf: {
      name: 'International Showcase Fund',
      guidanceUrl: 'https://prsfoundation.com/funding-support/',
      summary: 'Showcase confirmation, international objectives, planned meetings, travel party, costs and follow-up.',
      questions: [
        ['showcaseOpportunity', 'Showcase opportunity', 'Name the showcase, location, dates and status of the invitation.'],
        ['internationalObjective', 'International objective', 'Explain the target territory and professional or commercial objective.'],
        ['meetingsContacts', 'Meetings and contacts', 'List planned industry meetings and relevant existing contacts.'],
        ['travelParty', 'Travel party', 'List each traveller, role and why attendance is necessary.'],
        ['internationalBudget', 'International budget', 'Separate travel, accommodation, visas, freight and other costs.'],
        ['followUp', 'Follow-up plan', 'Explain how contacts, audiences and opportunities will be developed afterwards.']
      ]
    },
    megs: {
      name: 'Music Export Growth Scheme',
      guidanceUrl: 'https://www.bpi.co.uk/page/music-export-growth-scheme',
      summary: 'Applicant company, target export markets, existing traction, campaign plan, investment and measurable outcomes.',
      questions: [
        ['applicantCompany', 'Applicant company', 'Describe the applying independent UK music company and its relationship with the artist.'],
        ['exportMarket', 'Target export market', 'Identify target territories and evidence of commercial potential.'],
        ['artistReadiness', 'Artist export readiness', 'Explain the artist proposition and relevant international traction.'],
        ['campaignPlan', 'Campaign plan', 'Set out international marketing, promotion, touring or market-development activity.'],
        ['commercialOutcomes', 'Commercial outcomes', 'State measurable audience, partnership, revenue or export outcomes.'],
        ['contribution', 'Applicant and partner contribution', 'List confirmed investment, other finance and delivery partners.']
      ]
    }
  };

  const form = document.getElementById('grantReadyForm');
  const selector = document.getElementById('fundingLine');
  const specificSection = document.getElementById('fundSpecific');
  const questionContainer = document.getElementById('fundQuestions');
  const summary = document.getElementById('programmeSummary');
  const statusBox = document.getElementById('formStatus');
  const budgetRows = document.getElementById('budgetRows');

  if (!form || !selector || !specificSection || !questionContainer || !summary) {
    console.error('TM360 Grant Ready: required form elements were not found.');
    return;
  }

  function renderProgramme() {
    const selected = programmeData[selector.value];

    if (!selected) {
      specificSection.hidden = true;
      summary.hidden = true;
      questionContainer.innerHTML = '';
      return;
    }

    summary.hidden = false;
    summary.innerHTML = '';

    const heading = document.createElement('strong');
    heading.textContent = selected.name;

    const text = document.createElement('p');
    text.textContent = selected.summary;

    const guidance = document.createElement('a');
    guidance.href = selected.guidanceUrl;
    guidance.target = '_blank';
    guidance.rel = 'noopener';
    guidance.textContent = 'Check official programme guidance →';

    summary.append(heading, text, guidance);
    questionContainer.innerHTML = '';

    selected.questions.forEach(function (question, index) {
      const label = document.createElement('label');
      label.setAttribute('for', question[0]);
      label.textContent = String(index + 1) + '. ' + question[1];

      const help = document.createElement('small');
      help.textContent = question[2];

      const textarea = document.createElement('textarea');
      textarea.id = question[0];
      textarea.name = 'fundSpecific_' + selector.value + '_' + question[0];
      textarea.required = true;
      textarea.rows = 5;

      label.append(help, textarea);
      questionContainer.appendChild(label);
    });

    specificSection.hidden = false;
    specificSection.classList.add('fund-section-visible');
  }

  selector.addEventListener('change', renderProgramme);

  const addBudgetButton = document.getElementById('addBudgetRow');
  if (addBudgetButton && budgetRows) {
    addBudgetButton.addEventListener('click', function () {
      const firstRow = budgetRows.querySelector('.budget-row');
      if (!firstRow) return;
      const newRow = firstRow.cloneNode(true);
      newRow.querySelectorAll('input').forEach(function (input) { input.value = ''; });
      newRow.querySelectorAll('select').forEach(function (select) { select.selectedIndex = 0; });
      budgetRows.appendChild(newRow);
    });
  }

  function formDataObject() {
    const output = {};
    const data = new FormData(form);
    data.forEach(function (value, key) {
      if (Object.prototype.hasOwnProperty.call(output, key)) {
        output[key] = Array.isArray(output[key]) ? output[key].concat(value) : [output[key], value];
      } else {
        output[key] = value;
      }
    });
    return output;
  }

  function showStatus(message) {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.textContent = message;
    statusBox.scrollIntoView({ behaviour: 'smooth', block: 'center' });
  }

  const saveButton = document.getElementById('saveDraft');
  if (saveButton) {
    saveButton.addEventListener('click', function () {
      localStorage.setItem('tm360GrantReadyDraft', JSON.stringify(formDataObject()));
      showStatus('Draft saved in this browser only. Do not use a shared device for personal information.');
    });
  }

  const exportButton = document.getElementById('exportJson');
  if (exportButton) {
    exportButton.addEventListener('click', function () {
      const content = JSON.stringify(formDataObject(), null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const link = document.createElement('a');
      const artistInput = form.querySelector('[name="artistName"]');
      const artist = artistInput && artistInput.value ? artistInput.value : 'Artist';
      link.href = URL.createObjectURL(blob);
      link.download = 'TM360_OFFICIAL_Grant_Readiness_' + artist.replace(/[^a-z0-9]/gi, '_') + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    });
  }

  const printButton = document.getElementById('printPack');
  if (printButton) printButton.addEventListener('click', function () { window.print(); });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showStatus('Grant Readiness Pack validated. Check all answers against the latest official programme guidance before preparing the final application.');
  });

  renderProgramme();
});
