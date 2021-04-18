import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap6.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// const geometry = new THREE.TorusKnotGeometry( .4, .1, 100, 16 );
const geometry = new  THREE.SphereBufferGeometry(.55, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 2
material.roughness = 0.35
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

//light1
const light1 = gui.addFolder('light1')
const pointLight = new THREE.PointLight(0xff0000, 0.1)
pointLight.position.set(-1, 1, 0)
pointLight.intensity = 1
scene.add(pointLight)

light1.add(pointLight.position, 'x').min(-5).max(5)
light1.add(pointLight.position, 'y').min(-5).max(5)
light1.add(pointLight.position, 'z').min(-5).max(5)
light1.add(pointLight, 'intensity').min(0).max(10)

const lightColor = {
    color: 0x150d93
}
light1.addColor(lightColor, 'color')
    .onChange(() => {
        pointLight.color.set(lightColor.color)
    })

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

//Light2
const light2 = gui.addFolder('light2')
const pointLight2 = new THREE.PointLight(0x96ff , 2)
pointLight2.position.set(2, -2.5, 0)
pointLight2.intensity = 1
scene.add(pointLight2)

light2.add(pointLight2.position, 'x').min(-5).max(5)
light2.add(pointLight2.position, 'y').min(-5).max(5)
light2.add(pointLight2.position, 'z').min(-5).max(5)
light2.add(pointLight2, 'intensity').min(0).max(10)

const light2Color = {
    color: 0xca0f7d
}
light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

//Light3
const light3 = gui.addFolder('light3')
const pointLight3 = new THREE.PointLight(0xffffff , 2)
pointLight3.position.set(0.3, 0.1, 5)
pointLight3.intensity = 0.1
scene.add(pointLight3)

light3.add(pointLight3.position, 'x').min(-5).max(5)
light3.add(pointLight3.position, 'y').min(-5).max(5)
light3.add(pointLight3.position, 'z').min(-5).max(5)
light3.add(pointLight3, 'intensity').min(0).max(10)

const light3Color = {
    color: 0xca0f7d
}
light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0
const windowHlfX = window.innerWidth / 2;
const windowHlfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX =  (event.clientX - windowHlfX)
    mouseY =  (event.clientY - windowHlfY)

}
function updateSphere(event){
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere )

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.x = .5 * elapsedTime
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()