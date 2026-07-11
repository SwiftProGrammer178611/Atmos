import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  )
const renderer = new THREE.WebGLRenderer(
  {
    //helps remove jagged edges
    antialias: true
  }
)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

//creating the sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50), 
  new THREE.ShaderMaterial({
    //color: 0xFF0000
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/images.jpeg')
      }
    }
  })
)
scene.add(sphere)
camera.position.z = 15 

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()