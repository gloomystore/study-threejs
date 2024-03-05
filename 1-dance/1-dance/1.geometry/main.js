
/*
카메라
1. perspective camera
원근감을 가진, 가까이 있는건 크고 멀리 있는건 작아지는 카메라
2. orthography camera
원근감이 없고 다들 동일한 크기의 카메라

본 강의에서 사용해볼 것
1. perspective camera
절도체: 카메라의 시야에 해당하는 가상의 도형
ㄴ near: 가까운 평면
ㄴ far: 먼 평면
ㄴ fov (field of view): 세로 각도, 시야각
ㄴ aspect: 촬영하는 장면의 종횡비, 가로와 세로의 비율

near보다 가깝거나 far보다 먼 물체는 보여주지 않는 것이 perspective camera

*/

import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' // 궤도 컨트롤

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.shadowMap.enabled = true // 그림자 적용
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
 60, // fov
 window.innerWidth / window.innerHeight, // aspect
 0.1, // near
 100, //far
)
camera.position.y = 1
camera.position.z = 5

const directionalLight = new THREE.DirectionalLight(0xffffff, 5) // DirectionalLight 직사광선 - 태양빛
directionalLight.castShadow = true
directionalLight.position.set(3, 4, 5)
directionalLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
scene.add(directionalLight)

const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)


//box
const geometry = new THREE.BoxGeometry(1, 1, 1) // width, height, depth // 지오메트리 = 골격
const material = new THREE.MeshStandardMaterial({color: 0xff0000}) // MeshBasicMaterial 이외에는 조명이 없으면 안보임
const mesh = new THREE.Mesh(geometry, material) // geometry, material 인자 필요
mesh.position.y = 0.5
mesh.castShadow = true
scene.add(mesh)

// 캡슐
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30) // radius반지름, length높이 길이, capSegments, RadialSegments
const capsuleMaterial = new THREE.MeshStandardMaterial({color: 0xffff00})
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsuleMesh.position.set(3, 1.75, 0)
capsuleMesh.castShadow = true
capsuleMesh.receiveShadow = true
scene.add(capsuleMesh)

// 실린더
// const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 64, 32, true) // 윗면반지름, 밑면 반지름, 높이, RadialSegments , height segments, open ended
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2) // 윗면반지름, 밑면 반지름, 높이, RadialSegments , height segments, open ended
const cylinderMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00})
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinderMesh.position.set(-3, 1, 0)
cylinderMesh.castShadow = true
cylinderMesh.receiveShadow = true
scene.add(cylinderMesh)

// 도너츠, 토러스 지오메트리
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI * 2) // radius, tube굵기, radialSegments, tubelarSegments, arc
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff})
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
torusMesh.position.set(0, 0.5, 1)
torusMesh.castShadow = true
torusMesh.receiveShadow = true
scene.add(torusMesh)

// 별모양 shapeGeometry
const starShape = new THREE.Shape() // lineTo -> lineTo -> lineTo로 계속 그리는 모양
starShape.moveTo(0, 1)
starShape.lineTo(0.2, 0.2)
starShape.lineTo(1, 0.2)
starShape.lineTo(0.4, -0.1)
starShape.lineTo(0.6, -1)
starShape.lineTo(0, -0.5)
starShape.lineTo(-0.6, -1)
starShape.lineTo(-0.4, -0.1)
starShape.lineTo(-1, 0.2)
starShape.lineTo(-0.2, 0.2)
const shapeGeometry = new THREE.ShapeGeometry(starShape)
const shapeMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff})
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial)
shapeMesh.position.set(0, 1, 2)
shapeMesh.castShadow = true
shapeMesh.receiveShadow = true
scene.add(shapeMesh)
// 입체로 만들기
const extrudeSettings = {
  steps: 1, // 클수록 부드러움
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1, 
  bevelSize: 0.3,
  bevelSegments: 100, // 세부
}
const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings)
const extrudeMaterial = new THREE.MeshStandardMaterial({color: 0x0ddaaf})
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial)
extrudeMesh.position.set(2, 1.3, 2)
extrudeMesh.castShadow = true
extrudeMesh.receiveShadow = true
scene.add(extrudeMesh)

// 구 모양, sphereGeometry
const sphereGeometry = new THREE.SphereGeometry(
  1, 
  32, 
  32,
  // Math.PI / 4, 
  // Math.PI / 2,
  // Math.PI / 3,
  // Math.PI / 2,
  ) // 반지름, widthSeg, heightSeg
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xeadead})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.set(0, 1, -3)
shapeMesh.castShadow = true
shapeMesh.receiveShadow = true
scene.add(sphereMesh)

// 점
const numPoints = 1000
const positions = new Float32Array(numPoints * 3)
for(let i=0;i<numPoints;i+=1) {
  const x = (Math.random() - 0.5) * 1
  const y = (Math.random() - 0.5) * 1
  const z = (Math.random() - 0.5) * 1
  // * 1 의미 없는 듯...?

  positions[i*3] = x
  positions[i*3 + 1] = y
  positions[i*3 + 2] = z
}

const bufferGeometry = new THREE.BufferGeometry() // gpu를 조금 더 많이 사용함
bufferGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.05,
})

const point = new THREE.Points(bufferGeometry, pointsMaterial)
point.position.set(-1.5, 0.5, 0)
scene.add(point)


const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

window.addEventListener('resize', () => {
 renderer.setSize(window.innerWidth, window.innerHeight)
 camera.aspect = window.innerWidth/window.innerHeight
 camera.updateProjectionMatrix()
 renderer.render(scene, camera)
})

function render(){
//  console.log('this', this)
 renderer.render(scene, camera)
 requestAnimationFrame(render)
}

render()

renderer.render(scene, camera)