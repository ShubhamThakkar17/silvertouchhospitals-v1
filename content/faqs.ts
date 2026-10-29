/** General FAQs from the current homepage (brief 5.1 / 5.20). Answers are HTML. */
export type Faq = { q: string; a: string };

export const GENERAL_FAQS: Faq[] = [
  {
    q: "Do I require an appointment prior to attending the hospital?",
    a: "<p>Although we accept walk-in patients, making an appointment minimises waiting time and guarantees immediate attention by the concerned specialist.</p>",
  },
  {
    q: "Do Silver Touch Hospitals provide cashless insurance facilities?",
    a: "<p>Yes, we have tie-ups with numerous insurance companies and provide cashless treatment for covered patients. You may be supported by our billing desk in the procedure.</p>",
  },
  {
    q: "Are weekends covered by specialists?",
    a: "<p>Yes, some consultants are available during weekends. Contact our reception for scheduling and availability.</p>",
  },
  {
    q: "What infection control measures do you have in place?",
    a: "<p>We practice strict hygiene standards with frequent sanitising, staff protective gear, and infection control checks to provide a safe and healthy environment for everyone.</p>",
  },
  {
    q: "Does ambulance service cover it?",
    a: "<p>Yes, we have round-the-clock ambulance services for emergencies and scheduled hospital visits.</p>",
  },
  {
    q: "Do you have any diagnostic service on-site?",
    a: "<p>Yes. We have quick and accurate diagnostics in-house through our lab and imaging departments to aid in speedy treatment decisions.</p>",
  },
  {
    q: "How does Silver Touch Hospitals assist PMJAY beneficiaries?",
    a: '<p>As a recognised PMJAY hospital in Ahmedabad, Silver Touch Hospitals is committed to providing eligible families with robust healthcare under the Pradhan Mantri Jan Arogya Yojana. If you are a beneficiary under PMJAY, you can benefit from cashless hospitalization for secondary and tertiary care up to ₹ 5,00,000 per family annually. Our staff will assist you through the process and documentation required so that you can avail of your benefits hassle-free. See <a href="/patients-insurance/">Patients &amp; Insurance</a>.</p>',
  },
];
