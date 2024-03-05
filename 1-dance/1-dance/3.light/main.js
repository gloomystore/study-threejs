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

import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls" // 궤도 컨트롤

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 적용
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  100 //far
)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5

// 바닥
const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
  side: THREE.DoubleSide,
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: "#fff" })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.castShadow = true
boxMesh.receiveShadow = true
boxMesh.position.y = 0.5
scene.add(boxMesh)

// DirectionalLight 직사광선 - 태양빛
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// directionalLight.castShadow = true
// directionalLight.position.set(3, 4, 5)
// directionalLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
// scene.add(directionalLight)
// // 라이트헬퍼
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1) // 라이트, 사이즈
// scene.add(directionalLightHelper)

// 앰비언트 라이트 - 모든곳에서 동일한 밝기 - 그림자 존재 불가
// const ambientLight = new THREE.AmbientLight(0xffffff, 5)
// scene.add(ambientLight)

// 헤미스페어 라이트 - 반으로 자른 무드등 느낌
// const hemispherelLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5)
// hemispherelLight.castShadow = true
// hemispherelLight.position.set(0, 1, 0)
// hemispherelLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
// scene.add(hemispherelLight)
// const hemispherelLightHelper = new THREE.HemisphereLightHelper(
//   hemispherelLight,
//   1
// )
// scene.add(hemispherelLightHelper)

// 포인트라이트 - 무드등
// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4) // 색깔, 빛의 강도, 어디까지 도달할지, 어디까지 도달할지, 거리에 따라 얼마나 약해지는지
// pointLight.castShadow = true
// pointLight.position.set(1, 1, 1)
// pointLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(
//   pointLight,
//   1
// )
// scene.add(pointLightHelper)

// rect area 라이트 - 그림자를 만들지 못함
//0, 1, 2에 위치해서 0,0,0 을 향해 빛을 내뿜고 있음, 판의 가로 세로가 2,2임
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2) // 색깔, 빛의 강도, 가로, 세로
// rectAreaLight.position.set(0, 1, 2)
// scene.add(rectAreaLight)

// 스포트 라이트 - 타겟이라는걸 설정해줘야 방향을 바라보게 만들 수 있음
// 0,3,0 에 위치하며, 타겟인 1,0,2를 바라보는 빛을 쏨
const targetObj = new THREE.Object3D()
scene.add(targetObj)
const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI/4, 1, 1) // 색깔, 인텐시티, 거리, 앵글 - 조명 퍼지는 각도, 페넘브라 - 빛이 끝나는 부분의 경계를 smooth하게 하는 정도, decay - 거리에 따라 빛이 희미해지는 정도
spotLight.castShadow = true
spotLight.position.set(0, 3, 0)
spotLight.target = targetObj
spotLight.target.position.set(1,0,2)
scene.add(spotLight)
const spotLightHelper = new THREE.SpotLightHelper(
  spotLight
)
scene.add(spotLightHelper)



const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})

let isInterval = false
function render() {
  //  console.log('this', this)
  renderer.render(scene, camera)
  // requestAnimationFrame(render)
  isInterval = true
}
if (!isInterval) setInterval(render, 20)

renderer.render(scene, camera)
