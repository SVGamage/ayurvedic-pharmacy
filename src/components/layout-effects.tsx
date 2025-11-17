import { FallingLeaves } from "./ayurvedic-effects";
import { FloatingHerbsParticles } from "./background-effects";

export default function LayoutEffects() {
  return (
    <>
      {/* Ayurvedic Falling Leaves Effect */}
      <FallingLeaves count={20} />

      {/* Floating Herbs Background Particles */}
      <FloatingHerbsParticles />
    </>
  );
}
