"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResultView from "@/components/ResultView";

export default function ResultPage() {
  const router = useRouter();
  const [images, setImages] = useState<{
    personImage: string | null;
    clothImage: string | null;
  }>({ personImage: null, clothImage: null });

  useEffect(() => {
    // Get the stored images from localStorage
    const tryOnData = localStorage.getItem("tryOnData");
    if (tryOnData) {
      const data = JSON.parse(tryOnData);
      setImages(data);
      // Clear the data after retrieving it
      localStorage.removeItem("tryOnData");
    } else {
      // If no data is found, redirect back to shop
      router.push("/shop");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/shop");
  };

  return (
    <ResultView
      personImage={images.personImage}
      clothImage={images.clothImage}
      onBack={handleBack}
    />
  );
}
