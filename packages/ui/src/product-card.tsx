import Image from "next/image";
import type { Product } from "@repo/data";
import type { Market } from "@repo/types";
import { Button } from "./button";

type ProductCardLayout = "vertical" | "horizontal";
type ProductCardTitlePosition = "top-right" | "bottom-left";

type ProductCardProps = {
  market: Market;
  product: Product;
  layout?: ProductCardLayout;
  titlePosition?: ProductCardTitlePosition;
  secondaryImage?: string;
  ctaLabel?: string;
  showTags?: boolean;
};

type CardSharedContentProps = {
  product: Product;
  tags: string[];
  titlePosition: ProductCardTitlePosition;
  secondaryImage?: string;
};

type LayoutProps = CardSharedContentProps & {
  market: Market;
  ctaLabel: string;
};

type TitleBlockProps = Pick<
  CardSharedContentProps,
  "tags" | "titlePosition"
> & {
  title: string;
};

const TitleBlock = ({ tags, title, titlePosition }: TitleBlockProps) => {
  return (
    <div
      className={`space-y-2 ${
        titlePosition === "bottom-left" ? "text-left" : "text-right"
      }`}
      data-testid="product-card-title-block"
      data-title-position={titlePosition}
    >
      {tags.length > 0 ? (
        <div
          className={`flex flex-wrap gap-2 ${
            titlePosition === "bottom-left" ? "justify-start" : "justify-end"
          }`}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs uppercase text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <h2 className="text-lg font-medium text-zinc-950">{title}</h2>
    </div>
  );
};

type MediaBlockProps = {
  image: string;
  title: string;
  secondaryImage?: string;
};

const MediaBlock = ({ image, title, secondaryImage }: MediaBlockProps) => {
  return (
    <div className="space-y-3">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="aspect-auto w-full rounded-xl object-cover"
      />

      {secondaryImage ? (
        <div className="flex justify-start">
          <Image
            src={secondaryImage}
            alt={`${title} secondary`}
            width={200}
            height={150}
            className="aspect-auto w-28 rounded-lg object-cover"
          />
        </div>
      ) : null}
    </div>
  );
};

type FooterProps = {
  ctaLabel: string;
  market: Market;
  product: Product;
};

const Footer = ({ ctaLabel, market, product }: FooterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <span className="font-medium leading-none text-zinc-950">
        {product.price} {product.currency}
      </span>

      <Button href={`/${market}/product/${product.slug}`} className="shrink-0">
        {ctaLabel}
      </Button>
    </div>
  );
};

const VerticalLayout = ({
  market,
  product,
  tags,
  titlePosition,
  secondaryImage,
  ctaLabel,
}: LayoutProps) => {
  return (
    <div className="space-y-4" data-testid="product-card-vertical">
      {titlePosition === "top-right" ? (
        <TitleBlock
          tags={tags}
          title={product.title}
          titlePosition={titlePosition}
        />
      ) : null}

      <MediaBlock
        image={product.image}
        title={product.title}
        secondaryImage={secondaryImage}
      />

      <div className="space-y-4">
        {titlePosition === "bottom-left" ? (
          <TitleBlock
            tags={tags}
            title={product.title}
            titlePosition={titlePosition}
          />
        ) : null}

        <p className="text-sm text-zinc-600">{product.description}</p>

        <Footer ctaLabel={ctaLabel} market={market} product={product} />
      </div>
    </div>
  );
};

const HorizontalLayout = ({
  market,
  product,
  tags,
  titlePosition,
  secondaryImage,
  ctaLabel,
}: LayoutProps) => {
  return (
    <div
      className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-start"
      data-testid="product-card-horizontal"
    >
      <MediaBlock
        image={product.image}
        title={product.title}
        secondaryImage={secondaryImage}
      />

      <div className="flex min-h-full flex-col gap-4">
        <TitleBlock
          tags={tags}
          title={product.title}
          titlePosition={titlePosition}
        />

        <p className="text-sm text-zinc-600">{product.description}</p>

        <div className="mt-auto">
          <Footer ctaLabel={ctaLabel} market={market} product={product} />
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  market,
  product,
  layout = "vertical",
  titlePosition = "top-right",
  secondaryImage,
  ctaLabel = "View product",
  showTags = true,
}: ProductCardProps) => {
  const tags = showTags ? product.tags.filter(Boolean) : [];

  return (
    <article className="rounded-2xl border border-zinc-200 p-4 shadow-sm">
      {layout === "horizontal" ? (
        <HorizontalLayout
          market={market}
          product={product}
          tags={tags}
          titlePosition={titlePosition}
          secondaryImage={secondaryImage}
          ctaLabel={ctaLabel}
        />
      ) : (
        <VerticalLayout
          market={market}
          product={product}
          tags={tags}
          titlePosition={titlePosition}
          secondaryImage={secondaryImage}
          ctaLabel={ctaLabel}
        />
      )}
    </article>
  );
};
