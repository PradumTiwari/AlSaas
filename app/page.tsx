import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demo-Section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PricingSection from "@/components/home/Pricing-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Home() {
  return (
    <div className="relative w-full">
     <BgGradient/>
     <div className="flex flex-col ">
     <HeroSection/>
     <DemoSection/>
     <HowItWorksSection/>
     <PricingSection/>
     </div>

    </div>
  );
}
