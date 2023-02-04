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
		    -0.5 , -0.5 ,-0.5, //Bottom
		    0.5  , -0.5 ,-0.5, //Bottom
		    0.5  , 0.5  ,-0.5, //Bottom
		    -0.5 , 0.5  ,-0.5, //Bottom
		    -0.5 , -0.5 , 0.5, //Top
		    0.5  , -0.5 , 0.5, //Top
		    0.5  , 0.5  , 0.5, //Top
		    -0.5 , 0.5  , 0.5, //Top

		    -0.5 , -0.5 ,-0.5, //0
		    0.5  , -0.5 ,-0.5, //1
		    0.5  , 0.5  ,-0.5, //2
		    -0.5 , 0.5  ,-0.5, //3
		    -0.5 , -0.5 , 0.5, //4
		    0.5  , -0.5 , 0.5, //5
		    0.5  , 0.5  , 0.5, //6
		    -0.5 , 0.5  , 0.5, //7

		    -0.5 , -0.5 ,-0.5,
		    0.5  , -0.5 ,-0.5,
		    0.5  , 0.5  ,-0.5,
		    -0.5 , 0.5  ,-0.5,
		    -0.5 , -0.5 , 0.5,
		    0.5  , -0.5 , 0.5,
		    0.5  , 0.5  , 0.5,
		    -0.5 , 0.5  , 0.5
		
		];

        this.normals = [];

		//Counter-clockwise reference of vertices
        this.indices = [
			0, 1, 2, //Bottom
			0, 2, 3, //Bottom
			2, 1, 0, //Reversable Bottom
			3, 2, 0, //Reversable Bottom
			4, 5, 6, //Top
			4, 6, 7, //Top
			6, 5, 4, //Reversable Top
			7, 6, 4, //Reversable Top
			0, 1, 5, //Lateral 1
			0, 5, 4, //Lateral 1
			5, 1, 0, //Reversable Lateral 1
			4, 5, 0, //Reversable Lateral 1
			1, 2, 6, //Lateral 2
			1, 6, 5, //Lateral 2
			6, 2, 1, //Reversable Lateral 2
			5, 6, 1, //Reversable Lateral 2
			2, 3, 7, //Lateral 3
			2, 7, 6, //Lateral 3
			7, 3, 2, //Reversable Lateral 3
			6, 7, 2, //Reversable Lateral 3
			3, 0, 4, //Lateral 4
			3, 4, 7, //Lateral 4
			4, 0, 3, //Reversable Lateral 4
			7, 4, 3 //Reversable Lateral 4
		];

        for(var i=0;i<8;i++) {
            if(this.vertices[i*3]<0) this.normals.push(-1,0,0);
            else this.normals.push(1,0,0);
        }
        for(var i=0;i<8;i++) { 
            if(this.vertices[i*3+1]<0) this.normals.push(0,-1,0);
            else this.normals.push(0,1,0);
        }
        for(var i=0;i<8;i++) {
            if(this.vertices[i*3+2]<0) this.normals.push(0,0,-1);
            else this.normals.push(0,0,1);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    updateBuffers(complexity){
		this.initBuffers();
        this.initNormalVizBuffers();
    }
}

