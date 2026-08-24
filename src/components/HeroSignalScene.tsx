"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSignalScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.2, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.position.set(1.35, -0.1, 0);
    scene.add(root);

    const teal = new THREE.Color("#13afa0");
    const ink = new THREE.Color("#1d2a54");
    const gold = new THREE.Color("#c2a24b");
    const paper = new THREE.Color("#f8f4ea");

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(5, 7, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x13afa0, 2);
    rim.position.set(-5, 2, 3);
    scene.add(rim);

    const ringGroup = new THREE.Group();
    root.add(ringGroup);

    const ringMaterials = [
      new THREE.MeshBasicMaterial({
        color: teal,
        wireframe: true,
        transparent: true,
        opacity: 0.48,
      }),
      new THREE.MeshBasicMaterial({
        color: paper,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
      new THREE.MeshBasicMaterial({
        color: gold,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    ];

    [2.1, 3.05, 4.05].forEach((radius, index) => {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 8, 120),
        ringMaterials[index]
      );
      torus.rotation.x = Math.PI / 2.15;
      torus.rotation.y = index * 0.38;
      ringGroup.add(torus);
    });

    const spokeGeometry = new THREE.BufferGeometry();
    const spokePoints: number[] = [];
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const inner = 1.55 + ((i % 5) * 0.08);
      const outer = 4.2 - ((i % 7) * 0.04);
      spokePoints.push(
        Math.cos(angle) * inner,
        Math.sin(angle) * inner * 0.58,
        Math.sin(angle * 2) * 0.08,
        Math.cos(angle) * outer,
        Math.sin(angle) * outer * 0.58,
        Math.cos(angle * 2) * 0.18
      );
    }
    spokeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(spokePoints, 3)
    );
    const spokes = new THREE.LineSegments(
      spokeGeometry,
      new THREE.LineBasicMaterial({
        color: teal,
        transparent: true,
        opacity: 0.2,
      })
    );
    spokes.rotation.x = -0.28;
    root.add(spokes);

    const shardGeometry = new THREE.BoxGeometry(0.045, 0.45, 0.045);
    const shardMaterial = new THREE.MeshStandardMaterial({
      color: teal,
      roughness: 0.42,
      metalness: 0.38,
      emissive: new THREE.Color("#063f43"),
      emissiveIntensity: 0.55,
    });
    const shards = new THREE.InstancedMesh(shardGeometry, shardMaterial, 96);
    const shardData: { angle: number; radius: number; height: number; speed: number }[] = [];
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < 96; i++) {
      const angle = (i / 96) * Math.PI * 2;
      const radius = 1.65 + (i % 16) * 0.13;
      const height = 0.35 + ((i * 7) % 19) * 0.045;
      const speed = 0.18 + (i % 9) * 0.012;
      shardData.push({ angle, radius, height, speed });
      matrix.makeScale(1, height, 1);
      matrix.setPosition(
        Math.cos(angle) * radius,
        Math.sin(angle * 3) * 0.25,
        Math.sin(angle) * radius * 0.52
      );
      shards.setMatrixAt(i, matrix);
    }
    shards.instanceMatrix.needsUpdate = true;
    root.add(shards);

    const plateGeometry = new THREE.PlaneGeometry(0.9, 0.28);
    const plateMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.11,
      side: THREE.DoubleSide,
    });
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: paper,
      transparent: true,
      opacity: 0.25,
    });
    const plates = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const plate = new THREE.Mesh(plateGeometry, plateMaterial);
      const angle = (i / 10) * Math.PI * 2;
      plate.position.set(
        Math.cos(angle) * (2.3 + (i % 3) * 0.32),
        -1.4 + (i % 5) * 0.7,
        Math.sin(angle) * 1.1
      );
      plate.rotation.set(0.25, -angle + Math.PI / 2, 0.08 * i);
      plates.add(plate);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(plateGeometry),
        edgeMaterial
      );
      edges.position.copy(plate.position);
      edges.rotation.copy(plate.rotation);
      plates.add(edges);
    }
    root.add(plates);

    const floorGeometry = new THREE.BufferGeometry();
    const floorPoints: number[] = [];
    for (let i = -9; i <= 9; i++) {
      floorPoints.push(-6, -2.15, i * 0.38, 6, -2.15, i * 0.38);
      floorPoints.push(i * 0.38, -2.15, -3.4, i * 0.38, -2.15, 3.4);
    }
    floorGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(floorPoints, 3)
    );
    const floor = new THREE.LineSegments(
      floorGeometry,
      new THREE.LineBasicMaterial({
        color: ink,
        transparent: true,
        opacity: 0.18,
      })
    );
    floor.rotation.x = 0.18;
    root.add(floor);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      root.scale.setScalar(width < 760 ? 0.72 : 1);
      root.position.x = width < 760 ? 0.15 : 1.35;
      root.position.y = width < 760 ? -0.25 : -0.1;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animationId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      frame += 1;

      ringGroup.rotation.z = elapsed * 0.08;
      ringGroup.rotation.y = Math.sin(elapsed * 0.28) * 0.16;
      spokes.rotation.z = -elapsed * 0.045;
      plates.rotation.y = elapsed * 0.045;
      floor.position.z = Math.sin(elapsed * 0.42) * 0.08;

      for (let i = 0; i < shardData.length; i++) {
        const datum = shardData[i];
        const angle = datum.angle + elapsed * datum.speed;
        const pulse = 0.85 + Math.sin(elapsed * 1.7 + i) * 0.35;
        matrix.identity();
        matrix.makeScale(1, datum.height * pulse, 1);
        matrix.setPosition(
          Math.cos(angle) * datum.radius,
          Math.sin(angle * 3 + elapsed) * 0.25,
          Math.sin(angle) * datum.radius * 0.52
        );
        shards.setMatrixAt(i, matrix);
      }
      if (frame % 2 === 0) shards.instanceMatrix.needsUpdate = true;

      root.rotation.x += ((-pointer.y * 0.08) - root.rotation.x) * 0.035;
      root.rotation.y += ((pointer.x * 0.1) - root.rotation.y) * 0.035;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      spokeGeometry.dispose();
      floorGeometry.dispose();
      shardGeometry.dispose();
      shardMaterial.dispose();
      plateGeometry.dispose();
      plateMaterial.dispose();
      edgeMaterial.dispose();
      ringMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      data-hero-signal-scene
    />
  );
}
