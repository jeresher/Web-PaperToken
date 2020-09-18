import * as THREE from 'three';
import star from "../Assets/star.png";

class Background {

    constructor() {
        this.scene = new THREE.Scene();
    }

    start() {
        let scene = this.scene;
        let camera, renderer, id, starGeo, stars;

        camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI/2;
        
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
      
        starGeo = new THREE.Geometry();
        for(let i=0;i<6000;i++) {
            let star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
          );
          star.velocity = 0;
          star.acceleration = 0.02;
          starGeo.vertices.push(star);
        }
      
        let sprite = new THREE.TextureLoader().load(star);
        let starMaterial = new THREE.PointsMaterial({
          color: 0xaaaaaa,
          size: 0.7,
          map: sprite
        });
      
        stars = new THREE.Points(starGeo,starMaterial);
        this.scene.add(stars);
      
        if (id) cancelAnimationFrame(id);
      
        var animate = function () {
          starGeo.vertices.forEach(p => {
            p.velocity += p.acceleration
            p.y -= p.velocity;
            
            if (p.y < -200) {
              p.y = 200;
              p.velocity = 0;
            }
          });
          starGeo.verticesNeedUpdate = true; 
          stars.rotation.y +=0.002;
          id = requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
      
        animate();
    }

    end() {
        let scene = this.scene;

        scene.remove(scene.children[0]);

        /*
        while(scene.children.length > 0){ 
            this.end(scene.children[0])
            scene.remove(scene.children[0]);
        }
        */

        if(scene.geometry) scene.geometry.dispose()
        
        if(scene.material){ 
            Object.keys(scene.material).forEach(prop => {
            if(!scene.material[prop])
                return         
            if(scene.material[prop] !== null && typeof scene.material[prop].dispose === 'function')                                  
                scene.material[prop].dispose()                                                        
            })
            scene.material.dispose()
        }
    }
}

export default Background;