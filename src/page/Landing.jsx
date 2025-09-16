import TargetCursor from '../component/TargetCursor';
import LiquidEther from '../component/LiquidEther';
import { Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./landing.css"
function App() {
    const navigate = useNavigate(); 
    const [open,setOpen]=useState(false)
    const [time, setTime] = useState("00:25:00");
    const handleStart=()=>{
      const [hh, mm, ss] = time.split(":");
      navigate(`/start/${hh}/${mm}/${ss}`)
    }
  return (
    <>
<div style={{ width: '100%', height: '99%',left:0,right:0, position: "absolute" }}>
     <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
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
      <div style={{fontSize:"50px",color:"white", width:"100%",height:"100vh",display:"flex",justifyContent:"center",flexDirection: "column" ,alignContent:"center"}}>     
      <p>Face tracking & sound alerts to keep you at your desk</p>
      <div onClick={()=>setOpen(true)} style={{border:"2px solid #ffffffff",zIndex:9,padding:"5px",borderRadius:"10px",marginTop:"10px"}} className="cursor-target">Start</div>
      <p></p>
      <div onClick={() => window.open('https://github.com/hamzabelaidi909/test-face-detect', '_blank')} style={{color:"#a1a1a1ff",border:"2px solid #a1a1a1ff",zIndex:9,padding:"5px",borderRadius:"10px",marginTop:"10px"}}  className="cursor-target">gitHub Source</div>
      <div onClick={() => window.open('https://www.linkedin.com/in/belaidi-hamza/', '_blank')} style={{color:"#a1a1a1ff",border:"2px solid #a1a1a1ff",zIndex:9,padding:"5px",borderRadius:"10px",marginTop:"10px"}}  className="cursor-target">My linkedin</div>
    {open?<div className='leaves' onClick={()=>setOpen(false)}>
            <div className='carte'onClick={(e)=> e.stopPropagation()} >
              <p style={{fontSize:"20px"}}>enter the time you Want to sit down at the desk :</p>
                            <div className="cursor-target"><input type="time" step="1" className="styled-time hovers"  value={time}onChange={(e) => setTime(e.target.value)} /></div>
                      <div  onClick={handleStart} style={{border:"2px solid #ffffffff",zIndex:9,padding:"5px",borderRadius:"10px",marginTop:"10px",textAlign:"center"}} className="cursor-target hovers">Start</div>
            </div>
    </div>:null}
</div>
    </>
  );
}
// navigate("/Start/10/10/10")
export default App;