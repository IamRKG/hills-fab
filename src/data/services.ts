/**
 * SERVICES — edit freely.
 * Set `offered: false` on any line item the business does NOT provide; it will
 * disappear from the site (e.g. if you don't offer TIG welding or on-site work).
 */
export type ServiceItem = { name: string; offered: boolean };

export type ServiceGroup = {
  id: "metal-fabrication" | "welding" | "upvc-windows-doors";
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  items: ServiceItem[];
  benefits: { title: string; text: string }[];
  applications: string[];
  /** Value pre-selected in the quote form when coming from this service */
  quoteService: string;
};

export const services: ServiceGroup[] = [
  {
    id: "metal-fabrication",
    number: "01",
    title: "Metal Fabrication",
    shortTitle: "Fabrication",
    summary:
      "Gates, railings, grills, frames and structural steel — cut, fabricated and finished to your drawings or site measurements.",
    description:
      "We take projects from site measurement and design through cutting, fabrication, surface preparation, finishing and installation. Every piece is built to fit the opening it was measured for, with clean welds, square frames and a durable protective finish.",
    image: "/images/ms-gate.jpg",
    imageAlt: "Sample image: double-leaf mild steel entrance gate",
    items: [
      { name: "Custom metal fabrication", offered: true },
      { name: "MS gates and entrance gates", offered: true },
      { name: "Stainless steel gates", offered: true },
      { name: "Staircase railings and handrails", offered: true },
      { name: "Balcony railings", offered: true },
      { name: "Window grills and safety grills", offered: true },
      { name: "Structural metal fabrication", offered: true },
      { name: "Custom metal frames", offered: true },
      { name: "Industrial fabrication work", offered: true },
    ],
    benefits: [
      { title: "Made to measure", text: "Fabricated to your exact openings and site conditions — no forcing standard sizes to fit." },
      { title: "Strength you can see", text: "Correct section sizes, properly prepared joints and full-penetration welds where the design calls for them." },
      { title: "Lasting finish", text: "Surface preparation, primer and paint or polish options chosen for the environment the piece will live in." },
    ],
    applications: ["Homes & villas", "Apartments", "Shops & showrooms", "Factories & warehouses", "Schools & institutions"],
    quoteService: "metal-fabrication",
  },
  {
    id: "welding",
    number: "02",
    title: "Welding Services",
    shortTitle: "Welding",
    summary:
      "Clean, strong welds on mild steel and stainless steel — in the workshop or on site — for new work, modifications and repairs.",
    description:
      "From fabrication welding to structural repairs and on-site modifications, our welders choose the right process for the material, thickness and finish required, then dress the joint so it looks as good as it performs.",
    image: "/images/welding.jpg",
    imageAlt: "Sample image: welder joining two steel plates with sparks",
    items: [
      { name: "MIG welding", offered: true },
      { name: "TIG welding", offered: true },
      { name: "Arc (stick) welding", offered: true },
      { name: "Stainless steel welding", offered: true },
      { name: "Mild steel welding", offered: true },
      { name: "Custom welding and repairs", offered: true },
      { name: "On-site welding (where available)", offered: true },
    ],
    benefits: [
      { title: "Right process, right joint", text: "Process selected for material and thickness, so welds are strong without distortion." },
      { title: "Neat finishing", text: "Joints ground and dressed for visible work like gates, railings and stainless fixtures." },
      { title: "Repairs that last", text: "Broken hinges, cracked frames and damaged structures restored rather than replaced." },
    ],
    applications: ["Gate & railing repairs", "Machinery frames", "Stainless kitchen & display fixtures", "Structural modifications"],
    quoteService: "welding",
  },
  {
    id: "upvc-windows-doors",
    number: "03",
    title: "uPVC Windows & Doors",
    shortTitle: "uPVC Windows",
    summary:
      "Sliding, casement and fixed windows, sliding doors and uPVC doors — supplied, fabricated to size and professionally installed.",
    description:
      "We measure each opening, recommend the right window or door system for the space, fabricate to size and install with proper sealing and finishing. Replacements of old wooden or aluminium frames are handled cleanly with minimal disruption.",
    image: "/images/upvc-sliding-window.jpg",
    imageAlt: "Sample image: two-track uPVC sliding window",
    items: [
      { name: "Sliding windows", offered: true },
      { name: "Casement windows", offered: true },
      { name: "Fixed windows", offered: true },
      { name: "Sliding doors", offered: true },
      { name: "uPVC doors", offered: true },
      { name: "Balcony windows", offered: true },
      { name: "Mosquito mesh solutions", offered: true },
      { name: "Window replacement and installation", offered: true },
      { name: "Custom window configurations", offered: true },
    ],
    // IMPORTANT: keep these claims in line with the profiles/hardware you actually supply.
    benefits: [
      { title: "Thermal insulation", text: "Multi-chamber uPVC profiles with sealed glazing help keep rooms cooler and reduce air-conditioning load." },
      { title: "Low maintenance", text: "uPVC doesn't rot, rust or need repainting — an occasional wipe keeps it looking new." },
      { title: "Weather resistance", text: "Gaskets and drainage channels help keep out rain, dust and wind when correctly installed." },
      { title: "Noise reduction", text: "Well-sealed frames with suitable glazing can noticeably reduce outside traffic noise." },
    ],
    applications: ["Bedrooms & living rooms", "Balcony enclosures", "Kitchens & bathrooms", "Offices & clinics", "Replacement of old frames"],
    quoteService: "upvc-windows",
  },
];

/** Options for the "Service required" dropdown and quote wizard step 1. */
export const serviceOptions = [
  { value: "metal-fabrication", label: "Metal fabrication" },
  { value: "welding", label: "Welding" },
  { value: "ms-gate", label: "MS gate" },
  { value: "stainless-steel", label: "Stainless steel work" },
  { value: "railings", label: "Railings" },
  { value: "upvc-windows", label: "uPVC windows" },
  { value: "upvc-doors", label: "PVC/uPVC doors" },
  { value: "other", label: "Other" },
] as const;

export type ServiceOptionValue = (typeof serviceOptions)[number]["value"];
export const serviceOptionValues = serviceOptions.map((o) => o.value) as [ServiceOptionValue, ...ServiceOptionValue[]];
export const serviceLabel = (value: string) => serviceOptions.find((o) => o.value === value)?.label ?? value;
