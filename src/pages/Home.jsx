import HeroSlider from '../components/home/HeroSlider';
import BrowseByCategory from '../components/home/BrowseByCategory';
import BestSellers from '../components/home/BestSellers';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TrustedByBusinesses from '../components/home/TrustedByBusinesses';
import MethodPreview from '../components/home/MethodPreview';
import FrescoBelloSection from '../components/home/FrescoBelloSection';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import InstagramGallery from '../components/home/InstagramGallery';

export default function Home() {
  return (
    <>
      <HeroSlider />
        <BestSellers />
      <BrowseByCategory />
    
      
      <MethodPreview />
      <FrescoBelloSection />
       <TrustedByBusinesses />
      <WhyChooseUs />
     
      <FeaturedRecipes />
      <InstagramGallery />
    </>
  );
}