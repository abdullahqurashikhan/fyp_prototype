"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ResultView from "@/components/ResultView";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const samplePersons = [
    "/samples/person1.png",
    // "/samples/person2.png",
    // "/samples/person3.png",
  ];

  const sampleClothes = [
    "/samples/cloth1.jpg",
    "/samples/cloth2.jpg",
    "/samples/cloth3.jpg",
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const personParam = searchParams.get("p");
    const clothParam = searchParams.get("c");

    if (personParam && clothParam) {
      setPersonImage(`/samples/person${personParam}.jpg`);
      setClothImage(`/samples/cloth${clothParam}.jpg`);
      setShowResult(true);
    }
  }, []);

  const simulateProcessing = () => {
    if (personImage && clothImage) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 2000);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showResult ? (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ResultView
            personImage={personImage}
            clothImage={clothImage}
            onBack={() => setShowResult(false)}
          />
        </motion.div>
      ) : (
        <motion.main
          key="input"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto py-10 space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Virtual Mirror
            </h1>
            <p className="text-muted-foreground">
              Try on clothes virtually using AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Person Image Card */}
            <Card>
              <CardHeader>
                <CardTitle>Person Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center",
                    "hover:border-primary/50 transition-colors",
                    personImage ? "border-muted" : "border-muted-foreground/25"
                  )}
                >
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
                  <label htmlFor="personInput" className="cursor-pointer">
                    <Button variant="secondary" className="mb-4">
                      Choose Person Image
                    </Button>
                  </label>
                  {personImage && (
                    <div className="mt-4">
                      <Image
                        src={personImage}
                        alt="Selected person"
                        width={200}
                        height={300}
                        className="mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4">
                  {samplePersons.map((src, index) => (
                    <div
                      key={index}
                      className="cursor-pointer relative group"
                      onClick={() => setPersonImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`Sample person ${index + 1}`}
                        width={100}
                        height={150}
                        className="rounded-lg transition-transform group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloth Image Card */}
            <Card>
              <CardHeader>
                <CardTitle>Cloth Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center",
                    "hover:border-primary/50 transition-colors",
                    clothImage ? "border-muted" : "border-muted-foreground/25"
                  )}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="clothInput"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      setClothImage(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  <label htmlFor="clothInput" className="cursor-pointer">
                    <Button variant="secondary" className="mb-4">
                      Choose Cloth Image
                    </Button>
                  </label>
                  {clothImage && (
                    <div className="mt-4">
                      <Image
                        src={clothImage}
                        alt="Selected cloth"
                        width={200}
                        height={200}
                        className="mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4">
                  {sampleClothes.map((src, index) => (
                    <div
                      key={index}
                      className="cursor-pointer relative group"
                      onClick={() => setClothImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`Sample cloth ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg transition-transform group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              disabled={!personImage || !clothImage || isLoading}
              onClick={simulateProcessing}
            >
              {isLoading ? "Processing..." : "Try It On!"}
            </Button>

            {isLoading && (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
                <p className="text-muted-foreground">
                  Processing your virtual try-on...
                </p>
              </div>
            )}
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
