'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Property } from '@/lib/types';
import { PropertyCard } from '@/components/property-card';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const propertiesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'properties'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: properties, isLoading: isLoadingProperties } = useCollection<Property>(propertiesQuery);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  const getInitials = (firstName = '', lastName = '') => {
      const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
      const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
      return `${firstInitial}${lastInitial}`;
  }
  
  const displayName = user.displayName || `${user.email}`;

  return (
    <div className="container py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
             <AvatarFallback className="text-xl">{getInitials(displayName.split(' ')[0], displayName.split(' ')[1])}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {displayName}</h1>
            <p className="text-muted-foreground">This is your personal dashboard.</p>
          </div>
        </div>
         <Button onClick={() => auth.signOut()}>Sign Out</Button>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Listed Properties</CardTitle>
            <CardDescription>Here are the properties you have listed on ApnaAddress.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProperties && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}
            {!isLoadingProperties && properties && properties.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
             {!isLoadingProperties && (!properties || properties.length === 0) && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">You haven&apos;t listed any properties yet.</p>
                    <Button asChild>
                        <Link href="/post-property">List a Property</Link>
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
