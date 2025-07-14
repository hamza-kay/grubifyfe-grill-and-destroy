"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function MenuItem({ item }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <Image
          src={item.image_url || "/images/placeholder.jpg"}
          alt={item.name}
          width={400}
          height={250}
          className="rounded-t-md object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <p className="text-gray-500 mt-2">
          £{item.price?.toFixed(2) ?? "N/A"}
        </p>
      </CardContent>
    </Card>
  );
}
