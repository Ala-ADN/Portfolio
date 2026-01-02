import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const BookModel = forwardRef(({ onLoad, onAnimationComplete }, ref) => {
  const groupRef = useRef();
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const cameraRef = useRef();
  const { scene, animations, cameras } = useGLTF("/models/book bones.glb");

  useEffect(() => {
    if (scene && animations.length > 0 && !mixerRef.current) {
      console.log("Book model loaded");
      console.log(
        "Available animations:",
        animations.map((a) => a.name)
      );

      // Find camera in the scene
      const camera = cameras[0];
      if (camera) {
        cameraRef.current = camera;
        console.log("Camera found:", camera);
      }

      // Create animation mixer
      mixerRef.current = new THREE.AnimationMixer(scene);

      // Store all animation actions
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        actionsRef.current[clip.name] = action;
      });

      onLoad?.({
        scene,
        animations,
        actions: actionsRef.current,
        camera: cameraRef.current,
      });
    }
  }, [scene, animations, cameras]);

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
    <primitive ref={groupRef} object={scene} scale={0.6} position={[0, 0, 0]} />
  );
});

BookModel.displayName = "BookModel";

const Book3D = forwardRef(({ onModelLoad, visible }, ref) => {
  const modelRef = useRef();
  const onAnimationCompleteRef = useRef();
  const glbCameraRef = useRef();

  useImperativeHandle(ref, () => ({
    playAnimation: (direction, onComplete) => {
      onAnimationCompleteRef.current = onComplete;
      modelRef.current?.playAnimation(direction);
    },
  }));

  const handleAnimationComplete = () => {
    onAnimationCompleteRef.current?.();
  };

  const handleModelLoad = (data) => {
    if (data.camera) {
      glbCameraRef.current = data.camera;
    }
    onModelLoad?.(data);
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
      <Canvas camera={{ fov: 17.5 }}>
        {glbCameraRef.current && (
          <primitive object={glbCameraRef.current} makeDefault />
        )}

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        {/* Book Model */}
        <BookModel
          ref={modelRef}
          onLoad={handleModelLoad}
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
