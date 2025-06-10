# ParcelLink 
Toto rozšíření pro Google Chrome automaticky rozpozná sledovací čísla zásilek v administraci Mixit a převádí je na odkazy, které vedou přímo na stránku dopravce a otevřou se na nové kartě. U dopravců GLS a DPD, jejichž sledovací systémy neumožňují přímé otevření zásilky podle URL, rozšíření při kliknutí na odkaz zároveň zkopíruje číslo zásilky do schránky, aby jej bylo možné snadno vložit do formuláře pro sledování.

## Popis

Rozšíření automaticky rozpozná sledovací čísla zásilek v administraci Mixit a udělá z nich odkazy, které otevřou stránku dopravce v nové kartě. U GLS a DPD se navíc číslo při kliknutí rovnou zkopíruje do schránky, protože tyhle weby neumožňují sledování přímo přes URL. Hodí se to hlavně při komunikaci se zákazníky – člověk má odkaz hned po ruce a nemusí nic dohledávat.

## Instalace
1. Stačí stáhnout tento repozitář jako ZIP soubor. Vytvořit si složku na ploše pojmenovanou například "ParcelLink" a do něj soubory rozbalit. 
2. Otevřít v Chrome stránku Rozšíření (chrome://extensions/).
3. Zapnout režim vývojáře (Developer mode).
4. Kliknout na "Načíst rozbalené" a vyberat složku s rozbaleným repozitářem.
5. Rozšíření se načte a je připravené k použití.

## Podporovaní dopravci
| Dopravce    | Formát čísla                 | Odkaz / Kopírování   |
| ----------- | ---------------------------- | -------------------- |
| Packeta     | `Z` + 10 číslic              | přímý odkaz          |
| GLS         | 11 číslic první číslo `0 a 9`| kopírování + stránka |
| PPL         | 11 číslic první číslo `1-9`  | přímý odkaz          |
| Česká pošta | `DR` + ≥10 číslic + `U`      | přímý odkaz          |
| DPD         | 14 číslic                    | kopírování + stránka |

## Povolení

V manifest.json jsou vyžadována tato oprávnění:
- activeTab – přístup k obsahu aktivní záložky.
- clipboardWrite – zápis do schránky (GLS, DPD).

## Licence

Tento projekt je licencován pod MIT licencí. Více v souboru [LICENSE](LICENSE).
