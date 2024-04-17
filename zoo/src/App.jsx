import { useState, useEffect } from "react";
import * as BABYLON from "@babylonjs/core";
import "./App.css";
import "@babylonjs/loaders/glTF";
import { Inspector } from "@babylonjs/inspector";
import earcut from "earcut";
import "@babylonjs/materials";
import axios from "axios";

const App = () => {
  const [scene, setScene] = useState(null);
  const [xrEnabled, setXrEnabled] = useState(false);

  useEffect(() => {
    // Obtener el canvas
    const canvas = document.getElementById("renderCanvas");
    // Crear el motor de renderizado
    const engine = new BABYLON.Engine(canvas, true);
    // Crear la escena
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      Inspector.Show(scene, {});

      // Crear una cámara
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        4.6882, // Alfa (alpha)
        1.6716, // Beta
        433.3218, // Radio
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      // Crear una luz
      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      const redLight = new BABYLON.PointLight(
        "redLight",
        new BABYLON.Vector3(10, 10, 10),
        scene
      );
      redLight.diffuse = new BABYLON.Color3(1, 0, 0); // Color rojo
      redLight.specular = new BABYLON.Color3(1, 0, 0); // Color rojo
      redLight.intensity = 0.6;
      // Color del material y esfera
      const materialLight = new BABYLON.StandardMaterial("", scene);
materialLight.diffuseColor = new BABYLON.Color3(1, 0, 0);

      const sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 10, scene);
      sphere.material = materialLight;

      // Animación
      // let alpha = 0;
      // scene.beforeRender = function () {
      //   redLight.position = new BABYLON.Vector3(
      //     10 * Math.sin(alpha),
      //     10 * Math.cos(alpha),
      //     10 * Math.cos(alpha)
      //   );
      //   alpha += 0.01;
      // };

      // scene.clearColor = new BABYLON.Color3(0.673, 1.302, 0.702); // Darker gray background
      // // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Color transparente para permitir que se muestre el gradiente

    //   var dome = new BABYLON.PhotoDome(
    //     "testdome",
    //     "./textures/starts.jpg",
    //     {
    //         resolution: 64,
    //         size: 1500
    //     },
    //     scene
    // );

    // var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    // var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;			

    async function createSkyboxAsync(scene) {
      return new Promise((resolve, reject) => {
          try {
              var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
              var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
              skyboxMaterial.backFaceCulling = false;
              skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
              skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
              skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
              skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
              skybox.material = skyboxMaterial;
              resolve(skybox);
          } catch (error) {
              reject(error);
          }
      });
  }

  createSkyboxAsync(scene) 

      const material = new BABYLON.StandardMaterial("material", scene);
      material.diffuseColor = new BABYLON.Color3(1, 1, 1); // Color del material
      material.alpha = 0.5; // Opacidad del material
      material.emissiveColor = new BABYLON.Color3(1, 0, 0); // Color de emisión del material
      material.specularColor = new BABYLON.Color3(0, 0, 0); // Color especular del material
      material.backFaceCulling = true; // No ocultar las caras traseras del material
      material.wireframe = false; // Mostrar el dodecaedro en modo alámbrico

      // Cambiar el color de los bordes
      material.edgesColor = new BABYLON.Color4(1, 0, 0, 1); // Color rojo para los bordes

      // Asignar el material al dodecaedro
      let Tetrah = {
        name: "Truncated Icosahedron",
        category: ["Archimedean Solid"],
        vertex: [
          [0, 0, 1.021],
          [0.4035482, 0, 0.9378643],
          [-0.2274644, 0.3333333, 0.9378643],
          [-0.1471226, -0.375774, 0.9378643],
          [0.579632, 0.3333333, 0.7715933],
          [0.5058321, -0.375774, 0.8033483],
          [-0.6020514, 0.2908927, 0.7715933],
          [-0.05138057, 0.6666667, 0.7715933],
          [0.1654988, -0.6080151, 0.8033483],
          [-0.5217096, -0.4182147, 0.7715933],
          [0.8579998, 0.2908927, 0.4708062],
          [0.3521676, 0.6666667, 0.6884578],
          [0.7841999, -0.4182147, 0.5025612],
          [-0.657475, 0.5979962, 0.5025612],
          [-0.749174, -0.08488134, 0.6884578],
          [-0.3171418, 0.8302373, 0.5025612],
          [0.1035333, -0.8826969, 0.5025612],
          [-0.5836751, -0.6928964, 0.4708062],
          [0.8025761, 0.5979962, 0.2017741],
          [0.9602837, -0.08488134, 0.3362902],
          [0.4899547, 0.8302373, 0.3362902],
          [0.7222343, -0.6928964, 0.2017741],
          [-0.8600213, 0.5293258, 0.1503935],
          [-0.9517203, -0.1535518, 0.3362902],
          [-0.1793548, 0.993808, 0.1503935],
          [0.381901, -0.9251375, 0.2017741],
          [-0.2710537, -0.9251375, 0.3362902],
          [-0.8494363, -0.5293258, 0.2017741],
          [0.8494363, 0.5293258, -0.2017741],
          [1.007144, -0.1535518, -0.06725804],
          [0.2241935, 0.993808, 0.06725804],
          [0.8600213, -0.5293258, -0.1503935],
          [-0.7222343, 0.6928964, -0.2017741],
          [-1.007144, 0.1535518, 0.06725804],
          [-0.381901, 0.9251375, -0.2017741],
          [0.1793548, -0.993808, -0.1503935],
          [-0.2241935, -0.993808, -0.06725804],
          [-0.8025761, -0.5979962, -0.2017741],
          [0.5836751, 0.6928964, -0.4708062],
          [0.9517203, 0.1535518, -0.3362902],
          [0.2710537, 0.9251375, -0.3362902],
          [0.657475, -0.5979962, -0.5025612],
          [-0.7841999, 0.4182147, -0.5025612],
          [-0.9602837, 0.08488134, -0.3362902],
          [-0.1035333, 0.8826969, -0.5025612],
          [0.3171418, -0.8302373, -0.5025612],
          [-0.4899547, -0.8302373, -0.3362902],
          [-0.8579998, -0.2908927, -0.4708062],
          [0.5217096, 0.4182147, -0.7715933],
          [0.749174, 0.08488134, -0.6884578],
          [0.6020514, -0.2908927, -0.7715933],
          [-0.5058321, 0.375774, -0.8033483],
          [-0.1654988, 0.6080151, -0.8033483],
          [0.05138057, -0.6666667, -0.7715933],
          [-0.3521676, -0.6666667, -0.6884578],
          [-0.579632, -0.3333333, -0.7715933],
          [0.1471226, 0.375774, -0.9378643],
          [0.2274644, -0.3333333, -0.9378643],
          [-0.4035482, 0, -0.9378643],
          [0, 0, -1.021],
        ],
        face: [
          [0, 3, 8, 5, 1],
          [2, 7, 15, 13, 6],
          [4, 10, 18, 20, 11],
          [9, 14, 23, 27, 17],
          [12, 21, 31, 29, 19],
          [16, 26, 36, 35, 25],
          [22, 32, 42, 43, 33],
          [24, 30, 40, 44, 34],
          [28, 39, 49, 48, 38],
          [37, 47, 55, 54, 46],
          [41, 45, 53, 57, 50],
          [51, 52, 56, 59, 58],
          [0, 1, 4, 11, 7, 2],
          [0, 2, 6, 14, 9, 3],
          [1, 5, 12, 19, 10, 4],
          [3, 9, 17, 26, 16, 8],
          [5, 8, 16, 25, 21, 12],
          [6, 13, 22, 33, 23, 14],
          [7, 11, 20, 30, 24, 15],
          [10, 19, 29, 39, 28, 18],
          [13, 15, 24, 34, 32, 22],
          [17, 27, 37, 46, 36, 26],
          [18, 28, 38, 40, 30, 20],
          [21, 25, 35, 45, 41, 31],
          [23, 33, 43, 47, 37, 27],
          [29, 31, 41, 50, 49, 39],
          [32, 34, 44, 52, 51, 42],
          [35, 36, 46, 54, 53, 45],
          [38, 48, 56, 52, 44, 40],
          [42, 51, 58, 55, 47, 43],
          [48, 49, 50, 57, 59, 56],
          [53, 54, 55, 58, 59, 57],
        ],
      };

      let tetra = BABYLON.MeshBuilder.CreatePolyhedron(
        "Tetra",
        { custom: Tetrah, size: 52 },
        scene
      );

      tetra.material = material;

      
let rotating = false;
let rightDir = new BABYLON.Vector3();
let upDir = new BABYLON.Vector3();
const sensitivity = 0.005;

scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
        if (pointerInfo.pickInfo.pickedMesh === tetra) {
            rotating = true;
            scene.activeCamera.detachControl();
        }
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERUP && rotating) {
        rotating = false;
        scene.activeCamera.attachControl();
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE && rotating) {
        const matrix = scene.activeCamera.getWorldMatrix();
        rightDir.copyFromFloats(matrix.m[0], matrix.m[1], matrix.m[2]);
        upDir.copyFromFloats(matrix.m[4], matrix.m[5], matrix.m[6]);

        tetra.rotateAround(tetra.position, rightDir, pointerInfo.event.movementY * -1 * sensitivity);
        tetra.rotateAround(tetra.position, upDir, pointerInfo.event.movementX * -1 * sensitivity);
    }
});


      for (let i = 0; i < Tetrah.face.length; i++) {
        // Obtener los vértices de la cara actual
        const faceVertices = Tetrah.face[i];

        // Crear un vector que contenga los vértices de la cara actual
        const faceVerticesVector = faceVertices.map(
          (index) =>
            new BABYLON.Vector3(
              Tetrah.vertex[index][0],
              Tetrah.vertex[index][1],
              Tetrah.vertex[index][2]
            )
        );

        // Calcular el centro de la cara actual
        const center = faceVerticesVector
          .reduce((acc, cur) => acc.add(cur), BABYLON.Vector3.Zero())
          .scale(1 / faceVertices.length);

        // Calcular la normal de la cara actual
        const v1 = faceVerticesVector[1].subtract(faceVerticesVector[0]);
        const v2 = faceVerticesVector[2].subtract(faceVerticesVector[0]);
        const normal = BABYLON.Vector3.Cross(v1, v2).normalize();

        // Multiplicar la normal por un factor para extenderla desde el centro de la cara
        const radius = 44; // Radio del cilindro
        const position = center.subtract(normal.scale(radius)); // Resta en lugar de sumar
        const distanceToCenter = position.subtract(center).length(); // Distancia al centro
        const newPosition = center.add(
          normal.scale(radius + distanceToCenter * 0.1)
        ); // Ajustar posición

        // Crear un cilindro en la posición calculada
        const cylinder = BABYLON.MeshBuilder.CreateCylinder(
          "cylinder_" + i,
          { diameter: 20, height: 3, tessellation: 8 },
          scene
        );
        cylinder.position = newPosition;

        // Rotar el cilindro para que su eje Y apunte en la dirección opuesta de la normal de la cara
        const angle = Math.acos(BABYLON.Vector3.Dot(normal, BABYLON.Axis.Y));
        const axis = BABYLON.Vector3.Cross(normal, BABYLON.Axis.Y);
        cylinder.rotationQuaternion = BABYLON.Quaternion.RotationAxis(
          axis,
          -angle
        ); // Cambiar el signo de la rotación

        cylinder.parent = tetra;
        cylinder.isPickable = true;

      //   cylinder.onPointerEnterObservable.add(function(ev, state){
      //     console.log("holaaa");
      //  })

        // cylinder.onPointerOut = function () {
        //   // Restaurar el diámetro al salir del hover
        //   cylinder.scaling.x = cylinder.scaling.y = cylinder.scaling.z = 1.0;
        // };
      }

      for (let i = 0; i < Tetrah.face.length; i++) {
        // Obtener los vértices de la cara actual
        const faceVertices = Tetrah.face[i];

        // Crear un vector que contenga los vértices de la cara actual
        const faceVerticesVector = faceVertices.map(
          (index) =>
            new BABYLON.Vector3(
              Tetrah.vertex[index][0],
              Tetrah.vertex[index][1],
              Tetrah.vertex[index][2]
            )
        );

        // Calcular el centro de la cara actual
        const center = faceVerticesVector
          .reduce((acc, cur) => acc.add(cur), BABYLON.Vector3.Zero())
          .scale(1 / faceVertices.length);

        // Calcular la normal de la cara actual
        const v1 = faceVerticesVector[1].subtract(faceVerticesVector[0]);
        const v2 = faceVerticesVector[2].subtract(faceVerticesVector[0]);
        const normal = BABYLON.Vector3.Cross(v1, v2).normalize();

        // Multiplicar la normal por un factor para extenderla desde el centro de la cara
        const radius = 234; // Radio del cilindro
        const position = center.subtract(normal.scale(radius)); // Resta en lugar de sumar
        const distanceToCenter = position.subtract(center).length(); // Distancia al centro
        const newPosition = center.add(
          normal.scale(radius + distanceToCenter * 0.1)
        ); // Ajustar posición

        // Crear un cilindro en la posición calculada
        const blockCode = BABYLON.MeshBuilder.CreateCylinder(
          "blockCode_" + i,
          { diameter: 50, height: 3, tessellation: 4 },
          scene
        );
        blockCode.position = newPosition;

        // Rotar el cilindro para que su eje Y apunte en la dirección opuesta de la normal de la cara
        const angle = Math.acos(BABYLON.Vector3.Dot(normal, BABYLON.Axis.Y));
        const axis = BABYLON.Vector3.Cross(normal, BABYLON.Axis.Y);
        blockCode.rotationQuaternion = BABYLON.Quaternion.RotationAxis(
          axis,
          -angle
        ); // Cambiar el signo de la rotación

        blockCode.parent = tetra;

        
      }

      axios.get("http://localhost:3000/getcodeblocks")
      .then(async (response) => {
        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          // Obtener los datos de las imágenes
          const images = response.data;
    
          // Iterar sobre las imágenes y asignarlas como texturas a los bloques de código
          for (let i = 0; i < images.length; i++) {
            const imageUrl = images[i]; // Obtener la URL de la imagen
            const texture = new BABYLON.Texture(imageUrl, scene); // Crear la textura desde la URL
            const material = new BABYLON.StandardMaterial("material_" + i, scene); // Crear un material
            material.diffuseTexture = texture; // Asignar la textura al material
    
            // Obtener el bloque de código por su nombre
            const blockCode = scene.getMeshByName("blockCode_" + i);
    
            // Asignar el material al bloque de código
            if (blockCode) {
              blockCode.material = material;
            }
          }
        } else {
          console.error("Error al obtener los datos de las imágenes:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de las imágenes:", error);
      });
      axios.get("http://localhost:3000/getcodeblocks")
  .then(async (response) => {
    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtener los datos de las imágenes
      const imagesData = response.data;

      // Iterar sobre los datos de las imágenes y asignarlas como texturas a los bloques de código
      imagesData.forEach(async (imageData, index) => {
        const imageUrl = imageData.image; // Obtener la URL de la imagen
        const texture = new BABYLON.Texture(imageUrl, scene); // Crear la textura desde la URL
        const material = new BABYLON.StandardMaterial("material_" + index, scene); // Crear un material
        material.diffuseTexture = texture; // Asignar la textura al material

        // Obtener el bloque de código por su nombre
        const blockCode = scene.getMeshByName("blockCode_" + index);

        // Asignar el material al bloque de código
        if (blockCode) {
          blockCode.material = material;
        }
      });
    } else {
      console.error("Error al obtener los datos de las imágenes:", response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud de las imágenes:", error);
  });

      axios.get("http://localhost:3000/getlanguages")
      .then((response) => {
        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          // Extraer los datos de la respuesta
          const languages = response.data;
    
          // Definir los nombres de los cilindros
          const cylinderNames = ["cylinder_11", "cylinder_29", "cylinder_9", "cylinder_27", "cylinder_10", "cylinder_30", "cylinder_31"];
    
          // Iterar sobre los nombres de los cilindros,
          cylinderNames.forEach((cylinderName, index) => {
            // Obtener la URL de la imagen correspondiente al índice actual
            const imageUrl = languages[index].image;
    
            // Crear una textura utilizando la URL de la imagen
            const texture = new BABYLON.Texture(imageUrl, scene);
    
            // Crear un material con la textura
            const material = new BABYLON.StandardMaterial(`languageMaterial_${index}`, scene);
            material.diffuseTexture = texture;
    
            // Obtener el objeto cilindro por su nombre
            const object = scene.getMeshByName(cylinderName);
    
            // Aplicar el material al objeto cilindro
            object.material = material;
          });
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });


      
      let currentText;
      let currentLink;

axios.get("http://localhost:3000/getlanguages")
  .then((response) => {
    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      // Extraer los datos de la respuesta
      const languages = response.data;
      
      // Definir los nombres de los cilindros
      const cylinderNames = ["cylinder_11", "cylinder_29", "cylinder_9", "cylinder_27", "cylinder_10", "cylinder_30", "cylinder_31"];
      
      // Iterar sobre los nombres de los cilindros
      cylinderNames.forEach(async (cylinderName, index) => {
        // Obtener la descripción correspondiente al índice actual
        const description = languages[index].description;
        
        // Obtener el objeto cilindro por su nombre
        const cylinder = scene.getMeshByName(cylinderName);
        
        // Agregar un evento de clic al cilindro
        cylinder.actionManager = new BABYLON.ActionManager(scene);
        cylinder.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, async () => {
            // Imprimir la descripción en la consola cuando se hace clic en el cilindro
            
            try {
              const fontResponse = await fetch("./fonts/kenney.json");
              if (!fontResponse.ok) {
                throw new Error("Error al cargar el archivo JSON");
              }
              const fontData = await fontResponse.json();
              
              // Eliminar el texto actual si existe
              if (currentText ) {
                currentText.dispose();
              }
              if (currentLink) {
                currentLink.dispose();
                currentLink = null; // También es importante establecer currentLink como null
              }
          
              // Crear el texto con la descripción seleccionada
              const text = BABYLON.MeshBuilder.CreateText(
                "LanguagesDesc",
                description,
                fontData,
                {
                  size: 14,
                  resolution: 256,
                  depth: 5,
                },
                scene,
                earcut
              );
              text.position = new BABYLON.Vector3(2, -110, 42);
              text.rotation = new BABYLON.Vector3(-0.22, 0, 0);
              const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
              redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
              text.material = redMaterial;
              
              // Asignar el nuevo texto a la variable currentText
              currentText = text;
             
            } catch (error) {
              console.error("Error:", error);
            }
          })
        );
      });
    } else {
      console.error("Error al obtener los datos:", response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud:", error);
  });



      axios.get("http://localhost:3000/getcontacts")
      .then((response) => {
        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          // Extraer los datos de la respuesta
          const contacts = response.data;
    
          // Definir los nombres de los cilindros
          const cylinderNames = ["cylinder_22", "cylinder_7", "cylinder_20", "cylinder_18", "cylinder_1"];
    
          // Iterar sobre los nombres de los cilindros
          cylinderNames.forEach((cylinderName, index) => {
            // Obtener la URL de la imagen correspondiente al índice actual
            const imageUrl = contacts[index].image;
    
            // Crear una textura utilizando la URL de la imagen
            const texture = new BABYLON.Texture(imageUrl, scene);
    
            // Crear un material con la textura
            const material = new BABYLON.StandardMaterial(`contactMaterial_${index}`, scene);
            material.diffuseTexture = texture;
    
            // Obtener el objeto cilindro por su nombre
            const object = scene.getMeshByName(cylinderName);
    
            // Aplicar el material al objeto cilindro
            object.material = material;
          });
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });


      axios.get("http://localhost:3000/getcontacts")
      .then((response) => {
        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          // Extraer los datos de la respuesta
          const contacts = response.data;
    
          // Definir los nombres de los cilindros
          const cylinderNames = ["cylinder_22", "cylinder_7", "cylinder_20", "cylinder_18", "cylinder_1"];
    
          
    
          // Iterar sobre los nombres de los cilindros
          cylinderNames.forEach((cylinderName, index) => {
            // Obtener la URL correspondiente al índice actual
            const url = contacts[index].url;
    
            // Obtener la descripción correspondiente al índice actual
            const description = contacts[index].description;
            
            // Obtener el objeto cilindro por su nombre
            const cylinder = scene.getMeshByName(cylinderName);
            
            // Agregar un evento de clic al cilindro
            cylinder.actionManager = new BABYLON.ActionManager(scene);
            cylinder.actionManager.registerAction(
              new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, async () => {
                try {
                  const fontResponse = await fetch("./fonts/kenney.json");
                  if (!fontResponse.ok) {
                    throw new Error("Error al cargar el archivo JSON");
                  }
                  const fontData = await fontResponse.json();
                  
                  // Eliminar el texto actual si existe
                  if (currentText) {
                    currentText.dispose();
                  }
                  
                  // Crear el texto con la descripción seleccionada
                  const text = BABYLON.MeshBuilder.CreateText(
                    "ContactsDesc",
                    description,
                    fontData,
                    {
                      size: 14,
                      resolution: 256,
                      depth: 5,
                    },
                    scene,
                    earcut
                  );
                  const text2 = BABYLON.MeshBuilder.CreateText(
                    "ContactsLink",
                    "¡Haz click!",
                    fontData,
                    {
                      size: 14,
                      resolution: 256,
                      depth: 5,
                    },
                    scene,
                    earcut
                  );
 
                  text2.position = new BABYLON.Vector3(2, -130, 42);
                  text2.rotation = new BABYLON.Vector3(-0.22, 0, 0);
                  text.position = new BABYLON.Vector3(2, -110, 42);
                  text.rotation = new BABYLON.Vector3(-0.22, 0, 0);
                  const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
                  redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
                  text.material = redMaterial;
                  text2.material = redMaterial;
    
                  if (currentLink) {
                    currentLink.dispose();
                  }
                  // Asignar el nuevo texto a la variable currentText
                  currentText = text;
                  currentLink = text2;
    
                  // Agregar un evento de clic al texto2 para abrir la URL
                  text2.actionManager = new BABYLON.ActionManager(scene);
                  text2.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                      window.open(url, "_blank");
                    })
                  );
    
                  text.actionManager = new BABYLON.ActionManager(scene);
                  text.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                      window.open(url, "_blank");
                    })
                  );
                } catch (error) {
                  console.error("Error:", error);
                }
              })
            );
          });
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
    


      axios.get("http://localhost:3000/getworks")
  .then((response) => {
    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      // Extraer los datos de la respuesta
      const works = response.data;

      // Definir los nombres de los cilindros
      const cylinderNames = ["cylinder_4", "cylinder_23", "cylinder_16"];

      // Iterar sobre los nombres de los cilindros
      cylinderNames.forEach((cylinderName, index) => {
        // Obtener la URL de la imagen correspondiente al índice actual
        const imageUrl = works[index].image;

        // Crear una textura utilizando la URL de la imagen
        const texture = new BABYLON.Texture(imageUrl, scene);

        // Crear un material con la textura
        const material = new BABYLON.StandardMaterial(`workMaterial_${index}`, scene);
        material.diffuseTexture = texture;

        // Obtener el objeto cilindro por su nombre
        const object = scene.getMeshByName(cylinderName);

        // Aplicar el material al objeto cilindro
        object.material = material;
      });
    } else {
      console.error("Error al obtener los datos:", response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud:", error);
  });

  axios.get("http://localhost:3000/getworks")
  .then((response) => {
    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      // Extraer los datos de la respuesta
      const works = response.data;

      // Definir los nombres de los cilindros
      const cylinderNames = ["cylinder_4", "cylinder_23", "cylinder_16"];

      // Iterar sobre los nombres de los cilindros
      cylinderNames.forEach((cylinderName, index) => {
        // Obtener la URL correspondiente al índice actual
        const url = works[index].url;

        // Obtener la descripción correspondiente al índice actual
        const description = works[index].description;
        
        // Obtener el objeto cilindro por su nombre
        const cylinder = scene.getMeshByName(cylinderName);
        
        // Agregar un evento de clic al cilindro
        cylinder.actionManager = new BABYLON.ActionManager(scene);
        cylinder.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, async () => {
           
            try {
              const fontResponse = await fetch("./fonts/kenney.json");
              if (!fontResponse.ok) {
                throw new Error("Error al cargar el archivo JSON");
              }
              const fontData = await fontResponse.json();
              
              // Eliminar el texto actual si existe
              if (currentText) {
                currentText.dispose();
              }
              
              // Crear el texto con la descripción seleccionada
              const text = BABYLON.MeshBuilder.CreateText(
                "WorksDesc",
                description,
                fontData,
                {
                  size: 14,
                  resolution: 256,
                  depth: 5,
                },
                scene,
                earcut
              );
              const text2 = BABYLON.MeshBuilder.CreateText(
                "WorksLink",
                "¡Ven conmigo!",
                fontData,
                {
                  size: 14,
                  resolution: 256,
                  depth: 5,
                },
                scene,
                earcut
              );
              text2.position = new BABYLON.Vector3(2, -130, 42);
              text2.rotation = new BABYLON.Vector3(-0.22, 0, 0);
              text.position = new BABYLON.Vector3(2, -110, 42);
              text.rotation = new BABYLON.Vector3(-0.22, 0, 0);
              const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
              redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
              text.material = redMaterial;
              text2.material = redMaterial;

              if (currentLink) {
                currentLink.dispose();
              }
              // Asignar el nuevo texto a la variable currentText
              currentText = text;
              currentLink = text2;

              // Agregar un evento de clic al texto2 para abrir la URL
              text2.actionManager = new BABYLON.ActionManager(scene);
              text2.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                  window.open(url, "_blank");
                })
              );

              text.actionManager = new BABYLON.ActionManager(scene);
              text.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                  window.open(url, "_blank");
                })
              );
            } catch (error) {
              console.error("Error:", error);
            }
          })
        );
      });
    } else {
      console.error("Error al obtener los datos:", response.statusText);
    }
  })
  .catch((error) => {
    console.error("Error al realizar la solicitud:", error);
  });



      const createTextWithFont = async () => {
        try {
          let previousText; 
      
          const response = await axios.get("http://localhost:3000/getphilosofies");
          const descriptions = response.data.map(item => item.description);
      
          const fontResponse = await fetch("./fonts/kenney.json");
          if (!fontResponse.ok) {
            throw new Error("Error al cargar el archivo JSON");
          }
          const fontData = await fontResponse.json();
      
          // Función para actualizar el texto con una descripción aleatoria
          const updateTextWithRandomDescription = () => {
            // Seleccionar una descripción aleatoria
            const randomIndex = Math.floor(Math.random() * descriptions.length);
            const randomDescription = descriptions[randomIndex];
      
            // Eliminar el texto anterior si existe
            if (previousText) {
              previousText.dispose();
            }
      
            // Crear el texto con la descripción seleccionada
            const text = BABYLON.MeshBuilder.CreateText(
              "myText",
              randomDescription,
              fontData,
              {
                size: 14,
                resolution: 256,
                depth: 5,
              },
              scene,
              earcut
            );
            text.position = new BABYLON.Vector3(2, 72, 42);
            text.rotation = new BABYLON.Vector3(-0.22, 0, 0);
            const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
            redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

           
        
            text.material = redMaterial;

            // Almacenar el texto actual en la variable previousText
            previousText = text;
            
          };
      
          // Llamar a la función inicialmente
          updateTextWithRandomDescription();
      
          // Establecer un intervalo para actualizar el texto cada 5 segundos
          setInterval(updateTextWithRandomDescription, 8000);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
      createTextWithFont();
      
      
      return scene;
    };

    const scene = createScene();
    setScene(scene);

    // Renderizar la escena
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Limpiar al desmontar
    return () => {
      engine.dispose();
      scene.dispose();
    };
  }, []);

  // Función para activar/desactivar la experiencia de XR
  // const toggleXR = () => {
  //   if (!xrEnabled && scene) {
  //     // Crear experiencia de XR
  //     scene.createDefaultXRExperienceAsync({}).then((xrExperience) => {
  //       xrExperience.input.onControllerAddedObservable.add(() => {
  //         // Manejar eventos de controladores de mano aquí
  //       });
  //     });
  //   } else if (scene) {
  //     // Aquí puedes manejar la lógica para desactivar la experiencia XR
  //     console.log("Desactivar experiencia de XR");
  //     scene.exitXRAsync();
  //   }
  //   setXrEnabled(!xrEnabled);
  // };
  const toggleXR = () => {
    if (!xrEnabled && scene) {
      // Verificar si el dispositivo es compatible con WebXR
      if (navigator.xr && navigator.xr.isSessionSupported) {
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
          if (supported) {
            // Crear la experiencia de XR si es compatible
            scene.createDefaultXRExperienceAsync({}).then((xrExperience) => {
              xrExperience.input.onControllerAddedObservable.add(() => {
                // Manejar eventos de controladores de mano aquí
              });
            });
          } else {
            // El dispositivo no es compatible con VR
            console.log("Este dispositivo no es compatible con VR");
          }
        }).catch((error) => {
          console.error("Error al verificar la compatibilidad con VR:", error);
        });
      } else {
        // El navegador no admite WebXR
        console.log("Tu navegador no admite WebXR");
      }
    } else if (scene) {
      // Aquí puedes manejar la lógica para desactivar la experiencia XR
      console.log("Desactivar experiencia de XR");
      scene.exitXRAsync();
    }
    setXrEnabled(!xrEnabled);
  };
  
  return (
    <div>
      <canvas id="renderCanvas" />
      <button onClick={toggleXR}>
        {xrEnabled ? "Desactivar VR" : "Activar VR"}
      </button>
    </div>
  );
};

export default App;




