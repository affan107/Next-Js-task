"use client";

import PropertyCard from "./PropertyCard";

// Mock data 
const MOCK_PROPERTIES = [
  {
    id: 1,
    //image: "/house.png",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 2,
    //image: "/properties/house2.jpg",
    badge: "New",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 3,
    //image: "/properties/house3.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 4,
    //image: "/properties/house4.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 5,
    //image: "/properties/house5.jpg",
    badge: "Inactive",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 6,
    //image: "/properties/house6.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 7,
    //image: "/properties/house7.jpg",
    badge: "New",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 8,
    //image: "/properties/house8.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 9,
    //image: "/properties/house9.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
  {
    id: 10,
    //image: "/properties/house10.jpg",
    badge: "Active",
    headline: "Headline",
    description:
      "Please click to read more about this property. Maecenas condimentum tincidunt massa vel dignissim.",
  },
];

/**
 * PropertyGrid
 *
 * Props:
 *  - properties: array of property objects (optional, falls back to mock data)
 *  - title: string (section heading)
 */
export default function PropertyGrid({
  properties = MOCK_PROPERTIES,
  title = "Live Property",
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.image}
            badge={property.badge}
            headline={property.headline}
            description={property.description}
            onCreateEvent={() => console.log("Create event for", property.id)}
            onJump={() => console.log("Jump to", property.id)}
          />
        ))}
      </div>
    </section>
  );
}
