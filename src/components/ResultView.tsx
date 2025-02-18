"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ResultViewProps {
  personImage: string | null;
  clothImage: string | null;
  onBack: () => void;
}

export default function ResultView({
  personImage,
  clothImage,
  onBack,
}: ResultViewProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getCombinedImage = () => {
    if (!personImage || !clothImage) return null;

    const personNumber = personImage.match(/person(\d+)/)?.[1];
    const clothNumber = clothImage.match(/cloth(\d+)/)?.[1];

    if (personNumber && clothNumber) {
      return `/results/p${personNumber}c${clothNumber}.png`;
    }

    return null;
  };

  const generateShareableLink = () => {
    const personNumber = personImage?.match(/person(\d+)/)?.[1];
    const clothNumber = clothImage?.match(/cloth(\d+)/)?.[1];

    const baseUrl = window.location.origin;
    return `${baseUrl}?p=${personNumber}&c=${clothNumber}`;
  };

  const handleCopyLink = async () => {
    const link = generateShareableLink();
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch () {
      toast.error("Failed to copy link");
    }
  };

  const combinedImage = getCombinedImage();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto py-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Try-On Result</h2>
          <p className="text-muted-foreground">
            Here's how your selected outfit looks
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <div className="aspect-[3/4] relative bg-muted rounded-lg overflow-hidden">
              {combinedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={combinedImage}
                    alt="Virtual try-on result"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative">
                    {personImage && (
                      <Image
                        src={personImage}
                        alt="Original person"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="relative">
                    {clothImage && (
                      <Image
                        src={clothImage}
                        alt="Selected clothing"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={onBack} variant="outline">
                Try Another
              </Button>
              <Button
                onClick={() => setIsShareDialogOpen(true)}
                variant="secondary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button>Download Result</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this look</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                readOnly
                value={generateShareableLink()}
                className="w-full"
              />
            </div>
            <Button size="icon" onClick={handleCopyLink} variant="secondary">
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
