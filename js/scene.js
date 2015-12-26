if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, cameraControls, scene, renderer, mesh;
var group;
var clock = new THREE.Clock();

init();
animate();


function init() {
    
    // renderer setup
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth*1.4, window.innerHeight*1.4);

    container = document.getElementById('container3');
    container.appendChild(renderer.domElement);

    // camera setup
    camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera1.position.z = 800;

    cameraControls = new THREE.OrbitControls(camera1, renderer.domElement);
    cameraControls.target.set(0, 0, 0);

    scene = new THREE.Scene();

    //light setup
    
    var light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(5,3,5);
    scene.add(light);

    light = new THREE.AmbientLight(0x333333);
    scene.add( light );
    light = new THREE.AmbientLight(0x333333);
    scene.add( light );
    light = new THREE.AmbientLight(0x333333);
    scene.add( light );

    material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 'black'
    });

    group = new THREE.Object3D();
    
    // load mesh of sphere
    group.add(new THREE.Mesh(
                new THREE.SphereGeometry(200, 40, 40),
                    new THREE.MeshPhongMaterial({
                        map: THREE.ImageUtils.loadTexture('earth2.jpg'),
                        bumpMap: THREE.ImageUtils.loadTexture('bump.jpg'),
                        bumpScale:   0.005,
                        specularMap: THREE.ImageUtils.loadTexture('water.png'),
                        specular: new THREE.Color('grey')      })
    ));
    
    // load boxes, the list stands for the coordinates where the boxes should go and their sizes. They are created in a for loop.
    
    boxList = [/*NA*/[56, -30, 140, 140],[180, 0, 140, 142],/*SA*/[40, 120, -50, 152],[45, 90, -50, 172],/*AF*/[100,185,0,-76],[20,170,0,-105],
    /*EU*/[66,134,148,-12],[195, 125,148,-50],/*AS*/[400,0,120,-160],[225,-30,120,-157],/*AU*/[1,-140,-85,-115],[2,-110,-85,-144]];
    
    for (var i = 0; i <= boxList.length-1; i++) {
        console.log(boxList);
        var box = new THREE.BoxGeometry( 20, 20, boxList[i][0]);
        if (i % 2 === 0) {
            Boxmaterial = new THREE.MeshBasicMaterial( {color: 0xD1240C} );
        } else {
            Boxmaterial = new THREE.MeshBasicMaterial( {color: 0x013584} );
        }
       
        var cube = new THREE.Mesh( box, Boxmaterial );
        cube.position.x = boxList[i][1];
        cube.position.y = boxList[i][2];
        cube.position.z = boxList[i][3];
        cube.lookAt(new THREE.Vector3(0,0,0));
        group.add( cube );
    }

    window.addEventListener( 'resize', onWindowResize, false );
    scene.add(group);

}


function onWindowResize() {
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        renderer.setSize( window.innerWidth*1.4, window.innerHeight*1.4);
        render();

}

function animate() {
        var delta = clock.getDelta();
        requestAnimationFrame(animate);
        cameraControls.update(delta);
        
        // insta rotate. If the variable "rotate" is 0 it spins it fast if not it gradually slows it down.
        group.rotation.y -= rotationspeed/3;
        if (rotate && (rotationspeed>=0.002)){
           rotationspeed -= 0.003;
        } else if (!rotate) {
            rotationspeed = 0.4;
            rotate = 1;
        }

        renderer.render(scene, camera1);       
}