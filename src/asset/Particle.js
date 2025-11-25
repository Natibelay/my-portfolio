import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Particle() {
  const particlesInit = async (main) => {
    // Load the full tsparticles package
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // Callback after particles are loaded (optional)
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: true, zIndex: 0 }, // background layer
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: { value: "#7300ffff" },
          shape: { type: "circle" },
          opacity: {
            value: 1000000,
            random: true,
            anim: { enable: false },
          },
          size: {
            value: 2,
            random: true,
            anim: { enable: false },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default Particle;
