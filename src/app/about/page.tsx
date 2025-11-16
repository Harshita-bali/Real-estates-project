import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-1');
const teamImages = [
    PlaceHolderImages.find(p => p.id === 'team-1'),
    PlaceHolderImages.find(p => p.id === 'team-2'),
    PlaceHolderImages.find(p => p.id === 'team-3'),
];

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="text-center">
                <Badge variant="outline">About Us</Badge>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">Your Partner in Finding the Perfect Address</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                    At ApnaAddress, we believe that finding a place to call home should be a joyful and seamless experience. We are a team of passionate real estate experts and tech innovators dedicated to simplifying property search in India.
                </p>
            </div>

            <div className="relative w-full h-96 mt-12 rounded-lg overflow-hidden shadow-lg">
                {aboutImage &&
                    <Image
                        src={aboutImage.imageUrl}
                        alt="A modern office building"
                        fill
                        className="object-cover"
                        data-ai-hint={aboutImage.imageHint}
                    />
                }
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p className="mt-2 text-muted-foreground">To empower every Indian with the tools and information they need to find their ideal property, fostering a transparent and trustworthy real estate ecosystem.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                    <p className="mt-2 text-muted-foreground">To become India's most loved and trusted real estate platform, known for our innovation, integrity, and customer-centric approach.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Our Team</h2>
                    <p className="mt-2 text-muted-foreground">A diverse group of thinkers and doers, united by a common goal to revolutionize the way people find and sell properties.</p>
                </div>
            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-10">Meet the Leadership</h2>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-2 border-2 border-primary/50">
                             {teamImages[0] && <AvatarImage src={teamImages[0].imageUrl} data-ai-hint={teamImages[0].imageHint} />}
                            <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">Alok Kumar</h3>
                        <p className="text-sm text-muted-foreground">CEO & Founder</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-2 border-2 border-primary/50">
                            {teamImages[1] && <AvatarImage src={teamImages[1].imageUrl} data-ai-hint={teamImages[1].imageHint} />}
                            <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">Priya Mehta</h3>
                        <p className="text-sm text-muted-foreground">Head of Product</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-2 border-2 border-primary/50">
                            {teamImages[2] && <AvatarImage src={teamImages[2].imageUrl} data-ai-hint={teamImages[2].imageHint} />}
                            <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">Rajesh Singh</h3>
                        <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
