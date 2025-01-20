"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out our service",
      features: [
        "5 Virtual Try-ons per month",
        "Basic clothing catalog",
        "Standard resolution results",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "Best for fashion enthusiasts",
      features: [
        "50 Virtual Try-ons per month",
        "Premium clothing catalog",
        "HD resolution results",
        "Priority support",
        "Share results on social media",
        "Save try-on history",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For fashion businesses",
      features: [
        "Unlimited Virtual Try-ons",
        "Custom clothing catalog",
        "4K resolution results",
        "24/7 dedicated support",
        "API access",
        "Custom branding",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-2xl font-bold">Virtual Mirror</h1>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/shop">
              <Button>Shop Now</Button>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
          >
            Try Before You Buy with AI-Powered Virtual Mirror
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the future of online shopping with our state-of-the-art
            virtual fitting room. See how clothes look on you before making a
            purchase.
          </motion.p>
          <motion.div variants={fadeIn} className="flex justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="text-lg">
                Browse Shop
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "AI-Powered Try-On",
              description:
                "Advanced AI technology that lets you see how clothes look on you instantly.",
            },
            {
              title: "Share Your Looks",
              description:
                "Share virtual try-ons with friends and get their opinion instantly.",
            },
            {
              title: "Easy to Use",
              description:
                "Simple and intuitive interface for the best user experience.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 rounded-lg bg-card border"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div key={index} variants={fadeIn} className="relative">
                <Card
                  className={`h-full ${
                    plan.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground"
          >
            © 2024 Virtual Mirror. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
