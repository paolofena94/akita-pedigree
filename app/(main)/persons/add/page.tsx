import { Metadata } from "next";
import AddPersonWizard from "./_components/add-person-wizard";

// I Server Components ci permettono di definire facilmente i metadati per la SEO
export const metadata: Metadata = {
  title: "Add a Person | Akita Pedigree",
  description: "Register a new breeder, owner, or handler in the global Akita Pedigree database.",
};

export default function AddPersonPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* 
        Aggiungiamo un contenitore flessibile che centra il form verticalmente e orizzontalmente.
        Il bg-muted/10 richiama lo sfondo leggermente grigio che abbiamo usato nel profilo.
      */}
      <div className="w-full max-w-3xl">
        <AddPersonWizard />
      </div>
    </div>
  );
}