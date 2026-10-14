/** Home page and About page copy. Edit freely. */

export const whyChooseUs = [
  {
    icon: "Ruler",
    title: "Measured, not guessed",
    text: "Every job starts with an on-site measurement so gates hang true, railings fit and windows seal properly.",
  },
  {
    icon: "Flame",
    title: "Skilled fabrication & welding",
    text: "Clean, strong joints in mild steel and stainless steel, finished so the welds look as good as they perform.",
  },
  {
    icon: "PanelsTopLeft",
    title: "Metal and uPVC under one roof",
    text: "Gates, grills, railings and windows from one team — one point of contact, one schedule, one finish standard.",
  },
  {
    icon: "ShieldCheck",
    title: "Durable finishing",
    text: "Surface preparation, primers and finishes chosen for weather exposure, not just for looks on handover day.",
  },
  {
    icon: "FileText",
    title: "Clear, written quotations",
    text: "Itemised quotes with sizes, materials and finish specified, so you know exactly what you are paying for.",
  },
  {
    icon: "Wrench",
    title: "Tidy installation",
    text: "Our installers protect your floors and walls, clean up after themselves and walk you through the finished work.",
  },
] as const;

export const processSteps = [
  { title: "Enquiry", text: "Send your requirement by form, phone or WhatsApp — photos or drawings help." },
  { title: "Site visit & measurement", text: "We inspect the site, take accurate measurements and discuss design, material and finish." },
  { title: "Quotation & design", text: "You receive an itemised quotation and, where needed, a drawing for approval." },
  { title: "Fabrication", text: "Work is fabricated in our workshop, with quality checks before finishing." },
  { title: "Installation & handover", text: "We install, align and seal on site, clean up, and hand over with care instructions." },
] as const;

/**
 * TESTIMONIALS — add REAL customer reviews only (with their permission).
 * While this list is empty the Testimonials section shows a clearly labelled
 * placeholder layout instead of invented quotes.
 *
 * Example:
 *   { quote: "…", name: "R. Kumar", context: "MS gate & grills, Residential" },
 */
export const testimonials: { quote: string; name: string; context: string }[] = [];

export const faqs = [
  {
    q: "Do you visit the site before giving a quotation?",
    a: "Yes. For most fabrication and window jobs we visit the site to take accurate measurements and understand access, fixing points and finish requirements. For small or repeat jobs we can often give an estimate from photos and dimensions.",
  },
  {
    q: "Can you make a gate or railing to my own design?",
    a: "Yes. Share a sketch, photo or reference image and we will prepare a design and quotation based on your opening sizes, preferred material and finish.",
  },
  {
    q: "What is the difference between MS and stainless steel gates?",
    a: "Mild steel (MS) is strong and economical, and needs primer and paint to protect it from rust. Stainless steel costs more but resists corrosion and keeps a bright finish with very little maintenance — popular for modern homes and coastal areas.",
  },
  {
    q: "Why choose uPVC windows over aluminium or wood?",
    a: "uPVC frames do not rust or rot, need almost no maintenance, and with good seals and glazing help with insulation, dust and noise. The right choice depends on your budget, opening size and look — we will recommend what suits each opening.",
  },
  {
    q: "Can you replace my existing windows without major breakage?",
    a: "In most cases old frames can be removed and new uPVC windows installed with limited disturbance to the surrounding wall. We will tell you during the site visit if any making-good or plastering is required.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on size and design. We confirm the fabrication and installation timeline in writing with your quotation, once measurements and design are finalised.",
  },
  {
    q: "Do you take on commercial and industrial work?",
    a: "Yes. Along with homes, we work on shops, offices, warehouses and factories — including structural fabrication, industrial frames, and window packages for multiple floors.",
  },
] as const;

export const aboutContent = {
  intro:
    "[Company Name] is a fabrication, welding and uPVC window and door company serving homes, businesses and industry. We combine workshop fabrication with careful on-site installation to deliver work that fits properly, looks clean and lasts. [Replace this paragraph with your own story — when you started, who founded the business, and what you are known for.]",
  mission:
    "To build strong, well-finished metalwork and window solutions that fit our customers' spaces exactly, delivered with honest advice and dependable service.",
  vision:
    "To be the fabrication and window partner that homeowners, builders and businesses in our region recommend first.",
  pillars: [
    {
      title: "Quality-focused workmanship",
      text: "Correct materials and section sizes, accurate cutting, square assembly and inspected welds — quality is built in at every stage, not checked only at the end.",
    },
    {
      title: "Custom fabrication capability",
      text: "Gates, railings, grills, frames, structural members and one-off fabrications built to your drawings or our designs — residential to industrial scale.",
    },
    {
      title: "Installation & finishing standards",
      text: "Plumb, level and securely fixed installations; joints ground and dressed; surfaces primed and finished; windows sealed and tested for smooth operation.",
    },
    {
      title: "Commitment to customer satisfaction",
      text: "Clear quotations, realistic timelines, regular updates and a walkthrough at handover. If something isn't right, we come back and fix it.",
    },
  ],
};
