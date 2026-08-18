export type SitePath = "/" | "/support" | "/terms" | "/privacy";

export type NavigationItem = {
  label: string;
  to: SitePath | `/#${string}`;
};

export const siteUrls = {
  discordInvite: "https://discord.gg/6Vy4V5hMdk",
  contactEmail: "uket.panda.1st@gmail.com",
  monthlySupport: "https://buy.stripe.com/dRm14m58k6SDbpV0ks9IQ00",
  extraSupport: "https://buy.stripe.com/3cIfZg1W890LbpVc3a9IQ01",
} as const;

export const primaryNavigation: NavigationItem[] = [
  { label: "概要", to: "/#about" },
  { label: "できること", to: "/#activities" },
  { label: "サーバー", to: "/#servers" },
  { label: "支援", to: "/support" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "支援プラン", to: "/support" },
  { label: "利用規約", to: "/terms" },
  { label: "プライバシーポリシー", to: "/privacy" },
];

export const siteDescription =
  "Modded Minecraftを中心に、遊ぶこと・組むこと・作ることが近いDiscordコミュニティ。";

export const minecraftDisclaimer =
  "VoxelLinkは非公式のコミュニティサービスであり、Mojang、Microsoft、Minecraftとは提携・承認・関連していません。";
