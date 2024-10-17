import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

const MouseTrackingBackground = () => {
  let points = [];
  let lastMouseX = 0;
  let lastMouseY = 0;

  // p5 setup function
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.background(0, 0, 0); // Dark background
    p5.noFill();
  };

  // p5 draw function
  const draw = (p5) => {
    p5.background(30, 30, 60, 20); // Fading effect to clear old lines

    // Check if the mouse moved and update points
    if (p5.mouseIsPressed && (p5.mouseX !== lastMouseX || p5.mouseY !== lastMouseY)) {
      lastMouseX = p5.mouseX;
      lastMouseY = p5.mouseY;

      // Add a new point at the current mouse position
      points.push({
        x: p5.mouseX,
        y: p5.mouseY,
        color: p5.color(p5.random(100, 255), p5.random(100, 255), p5.random(100, 255)),
        angle: p5.random(p5.TWO_PI), // Random initial angle for curve direction
        distance: p5.random(20, 40) // Random initial distance for curves
      });
    }

    // Draw each point with curves
    points.forEach((point, index) => {
      p5.stroke(point.color);
      p5.strokeWeight(2);
      let dx = point.distance * p5.cos(point.angle);
      let dy = point.distance * p5.sin(point.angle);

      // Draw a curved line from the previous point to the current point
      if (index > 0) {
        p5.beginShape();
        p5.curveVertex(points[index - 1].x, points[index - 1].y);
        p5.curveVertex(points[index - 1].x, points[index - 1].y);
        p5.curveVertex(point.x + dx, point.y + dy);
        p5.curveVertex(point.x, point.y);
        p5.endShape();
      }

      // Adjust point position towards the mouse
      point.x += (p5.mouseX - point.x) * 0.02;
      point.y += (p5.mouseY - point.y) * 0.02;

      // Update point angle and distance for smoother curves
      point.angle += 0.05;
      point.distance = p5.lerp(point.distance, 0, 0.01);
    });

    // Remove old points to prevent overcrowding
    if (points.length > 100) {
      points.splice(0, 5); // Remove a few oldest points gradually
    }
  };

  // Adjust canvas size on window resize
  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default MouseTrackingBackground;
