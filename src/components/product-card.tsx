"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, MessageCircle, Heart, Share2, Info, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { orderProductViaWhatsApp } from "@/lib/whatsapp";
import { formatCurrency, formatSavings } from "@/config/currency";
import { motion, AnimatePresence } from "framer-motion";
import { cardHover, modalBackdrop, modalContent, scaleInSpring, fadeInUp, buttonTap, staggerContainer } from "@/lib/animation-variants";
import { HerbParticles } from "@/components/ayurvedic-effects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
  showQuickAdd?: boolean;
  showDescription?: boolean;
}

export function ProductCard({
  product,
  variant = "default",
  showQuickAdd = true,
  showDescription = true,
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isCompact = variant === "featured";
  const displayCategory =
    product.subcategory?.name || product.category?.name || "General";

  const handleAddToCart = (e?: React.MouseEvent) => {
    // Show particle effect
    if (e && !prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      setParticlePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);
    }

    // Route to WhatsApp Business for ordering
    orderProductViaWhatsApp(product.name, product.price, product.id);
  };

  const handleQuickAdd = (e?: React.MouseEvent) => {
    // Show particle effect
    if (e && !prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      setParticlePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);
    }

    // Route to WhatsApp Business for quick ordering
    orderProductViaWhatsApp(product.name, product.price, product.id);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      {/* Particle Effect */}
      {showParticles && (
        <HerbParticles
          x={particlePosition.x}
          y={particlePosition.y}
          count={25}
          colors={['#34a85a', '#86efac', '#dcfce7', '#f59e0b']}
        />
      )}

      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover={!prefersReducedMotion ? "hover" : "rest"}
        whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`h-full ${isCompact ? "" : "perspective-1000"}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card
          className={`group !border-2 !border-green-200 shadow-sm bg-white rounded-xl overflow-hidden flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-green-200 focus:!border-green-300 cursor-pointer transition-colors duration-300 ${
            isHovered ? '!border-green-300' : ''
          } ${isCompact ? "" : ""}`}
          onClick={handleCardClick}
        >
        <CardHeader className="p-0 relative">
          <motion.div
            className={`relative w-full overflow-hidden rounded-t-xl ${
              isCompact ? "h-48" : "h-52"
            }`}
          >
            <motion.div
              className="relative w-full h-full"
              animate={isHovered && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
            {!isCompact && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {isHovered && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 180 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                >
                  <Sparkles className="w-12 h-12 text-green-400/80" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {product.badge && (
            <motion.div
              className="absolute top-3 left-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Badge
                className={`text-white border-0 shadow-lg px-3 py-1 text-xs font-semibold ${
                  isCompact
                    ? "bg-green-600"
                    : "bg-gradient-to-r from-green-600 to-green-700"
                }`}
              >
                {product.badge}
              </Badge>
            </motion.div>
          )}

          {showQuickAdd && !isCompact && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white shadow-md rounded-full h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(e);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </CardHeader>

        <CardContent
          className={`space-y-3 flex-grow ${isCompact ? "p-4" : "p-5"}`}
        >
          <div className="flex items-start justify-between">
            <span
              className={`text-green-600 font-semibold uppercase tracking-wide rounded-full ${
                isCompact
                  ? "text-sm font-medium"
                  : "text-xs bg-green-50 px-2 py-1"
              }`}
            >
              {displayCategory}
            </span>
            <motion.div
              className={`flex items-center space-x-1 ${
                isCompact ? "" : "bg-gray-50 px-2 py-1 rounded-full"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1.1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </motion.div>
              <span className="text-xs font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </motion.div>
          </div>

          <CardTitle
            className={`font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors duration-300 ${
              isCompact ? "text-lg mb-2" : "text-lg"
            }`}
          >
            {product.name}
          </CardTitle>

          {showDescription && product.description && !isCompact && (
            <p
              className="text-sm text-gray-600 leading-relaxed overflow-hidden flex-grow"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: "1.4em",
                maxHeight: "2.8em",
              }}
            >
              {product.description}
            </p>
          )}

          <div
            className={`flex items-center justify-between mt-auto ${
              isCompact ? "" : "pt-2"
            }`}
          >
            <div className="flex items-baseline space-x-2">
              <span
                className={`font-bold text-green-600 ${
                  isCompact ? "text-xl" : "text-2xl"
                }`}
              >
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && !isCompact && (
              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                {formatSavings(product.originalPrice, product.price)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className={`pt-0 mt-auto ${isCompact ? "p-4" : "p-5"}`}>
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className={`w-full text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                isCompact
                  ? "bg-green-600 hover:bg-green-700 py-2"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-2.5"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(e);
              }}
            >
              <motion.span
                className="flex items-center justify-center"
                animate={isHovered && !prefersReducedMotion ? { x: [-2, 2, -2, 2, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Order via WhatsApp
              </motion.span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
      </motion.div>

      {/* Product Details Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 mb-4">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
                  {displayCategory}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full inline-block">
                    Save {formatSavings(product.originalPrice, product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
                  onClick={handleAddToCart}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order via WhatsApp
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      // Add to favorites functionality
                      console.log("Added to favorites:", product.name);
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      // Share functionality
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: `Check out this amazing Ayurvedic product: ${product.name}`,
                          url: window.location.href,
                        });
                      } else {
                        // Fallback: copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Information */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-semibold text-green-800 mb-1">
                  Product Information
                </h5>
                <p className="text-sm text-green-700">
                  This is a premium Ayurvedic product. For personalized
                  recommendations and dosage instructions, please consult with
                  our Ayurvedic practitioners via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
