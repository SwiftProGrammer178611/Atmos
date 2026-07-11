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


const dropDown = document.querySelector("#planets")
let imgPlanet = ''
dropDown.addEventListener('change', function() {
  const selectVal = this.value

  if(selectVal === "mercury"){
    imgPlanet = "./img/mercury.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x8c8c8c)
  }

  if(selectVal === "venus"){
    imgPlanet = "./img/venus.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set()
  }

  if(selectVal === "earth"){
    imgPlanet = "./img/Earth.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "mars"){
    imgPlanet = "./img/mars.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "jupiter"){
    imgPlanet = "./img/jupiter.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "saturn"){
    imgPlanet = "./img/saturn.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  if(selectVal === "uranus"){
    imgPlanet = "./img/uranus.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d88ff)
  }

  if(selectVal === "neptune"){
    imgPlanet = "./img/neptune.jpeg"
    atmosphere.material.uniforms.uAtmosphereColor.value.set(0x4d99ff)
  }

  sphere.material.uniforms.globeTexture.value = new THREE.TextureLoader().load(`${imgPlanet}`)
})

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
        value: new THREE.TextureLoader().load(`./img/${imgPlanet}`)
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