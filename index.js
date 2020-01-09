const mineCraft = {};
mineCraft.currentTool = "";
mineCraft.currentMaterial = "";
mineCraft.removeFromWorld = true;
mineCraft.builder = true;

mineCraft.start = () => {
  mineCraft.matrix();
  mineCraft.toolBar();
  mineCraft.inventory();
};

mineCraft.matrix = () => {
  // 1= leaf,
  // 2= trunk
  // 3 = rock
  // 4 = grass
  // 5= ground
  const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 3, 3, 3, 0, 0, 0],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
  ];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const target = document.getElementById("matrix");
      const el = document.createElement("div");
      el.addEventListener("click", e => {
        if (mineCraft.removeFromWorld) {
          mineCraft.mining(e);
        } else if (!mineCraft.removeFromWorld) {
          mineCraft.building(e);
        }
      });

      el.classList.add("tile");
      target.appendChild(el);

      switch (matrix[i][j]) {
        case 0:
          el.classList.add("sky");
          el.setAttribute("data-type", "sky");
          break;
        case 1:
          el.classList.add("leaf");
          el.setAttribute("data-type", "leaf");
          break;
        case 2:
          el.classList.add("trunk");
          el.setAttribute("data-type", "trunk");
          break;
        case 3:
          el.classList.add("rock");
          el.setAttribute("data-type", "rock");
          break;
        case 4:
          el.classList.add("grass");
          el.setAttribute("data-type", "grass");
          break;
        case 5:
          el.classList.add("ground");
          el.setAttribute("data-type", "ground");
          break;
      }
    }
  }
};
mineCraft.toolBar = () => {
  const toolKit = [
    {
      name: "axe",
      url: "./img/axe.jpg"
    },
    {
      name: "pickAxe",
      url: "./img/pickaxe.jpg"
    },
    {
      name: "shovel",
      url: "./img/shovel.jpg"
    }
  ];

  toolKit.forEach(tool => {
    const target = document.getElementById("tool-bar");
    const el = document.createElement("div");
    el.classList.add("tool", tool.name);
    el.setAttribute("data-type-tool", tool.name);
    el.style.backgroundImage = `url(${tool.url})`;
    el.addEventListener("click", mineCraft.pickedTool);
    target.appendChild(el);
  });
};

mineCraft.inventory = () => {
  const target = document.getElementById("storage");
  const el = document.createElement("div");
  el.classList.add("inventory");
  el.addEventListener("click", mineCraft.pickStorage);
  target.appendChild(el);
};

mineCraft.mining = event => {
  let tile = event.target.getAttribute("data-type");
  let tool = mineCraft.currentTool;
  if (mineCraft.removeFromWorld) {
    let typeInText = document.querySelector(".type");
    if ((tile === "leaf" || tile === "trunk") && tool == "axe") {
      event.target.className = "tile";
      mineCraft.currentMaterial = tile;
      typeInText.innerHTML = tile;
      nromWorld = false;
      mineCraft.builder = true;
    }

    if (tile === "rock" && tool === "pickAxe") {
      event.target.className = "tile";
      mineCraft.currentMaterial = tile;
      typeInText.innerHTML = tile;
      mineCraft.removeFromWorld = false;
      mineCraft.builder = true;
    }

    if ((tile === "ground" || tile === "grass") && tool === "shovel") {
      event.target.className = "tile";
      mineCraft.currentMaterial = tile;
      typeInText.innerHTML = tile;
      mineCraft.removeFromWorld = false;
      mineCraft.builder = true;
    }
    const inventoryEl = document.querySelector(".inventory");
    inventoryEl.className = `inventory ${mineCraft.currentMaterial}`;
  }
};

mineCraft.building = e => {
  if (mineCraft.builder) {
    if (e.target.getAttribute("data-type") === "sky") {
      e.target.className = `tile ${mineCraft.currentMaterial}`;
      document.querySelector(".inventory").className = "inventory";
      document.querySelector(".type").innerHTML = "Nothing";
      mineCraft.builder = false;
      mineCraft.removeFromWorld = true;
    }
  }
};

mineCraft.pickedTool = event => {
  mineCraft.currentTool = event.target.getAttribute("data-type-tool");
};

mineCraft.pickStorage = event => {
  mineCraft.currentMaterial = event.target.classList[1];
};
mineCraft.reset = () => {
  document.getElementById("matrix").innerHTML = "";
  document.getElementById("tool-bar").innerHTML = "";
  document.getElementById("storage").innerHTML = "";
  mineCraft.start();
};

document.getElementById("reset").addEventListener("click", mineCraft.reset);

mineCraft.start();
