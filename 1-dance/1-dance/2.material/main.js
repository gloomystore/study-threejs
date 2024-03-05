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

const directionalLight = new THREE.DirectionalLight(0xffffff, 5) // DirectionalLight 직사광선 - 태양빛
directionalLight.castShadow = true
directionalLight.position.set(3, 4, 5)
directionalLight.lookAt(0, 0, 0) // 빛이 0, 0, 0을 바라보도록
scene.add(directionalLight)

// 바닥
const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb })
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)

// 상자 바깥만 렌더함
const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1)
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
})
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial)
frontSideMesh.position.set(0, 0.5, 2)
frontSideMesh.castShadow = true
frontSideMesh.receiveShadow = true
scene.add(frontSideMesh)

// 상자 안만 렌더함
const backSideGeometry = new THREE.BoxGeometry(1, 1, 1)
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
})
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial)
backSideMesh.position.set(2, 0.5001, 2) // zFighting - 바닥의 z4와 메쉬의 z4가 겹쳐서 뭘 렌더할지 몰라서 지글지글거림
backSideMesh.receiveShadow = true
scene.add(backSideMesh)

// 상자 밖과 안 둘 다 렌더함. 확대해서 상자 안으로 들어가는게 가능
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1)
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
})
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial)
doubleSideMesh.position.set(4, 0.5001, 2) // zFighting - 바닥의 z4와 메쉬의 z4가 겹쳐서 뭘 렌더할지 몰라서 지글지글거림
// doubleSideMesh.castShadow = true
doubleSideMesh.receiveShadow = true
scene.add(doubleSideMesh)

// 도너츠 토러스
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20)
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
})
torusKnotStandMaterial.roughness = 0.5
torusKnotStandMaterial.metalness = 0.2
const torusKnotStandMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotStandMaterial
)
torusKnotStandMesh.position.set(-4, 1, -2)
torusKnotStandMesh.castShadow = true
torusKnotStandMesh.receiveShadow = true
scene.add(torusKnotStandMesh)

// 도너츠 토러스 재활용 - 램버트 재질의 토러스
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xeadead,
})
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00)
torusKnotLambertMaterial.emissiveIntensity = 0.2
const torusKnotLambertMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial
)
torusKnotLambertMesh.castShadow = true
torusKnotLambertMesh.receiveShadow = true
torusKnotLambertMesh.position.set(-2, 1, -2)
scene.add(torusKnotLambertMesh)

// 도너츠 토러스 재활용 - 퐁 재질의 토러스
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({color: 0xff0000})
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00)
torusKnotPhongMaterial.emissiveIntensity = 0.2
torusKnotPhongMaterial.specular = new THREE.Color(0xeadead)
torusKnotPhongMaterial.shininess = 100
const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry,torusKnotPhongMaterial)
torusKnotPhongMesh.castShadow = true
torusKnotPhongMesh.receiveShadow = true
torusKnotPhongMesh.position.set(0, 1, -2)
scene.add(torusKnotPhongMesh)

// 도너츠 토러스 재활용 - 베이직 재질의 토러스
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry,torusKnotBasicMaterial)
torusKnotBasicMesh.castShadow = true
torusKnotBasicMesh.receiveShadow = true
torusKnotBasicMesh.position.set(2, 1, -2)
scene.add(torusKnotBasicMesh)

// 도너츠 토러스 재활용 - 뎁스 재질의 토러스
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({color: 0xffffff})
torusKnotDepthMaterial.opacity = 0.5
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry,torusKnotDepthMaterial)
torusKnotDepthMesh.castShadow = true
torusKnotDepthMesh.receiveShadow = true
torusKnotDepthMesh.position.set(4, 1, -2)
scene.add(torusKnotDepthMesh)


// 텍스쳐 넣기 - 동기방식
// const textureLoader = new THREE.TextureLoader()
// textureLoader.load('/threejs.webp', (texture) => {
//   const textureBoxGeometry = new THREE.BoxGeometry(1,1,1)
//   const textureMaterial = new THREE.MeshStandardMaterial({
//     map: texture
//   })
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial)
//   textureMesh.castShadow = true
//   textureMesh.receiveShadow = true
//   textureMesh.position.set(0, 0.5, 0)
//   scene.add(textureMesh)
// })

// 텍스쳐 넣기 - 비동기방식
const textureLoader = new THREE.TextureLoader()
const texture = await textureLoader.loadAsync('/threejs.webp')

const textureBoxGeometry = new THREE.BoxGeometry(1,1,1)
const textureMaterial = new THREE.MeshStandardMaterial({
  map: texture
})
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial)
textureMesh.castShadow = true
textureMesh.receiveShadow = true
textureMesh.position.set(0, 0.5, 0)
scene.add(textureMesh)




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
  textureMesh.rotation.y += 0.01
  isInterval = true
}
if(!isInterval) setInterval(render, 20)

renderer.render(scene, camera)
