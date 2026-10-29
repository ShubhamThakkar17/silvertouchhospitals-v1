/**
 * UI strings. Components read labels from here so a Gujarati or Hindi
 * dictionary can be added later (`gu`, `hi`) without touching markup.
 * Long-form content lives in /content and would be translated per file.
 */
const en = {
  bookAppointment: "Book An Appointment",
  book: "Book",
  call: "Call",
  callNow: "Call now",
  directions: "Directions",
  getDirections: "Get directions",
  emergency: "Emergency",
  emergency247: "24x7 Emergency Service",
  callEmergency: "Call Emergency",
  viewDetails: "View details",
  viewProfile: "View profile",
  viewAllDoctors: "View all doctors",
  readMore: "Read more",
  menu: "Menu",
  close: "Close",
  opdTimings: "OPD Timings",
  chooseBranch: "Which branch?",
  skipToContent: "Skip to content",
} as const;

export type Dictionary = Record<keyof typeof en, string>;

export const dictionaries: Record<"en", Dictionary> = { en };

export const t = dictionaries.en;
