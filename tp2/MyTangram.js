import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		this.diamond = new MyDiamond(this.scene);
		this.triangle = new MyTriangle(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.trianglebig1 = new MyTriangleBig(this.scene);
		this.trianglebig2 = new MyTriangleBig(this.scene);
		this.trianglesmall1 = new MyTriangleSmall(this.scene);
		this.trianglesmall2 = new MyTriangleSmall(this.scene);
	}
	display() {

		var move_diamond = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			-1.1, 2.4, 0, 1
		];

		// ---- BEGIN Primitive drawing section
		this.scene.pushMatrix();
		this.scene.multMatrix(move_diamond);
		this.diamond.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1, -0.5, 0);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.parallelogram.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -1.5, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.trianglebig1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.trianglebig2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.3, -3.2, 0);
		this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
		this.trianglesmall1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1.7, -2.7, 0);
		this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
		this.trianglesmall2.display();
		this.scene.popMatrix();

		// ---- END Primitive drawing section
	}
}
