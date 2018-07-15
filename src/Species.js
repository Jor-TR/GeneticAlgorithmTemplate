// import * as funcs from "./functions.js";
const funcs=require("./functions.js");

// 抽象类，由它派生出各种物种类
// 目前染色体只支持浮点数数组编码，尚未支持二进制编码
class Species {
    constructor(chromo, env) {

        // 不能用它创建实例，否则会出错
        if(new.target===Species){
            throw new Error("Species是抽象类，不允许用它直接创建实例!");
        }

        // 也不能直接调用它或者它的派生类
        if(new.target===undefined){
            throw new Error("该函数不应当被直接调用!");
        }
        this.chromo = funcs.deepCopy(chromo);
        this.env = funcs.deepCopy(env);
    }

    // 随机决定是否发生突变
    shouldMutate() {

        // 随机数如果落在突变概率范围内，就发生突变
        return Math.random() < this.env.mutationProbability;
    }

    // 基因突变
    mutate() {
        let mutatedChromo = this.chromo.map(function (val, index) {
            if (this.shouldMutate()) {
                let mutation = Math.random() * 2 * this.env.mutationRange - this.env.mutationRange;
                return val + mutation;
            } else {
                return val;
            }
        },this)
        this.chromo = mutatedChromo;
    }

    // 转移到新环境
    migrate(newEnv) {
        this.env = funcs.deepCopy(newEnv);
    }
}

exports.createNewSpecies=function(config){
    class NewSpecies extends Species{
        constructor(character,env){
            super(NewSpecies.retrieveChromo(character),env);
        }

        // 用这个方法克隆出新个体
        clone() {
            return new NewSpecies(this.deriveCharacter(), this.env);
        }
    }
    NewSpecies.prototype.deriveCharacter=config.deriveCharacter;
    NewSpecies.retrieveChromo=config.retrieveChromo;
    NewSpecies.breed=config.breed;
    NewSpecies.name=config.name;
    return NewSpecies;
}