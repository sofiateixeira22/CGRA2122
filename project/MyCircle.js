import { CGFobject } from "../lib/CGF.js";
/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Reference to number of slices
 */

export class MyCircle extends CGFobject {
    constructor(scene, slices, coords) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
        if (coords != undefined)
			this.updateTexCoords(coords);
    }

    initBuffers() {
        this.vertices = [];
	    this.indices = [];
	    this.normals = [];
	    this.texCoords = [];

        var angle = (2*Math.PI)/this.slices;

	    for (let i = 0 ; i < this.slices ; i++) {

		    this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), 0);
		    this.vertices.push(Math.cos(angle * (i + 1)), Math.sin(angle * (i + 1)), 0);
		    this.vertices.push(0, 0, 0);

		    this.indices.push((this.vertices.length / 3) - 3, (this.vertices.length / 3) - 2, (this.vertices.length / 3) - 1);

		    this.normals.push(0,0,1,
						  0,0,1,
						  0,0,1);

		    this.texCoords.push(0.5+Math.cos(angle * i)/2, 0.5 - Math.sin(angle * i)/2);
		    this.texCoords.push(0.5+Math.cos(angle * (i+1))/2,0.5 - Math.sin(angle * (i+1))/2);
		    this.texCoords.push(0.5,0.5);
            
            this.primitiveType = this.scene.gl.TRIANGLES;
		    this.initGLBuffers();
	    }
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}