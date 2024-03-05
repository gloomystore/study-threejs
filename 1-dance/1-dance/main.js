/*
포인터 - 클릭한 컨트롤?
*/

import "./style.css"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls" // 궤도 컨트롤

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 적용
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
// floor.castShadow = true
floor.name = 'FLOOR'
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
action.setDuration(8) // 재생 빈도 - 속도
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

const newPosition = new THREE.Vector3(0, 1, 0)

// 레이캐스터
const rayCaster = new THREE.Raycaster()
renderer.domElement.addEventListener('pointerdown', (e) => {
  // three.js에서는 중앙이 0,0이고, 최상단 좌측이 -1,1, 최하단 우측이 1, -1임
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = (e.clientY / window.innerHeight) * 2 - 1

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera) // Vector2...?? raycaater를 스크린에 쏠 준비가 되었음
  const intersects = rayCaster.intersectObjects(scene.children) // 탐지를 원하는 후보군
  // console.log('intersects', intersects) 
  /*
    x: -7.242626579573399
    y: 1.755842227835285e-15  - 약 0
    z: -7.907610403000371
    이정도의 레이캐스터가 관통했다.
  */
 
  // 배열이니깐 find로 rayCaster가 관통하는 요소만 찾아서 console로 출력 가능
  const intersectFloor = intersects.find(i => i.object.name === 'FLOOR')
  console.log('intersectFloor', intersectFloor)

  // 매 클릭 시 마다 캐릭터의 움직임을 잠시 멈추고 클릭한 곳으로 서서히 움직이는 기능 구현
  newPosition.copy(intersectFloor.point) // newPosition(0, 1, 0) 에 내가 클릭한 지점의 좌표로 바꿔버리겠다는 의미
  newPosition.y = 1
})


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})

const clock = new THREE.Clock()
const targetVector = new THREE.Vector3()

let isInterval = false
function render() {

  character.lookAt(newPosition)
  targetVector.subVectors(newPosition, character.position) // 타겟벡터에는 newPosition과 캐릭터의 포지션을 뺀 벡터를 할당
  .normalize() // 정규화 - 위 벡터의 크기를 1로 만듦 - 벡터의 크기를 작은 단위로 쪼갬
  .multiplyScalar(0.01) // 벡터의 방향은 건드리지 않고, 크기만 0.01배 - 벡터의 크기가 normalize한 1이 아닌, 0.01배로 잘게 쪼갬

  // 클릭한 곳과 캐릭터의 위치 차이가 1 이상이라고 잡았는데, 0.1이나 0.01로 잡으면 더 정교하게 좌표 이동이 가능.
  // 허나 너무 작게 하면 컴퓨터가 캐릭터가 클릭한 곳의 좌표와 완전 일치한 것으로 인지하지 않아서 무한 루프에 빠질 수 있음
  if(Math.abs(character.position.x - newPosition.x) >= 1 || Math.abs(character.position.z - newPosition.z) >= 1) {
    character.position.x += targetVector.x
    character.position.z += targetVector.z
    action.stop()
  }
  action.play()


  renderer.render(scene, camera)
  // requestAnimationFrame(render)
  orbitControls.update()
  if(mixer) mixer.update(clock.getDelta()) // 움직임 업데이트
  isInterval = true
}
if (!isInterval) setInterval(render, 20)

renderer.render(scene, camera)
