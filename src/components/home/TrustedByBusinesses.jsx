import AnimatedSection from '../../components/animations/AnimatedSection';
import { TRUSTED_BUSINESSES } from '../../constants/site';

export default function TrustedByBusinesses() {
  return (
    <AnimatedSection className="border-b-4 border-t-red py-16 bg-obsidian text-alabaster min-h-[30rem] md:py-28">
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-12 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-medium mb-4">
          Trusted by Businesses
        </h2>
        <p className="text-sm text-alabaster/70 mb-12 max-w-2xl mx-auto">
          We proudly supply premium pasta to businesses that value quality, consistency,
          and reliable delivery.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {TRUSTED_BUSINESSES.map((business) => (
            <span
              key={business}
              className="text-xs uppercase tracking-wider text-gold hover:text-gold transition-colors cursor-default"
            >
              {business}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}