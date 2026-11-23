import { SpaceHero } from "@/features/space/components/space-hero";
import { SpaceHighlights } from "@/features/space/components/space-highlights";
import { SpaceLobby } from "../components/space-lobby";
import { SpacePrivateRoom } from "../components/space-private-room";
import { SpaceDetails } from "@/features/space/components/space-details";
import { SpaceGallery } from "@/features/space/components/space-gallery";
import { PrivateDining } from "@/features/home/components/private-dining"
export default function SpacePage() {
  return (
    <main>
      <SpaceHero></SpaceHero>
      <SpaceHighlights></SpaceHighlights>
      <SpaceLobby></SpaceLobby>
      <SpacePrivateRoom></SpacePrivateRoom>

      <SpaceDetails></SpaceDetails>
      <SpaceGallery></SpaceGallery>

      <div className="bg-secondary">
        <PrivateDining id="occasions" imageClassName="aspect-4/3"  src = "https://i.pinimg.com/736x/6b/59/8b/6b598b642d58a68a6ee8dc5fb4e7e17c.jpg"></PrivateDining>
    </div>
    </main>
  );
}
