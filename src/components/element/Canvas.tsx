import React, { useRef, useEffect } from "react";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const c = canvas.getContext("2d");
    if (!c) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Circle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      radius: number;
      color: string;
      draw: () => void;
      update: () => void;
    }

    const DrawingCircle = function (
      x: number,
      y: number,
      speedX: number,
      speedY: number,
      radius: number,
      color: string
    ): Circle {
      const circle: Circle = {
        x,
        y,
        speedX,
        speedY,
        radius,
        color,
        draw: function () {
          if (!c) return;
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
          c.fillStyle = this.color;
          c.fill();
          c.stroke();
        },
        update: function () {
          if (!c) return;
          if (
            this.x - this.radius > window.innerWidth ||
            this.x - this.radius < 0
          ) {
            this.speedX = -this.speedX;
          }
          if (
            this.y - this.radius > window.innerHeight ||
            this.y - this.radius < 0
          ) {
            this.speedY = -this.speedY;
          }
          this.x += this.speedX;
          this.y += this.speedY;
          this.draw();
        },
      };
      return circle;
    };

    const data: Circle[] = [];
    for (let i = 0; i < 20; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let speedX = (Math.random() + 0.5) * 0.3;
      let speedY = (Math.random() + 0.5) * 0.7;
      const radius = Math.random() * 15;
      const color = "white";
      data.push(DrawingCircle(x, y, speedX, speedY, radius, color));
    }

    const draw = () => {
      requestAnimationFrame(draw);
      if (!c) return;
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < data.length; i++) {
        data[i].update();
      }
    };
    draw();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas className="h-1/2" ref={canvasRef}></canvas>;
};

export default Canvas;
