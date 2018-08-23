function onepixLoadTextureMat(path, isSkin) {

    // texture - texture must not be in same folder or there is an error.
    var texture = THREE.ImageUtils.loadTexture(path, {}, function () {
        // use to test when image gets loaded if it does
        render();
    },
            function () {
                alert('error loading texture')
            });

    var skinning = {};
    if (isSkin == true) {
        skinning = {skinning: true};
    }

    return new THREE.MeshPhongMaterial({map: texture}, skinning);
}

function onepixLoadCubeMat(cubePath, shader) {

    var path = cubePath;
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];


    var textureCube = THREE.ImageUtils.loadTextureCube(urls);
    textureCube.format = THREE.RGBFormat;

    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms[ "tCube" ].value = textureCube;

    var parameters = {fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms};
    var attributes = {shading: THREE.FlatShading};
    return new THREE.ShaderMaterial(parameters, attributes);

}

function onepixLoadStaticJSON(path) {

    //        // load JSON model-----------------------------------///
    var loader = new THREE.JSONLoader();

//        loader.load('models/cube.js', modelLoadedCallback);
    $('#debug #loading').html("loading static JSON model");
    loader.load(path, function (geometry, materials) {

        //  create different materials than the ones loaded, align them with incoming material ids
//            materialbasic = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, skinning: true} );
        materialphong = new THREE.MeshBasicMaterial({ color: 0xdfdfdf, skinning: false});
//            materialTexture = onepixLoadTextureMat('textures/texture.jpg', false);

//            var reflectionShader = THREE.ReflectionShader;
//            materialMetal = onepixLoadCubeMat("textures/cube/Escher/", reflectionShader);
//            
//            var fresnelShader = THREE.FresnelShader;
//            materialDiamond = onepixLoadCubeMat("textures/cube/Escher/", fresnelShader );
//            
        var newMaterials = [
//                materialMetal,
            materialphong
        ];


//            var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( newMaterials ) );
        var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(newMaterials));
        mesh.position.set(0, 0, 0);//x,z,y - if you think in blender dimensions ;)

//            enable it to receive shadows
        mesh.castShadow = false;
        mesh.receiveShadow = true;

        group.add(mesh);
        
        $('#debug #loading').html("static JSON model loaded");

    });

}



function onepixLoadSkinnedJSON(path) {

    //        // load JSON model-----------------------------------///
    var loader = new THREE.JSONLoader();

//        loader.load('models/cube.js', modelLoadedCallback);
    loader.load(path, function (geometry, materials) {


        for (var i = 0, il = materials.length; i < il; i++) {

            var originalMaterial = materials[ i ];
            originalMaterial.skinning = true;


//                      originalMaterial.map = THREE.ImageUtils.loadTexture( "obj/lightmap/rocks.jpg" );
//                    originalMaterial.map = undefined;
//                    originalMaterial.shading = THREE.SmoothShading;
//                    originalMaterial.color.setHSL( 0.01, 0.3, 0.3 );
//                    originalMaterial.ambient.copy( originalMaterial.color );
//                    originalMaterial.specular.setHSL( 0, 0, 0.1 );
//                    originalMaterial.shininess = 75;
//
//                    originalMaterial.wrapAround = true;
//                    originalMaterial.wrapRGB.set( 1, 0.5, 0.5 );

        }

//            mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( newMaterials ) );
//            mesh = new THREE.Mesh(geometry, materialTexture);
        var material = new THREE.MeshFaceMaterial(materials);
        var mesh = new THREE.SkinnedMesh(geometry, material, false);

//        enable it to cast shadows
        mesh.castShadow = true;
        mesh.receiveShadow = false;

        group.add(mesh);

        skins.push(mesh);

//              THREE.AnimationHandler.add(geometry.animation);
        animation = new THREE.Animation(mesh, geometry.animations[1]);
        animation.play();
        animation.update(0);


    });


}


function onepixLoadSkinnedCOLLADA(path) {

    //            // load Collada model-----------------------------------///
//
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    loader.load(path, function (collada) {

//            geometry.computeFaceNormals();
        //geometry.computeVertexNormals();    // requires correct face normals


        materialbasic = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, skinning: true});

        dae = collada.scene;

        dae.traverse(function (child) {

            if (child instanceof THREE.SkinnedMesh) {

                var animation = new THREE.Animation(child, child.geometry.animation);
                animation.play();

            }

        });

        setMaterial(dae, materialbasic);

        function setMaterial(child, material) {
            child.material = material;
            if (child.children) {
                for (var i = 0; i < child.children.length; i++) {
                    setMaterial(child.children[i], material);
                }
            }
        }

//            default rotation, position
        dae.rotation.set(0, 0, 0);
        dae.position.set(0, 0, 0);//x,z,y - if you think in blender dimensions ;)
        dae.scale.set(0.5, 0.5, 0.5);

        dae.updateMatrix();

        group.add(dae);

    });

}

function onepixLoadScene(path) {

    //load three.js editor generated scene instead
    var loader = new THREE.ObjectLoader;
    loader.load(path, function (obj) {

        group.add(obj);
    });


}




