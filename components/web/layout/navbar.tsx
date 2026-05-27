import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { menuEntries } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { NavDropdownCategory } from "./nav-category"
import { UserButton } from "../auth/user-button"
import { BrandLogo } from "../shared/brand-logo"
import { getCurrentUserSnippet } from "@/lib/db/user"
import { signOutAction } from "@/actions/auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export function Navbar() {

    return (
        <nav aria-label="Main" className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="flex items-center justify-between mx-auto max-w-8xl px-6 py-2">
                <div className="my-1">
                    <BrandLogo />
                </div>


                <NavigationMenu>
                    <NavigationMenuList>
                        {menuEntries.map((menu) => (
                            <NavDropdownCategory
                                key={menu.title}
                                title={menu.title}
                                items={menu.items}
                            />
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    <Suspense fallback={<AuthSkeleton />}>
                        <AuthSection />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

async function AuthSection() {
    const { user, profile } = await getCurrentUserSnippet();

    if (user) {
        return (
            <UserButton
                username={profile?.username || "User"}
                avatarUrl={profile?.avatar_url}
                onSignOut={signOutAction}
            />
        );
    }

    return (
        <>
            <Button asChild variant="ghost" size="sm" className="px-4 text-sm font-medium rounded-full transition-all hover:bg-transparent! hover:text-primary duration-200 active:scale-95">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="px-4 text-sm font-medium rounded-full transition-all duration-200 hover:brightness-110 active:scale-95">
                <Link href="/register">Sign Up</Link>
            </Button>
        </>
    );
}

function AuthSkeleton() {
    return (
        <div className="flex items-center gap-3 px-2 py-1.5">
            {/* Simula l'Avatar circolare */}
            <Skeleton className="h-6 w-6 rounded-full" />
            {/* Simula l'Username */}
            <Skeleton className="h-4 w-20 rounded-md hidden sm:block" />
        </div>
    )
}