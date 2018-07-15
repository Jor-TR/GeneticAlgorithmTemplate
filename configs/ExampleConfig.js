const createNewSpecies=require("../src/Species.js").createNewSpecies;

// 物种自身的特性(其染色体编码与其性状的关系、其繁殖方式等)
const wormConfig={

    // 物种名
    name:"Worm",
    
    // 根据染色体编码提取性状
    deriveCharacter: function(){
        return this.chromo[0];
    },

    // 物种的繁殖方式
    breed:(worm,newEnv)=>{
        let child=worm.clone();
        if(typeof newEnv!=="undefined"){
            child.migrate(newEnv);
        }
        child.mutate();
        return child;
    },    
    
    // 根据性状还原染色体的编码
    retrieveChromo:(x)=>[x],
};


// 物种的进化引擎配置(各种外部条件)
const wormRevolutionConfig={
    
    // 具体的物种类型(构造函数)
    Species:createNewSpecies(wormConfig),

    // 种群的最大规模
    maxPopulationSize:50,

    // 初始种群中的各个个体的性状
    initialCharacters:new Array(50).fill(null).map(()=>{
        return -1+3*Math.random();
    }),

    // 进化代数
    generations:100,

    // 环境适应性函数。根据性状评价个体的适应性强弱(0表示最弱,无上限)
    evaluate: (character) => {
        const x = character;
        if (x >= -1 && x <= 2) {
            return x*Math.sin(10 * Math.PI * x) + 2;
        } else {
            return 0;
        }
    },

    // 物种的初始进化环境(程序目前尚未加入物种迁徙特性，所以会一直沿用这个环境)
    initialEnv: {
        mutationProbability: 0.8,
        mutationRange: 0.005,
    },
};

module.exports=wormRevolutionConfig;