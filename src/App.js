import { useEffect, useRef, useState } from "react";

function App() {
    const canvasRef = useRef(null);
    const constextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        /*** CONFIGURAÇÃO DA TELA ***/
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = "5px";
        constextRef.current = context;
    }, []);

    const reactCanvas = constextRef.current;

    const startDrawing = (event) => {
        const { offsetX, offsetY } = event;
        reactCanvas.beginPath();
        reactCanvas.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const drawing = (event) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = event;
        reactCanvas.lineTo(offsetX, offsetY);
        reactCanvas.stroke();
    };

    const finishDrawing = () => {
        reactCanvas.closePath();
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={drawing}
            onMouseUp={finishDrawing}
        >
            Canvas
        </canvas>
    );
}

export default App;
