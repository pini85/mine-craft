const state = {
  tools: [
    { name: "axe", url: "./img/axe.jpg", remove: ["leaf", "trunk"] },
    { name: "pickAxe", url: "./img/pickaxe.jpg", remove: ["rock"] },
    { name: "shovel", url: "./img/shovel.jpg", remove: ["dirt", "grass"] },
  ],
  storage: [],
  currentMaterial: "",
  currentTool: "",
  removeFromWorld: false,
};
const start = () => {
  createWorld();
  createTools();
};
const createWorld = () => {
  //0 = sky
  //1 = leaf
  //2 = trunk
  //3 = rock
  //4 = grass
  //5 = ground
  const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 3, 3, 0, 0, 0, 2, 0, 0, 3, 3, 3],
    [0, 3, 3, 0, 0, 0, 2, 0, 0, 3, 3, 3],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  ];
  const matrixContainer = document.querySelector("#matrix");
  matrixContainer.addEventListener("click", (e) => {
    if (state.removeFromWorld && state.currentTool) {
      mining(e);
    } else if (state.currentMaterial && !state.removeFromWorld) {
      building(e);
    }
  });
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const element = document.createElement("div");
      // element.addEventListener("click", (e) => {
      //   if (state.removeFromWorld && state.currentTool) {
      //     mining(e);
      //   } else if (state.currentMaterial && !state.removeFromWorld) {
      //     building(e);
      //   }
      // });
      element.classList.add("tile");
      element.dataset.position = [row, col];
      matrixContainer.appendChild(element);
      switch (matrix[row][col]) {
        case 0:
          element.classList.add("sky");
          break;
        case 1:
          element.classList.add("leaf");
          break;
        case 2:
          element.classList.add("trunk");
          break;
        case 3:
          element.classList.add("rock");
          break;
        case 4:
          element.classList.add("grass");
          break;
        case 5:
          element.classList.add("dirt");
          break;
        default:
          break;
      }
    }
  }
};
const createTools = () => {
  state.tools.forEach((tool) => {
    //create a div
    // create h5 tag
    // put the name inside the h5 tag
    //create an image
    //put the src as the url
    //append it to the target
    const target = document.querySelector("#tool-bar");
    const container = document.createElement("div");
    container.classList.add("tool-item");
    const title = document.createElement("h5");
    title.textContent = tool.name;
    const image = document.createElement("img");
    image.src = tool.url;
    container.appendChild(title);
    container.appendChild(image);
    target.append(container);

    container.addEventListener("click", (e) => pickTool(e, tool.name));
  });
};

const pickTool = (e, tool) => {
  state.currentTool = tool;
  const tools = document.querySelectorAll(".tool-item");
  tools.forEach((tool) => {
    tool.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");
  state.removeFromWorld = true;
};

const building = ({ target }) => {
  const worldMaterial = target.className.split(" ")[1];
  const storageMaterial = state.currentMaterial.className.split(" ")[1];

  target.classList.remove(worldMaterial);
  target.classList.add(storageMaterial);
  state.currentMaterial.remove();
  state.currentMaterial = "";
  state.currentTool = "";
  state.removeFromWorld = false;
  //remove class of currently clicked on in the world
  //add class of selected material to the world
  //remove element of selected material from storage
  //current material in state to empty string
  //remove class selected on tool (found out better to remove when you pick the material)
};
const mining = (e) => {
  const materialType = document.querySelector(".material-type");
  const material = e.target.className.split(" ")[1];
  state.tools.forEach((tool) => {
    if (tool.name === state.currentTool && tool.remove.includes(material)) {
      createStorage(material);
      e.target.classList.remove(material);
      materialType.textContent =
        material.slice(0, 1).toUpperCase() + material.slice(1);
    }
  });

  //need to get the current material being mined
  //need to compare the tool I currently have to the remove value from my tools.remove
  //once mined need to put that in my inventory
  //user can save n amount of material
};
const createStorage = (material) => {
  state.storage.push(material);

  const container = document.querySelector("#storage");
  const materialEl = document.createElement("div");
  materialEl.classList.add("storage-item");
  materialEl.classList.add(material);
  container.appendChild(materialEl);
  materialEl.addEventListener("click", (e) => pickMaterial(e));

  //put the material to our storage state
  //loop over them and create divs
  //attach event listeners on them
  // when clicked put that as current material selected
  //change to building
  //allow to place material to world
};
const pickMaterial = ({ target }) => {
  const materials = document.querySelectorAll(".storage-item");
  state.currentMaterial = target;

  state.removeFromWorld = false;
  materials.forEach((material) => {
    material.classList.remove("selected");
  });
  target.classList.add("selected");
  const tools = document.querySelectorAll(".tool-item");
  tools.forEach((tool) => {
    tool.classList.remove("selected");
  });
};
const resetWorld = () => {
  const matrix = document.querySelector("#matrix");
  const toolBar = document.querySelector("#tool-bar");
  const materialType = document.querySelector(".material-type");
  const storage = document.querySelector("#storage");
  matrix.innerHTML = "";
  toolBar.innerHTML = "";
  storage.innerHTML = "";
  materialType.textContent = "Nothing";
  state.storage = [];
  state.currentMaterial = "";
  state.currentTool = "";
  state.removeFromWorld = false;
  start();
};
document.querySelector("#reset").addEventListener("click", resetWorld);
start();
