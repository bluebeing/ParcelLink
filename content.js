// content.js

function normalizeTrackingNumber(number) {
  // Odstranění mezer z čísla
  return number.replace(/\s+/g, '');
}

function createTrackingLink(trackingText) {
  const normalizedText = normalizeTrackingNumber(trackingText);
  let link = null;

  // Zásilkovna: Z + 10 číslic
  if (/^Z\d{10}$/.test(normalizedText)) {
    link = document.createElement('a');
    link.href = `https://tracking.app.packeta.com/cs/${normalizedText}`;
    link.dataset.carrier = 'packeta';
  }
  // GLS: 11 číslic, začíná 9
  else if (/^9\d{10}$/.test(normalizedText)) {
    link = document.createElement('a');
    link.href = 'https://gls-group.com/CZ/cs/sledovani-zasilek';
    link.dataset.carrier = 'gls';
  }
  // PPL: 11 číslic, nezačíná 9
  else if (/^[0-8]\d{10}$/.test(normalizedText)) {
    link = document.createElement('a');
    link.href = `https://www.ppl.cz/detail-zasilky?shipmentId=${normalizedText}`;
    link.dataset.carrier = 'ppl';
  }
  // Česká pošta: DR + minimálně 10 číslic + U
  else if (/^DR\d{10,}U$/.test(normalizedText)) {
    link = document.createElement('a');
    link.href = `https://www.postaonline.cz/trackandtrace/-/zasilka/cislo?parcelNumbers=${normalizedText}`;
    link.dataset.carrier = 'posta';
  }
  // DPD: 14 číslic
  else if (/^\d{14}$/.test(normalizedText)) {
    link = document.createElement('a');
    link.href = 'https://www.dpd.com/cz/cs/servis/sledovani-zasilek';
    link.dataset.carrier = 'dpd';
  }

  if (link) {
    // Zachováme původní formát čísla v zobrazení
    link.textContent = trackingText;
    link.target = '_blank';
    link.className = 'tracking-link';

    // U GLS a DPD: při kliknutí zkopírujeme číslo a teprve pak otevřeme stránku
    if (link.dataset.carrier === 'gls' || link.dataset.carrier === 'dpd') {
      link.addEventListener('click', e => {
        e.preventDefault();
        navigator.clipboard.writeText(normalizedText)
          .catch(() => {
            console.warn('Nepodařilo se zkopírovat do schránky, ale i tak otevírám stránku.');
          })
          .finally(() => {
            window.open(link.href, '_blank');
          });
      });
    }
  }

  return link;
}

function createTrackingLinks() {
  // Zpracování čísel v tabulce
  const rows = document.getElementsByTagName('tr');
  for (const row of rows) {
    const tds = row.getElementsByTagName('td');
    if (tds.length >= 2) {
      const trackingText = tds[1].textContent.trim();
      const link = createTrackingLink(trackingText);
      if (link) {
        tds[1].textContent = '';
        tds[1].appendChild(link);
      }
    }
  }

  // Zpracování čísel v poznámkách (panel-body)
  const panelBodies = document.getElementsByClassName('panel-body');
  for (const panel of panelBodies) {
    const strongs = panel.getElementsByTagName('strong');
    for (const strong of strongs) {
      const strongText = strong.textContent.trim();
      const trackingMatches = strongText.match(
        /(Z\s*\d{3}\s*\d{4}\s*\d{3}|Z\d{10}|9\d{10}|[0-8]\d{10}|DR\d{10,}U|\d{14})/
      );
      if (trackingMatches) {
        const trackingNumber = trackingMatches[0];
        const link = createTrackingLink(trackingNumber);
        if (link) {
          const newText = strongText.replace(trackingNumber, link.outerHTML);
          strong.innerHTML = newText;
        }
      }
    }
  }
}

// Spustit funkci po načtení stránky
document.addEventListener('DOMContentLoaded', createTrackingLinks);
// Pro případy dynamického načítání obsahu
createTrackingLinks();