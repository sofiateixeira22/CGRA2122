import { CGFscene, CGFaxis, CGFappearance , CGFtexture} from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MyPlane } from "./MyPlane.js";
import { MyTrack } from "./MyTrack.js";
import { MyCircle } from "./MyCircle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
import { MyTrainModel } from "./MyTrainModel.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyAnimatedTrain } from "./MyAnimatedTrain.js";
import { MyStationModel } from "./MyStationModel.js";
/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20, 0,1,0,1);
        this.track = new MyTrack(this);
        this.circle = new MyCircle(this, 6);
        this.cylinder = new MyCylinder(this, 6);
        this.sphere = new MySphere(this, 12, 6);
        this.trainModel = new MyTrainModel(this);
        this.cubeMap = new MyCubeMap(this);
        this.animatedTrain = new MyAnimatedTrain(this, this.track);
        this.stationModel = new MyStationModel(this);

        //Applied Material
        this.earthJPG = new CGFappearance(this);
        this.earthJPG.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthJPG.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthJPG.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthJPG.setShininess(10.0);
        this.earthJPG.loadTexture('images/earth.jpg');
        this.earthJPG.setTextureWrap('REPEAT', 'REPEAT');

        this.planeJPG = new CGFappearance(this);
        this.planeJPG.setAmbient(0.1, 0.1, 0.1, 1);
        this.planeJPG.setDiffuse(0.9, 0.9, 0.9, 1);
        this.planeJPG.setSpecular(0.1, 0.1, 0.1, 1);
        this.planeJPG.setShininess(10.0);
        this.planeJPG.loadTexture('images/demo_cubemap/bottom.png');
        this.planeJPG.setTextureWrap('REPEAT', 'REPEAT');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayPlane = false;
        this.displayTrack = false;
        this.displayCircle = false;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayTrain = false;
        this.selectedTexture = 0;
        this.displayCube = false;
        this.displayAnimatedTrain = false;
        this.displayStation = true;

        this.initCubeTextures();
        this.updateCubeTextures();
    }

    initCubeTextures() {
        this.demoTexture = [
            new CGFtexture(this, 'images/demo_cubemap/back.png'),
            new CGFtexture(this, 'images/demo_cubemap/bottom.png'),
            new CGFtexture(this, 'images/demo_cubemap/front.png'),
            new CGFtexture(this, 'images/demo_cubemap/left.png'),
            new CGFtexture(this, 'images/demo_cubemap/right.png'),
            new CGFtexture(this, 'images/demo_cubemap/top.png')
        ]

        this.testTexture = [
            new CGFtexture(this, 'images/test_cubemap/nx.png'),
            new CGFtexture(this, 'images/test_cubemap/ny.png'),
            new CGFtexture(this, 'images/test_cubemap/px.png'),
            new CGFtexture(this, 'images/test_cubemap/nz.png'),
            new CGFtexture(this, 'images/test_cubemap/pz.png'),
            new CGFtexture(this, 'images/test_cubemap/py.png')
        ]

        this.textures = [this.demoTexture, this.testTexture];
        this.textureIds = { 'Demo': 0, 'Test': 1};
    }

    updateCubeTextures() {
        this.cubeMap.setNewTextures(this.textures[this.selectedTexture]);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(30,30,30), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.animatedTrain.update(t);
    }



    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        if(this.displayPlane) {
            this.planeJPG.apply();
            this.pushMatrix();
            this.scale(50,1,50);
            this.rotate(-Math.PI*0.5, 1,0,0);
            this.plane.display();
            this.popMatrix();
        }

        if(this.displayTrack)
            this.track.display();

        if(this.displayCircle)
            this.circle.display();

        if(this.displayCylinder)
            this.cylinder.display();

        if(this.displaySphere) {
            this.earthJPG.apply();
            this.sphere.display();
        }

        if(this.displayTrain)
            this.trainModel.display();

        if(this.displayCube) {
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cubeMap.display();
            this.popMatrix();
        }

        if(this.displayAnimatedTrain) {
            this.animatedTrain.display();
        }

        if(this.displayStation) {
            this.stationModel.display();
        }

        // ---- END Primitive drawing section
    }
}