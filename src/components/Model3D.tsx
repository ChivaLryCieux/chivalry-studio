"use client";

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  mousePosition: { x: number; y: number };
}

export function Model({ mousePosition }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/lry.glb');
  
  // 存储当前旋转状态
  const currentRotation = useRef({ x: 0, y: 0 });

  // 克隆模型以避免共享状态问题
  const clonedScene = scene.clone();

  useFrame(() => {
    if (modelRef.current) {
      // 定义旋转角度限制
      const maxUpDownRotation = Math.PI / 4; // 45度 = π/4 弧度
      const maxLeftRightRotation = Math.PI / 3; // 60度 = π/3 弧度
      
      // 直接基于鼠标位置计算目标旋转角度
      let targetX = -mousePosition.y * 0.08; // X轴旋转：上下鼠标移动（向下时模型向前）
      let targetY = mousePosition.x * 0.15; // Y轴旋转：左右鼠标移动
      
      // 限制旋转角度范围
      targetX = Math.max(-maxUpDownRotation, Math.min(maxUpDownRotation, targetX));
      targetY = Math.max(-maxLeftRightRotation, Math.min(maxLeftRightRotation, targetY));
      
      // 计算当前旋转与目标的差异
      const diffX = targetX - currentRotation.current.x;
      const diffY = targetY - currentRotation.current.y;
      
      // 应用基于差异的速度（更平滑的跟随）
      const rotationVelocity = { x: diffX * 0.1, y: diffY * 0.1 };
      
      // 更新当前旋转
      currentRotation.current.x += rotationVelocity.x;
      currentRotation.current.y += rotationVelocity.y;
      
      // 添加基础旋转角度，使模型正确面向屏幕
      const baseRotationX = 0; // 向下
      const baseRotationY = -Math.PI / 2; // 向左
      
      // 应用最终旋转
      modelRef.current.rotation.x = currentRotation.current.x + baseRotationX;
      modelRef.current.rotation.y = currentRotation.current.y + baseRotationY;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={clonedScene} 
      scale={[0.3, 0.3, 0.3]} // 调整模型大小
      position={[0, 0.6, 0]} // 居中位置
    />
  );
}

// 预加载模型
useGLTF.preload('/models/lry.glb');