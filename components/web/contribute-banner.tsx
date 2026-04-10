import Link from "next/link";
import { Button } from "../ui/button";
import { PiUsersThree } from "react-icons/pi";

export default function ContributeBanner() {
  return (
    <div className="h-full relative bg-accent rounded-lg p-16 flex flex-col overflow-hidden items-center text-center">

      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 via-primary/70 to-primary/50"></div>
      
      <div className="mb-8 text-primary flex justify-center">
        <PiUsersThree className="h-12 w-12 stroke-[2px]" />
      
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        Join the Community
      </h2>

      <p className="text-xs md:text-sm text-muted-foreground mb-6 max-w-2xl">
        Register your Akitas, update information, use our tools and help the community grow.
      </p>

      <Button asChild size="lg" className="p-5 text-md font-semibold transition-all duration-200 active:scale-95">
        <Link href="/signin">
          Create a Free Account
        </Link>
      </Button>

    </div>
  );
}