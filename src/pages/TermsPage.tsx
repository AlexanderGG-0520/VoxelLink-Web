import { LegalDocument } from "../components/legal/LegalDocument";
import { termsLead, termsSections } from "../data/legal";
export function TermsPage() {
  return (
    <LegalDocument title="利用規約" lead={termsLead} sections={termsSections} />
  );
}
