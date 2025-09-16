import React, { useState } from 'react';
import LiquidEther from '../component/LiquidEther';
import Detect from '../component/Detect'
import  Timer  from "../component/timer";
import { useParams } from 'react-router-dom';
function App() {
    const[playSound, setPlaySound] = useState(false);
    const[finish,setfinish]=useState(false)
    const { hh,mm,ss } = useParams();
     const h = parseInt(hh, 10) || 0;
  const m = parseInt(mm, 10) || 0;
  const s = parseInt(ss, 10) || 0;
  return (
    <>
<div style={{ width: '99%', height: '99%', position: "absolute" }}>
  <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>

      <Detect finish={finish} playSound={playSound} setPlaySound={setPlaySound} />
      <div style={{display: "flex",    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center", 
    alignItems: "center", marginTop:"10px",width: 640}}>
      <Timer hh={h} mm={m} ss={s} setPlaySound={setfinish} playSound={playSound} />
      </div>
    </>
  );
}

export default App;
