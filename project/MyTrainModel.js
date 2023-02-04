import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
import { MyContainer } from "./MyContainer.js";
import { MyCrane } from "./MyCrane.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
/**
 * MyTrainModel
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTrainModel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.wheel = new MyCylinder(this.scene, 24);
        this.wheel_cover = new MyCircle(this.scene, 24);

        this.body_base = new MyUnitCubeQuad(this.scene);
        this.body_cylinder = new MyCylinder(this.scene, 24);
        this.body_sphere = new MySphere(this.scene, 24, 24);
        this.cabin = new MyUnitCubeQuad(this.scene);
        this.chimney = new MyCylinder(this.scene, 24);

        this.container = new MyContainer(this.scene);

        this.crane = new MyCrane(this.scene);

        this.textures = new Array();
        this.texturesNames = new Array();
        this.initTextures();
    }

    initTextures() {
        this.textures = [
            'images/train_tmp.jpg',
            'images/train_textures/cylinder_texture.jpg',
            'images/train_textures/chimney_texture.jpg',
            'images/train_textures/wheels_texture.jpg',
            'images/train_textures/body_texture.jpg',
            'images/train_textures/rope_texture.png'
        ];

        this.textures_names = [
            'traintmp',
            'body_cylinderJPG',
            'chimneyJPG',
            'wheelsJPG',
            'bodyJPG',
            'ropeJPG'
        ];

        for(let i = 0; i < this.textures.length; i++) {
            this.textures_names[i] = new CGFappearance(this.scene);
            this.textures_names[i].setAmbient(1, 1, 1, 1);
            this.textures_names[i].setDiffuse(1, 1, 1, 1);
            this.textures_names[i].setSpecular(1, 1, 1, 1);
            this.textures_names[i].setShininess(10.0);
            this.textures_names[i].loadTexture(this.textures[i]);
		    this.textures_names[i].setTextureWrap('REPEAT', 'REPEAT');
        }
    }
    
    display() {
        
        this.textures_names[1].apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.scale(1, 1, 3.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.body_cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 3.5);
        this.scene.scale(1, 1, 0.3);
        this.body_sphere.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(0, 4, -1);
        this.crane.display();
        this.scene.popMatrix();
        
        this.textures_names[2].apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 3.7, 2.5);
        this.scene.scale(0.25, 1, 0.25);
        this.chimney.display();
        this.scene.popMatrix();
        
        this.textures_names[3].apply();
        
        for(let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.scene.scale(0.2, 0.75, 0.75);
            if(i==0) this.scene.translate(7.5, 1, 2.5);
            if(i==1) this.scene.translate(7.5, 1, -2.5);
            if(i==2) this.scene.translate(-6.5, 1, 2.5);
            if(i==3) this.scene.translate(-6.5, 1, -2.5);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.wheel.display();
            this.scene.popMatrix();
        }

        for(let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.scene.scale(1, 0.75, 0.75);
            if(i==0) {
                this.scene.translate(1.5, 1, 2.5);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
            }
            if(i==1) {
                this.scene.translate(1.5, 1, -2.5);
                this.scene.rotate(Math.PI/2, 0, 1, 0);
            }
            if(i==2) {
                this.scene.translate(-1.5, 1, 2.5);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
            }
            if(i==3) {
                this.scene.translate(-1.5, 1, -2.5);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
            }
            this.wheel_cover.display();
            this.scene.popMatrix();
        }
    
        this.scene.pushMatrix();
        this.scene.translate(-1.1, 2.5, -3.1);
        this.container.display();
        this.scene.popMatrix();
        
        this.textures_names[4].apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(2.5, 1, 7.5);
        this.body_base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.2, -0.9);
        this.scene.scale(2, 2.5, 1.8);
        this.cabin.display();
        this.scene.popMatrix();
    }
}