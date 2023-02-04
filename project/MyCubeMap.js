import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.quad = new MyQuad(this.scene);

        this.cube = new CGFappearance(this.scene);
		this.cube.setAmbient(1, 1, 1, 1);
		this.cube.setDiffuse(1, 1, 1, 1);
		this.cube.setSpecular(1, 1, 1, 1);
		this.cube.setShininess(5.0);
		this.cube.setTextureWrap('REPEAT', 'REPEAT');

	}

    setNewTextures(texture) {
		this.back = texture[0];
		this.bottom = texture[1];
		this.front = texture[2];
		this.left = texture[3];
		this.right = texture[4];
		this.top = texture[5];
	}

    textureBack() {
		this.cube.setTexture(this.back);
	}

    textureBottom() {
		this.cube.setTexture(this.bottom);
    }

    textureFront() {
		this.cube.setTexture(this.front);
	}

    textureLeft() {
		this.cube.setTexture(this.left);
	}

    textureRight() {
		this.cube.setTexture(this.right);
	}

    textureTop() {
		this.cube.setTexture(this.top);
	}

    display() {

        this.scene.pushMatrix();
        this.textureRight()
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.textureLeft();
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.textureBack();
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.textureFront();
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.textureTop();
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.textureBottom();
		this.cube.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

    }
}

