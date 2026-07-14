import gsap from 'gsap'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const canvasContainer = document.querySelector('#canvasContainer');





const scene = new THREE.Scene()
const camera = new THREE.
  PerspectiveCamera(
    75,
    canvasContainer.offsetWidth / canvasContainer.offsetHeight,
    0.1,
    1000
  )
const renderer = new THREE.WebGLRenderer(
  {
    //helps remove jagged edges
    antialias: true,
    canvas: document.querySelector('canvas')
  }
)


renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const dropdwnBtn = document.querySelector("#dropdwnBtn")

const dropdwnList = document.querySelector("#dropdwnList")

const selectedLabel = document.querySelector("#selectedLabel")

dropdwnBtn.addEventListener('click', () => {
  dropdwnList.classList.toggle('hidden')
})

dropdwnList.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const selectVal = item.dataset.value
    selectedLabel.textContent = item.textContent
    dropdwnList.classList.add('hidden')
    if(selectVal === "mercury"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3mng660gplKQrmHLOMtEFyj_-S-ZRPXgxNgLZlKP1A&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x8c8c8c)
  }

  if(selectVal === "venus"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjs1xzAo8ak_ew1wQPav4Lrr_57GlaDexA9hl6NKfEnA&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set()
  }

  if(selectVal === "earth"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgsZg-ssT-mLLM0x0zR5fnhWBrla9pSIa3GWJFtwz4Lw&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "mars"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsH5xPsSKHqaXQ3E3ydKUfdB9WdHT9-lpR7xqR01M7g&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "jupiter"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYOxdhvxZq31VOzjr8Xsh76l1d_Zy5ojGXK23muKV0lQ&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "saturn"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP88br8C8jSUeLNUj4jBEglCQo15LZvagKCLNk2AB7Kg&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "uranus"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVDGfu7XhvH-fIGA_5V2Vy8XZW-lYtlpn8IIHRJaLfew&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d88ff)
  }

  if(selectVal === "neptune"){
    imgPlanet = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HiVHq6JSQ5bDk_y5qlOVzxXwGHHw6f6qRG0sbOyZWQ&s=10"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  sphere.material.uniforms.globeTexture.value = new THREE.TextureLoader().load(`${imgPlanet}`)
  })
})

const dropDown = document.querySelector("#planets")
let imgPlanet = ''


const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader, 
    blending: THREE.AdditiveBlending, 
    side: THREE.BackSide,
    uniforms: {
      uAtmosphereColor: {value: new THREE.Color(0x4d99ff)}
    }

  })
)

const startBlank = new THREE.Texture()

//creating the sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50), 
  new THREE.ShaderMaterial({
    //color: 0xFF0000
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: startBlank
      }
    }
  })
)

atmosphere.scale.set(1.1,1.1,1.1)

scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeomtry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color:0xffffff
})

const starVertices = []
for(let i=0;i<10000; i++){
  const x = (Math.random()-0.5) * 2000
  const y = (Math.random()-0.5) * 2000
  const z = -Math.random() * 3000
  starVertices.push(x,y,z)
}
starGeomtry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3 ))
const stars = new THREE.Points(starGeomtry, starMaterial)
scene.add(stars)

camera.position.z = 15 
const mouse = {
  x:undefined,
  y:undefined
}

let isSpaceHeld = false
let autoSpin = false
let lastPress = 0
addEventListener('keydown', (e) =>{
  if(e.code !== 'Space') return
  if(e.repeat ) return

  const now = Date.now()
  if(now-lastPress < 300 ){ autoSpin = !autoSpin}

  lastPress= now
  isSpaceHeld = true
})

addEventListener('keyup', (e) =>{
  if(e.code !== 'Space') return
  isSpaceHeld = false
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  if(autoSpin || isSpaceHeld){
    sphere.rotation.y+= 0.003
  }
  
  gsap.to(group.rotation, {
    x:-mouse.y * 0.3,
    y: mouse.x*0.5,
    duration:2
  })
}

animate()



addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})