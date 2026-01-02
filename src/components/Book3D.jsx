import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const BookModel = forwardRef(({ onLoad, onAnimationComplete }, ref) => {
  const groupRef = useRef();
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const { scene, animations } = useGLTF("/models/book bones.glb");

  useEffect(() => {
    if (scene && animations.length > 0 && !mixerRef.current) {
      console.log("Book model loaded");
      console.log("Available animations:", animations.map((a) => a.name));

      // Create animation mixer
      mixerRef.current = new THREE.AnimationMixer(scene);

      // Store all animation actions
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        actionsRef.current[clip.name] = action;
      });

      onLoad?.({ scene, animations, actions: actionsRef.current });
    }
  }, [scene, animations]);

  // Expose playAnimation method
  useImperativeHandle(ref, () => ({
    playAnimation: (direction) => {
      if (direction === "next") {
        const animationName = "ArmatureAction.001";
        const action = actionsRef.current[animationName];
        
        if (action) {
          console.log("Book3D: Playing animation:", animationName);
          action.reset();
          action.play();

          const onFinished = () => {
            console.log("Book3D: Animation finished:", animationName);
            onAnimationComplete?.();
            mixerRef.current?.removeEventListener("finished", onFinished);
          };
          mixerRef.current?.addEventListener("finished", onFinished);
        } else {
          console.error("Book3D: Animation not found:", animationName);
          onAnimationComplete?.();
        }
      } else if (direction === "prev") {
        // No prev animation yet - just complete immediately
        console.log("Book3D: Prev animation not implemented yet");
        onAnimationComplete?.();
      }
    },
  }));

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive ref={groupRef} object={scene} scale={3} position={[0, 0, 0]} />
  );
});

BookModel.displayName = "BookModel";

const Book3D = forwardRef(({ onModelLoad, visible }, ref) => {
  const modelRef = useRef();
  const onAnimationCompleteRef = useRef();

  useImperativeHandle(ref, () => ({
    playAnimation: (direction, onComplete) => {
      onAnimationCompleteRef.current = onComplete;
      modelRef.current?.playAnimation(direction);
    },
  }));

  const handleAnimationComplete = () => {
    onAnimationCompleteRef.current?.();
  };

  return (
    <div
      className="book-3d-container"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 0]} fov={42.15} />
        <OrbitControls
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={100}
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        {/* Book Model */}
        <BookModel
          ref={modelRef}
          onLoad={onModelLoad}
          onAnimationComplete={handleAnimationComplete}
        />
      </Canvas>
    </div>
  );
});

Book3D.displayName = "Book3D";

export default Book3D;

// Preload the model
useGLTF.preload("/models/book bones.glb");
