import { LegalDocument } from "../components/legal/LegalDocument";
import { privacyLead, privacySections } from "../data/legal";
export function PrivacyPage() { return <LegalDocument title="プライバシーポリシー" lead={privacyLead} sections={privacySections} />; }
