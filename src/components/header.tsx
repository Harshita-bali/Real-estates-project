"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Building2, LogOut, LayoutDashboard, UserPlus, LogIn } from "lucide-react";
import { useUser, useAuth } from "@/firebase";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/post-property", label: "Post Property" },
  { href: "/recommendations", label: "AI Recommender" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};


export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
    }
  };
  
  const AuthNav = () => {
    if (isUserLoading) return <div className="h-10 w-24 rounded-md animate-pulse bg-muted" />;

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border">
                           <AvatarFallback>{getInitials(user.displayName || user.email || 'U')}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                         <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
    )

  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              ApnaAddress
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="md:hidden">
                <Link href="/" className="flex items-center space-x-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-bold">ApnaAddress</span>
                </Link>
            </div>
            <div className="hidden md:flex">
                <AuthNav />
            </div>

            <div className="md:hidden">
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col p-6">
                            <SheetClose asChild>
                                <Link href="/" className="mb-8 flex items-center space-x-2">
                                    <Building2 className="h-6 w-6 text-primary" />
                                    <span className="font-bold">ApnaAddress</span>
                                </Link>
                            </SheetClose>
                            <nav className="flex flex-col space-y-3">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary",
                                                pathname === link.href ? "text-primary" : "text-foreground"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                             <div className="mt-8 border-t pt-6">
                                {user ? (
                                    <div className="space-y-4">
                                        <SheetClose asChild>
                                            <Link href="/dashboard" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />Dashboard
                                            </Link>
                                        </SheetClose>
                                        <Button onClick={handleSignOut} variant="outline" className="w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign Out
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-3">
                                         <SheetClose asChild>
                                            <Link href="/login" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                                                <LogIn className="mr-2 h-4 w-4" /> Log In
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button asChild className="w-full">
                                                <Link href="/signup"><UserPlus className="mr-2 h-4 w-4"/>Sign Up</Link>
                                            </Button>
                                        </SheetClose>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
