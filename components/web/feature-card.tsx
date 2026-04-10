import Link from "next/link";
import { Network, Dna, MapPinned, ArrowRight, HouseHeart } from "lucide-react";

export default function FeatureCards() {

    const features = [
        {
            title: "Explore Pedigrees",
            description: "Search the global Akita database, explore detailed bloodlines, and trace historical origins.",
            icon: Network,
            href: "/pedigree",
        },
        {
            title: "Test Mating",
            description: "Simulate hypothetical matings to analyze genetics and preview potential pedigrees for future litters.",
            icon: Dna,
            href: "/test-mating",
        },
        {
            title: "Breeders & Members",
            description: "Discover reputable breeders worldwide, connect with community members, and explore detailed kennel profiles.",
            icon: HouseHeart,
            href: "/breeders",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {

                const Icon = feature.icon;

                return (
                    <Link
                        key={index}
                        href={feature.href}
                        className="group flex flex-col p-12 bg-card border rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2"                    >
                        {/* 3. Renderizziamo l'icona e applichiamo le classi UNA VOLTA SOLA qui */}
                        <div className="mb-8 text-primary flex justify-center">
                            <Icon className="h-12 w-12 stroke-[2px]" />
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                            {feature.title}
                        </h3>
                        <p className="text-md text-muted-foreground mb-8 grow">
                            {feature.description}
                        </p>

                        <div className="mt-auto flex justify-center">
                            <ArrowRight className="h-6 w-6 text-foreground stroke-3 group-hover:text-primary transition-colors duration-200" />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}