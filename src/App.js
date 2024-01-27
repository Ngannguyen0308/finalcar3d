import React, { Suspense } from "react";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Ground } from "./Ground";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Scene } from "./Sound";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <directionalLight position={[0, 0, 0.5]} intensity={1} />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            {/* tạo ánh sáng chíu vào xe  */}
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <spotLight
        color={[1, 0.25, 0.7]} // màu sắc ánh sáng
        intensity={0.5} // cường độ
        angle={0.6} // góc
        penumbra={1} //
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={0.5}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Rings />
      <Boxes />
      {/* <Scene/> */}

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={2} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Scene />
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
