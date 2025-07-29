import React, {useRef} from "react";

const VantaNet = ({ children, height = "100vh" }) => {
    const vantaRef = useRef(null);
  
    return (
        <div
            ref={vantaRef}
            style={{
                height,
                width: "100%",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </div>
    );
};

export default VantaNet;
