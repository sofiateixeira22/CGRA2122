import { CGFappearance, CGFobject } from "../lib/CGF.js";
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
		this.initBuffers();
	}
	initBuffers() {
		this.diamond = new MyDiamond(this.scene);
		this.triangle = new MyTriangle(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.trianglebig1 = new MyTriangleBig(this.scene);
		this.trianglebig2 = new MyTriangleBig(this.scene);
		this.trianglesmall1 = new MyTriangleSmall(this.scene);
		this.trianglesmall2 = new MyTriangleSmall(this.scene);
	}
	enableNormalViz() {
		this.diamond.enableNormalViz();
		this.triangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
		this.trianglebig1.enableNormalViz();
		this.trianglebig2.enableNormalViz();
		this.trianglesmall1.enableNormalViz();
		this.trianglesmall2.enableNormalViz();
	}
	disableNormalViz() {
		this.diamond.disableNormalViz();
		this.triangle.disableNormalViz();
		this.parallelogram.disableNormalViz();
		this.trianglebig1.disableNormalViz();
		this.trianglebig2.disableNormalViz();
		this.trianglesmall1.disableNormalViz();
		this.trianglesmall2.disableNormalViz();
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

		this.scene.customMaterial.apply();
		
		this.diamond.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1, -0.5, 0);
		this.scene.rotate(Math.PI, 0, 0, 1);

		this.color = new CGFappearance(this.scene);
		this.color.setAmbient(1, 0.79, 0.85, 1.0);
		this.color.setDiffuse(1, 0.79, 0.85, 1.0);
		this.color.setSpecular(1, 0.79, 0.85, 1.0);
		this.color.setShininess(10.0);
		this.color.apply();

		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);

		this.color = new CGFappearance(this.scene);
		this.color.setAmbient(1, 1, 0, 1.0);
		this.color.setDiffuse(1, 1, 0, 1.0);
		this.color.setSpecular(1, 1, 0, 1.0);
		this.color.setShininess(10.0);
		this.color.apply();

		this.parallelogram.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -1.5, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);

		this.color = new CGFappearance(this.scene);
		this.color.setAmbient(1, 0.6, 0, 1.0);
		this.color.setDiffuse(1, 0.6, 0, 1.0);
		this.color.setSpecular(1, 0.6, 0, 1.0);
		this.color.setShininess(10.0);
		this.color.apply();

		this.trianglebig1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);

		this.color = new CGFappearance(this.scene);
        this.color.setAmbient(0, 0, 1, 1.0);
        this.color.setDiffuse(0, 0, 1, 1.0);
        this.color.setSpecular(0, 0, 1, 1.0);
        this.color.setShininess(10.0);
        this.color.apply();

		this.trianglebig2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.3, -3.2, 0);
		this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);

		this.color = new CGFappearance(this.scene);
        this.color.setAmbient(0.6, 0.2, 0.6, 1.0);
        this.color.setDiffuse(0.6, 0.2, 0.6, 1.0);
        this.color.setSpecular(0.6, 0.2, 0.6, 1.0);
        this.color.setShininess(10.0);
        this.color.apply();

		this.trianglesmall1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1.7, -2.7, 0);
		this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);

		this.color = new CGFappearance(this.scene);
        this.color.setAmbient(1, 0, 0, 1.0);
        this.color.setDiffuse(1, 0, 0, 1.0);
        this.color.setSpecular(1, 0, 0, 1.0);
        this.color.setShininess(10.0);
        this.color.apply();

		this.trianglesmall2.display();
		this.scene.popMatrix();

		// ---- END Primitive drawing section
	}
}
