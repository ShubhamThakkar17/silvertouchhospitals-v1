/** Empanelments and cashless insurers (brief 4.3 / 4.7). */
const U = "https://www.silvertouchhospitals.com/wp-content/uploads";

export type Logo = { name: string; image: string; note?: string };

export const EMPANELMENTS: Logo[] = [
  {
    name: "PMJAY (Ayushman Bharat)",
    image: `${U}/2022/08/PMJAY.jpg`,
    note: "Cashless hospitalisation up to ₹5,00,000 per family per year.",
  },
  { name: "CGHS", image: `${U}/2025/09/cghs.jpg`, note: "Central Government Health Scheme." },
  { name: "ISRO Empanelled Hospital", image: `${U}/2025/07/newlogop.png`, note: "Empanelled for ISRO employees." },
  {
    name: "Mukhyamantri Amrutam (MA Yojana)",
    image: `${U}/2022/08/MA-Yojna.jpg`,
    note: "Gujarat government health scheme.",
  },
];

export const INSURERS: Logo[] = [
  { name: "Bajaj Allianz", image: `${U}/2025/07/bajaj.png` },
  { name: "Chola MS", image: `${U}/2025/07/cholams.png` },
  { name: "HDFC ERGO", image: `${U}/2025/07/hdfc.png` },
  { name: "ICICI Lombard", image: `${U}/2025/07/icic.png` },
  { name: "Reliance General", image: `${U}/2025/07/relacinc.png` },
  { name: "SBI General", image: `${U}/2025/07/sbi-general.png` },
  { name: "ACKO", image: `${U}/2025/07/acko.png` },
];

/**
 * Published on the current site as an image: "Silver Touch Hospital,
 * Prahladnagar is now NABH (6th Edition) accredited". [CONFIRM] wording.
 */
export const NABH = {
  name: "NABH (6th Edition) accredited",
  branch: "Satellite (Prahladnagar)",
  image: `${U}/2026/05/silvertouch.jpg`,
};
