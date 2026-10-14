/**
 * PROJECTS — replace these SAMPLE entries with your real completed work.
 * - image: put photos in /public/images (JPG/WebP, ~1600px wide is plenty)
 * - Do not add customer names or exact addresses without their permission.
 * - Set `sample: false` once an entry describes a real project; the "Sample"
 *   badge disappears automatically.
 */
export const projectCategories = [
  "Metal Fabrication",
  "Welding Work",
  "MS Gates",
  "Stainless Steel Work",
  "Railings",
  "uPVC Windows",
  "PVC/uPVC Doors",
  "Residential Projects",
  "Commercial Projects",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  /** First category is shown as the primary label */
  categories: ProjectCategory[];
  description: string;
  image: string;
  alt: string;
  featured?: boolean;
  sample: boolean;
};

export const projects: Project[] = [
  {
    id: "ms-entrance-gate",
    title: "Double-leaf MS entrance gate",
    categories: ["MS Gates", "Metal Fabrication", "Residential Projects"],
    description: "Arched mild steel gate with vertical pickets, fabricated to site measurements and finished in primer and enamel.",
    image: "/images/ms-gate.jpg",
    alt: "Sample image: arched double-leaf MS entrance gate",
    featured: true,
    sample: true,
  },
  {
    id: "ss-sliding-gate",
    title: "Stainless steel horizontal-bar gate",
    categories: ["Stainless Steel Work", "Metal Fabrication", "Residential Projects"],
    description: "Contemporary horizontal-bar stainless steel gate with a polished finish and concealed fixings.",
    image: "/images/ss-gate.jpg",
    alt: "Sample image: stainless steel gate with horizontal bars",
    featured: true,
    sample: true,
  },
  {
    id: "staircase-railing",
    title: "Staircase railing and handrail",
    categories: ["Railings", "Metal Fabrication", "Residential Projects"],
    description: "Raked staircase railing with evenly spaced balusters and a continuous handrail.",
    image: "/images/staircase-railing.jpg",
    alt: "Sample image: staircase railing with balusters",
    featured: true,
    sample: true,
  },
  {
    id: "balcony-railing",
    title: "Balcony railing with infill panels",
    categories: ["Railings", "Residential Projects"],
    description: "Balcony guard railing with a top rail and infill panels, fixed to the slab edge.",
    image: "/images/balcony-railing.jpg",
    alt: "Sample image: balcony railing with panels",
    sample: true,
  },
  {
    id: "upvc-sliding-windows",
    title: "uPVC sliding windows",
    categories: ["uPVC Windows", "Residential Projects"],
    description: "Two-track uPVC sliding windows replacing old frames, with sealed glazing and smooth rollers.",
    image: "/images/upvc-sliding-window.jpg",
    alt: "Sample image: uPVC sliding window",
    featured: true,
    sample: true,
  },
  {
    id: "upvc-sliding-door",
    title: "Three-panel uPVC sliding door",
    categories: ["PVC/uPVC Doors", "Residential Projects"],
    description: "Wide three-panel sliding door opening a living room onto the balcony.",
    image: "/images/upvc-sliding-door.jpg",
    alt: "Sample image: three-panel uPVC sliding door",
    featured: true,
    sample: true,
  },
  {
    id: "structural-truss",
    title: "Structural steel roof truss",
    categories: ["Metal Fabrication", "Welding Work", "Commercial Projects"],
    description: "Welded steel truss and purlins for a shed roof, fabricated in sections and erected on site.",
    image: "/images/structural.jpg",
    alt: "Sample image: structural steel truss",
    featured: true,
    sample: true,
  },
  {
    id: "on-site-welding",
    title: "On-site welding and repair",
    categories: ["Welding Work"],
    description: "Repair of a damaged frame on site, with joints ground and refinished to match.",
    image: "/images/welding.jpg",
    alt: "Sample image: welding sparks on a steel joint",
    sample: true,
  },
  {
    id: "window-grills",
    title: "Window safety grills",
    categories: ["Metal Fabrication", "Residential Projects"],
    description: "Grid-pattern safety grills with decorative rings, sized to each window opening.",
    image: "/images/window-grill.jpg",
    alt: "Sample image: window safety grill",
    sample: true,
  },
  {
    id: "casement-windows",
    title: "uPVC casement windows",
    categories: ["uPVC Windows", "Residential Projects"],
    description: "Outward-opening casement windows with multi-point locking for good ventilation.",
    image: "/images/upvc-casement-window.jpg",
    alt: "Sample image: uPVC casement window",
    sample: true,
  },
  {
    id: "upvc-entrance-door",
    title: "uPVC panel door",
    categories: ["PVC/uPVC Doors", "Residential Projects"],
    description: "Low-maintenance uPVC door suited to bathrooms, utility areas and balconies.",
    image: "/images/upvc-door.jpg",
    alt: "Sample image: uPVC panel door",
    sample: true,
  },
  {
    id: "office-fixed-glazing",
    title: "Fixed glazing for an office",
    categories: ["uPVC Windows", "Commercial Projects"],
    description: "Large fixed uPVC window units bringing daylight into a workspace.",
    image: "/images/upvc-fixed-window.jpg",
    alt: "Sample image: fixed uPVC windows",
    sample: true,
  },
  {
    id: "industrial-frame",
    title: "Industrial equipment frame",
    categories: ["Metal Fabrication", "Welding Work", "Commercial Projects"],
    description: "Heavy-duty welded frame and gantry fabricated for a workshop installation.",
    image: "/images/industrial.jpg",
    alt: "Sample image: industrial steel frame",
    sample: true,
  },
  {
    id: "commercial-facade",
    title: "Commercial building windows",
    categories: ["uPVC Windows", "Commercial Projects"],
    description: "Supply and installation of window units across a multi-storey commercial building.",
    image: "/images/commercial.jpg",
    alt: "Sample image: commercial building with grid windows",
    sample: true,
  },
  {
    id: "home-package",
    title: "Complete home package",
    categories: ["Residential Projects", "MS Gates", "uPVC Windows"],
    description: "Gate, grills and uPVC windows delivered together for a new home.",
    image: "/images/residential.jpg",
    alt: "Sample image: house with new gate and windows",
    sample: true,
  },
  {
    id: "mosquito-mesh",
    title: "Mosquito mesh shutters",
    categories: ["uPVC Windows", "Residential Projects"],
    description: "Insect mesh shutters added to existing uPVC windows for ventilation without insects.",
    image: "/images/mosquito-mesh.jpg",
    alt: "Sample image: window with mosquito mesh",
    sample: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
