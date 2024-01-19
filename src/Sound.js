import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, PositionalAudio } from "@react-three/drei";

function SoundButton({ onClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (hovered) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
    >
      
      <Html>
        <button
          onClick={onClick}
          style={{
            fontSize: "16px",
            padding: "8px",
            cursor: "pointer",
            background: "orange",
            border: "none",
            boxShadow: "0px 10px 15px #888888",
            position: "absolute",
            top:"-300px",
            left: "570px"
          }}
        >
          Play Sound
        </button>
      </Html>
    </mesh>
  );
}

export function Scene() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioButtonClick = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <>
      <pointLight position={[10, 10, 10]} />
      <SoundButton onClick={handleAudioButtonClick} />
      {isAudioPlaying && (
        <PositionalAudio
          url="/sound/furious.mp3"
          distance={10}
          volume={1}
          autoplay
          loop
        />
      )}
    </>
  );
}

export default Scene;
