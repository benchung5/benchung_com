var container, stats;

var camera, scene, renderer;

var group, text, plane;

var animation;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var finalRotationY

var clock = new THREE.Clock();
var dae;

var play = false;

var skins = [];

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;

var NEAR = 10, FAR = 999.05;



init();
animate();


$(document).ready(function() {
    //onclick
    jQuery("#start").click(function () {
        play = true;
    });
    jQuery("#stop").click(function () {
        play = false;
    });
});

function init() {
    
        //fadein on page load --------------------------------------------------------//
        //to display loading animation before it's ready
        $(document).ready(function() {
            if ($('.loading-container').length) {
                
                //to show loading animation
                $imgloader = $('.loading-container');
                $loadingimg = $('<div id="canvasloader-container" class="onepix-imgloader"></div>');


//          $loadingimg.attr("src","images/flexslider/loading.gif");
                $imgloader.prepend($loadingimg);

//          canvasloader code
                var cl = new CanvasLoader('canvasloader-container');
                cl.setColor('#4f4f4f'); // default is '#000000'
                cl.setDiameter(45); // default is 40
                cl.setDensity(75); // default is 40
                cl.setRange(0.7); // default is 1.3
                cl.setSpeed(3); // default is 2
                cl.setFPS(22); // default is 24
                cl.show(); // Hidden by default

                $(window).load(function () {
                    $('.onepix-imgloader').fadeOut();
                    // fade in content (using opacity instead of fadein() so it retains it's height.
                    $('.loading-container > *:not(.onepix-imgloader)').fadeTo(8000, 100);

                });
                
            }

        });
    
       //setup camara --------------------------------------------------------//

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 5;
        camera.position.y = 2;
        camera.lookAt(new THREE.Vector3(0,0,0));
        
        
        
        scene = new THREE.Scene();

        group = new THREE.Object3D();

//        load our model and add it to the scene
//        var mesh = onepixLoadStaticJSON('models/ring/ring.js');
//        onepixLoadStaticJSON('models/ground/ground.json');
        onepixLoadSkinnedJSON('models/tube/animated-tube.json');
//        onepixLoadSkinnedCOLLADA('models/tube/animated-tube.dae');
//        onepixLoadScene('scenes/scene.json');


//    group.add(mesh); is in the loader   
        scene.add( group );

        
         //        fog
//        scene.fog = new THREE.Fog( 0x59472b, 1000, FAR );
        scene.fog = new THREE.FogExp2( 0xdfdfdf, 0.04 );

        // renderer

//        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        
        renderer.setClearColor( 0xdfdfdf, 1 );
//        renderer.autoClear = false;
        
        renderer.shadowMapEnabled = true;
//        renderer.shadowMapType = THREE.PCFShadowMap;
//        soft shadowmap version
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        

        
        // lights

        light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
        light.position.set( 0.5, 3, 3 );
        light.target.position.set( 0, 0, 0 );
        
         // cast shadow
        light.castShadow = true;
        light.shadowCameraNear = 1;
        light.shadowCameraFar = 200;
        light.shadowCameraFov = 50;

        //light.shadowCameraVisible = true;

        light.shadowBias = 0.0001;
        light.shadowDarkness = 0.5;

        light.shadowMapWidth = SHADOW_MAP_WIDTH;
        light.shadowMapHeight = SHADOW_MAP_HEIGHT;
        
        scene.add( light );
        
//        secondary light
        
        light = new THREE.DirectionalLight( 0x002288, 1 );
        light.position.set( -1, -1, -1 );
        
        scene.add( light );

        light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );

        container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        document.getElementById( 'debug' ).appendChild( stats.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );
        
        //for debuging stats
        interval = setInterval( debugInfo, 50 );

}

function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;
        
        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;

}

function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;


        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;



}

function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;
                
                mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;
                
                

        }

}

function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;
                
                mouseY = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;

        }

}

//

function animate() {
    
        requestAnimationFrame( animate );


//      update animation
        if (play == true) {
            
            var delta = clock.getDelta();
            
//            for JSON version
              THREE.AnimationHandler.update( delta  );
                
////              for Collada version
////              0.03 makes it more accurate
//                THREE.AnimationHandler.update( delta * 0.03  );
        }
        
//            to animation the object position (move whole model forward)

//            for ( var i = 0; i < skins.length; i ++ ) {
//
//                    var skin = skins[ i ];
//
//                    skin.position.x += delta;
//                    if ( skin.position.x > 200 ) skin.position.x = -200;
//
//            }

        render();
        stats.update();

}

function render() {


     //horizontal rotation   
     group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;
        
     //vertical rotation 
     finalRotationY = (targetRotationY - group.rotation.x); 

    if (group.rotation.x <= 1 && group.rotation.x >= -0.3) {

        group.rotation.x += finalRotationY * 0.1;
    }
    if (group.rotation.x > 1) {

        group.rotation.x = 1
    }
    else if (group.rotation.x < -0.3) {

        group.rotation.x = -0.3
    }

        
        renderer.render( scene, camera );

}


function debugInfo()
{
    $('#debug #mousepos').html("mouseX : " + mouseX + "   mouseY : " + mouseY + "</br>")
   
}