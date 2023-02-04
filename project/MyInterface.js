import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        var fObject = this.gui.addFolder('Objects');
        fObject.add(this.scene, 'displayPlane').name('Display Plane');
        fObject.add(this.scene, 'displayTrack').name('Display Track');
        fObject.add(this.scene, 'displayCircle').name('Display Circle');
        fObject.add(this.scene, 'displayCylinder').name('Display Cylinder');
        fObject.add(this.scene, 'displaySphere').name('Display Sphere');
        fObject.add(this.scene, 'displayTrain').name('Display Train');
        fObject.add(this.scene, 'displayStation').name('Display Station');

        var fCube = this.gui.addFolder('Scenario Config');
        fCube.add(this.scene, 'displayCube').name('Display CubeMap').onChange(this.scene.updateCubeTextures.bind(this.scene));
        fCube.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Cube Texture').onChange(this.scene.updateCubeTextures.bind(this.scene));

        this.gui.add(this.scene, 'displayAnimatedTrain').name('Display Animated Train');

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}