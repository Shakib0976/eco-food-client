import React, { useEffect, useRef, useState } from "react";

const VantaNet = ({ children, height = "100vh" }) => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect && window.VANTA) {
            setVantaEffect(
                window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xb854,
                    backgroundColor: 0x29 ,// background
                    points: 10.0,             // number of points
                    maxDistance: 20.0         // spacing between them
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

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
