import { CGFobject } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
/**
 * MyContainer
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyContainer extends CGFobject {
    constructor(scene) {
        super(scene);

        this.left = new MyUnitCubeQuad(this.scene);
        this.right = new MyUnitCubeQuad(this.scene);
        this.front = new MyUnitCubeQuad(this.scene);
        this.back = new MyUnitCubeQuad(this.scene);
        this.bottom = new MyUnitCubeQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 1, 1.25);
        this.left.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2, 0, 0);
        this.scene.scale(0.1, 1, 1.25);
        this.right.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1, 0, -0.6);
        this.scene.scale(2.25, 1, 0.1);
        this.back.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1, 0, 0.6);
        this.scene.scale(2.25, 1, 0.1);
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1, -0.5, 0);
        this.scene.scale(2.25, 0.1, 1.25);
        this.bottom.display();
        this.scene.popMatrix();
    }
}