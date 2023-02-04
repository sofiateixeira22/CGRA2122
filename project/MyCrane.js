import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
/**
 * MyCrane
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCrane extends CGFobject {
    constructor(scene) {
        super(scene);

        this.body_cylinder = new MyCylinder(this.scene, 24);
        this.sphere = new MySphere(this.scene, 24, 24);
        this.arm_cylinder = new MyCylinder(this.scene, 24);
        this.rope = new MyCylinder(this.scene, 24);

        //rope texture
        this.ropePNG = new CGFappearance(this.scene);
        this.ropePNG.setAmbient(1, 1, 1, 1);
        this.ropePNG.setDiffuse(1, 1, 1, 1);
        this.ropePNG.setSpecular(1, 1, 1, 1);
        this.ropePNG.setShininess(10.0);
        this.ropePNG.loadTexture('images/train_textures/rope_texture.png');
		this.ropePNG.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.25, 2, 0.25);
        this.body_cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.scale(0.5, 0.5, 0.5)
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.25, 2.8, 0.25);
        this.arm_cylinder.display();
        this.scene.popMatrix();

        this.ropePNG.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -1.5, -2.5);
        this.scene.scale(0.1, 3.5, 0.1);
        this.rope.display();
        this.scene.popMatrix();
    }
}