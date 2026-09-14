import { CoordinationCard, SectorCard } from "@/components/cards/SectorCard";
import { Slider } from "@/components/ui/Slider";
import { sectors } from "@/data/sectors";

export function SectorsShowcase() {
  return (
    <Slider
      label="Sectors we serve"
      itemClassName="w-[82%] sm:w-[46%]"
      gridClassName="md:grid-cols-2 md:gap-5 lg:grid-cols-4"
    >
      {sectors.map((sector) => (
        <SectorCard key={sector.title} sector={sector} />
      ))}
      <CoordinationCard />
    </Slider>
  );
}
