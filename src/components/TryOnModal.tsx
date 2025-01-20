"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function TryOnModal({ isOpen, onClose, product }: TryOnModalProps) {
  const router = useRouter();
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTryOn = () => {
    if (!personImage || !product) return;

    setIsProcessing(true);
    // Simulate processing and redirect
    setTimeout(() => {
      // Store the selected images in localStorage or state management
      // so ResultView can access them
      localStorage.setItem(
        "tryOnData",
        JSON.stringify({
          personImage,
          clothImage: product.image,
        })
      );

      router.push("/result");
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const samplePersons = [
    "/samples/person1.png",
    "/samples/person2.png",
    "/samples/person3.png",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Virtual Try-On</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Upload and samples */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="personInput"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    setPersonImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <label htmlFor="personInput">
                  <Button variant="secondary" className="mb-2">
                    Upload Photo
                  </Button>
                </label>
                {personImage && (
                  <div className="mt-2">
                    <Image
                      src={personImage}
                      alt="Uploaded person"
                      width={200}
                      height={300}
                      className="mx-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Or choose from samples:</Label>
              <div className="grid grid-cols-3 gap-2">
                {samplePersons.map((src, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setPersonImage(src)}
                  >
                    <Image
                      src={src}
                      alt={`Sample ${index + 1}`}
                      width={100}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Selected product */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Selected Item</Label>
              {product && (
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full object-cover"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground">{product.price}</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full"
              disabled={!personImage || isProcessing}
              onClick={handleTryOn}
            >
              {isProcessing ? "Processing..." : "Try It On"}
            </Button>

            {isProcessing && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Generating your virtual try-on...
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
