import { renderStoreButtons } from './ui/storeButtons.js';
import { renderBenefits } from './ui/benefits.js';
import { markActiveNav } from './ui/activeNav.js';
import { initContactForm } from './ui/contactForm.js';
import { initHeroParallax } from './ui/parallax.js';

markActiveNav();
initHeroParallax();

const storeContainer = document.getElementById('storeButtons');
if (storeContainer) renderStoreButtons(storeContainer);

const benefitContainer = document.getElementById('benefitPills');
if (benefitContainer) renderBenefits(benefitContainer);

const contactForm = document.getElementById('contactForm');
if (contactForm) initContactForm(contactForm);
