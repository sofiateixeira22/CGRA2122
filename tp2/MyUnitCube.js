import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,      //0
            0.5, 0.5, -0.5,     //1
            0.5, -0.5, 0.5,     //2
            0.5, -0.5, -0.5,    //3
            -0.5, 0.5, 0.5,     //4
            -0.5, 0.5, -0.5,    //5
            -0.5, -0.5, 0.5,    //6
            -0.5, -0.5, -0.5    //7
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 4, 6, //front
            6, 2, 0, //front
            4, 5, 7, //left
            7, 6, 4, //left
            1, 0, 2, //right
            2, 3, 1, //right
            1, 3, 7, //back
            7, 5, 1, //back
            1, 5, 4, //top
            4, 0, 1, //top
            3, 2, 6, //bottom
            6, 7, 3 //bottom
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

