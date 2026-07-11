import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";

type ReviewFromSanity = {
  _id: string;
  company: string;
  brandImage?: unknown;
  project?: string;
  rating?: number;
  text: string;
};

const reviewsQuery = `
  *[
    _type == "review" &&
    isFeatured == true
  ] | order(publishedAt desc, _updatedAt desc) {
    _id,
    company,
    brandImage,
    project,
    rating,
    text
  }
`;

export async function ReviewsSection() {
  const reviews = await client.fetch<ReviewFromSanity[]>(
    reviewsQuery,
    {},
    {
      next: {
        tags: ["reviews"],
      },
    }
  );

  const formattedReviews = reviews.map((review) => ({
    _id: review._id,
    company: review.company,
    project: review.project,
    rating: review.rating || 5,
    text: review.text,
    brandImageUrl: review.brandImage
      ? urlFor(review.brandImage).width(200).height(200).url()
      : undefined,
  }));

  return (
    <section className="bg-[#080B10] py-24">
      <Container>
        <ScrollReveal>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Testimoniale
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Ce spun firmele despre colaborare
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Feedback real de la branduri și firme pentru care construim website-uri
              rapide, clare și pregătite pentru conversie.
            </p>
          </div>
        </ScrollReveal>

        {formattedReviews.length > 0 ? (
          <ReviewsCarousel reviews={formattedReviews} />
        ) : (
          <ScrollReveal delay={0.06}>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <Card className="p-5 md:col-span-2">
                <p className="text-sm leading-6 text-gray-300">
                  Momentan nu există review-uri. Review-urile adăugate în
                  Sanity Studio vor apărea automat aici.
                </p>
              </Card>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}