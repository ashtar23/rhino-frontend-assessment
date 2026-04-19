export type BrandId = "project-a" | "project-b";
export type MarketId = "en" | "ca";

export type ProductCardLayout = "vertical" | "horizontal";
export type ProductCardTitlePosition = "top-right" | "bottom-left";

type MarketContent = {
  landingDescription: string;
  landingTitle: string;
};

type BrandFeatureConfig = {
  features: {
    emphasizeMemberAccess: boolean;
    showProductTags: boolean;
    showSecondaryImage: boolean;
  };
  home: {
    ctaLabel: string;
  };
  login: {
    description?: string;
    introLabel?: string;
    title: string;
  };
  markets: Record<MarketId, MarketContent>;
  navbar: {
    brandLabel: string;
  };
  products: {
    card: {
      ctaLabel?: string;
      layout: ProductCardLayout;
      titlePosition: ProductCardTitlePosition;
    };
  };
};

export const BRAND_CONFIG: Record<BrandId, BrandFeatureConfig> = {
  "project-a": {
    features: {
      emphasizeMemberAccess: false,
      showProductTags: false,
      showSecondaryImage: false,
    },
    home: {
      ctaLabel: "Browse products",
    },
    login: {
      description: "Sign in to access protected product details.",
      title: "Login",
    },
    markets: {
      ca: {
        landingDescription: "Browse products available in the CA market",
        landingTitle: "Welcome to the Canadian market",
      },
      en: {
        landingDescription: "Browse products available in the EN market",
        landingTitle: "Welcome to the English market",
      },
    },
    navbar: {
      brandLabel: "Project A",
    },
    products: {
      card: {
        layout: "vertical",
        titlePosition: "bottom-left",
      },
    },
  },
  "project-b": {
    features: {
      emphasizeMemberAccess: true,
      showProductTags: true,
      showSecondaryImage: true,
    },
    home: {
      ctaLabel: "Explore collection",
    },
    login: {
      description:
        "Access extended product details and market-specific catalogue data.",
      introLabel: "Member access",
      title: "Sign in to Project B",
    },
    markets: {
      ca: {
        landingDescription: "Browse products available in the CA market",
        landingTitle: "Welcome to the Canadian market",
      },
      en: {
        landingDescription: "Browse products available in the EN market",
        landingTitle: "Welcome to the English market",
      },
    },
    navbar: {
      brandLabel: "Project B",
    },
    products: {
      card: {
        ctaLabel: "Explore item",
        layout: "horizontal",
        titlePosition: "bottom-left",
      },
    },
  },
};

export const getBrandConfig = (brand: BrandId) => {
  return BRAND_CONFIG[brand];
};
