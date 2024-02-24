/*
OrbitControls - 궤도 컨트롤 - 마치 전자렌지 같은 움직임
FlyControls - 마치 날아가는 새 혹은 비행기의 시야
FirstPersonControls - 1인칭 인간 시점
PointerLockControls - 배그같은 fps. esc로 락을 해제하기 전까지 포인터가 잠김
TrackballControls - OrbitControls와 비슷하지만, 카메라의 궤도가 더 자유로움

*/

import "./style.css"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


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
// scene.add(boxMesh)

// DirectionalLight 직사광선 - 태양빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true
directionalLight.position.set(3, 4, 5)
directionalLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
scene.add(directionalLight)
// 라이트헬퍼
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1) // 라이트, 사이즈
// scene.add(directionalLightHelper)

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

const gltfLoader = new GLTFLoader()
const gltf = await gltfLoader.loadAsync('/dancer.glb')
console.warn('gltf', gltf)
const character = gltf.scene
const animationClips = gltf.animations
character.position.y = 0.8
character.scale.set(0.01, 0.01, 0.01)

// const recursive = (obj) => {
//   const child = obj.children
//   if(child) {
//     for(let i of child) {
//       i.castShadow = true
//       i.receiveShadow = true
//       const childs = i.children
//       if(childs) {
//         for(let e of child) {
//           recursive(e)
//         }
//       }
//     }
//   }
// }
// recursive(character)

// traverse - 위 재귀함수를 간단하게 해결해줌
character.traverse(obj => {
  if(obj.isMesh) {
    obj.castShadow = true
    obj.receiveShadow = true
  }
})
scene.add(character)

// 애니메이션 실행 - 재귀함수에 if(mixer) mixer.update(clock.getDelta()) 계속 업데이트 해야함
const mixer = new THREE.AnimationMixer(character)
const action = mixer.clipAction(animationClips[3])
action.setLoop(THREE.LoopPingPong) // LoopRepeat - default, LoopOnce, LoopPingPong
action.setDuration(3) // 재생 빈도 - 속도
action.setEffectiveWeight(2) // 숫자가 낮으면 대충 움직임
action.play()

// 애니메이션 정지
// setTimeout(() => {
//   mixer.clipAction(animationClips[3]).paused = true
// }, 1000)













// 오빗 컨트롤
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true // 움직임을 멈춰도 가속으로 움직임
orbitControls.dampingFactor = 0.03 // 값이 작아질 수록 더 많이 움직이다 멈춤

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})
const clock = new THREE.Clock()
let isInterval = false
function render() {
  //  console.log('this', this)
  renderer.render(scene, camera)
  // requestAnimationFrame(render)
  orbitControls.update()
  if(mixer) mixer.update(clock.getDelta())
  isInterval = true
}
if (!isInterval) setInterval(render, 20)

renderer.render(scene, camera)
