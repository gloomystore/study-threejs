/*
OrbitControls - 궤도 컨트롤 - 마치 전자렌지 같은 움직임
FlyControls - 마치 날아가는 새 혹은 비행기의 시야
FirstPersonControls - 1인칭 인간 시점
PointerLockControls - 배그같은 fps. esc로 락을 해제하기 전까지 포인터가 잠김
TrackballControls - OrbitControls와 비슷하지만, 카메라의 궤도가 더 자유로움

*/

import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls" // 궤도 컨트롤
import { FlyControls } from "three/examples/jsm/controls/FlyControls" // 플라이 컨트롤
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls" // 1인칭 컨트롤
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls" // 포인터 락 컨트롤
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls" // 트랙 볼 컨트롤

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

// 오빗 컨트롤
// const orbitControls = new OrbitControls(camera, renderer.domElement)
// orbitControls.enableDamping = true // 움직임을 멈춰도 가속으로 움직임
// orbitControls.dampingFactor = 0.03 // 값이 작아질 수록 더 많이 움직이다 멈춤
// orbitControls.enableZoom = true // 줌 - 기본 true
// orbitControls.enablePan = false // 마우스 오른쪽, 손가락 두개로 카메라 움직임 - 기본 true
// orbitControls.enableRotate = true // 회전 - 기본 true
// orbitControls.autoRotate = false // 자동 회전 - 기본 false
// orbitControls.autoRotateSpeed = 2 // 자동 회전 속도 - 기본 2

// orbitControls.maxPolarAngle = Math.PI / 2 // 최대 수직 회전 반경, 90도. - 기본 Math.PI
// orbitControls.maxAzimuthAngle = Math.PI / 2 // 최대 수평 회전 반경, 90도. - 기본 Math.PI
// orbitControls.minAzimuthAngle = - (Math.PI / 2) // 최대 수평 회전 반경, 90도. - 기본 Math.PI

// 플라이 컨트롤 - 반드시 애니메이션프레임 안에 업데이트를 시켜줘야 작동함
// const flyControls = new FlyControls(camera, renderer.domElement)
// flyControls.movemntSpeed = 1 // 움직임을 멈춰도 가속으로 움직임
// flyControls.rollSpeed = Math.PI / 10 // 움직임을 멈춰도 가속으로 움직임
// flyControls.autoForward = false // 움직임을 멈춰도 가속으로 움직임

// 1인칭 시점 컨트롤 - 반드시 애니메이션프레임 안에 업데이트를 시켜줘야 작동함
// camera.position.set(0,1,5)
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement)
// firstPersonControls.lookSpeed = 0.4 // 카메라의 회전 속도
// firstPersonControls.movementSpeed = 1.5 // 카메라의 이동속도
// firstPersonControls.lookVertical = true // 카메라의 이동속도

// 포인터 락 컨트롤 - FPS 게임 - 클릭과 esc로 빠져나오기 가능. 클릭 말고 다른 이벤트 넣어도 됨
// const pointerLockControls = new PointerLockControls(camera, renderer.domElement)
// window.addEventListener("click", () => {
//   pointerLockControls.lock()
// })

// 트랙볼 컨트롤
const trackballControls = new TrackballControls(camera, renderer.domElement)
trackballControls.rotateSpeed = 25 // 회전 속력
trackballControls.zoomSpeed = 1.5 // 줌 속도
trackballControls.panSpeed = 0.5 // 회전 스피드
trackballControls.noRotate = false  // 회전 막기 - 기본 false
trackballControls.noZoom = false // 줌 막기 - 기본 false
trackballControls.noPan = false // 카메라 회전 막기 - 기본 false
trackballControls.staticMoving = false // 댐핑 없는 움직임 활성화 할지 - false면 댐핑을 하겠다
trackballControls.dynamicDampingFactor = 0.05 // 오빗 컨트롤의 댐핑 팩터와 비슷함

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({color: '#0000ff'})
)
target.position.set(4, 0.5 ,0)
scene.add(target)
trackballControls.target = target.position



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
  // orbitControls.update()
  // flyControls.update(clock.getDelta())
  // firstPersonControls.update(clock.getDelta())
  trackballControls.update()
  isInterval = true
}
if (!isInterval) setInterval(render, 20)

renderer.render(scene, camera)
