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
// renderer.shadowMap.type = THREE.BasicShadowMap // BasicShadowMap - 품질이 가장낮고 성능이 우수함
// renderer.shadowMap.type = THREE.PCFShadowMap // PCFShadowMap - 품질 중간, 성능 중간
renderer.shadowMap.type = THREE.PCFSoftShadowMap // PCFSoftShadowMap - 품질 좋음, 성능 낮음
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
const boxMaterial = new THREE.MeshStandardMaterial({ color: "#ffff00" })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.castShadow = true
boxMesh.receiveShadow = true
boxMesh.position.y = 0.5
scene.add(boxMesh)

// DirectionalLight 직사광선 - 태양빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true
directionalLight.position.set(3, 4, 5)
directionalLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
scene.add(directionalLight)
// 라이트헬퍼
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1) // 라이트, 사이즈
scene.add(directionalLightHelper)

// 셰도우
directionalLight.shadow.mapSize.width = 4096 // 숫자가 높으면 깔끔해짐
directionalLight.shadow.mapSize.height = 4096 // 숫자가 높으면 깔끔해짐

// 셰도우 카메라 - 기본적으로 orthography 시점을 가짐  - 그림자가 원근감을 가지지 않음
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 100


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
