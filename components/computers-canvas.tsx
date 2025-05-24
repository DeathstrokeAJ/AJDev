"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import CanvasLoader from "@/components/canvas-loader"

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/assets/desktop_pc/scene.gltf") // Using the built-in duck model as placeholder

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <pointLight intensity={1} />
      <primitive 
        object={computer.scene} 
        scale={isMobile ? 0.5 : 0.7} 
        position={isMobile ? [0, -1.8, -0.5] : [0, -1.5, -0.5]} 
        rotation={[-0.01, -0.2, -0.1]} 
      />
    </mesh>
  )
}

const ComputersCanvas = ({ isMobile }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: isMobile ? [20, 3, 5] : [25, 5, 8], fov: isMobile ? 30 : 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={isMobile ? 1 : 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas
