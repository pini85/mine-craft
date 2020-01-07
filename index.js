const mineCraft = {};

mineCraft.start = () => {
  mineCraft.matrix();
  mineCraft.toolBar();
  //   mineCraft.inventory();
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
      el.classList.add("tile");
      target.appendChild(el);

      switch (matrix[i][j]) {
        case 0:
          el.classList.add("sky");
          break;
        case 1:
          el.classList.add("leaf");
          break;
        case 2:
          el.classList.add("trunk");
          break;
        case 3:
          el.classList.add("rock");
          break;
        case 4:
          el.classList.add("grass");
          break;
        case 5:
          el.classList.add("ground");
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
    el.style.backgroundImage = `url(${tool.url})`;
    // <div style="background-image: url('img_girl.jpg');"></div>
    target.appendChild(el);
  });
};

// mineCraft.start();

mineCraft.start();

// const array = [1, 2, 3, 4, 5, 6];

// const result = array.forEach(el => {
//   return el + 1;
// });

// console.log(result, array);
