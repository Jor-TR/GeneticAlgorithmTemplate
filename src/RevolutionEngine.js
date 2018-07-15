module.exports=class RevolutionEngine{
    constructor(config) {
        Object.assign(this,config);

        // 初始化种群
        this.population=this.initialCharacters.map(function(character){
            return new this.Species(character,this.initialEnv);
        },this);

        // 对于历史种群中适应性最佳的个体，在此保留其性状以及表现
        this.bestResults=[];
    }

    // 自然选择。适应性越强的个体留存的几率越大
    select(){
        let characters=this.population.map(function(individual){
            return individual.deriveCharacter();
        });

        
        let fitnessArray=characters.map(function(character){
            return this.evaluate(character);
        },this);    
        
        // 选取当代最佳个体，保存其性状以及适应性评价
        let bestIndex=fitnessArray.reduce(function(bestIndex,fitness,index,arr){
            if(fitness>arr[bestIndex]){
                return index;
            }else{
                return bestIndex;
            }
        },0);
        this.bestResults.push([characters[bestIndex],fitnessArray[bestIndex]]);

        // 转轮盘决定哪些个体留存，以及留下多少后代
        let fitnessAddition=fitnessArray.reduce((addition,fitness)=>{
            return addition+fitness;
        },0);
        let result = [];
        for (let i = 0, size = this.maxPopulationSize; i < size; i++) {
            let random = Math.random(),
                probabilityAddition = 0;
            for (let index = 0, len = fitnessArray.length; index < len; index++) {
                let probability=fitnessArray[index] / fitnessAddition;
                probabilityAddition += probability;
                if (probabilityAddition > random) {
                    result.push(index);
                    break;
                }
            }
        }
        return result;
    }

    // 留存的个体繁衍下一代种群，下一代种群会发生随机变异
    createNextGeneration(){
        let newPopulation=this.select().map(function(n){
            return this.Species.breed(this.population[n]);
        },this);
        this.population=newPopulation;
    }
    
    // 周而复始进行自然选择，迭代次数在配置文件中的generations属性设置
    revolve(){
        for(let n=0,generations=this.generations;n<generations;n++){
            this.createNextGeneration();
        }
    }

    // 从历史保留的每代最佳性状中,再挑选出最优的性状
    getBestResult(){
        let bestIndex= this.bestResults.reduce((bestIndex,result,index,arr)=>{
            if(result[1]>arr[bestIndex][1]){
                return index;
            }else{
                return bestIndex;
            }
        },0);
        console.log(`规模${this.maxPopulationSize}的种群总共迭代了${this.generations}代，在第${bestIndex}代获得了最优解:`);
        return this.bestResults[bestIndex];
    }
}
