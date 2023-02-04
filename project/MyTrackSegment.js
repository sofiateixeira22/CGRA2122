import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
/**
 * MyTrackSegment
 * @constructor
 * @param scene - Reference to MyScene object
 * @param p0 - Reference to point O
 * @param p1 - Reference to point 1
 */

export class MyTrackSegment extends CGFobject {
    constructor(scene, p0, p1) {
        super(scene);
        this.p0 = {x: p0.x, z: p0.z};
        this.p1 = {x: p1.x, z: p1.z};

        this.angle = Math.atan2(this.p1.z - this.p0.z, this.p1.x - this.p0.x);

        let x = this.p1.x - this.p0.x;
        let z = this.p1.z - this.p0.z;
        this.dist = Math.sqrt(x*x + z*z);

        this.plane = new MyPlane(this.scene, 2, 0, this.dist, 0, 1);

        this.trackPNG = new CGFappearance(this.scene);
        this.trackPNG.setAmbient(1, 1, 1, 1);
        this.trackPNG.setDiffuse(1, 1, 1, 1);
        this.trackPNG.setSpecular(1, 1, 1, 1);
        this.trackPNG.setShininess(10.0);
        this.trackPNG.loadTexture('images/tracks.png');
		this.trackPNG.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.trackPNG.apply();
        
        this.scene.pushMatrix();
        
        this.scene.translate(this.p0.x, 0, this.p0.z);
        this.scene.rotate(-this.angle, 0, 1, 0);
        this.scene.scale(this.dist, 1, 1);
        this.scene.translate(0.5, 0.1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.plane.display();
        this.scene.popMatrix();
    }

}