"use client";

import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function CrystalRing({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current || reduced) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0.4]}>
        <torusGeometry args={[1.55, 0.045, 32, 180]} />
        <meshStandardMaterial
          color="#1f9d63"
          emissive="#0d3b2a"
          emissiveIntensity={0.55}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <mesh rotation={[0.4, Math.PI / 3, 0.8]}>
        <torusGeometry args={[1.15, 0.028, 24, 140]} />
        <meshStandardMaterial
          color="#5ee0a0"
          emissive="#146b45"
          emissiveIntensity={0.4}
          metalness={0.55}
          roughness={0.35}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function CoreOrb({ reduced }: { reduced: boolean }) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.18;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.08;
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.6}>
      <Sphere ref={mesh} args={[0.72, 64, 64]}>
        <MeshDistortMaterial
          color="#0d3b2a"
          emissive="#1f9d63"
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.55}
          distort={reduced ? 0.08 : 0.28}
          speed={reduced ? 0.4 : 1.6}
        />
      </Sphere>
    </Float>
  );
}

function OrbitShards({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return {
          position: [
            Math.cos(angle) * 2.1,
            Math.sin(angle * 1.4) * 0.55,
            Math.sin(angle) * 2.1,
          ] as [number, number, number],
          scale: 0.08 + (i % 3) * 0.035,
          speed: 0.4 + i * 0.05,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <group ref={group}>
      {shards.map((shard, index) => (
        <mesh key={index} position={shard.position} scale={shard.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#5ee0a0" : "#146b45"}
            emissive="#1f9d63"
            emissiveIntensity={0.35}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent({ pointer, reduced }: { pointer: Pointer; reduced: boolean }) {
  const root = useRef<Group>(null);

  useFrame(() => {
    if (!root.current || reduced) return;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      pointer.x * 0.35,
      0.05,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      pointer.y * 0.2,
      0.05,
    );
  });

  return (
    <group ref={root} position={[0.15, 0.05, 0]}>
      <ambientLight intensity={0.35} color="#9bbbab" />
      <directionalLight position={[4, 5, 2]} intensity={1.1} color="#dff7ea" />
      <pointLight position={[-3, -1, 2]} intensity={1.4} color="#1f9d63" />
      <pointLight position={[2, 2, -2]} intensity={0.7} color="#5ee0a0" />
      <CoreOrb reduced={reduced} />
      <CrystalRing reduced={reduced} />
      <OrbitShards reduced={reduced} />
      <fog attach="fog" args={["#040c09", 4.5, 11]} />
    </group>
  );
}

export default function AbstractScene() {
  const reduced = usePrefersReducedMotion();
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y: -y });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#040c09"]} />
      <Suspense fallback={null}>
        <SceneContent pointer={pointer} reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
