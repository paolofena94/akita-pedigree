import { Heart, Coffee } from "lucide-react";

export default function DonationBanner() {
  return (
    <div className="bg-white border-3 border-primary/40 rounded-3xl p-8 md:p-10 my-14 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* Colonna Sinistra: Testo e Spiegazione */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2.5 rounded-full text-primary">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Keep Akita Pedigree Alive</h2>
        </div>
        
        <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
          This database is a 100% independent project maintained by a single enthusiast. We don't run ads or sell data. If you find this tool useful, consider supporting it to help cover server and maintenance costs.
        </p>

        {/* Barra di progresso mensile (Trasparenza) */}
        <div className="max-w-md">
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Monthly Server & Maintenance Costs</span>
            <span className="text-primary">45% Funded</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            {/* Cambia la percentuale nel 'width' in base ai dati reali */}
            <div className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: "45%" }}></div>
          </div>
        </div>
      </div>

      {/* Colonna Destra: Bottoni Call to Action */}
      <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
        <button className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-full transition-all duration-200 shadow-sm active:scale-95 w-full md:w-auto">
          <Coffee className="w-4 h-5 group-hover:rotate-12 transition-transform duration-200" />
          <span>Buy me a coffee ($5)</span>
        </button>
        
        <button className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground font-medium py-3 px-8 rounded-full transition-colors border border-transparent hover:border-muted hover:bg-accent active:scale-95 w-full md:w-auto">
          Make a custom donation
        </button>
      </div>

    </div>
  );
}