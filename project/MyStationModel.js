import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
/**
 * MyStationModel
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyStationModel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.platform = new MyUnitCubeQuad(this.scene);
        this.wall = new MyUnitCubeQuad(this.scene);
        this.roofQuad = new MyQuad(this.scene);
        this.roofTriangle = new MyTriangle(this.scene);
        this.roofUnitCube = new MyUnitCubeQuad(this.scene);

        this.treeBase = new MyCylinder(this.scene, 24);
        this.treeLeafs = new MySphere(this.scene, 24, 24);

        this.textures = new Array();
        this.texturesNames = new Array();

        this.initTextures();

    }

    initTextures() {
        this.textures = [
            'images/station_textures/roof.jpg',
            'images/station_textures/platform.jpg',
            'images/station_textures/walls2.jpg',
            'images/station_textures/flowers.jpg',
            'images/station_textures/tree.jpg'
        ];

        this.texturesNames = [
            'roofJPG',
            'platformJPG',
            'wallsJPG',
            'flowersJPG',
            'treeJPG'
        ];

        for(let i = 0; i < this.textures.length; i++) {
            this.texturesNames[i] = new CGFappearance(this.scene);
            this.texturesNames[i].setAmbient(1, 1, 1, 1);
            this.texturesNames[i].setDiffuse(1, 1, 1, 1);
            this.texturesNames[i].setSpecular(1, 1, 1, 1);
            this.texturesNames[i].setShininess(10.0);
            this.texturesNames[i].loadTexture(this.textures[i]);
		    this.texturesNames[i].setTextureWrap('REPEAT', 'REPEAT');
        }
    }

    display() {

        this.texturesNames[1].apply();

        this.scene.pushMatrix();
        this.scene.scale(10, 0.5, 5);
        this.platform.display();
        this.scene.popMatrix();

        this.texturesNames[2].apply();

        this.scene.pushMatrix();
        this.scene.translate(-1, 1.5, 0);
        this.scene.scale(5, 3, 2.5);
        this.wall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5, 1, -0.25);
        this.scene.scale(2, 2, 2);
        this.wall.display();
        this.scene.popMatrix();

        this.texturesNames[0].apply();

        this.scene.pushMatrix();
        this.scene.translate(-1, 3.5, 0.75);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(5, 2.2, 0);
        this.roofQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 3.5, -0.75);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(5, 2.2, 0);
        this.roofQuad.display();
        this.scene.popMatrix();

        this.roofTriangle.texCoords = [
			0, 0,
			0.5, 0.5,
			1, 0
		];
		
		this.roofTriangle.updateTexCoordsGLBuffers();

        this.scene.pushMatrix();
        this.scene.translate(1.51, 2.8 ,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.roofTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3.51, 2.8 ,0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.roofTriangle.display();
        this.scene.popMatrix();

        this.texturesNames[3].apply();

        this.scene.pushMatrix();
        this.scene.translate(2.5, 2, -0.25);
        this.scene.scale(2, 0.2, 2);
        this.roofUnitCube.display();
        this.scene.popMatrix();

        //tree

        this.scene.pushMatrix();
        this.scene.translate(4, 1.25, 1.5);
        this.scene.scale(0.5, 0.5, 0.5);
        this.treeLeafs.display();
        this.scene.popMatrix();
        
        this.texturesNames[4].apply();

        this.scene.pushMatrix();
        this.scene.translate(4, 0.25, 1.5);
        this.scene.scale(0.15, 1, 0.15);
        this.treeBase.display();
        this.scene.popMatrix();

    }
}