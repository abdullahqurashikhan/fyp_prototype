"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TryOnModal } from "@/components/TryOnModal";
import Image from "next/image";
import Link from "next/link";

// Sample product data
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: "$29.99",
    image: "/products/cloth1.jpg",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: "$89.99",
    image: "/products/cloth2.jpg",
  },
  {
    id: 3,
    name: "Black Hoodie",
    price: "$59.99",
    image: "/products/cloth3.jpg",
  },
  // Add more products as needed
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                      <Link
                      href="/"
                      >
                          <h1 className="text-2xl font-bold">Fashion Store</h1>
                          </Link>
            <nav className="space-x-4">
              <Button variant="ghost">Categories</Button>
              <Button variant="ghost">Cart (0)</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-muted-foreground">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" className="flex-1">
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsTryOnModalOpen(true);
                  }}
                >
                  Try On
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Try On Modal */}
      <TryOnModal
        isOpen={isTryOnModalOpen}
        onClose={() => setIsTryOnModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
